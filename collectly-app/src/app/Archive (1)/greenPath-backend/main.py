import os
import httpx
import asyncio
import statistics
import math
from datetime import datetime
from typing import List, Optional, Dict, Any, Tuple
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
import uvicorn


# Load environment variables
load_dotenv()

app = FastAPI(
    title="GreenPath Healthy Routing API",
    description="Pollution-aware routing using Mapbox Directions + OpenWeatherMap AQI data.",
    version="2.1.0"
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Configuration ────────────────────────────────────────────────

MAPBOX_TOKEN = os.getenv("MAPBOX_ACCESS_TOKEN")
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
MONGODB_URI = os.getenv("MONGODB_URL")  # .env has MONGODB_URL

MAPBOX_DIRECTIONS_URL = "https://api.mapbox.com/directions/v5/mapbox/driving"

# Construction Zones - Add coordinates here to avoid these areas
CONSTRUCTION_ZONES = [
    {
        "lat": 26.882814,
        "lon": 81.040728,
        "radius_km": 0.5,  # 500 meters radius
        "name": "Deva Road Construction",
        "description": "Active construction area - avoid this route"
    },
    {
        "lat": 26.909222,
        "lon": 80.956861,
        "radius_km": 0.4,  # 400 meters radius
        "name": "Gomti Nagar Construction",
        "description": "Road expansion work in progress"
    },
    {
        "lat": 26.9092222,
        "lon": 80.9568611,
        "radius_km": 0.3,  # 300 meters radius
        "name": "Gomti Nagar Extension Construction",
        "description": "Road development in progress"
    },
    {
        "lat": 26.8467,
        "lon": 80.9462,
        "radius_km": 0.35,  # 350 meters radius
        "name": "Hazratganj Metro Construction",
        "description": "Metro station construction work"
    },
    {
        "lat": 26.8393,
        "lon": 80.9231,
        "radius_km": 0.45,  # 450 meters radius
        "name": "Charbagh Railway Flyover",
        "description": "Flyover construction near railway station"
    },
    {
        "lat": 26.8714,
        "lon": 80.9100,
        "radius_km": 0.3,  # 300 meters radius
        "name": "Old Lucknow Road Widening",
        "description": "Heritage area road improvement"
    },
    {
        "lat": 26.7606,
        "lon": 80.8893,
        "radius_km": 0.4,  # 400 meters radius
        "name": "Airport Road Expansion",
        "description": "Airport approach road construction"
    },
    {
        "lat": 26.8950,
        "lon": 80.9850,
        "radius_km": 0.35,  # 350 meters radius
        "name": "Gomti Riverfront Development",
        "description": "Riverfront beautification project"
    },
]

# MongoDB setup
db_client = None
db = None
aqi_cache = None

@app.on_event("startup")
async def startup_db():
    global db_client, db, aqi_cache
    if MONGODB_URI:
        db_client = AsyncIOMotorClient(MONGODB_URI)
        db = db_client["greenpath"]
        aqi_cache = db["aqi_cache"]
        print("[OK] MongoDB connected")
    else:
        print("[WARN] MONGODB_URI not set - AQI caching disabled")

@app.on_event("shutdown")
async def shutdown_db():
    if db_client:
        db_client.close()

# ─── Data Models ──────────────────────────────────────────────────

class RouteRequest(BaseModel):
    start_lat: float
    start_lon: float
    end_lat: float
    end_lon: float


class RouteCandidate(BaseModel):
    geometry: Dict[str, Any]
    duration: float
    distance: float


class ScoreRoutesRequest(BaseModel):
    start_lat: float
    start_lon: float
    end_lat: float
    end_lon: float
    routes: List[RouteCandidate]

class AQISample(BaseModel):
    lat: float
    lon: float
    pm2_5: float

class ConstructionWarning(BaseModel):
    zone_name: str
    description: str
    distance_km: float

class ScoredRouteInfo(BaseModel):
    index: int
    is_best: bool
    avg_pm2_5: float
    duration_min: float
    distance_km: float
    geometry: Dict[str, Any]
    aqi_samples: List[AQISample]
    google_maps_url: str
    has_construction_warning: bool = False
    construction_warnings: List[ConstructionWarning] = []

class RouteResponse(BaseModel):
    routes: List[ScoredRouteInfo]
    best_index: int
    filtered_count: int = 0
    construction_zones_avoided: List[str] = []

# ─── Helper Functions ─────────────────────────────────────────────

async def fetch_aqi(client: httpx.AsyncClient, lat: float, lon: float) -> float:
    """Fetch PM2.5 from OpenWeatherMap and cache in MongoDB."""
    if not OPENWEATHER_API_KEY:
        print("[WARN] OPENWEATHER_API_KEY not set. Returning 0.0 for AQI.")
        return 0.0

    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={OPENWEATHER_API_KEY}"
    
    try:
        resp = await client.get(url, timeout=5.0)
        resp.raise_for_status()
        data = resp.json()
        pm2_5 = float(data['list'][0]['components']['pm2_5'])
        
        # Store in MongoDB if available
        if aqi_cache is not None:
            await aqi_cache.insert_one({
                "location": {"type": "Point", "coordinates": [lon, lat]},
                "pm2_5": pm2_5,
                "timestamp": datetime.utcnow()
            })
        
        return pm2_5
    except (httpx.RequestError, KeyError, IndexError, ValueError) as e:
        print(f"Error fetching AQI for ({lat}, {lon}): {e}")
        return 0.0

async def get_mapbox_routes(
    client: httpx.AsyncClient,
    start_lon: float, start_lat: float,
    end_lon: float, end_lat: float
) -> Dict[str, Any]:
    """
    Fetch intelligent routes from Mapbox Directions API.
    Uses multiple strategies to get diverse route options:
    1. Main route with alternatives (up to 3)
    2. Different routing profiles if needed
    3. Waypoint variations for more options
    """
    if not MAPBOX_TOKEN:
        raise HTTPException(status_code=500, detail="MAPBOX_ACCESS_TOKEN not configured")
    
    coordinates = f"{start_lon},{start_lat};{end_lon},{end_lat}"
    url = f"{MAPBOX_DIRECTIONS_URL}/{coordinates}"
    
    params = {
        "alternatives": "true",  # Request up to 3 alternative routes
        "geometries": "geojson",
        "overview": "full",
        "steps": "false",
        "continue_straight": "false",  # Allow U-turns for more route diversity
        "access_token": MAPBOX_TOKEN,
        "annotations": "distance,duration",  # Get detailed segment info
    }
    
    try:
        resp = await client.get(url, params=params, timeout=10.0)
        resp.raise_for_status()
        data = resp.json()
        
        # If we got fewer than 3 routes, try to get more with different strategies
        routes = data.get("routes", [])
        
        # Strategy: If we have < 3 routes, try with different exclude parameters
        if len(routes) < 3:
            # Try excluding tolls to get a different route
            params_no_toll = params.copy()
            params_no_toll["exclude"] = "toll"
            try:
                resp2 = await client.get(url, params=params_no_toll, timeout=10.0)
                resp2.raise_for_status()
                data2 = resp2.json()
                additional_routes = data2.get("routes", [])
                
                # Add unique routes (check if geometry is different)
                for new_route in additional_routes:
                    is_duplicate = False
                    new_coords = new_route["geometry"]["coordinates"]
                    for existing_route in routes:
                        existing_coords = existing_route["geometry"]["coordinates"]
                        # Simple duplicate check: compare first and last few coordinates
                        if (len(new_coords) > 5 and len(existing_coords) > 5 and
                            new_coords[:3] == existing_coords[:3] and
                            new_coords[-3:] == existing_coords[-3:]):
                            is_duplicate = True
                            break
                    
                    if not is_duplicate and len(routes) < 5:
                        routes.append(new_route)
            except:
                pass  # If this fails, continue with what we have
        
        data["routes"] = routes
        return data
        
    except httpx.RequestError as e:
        raise HTTPException(status_code=503, detail=f"Mapbox routing unavailable: {str(e)}")

def sample_route_points(coordinates: List[List[float]], num_samples: int = 8) -> List[List[float]]:
    """Sample equidistant points from route coordinates."""
    if not coordinates:
        return []
    total_points = len(coordinates)
    if total_points <= num_samples:
        return coordinates
    step = (total_points - 1) / (num_samples - 1)
    indices = [int(i * step) for i in range(num_samples)]
    if indices[-1] != total_points - 1:
        indices[-1] = total_points - 1
    return [coordinates[i] for i in indices]

def build_google_maps_url(
    start_lat: float, start_lon: float,
    end_lat: float, end_lon: float,
    waypoints: List[List[float]]
) -> str:
    """Build Google Maps directions URL with waypoints."""
    base = "https://www.google.com/maps/dir/?api=1"
    origin = f"&origin={start_lat},{start_lon}"
    destination = f"&destination={end_lat},{end_lon}"
    travelmode = "&travelmode=driving"
    
    if waypoints and len(waypoints) > 2:
        intermediate = waypoints[1:-1]
        step = max(1, len(intermediate) // 9)
        sampled = intermediate[::step][:9]
        wp_str = "|".join(f"{pt[1]},{pt[0]}" for pt in sampled)
        waypoints_param = f"&waypoints={wp_str}"
    else:
        waypoints_param = ""
    
    return f"{base}{origin}{destination}{travelmode}{waypoints_param}"


def haversine_distance(lon1: float, lat1: float, lon2: float, lat2: float) -> float:
    """Calculate distance in km between two points using Haversine formula."""
    R = 6371  # Earth radius in km
    lat1, lon1, lat2, lon2 = map(math.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    return R * c


def check_construction_zones(route_coords: List[List[float]]) -> Tuple[bool, List[Dict]]:
    """
    Check if route passes through any construction zones.
    Returns (has_construction, warnings_list)
    """
    warnings = []
    
    # Sample points from route for checking
    sample_size = min(20, len(route_coords))
    step = max(1, len(route_coords) // sample_size)
    sampled_coords = route_coords[::step][:sample_size]
    
    print(f"[CONSTRUCTION CHECK] Checking route with {len(route_coords)} points, sampling {len(sampled_coords)} points")
    
    for zone in CONSTRUCTION_ZONES:
        zone_lat = zone["lat"]
        zone_lon = zone["lon"]
        zone_radius = zone["radius_km"]
        
        print(f"[CONSTRUCTION CHECK] Checking zone: {zone['name']} at ({zone_lat}, {zone_lon}), radius: {zone_radius}km")
        
        # Check if any point on route is within construction zone radius
        min_distance = float('inf')
        closest_point = None
        
        for coord in sampled_coords:
            lon, lat = coord[0], coord[1]
            distance = haversine_distance(zone_lon, zone_lat, lon, lat)
            
            if distance < min_distance:
                min_distance = distance
                closest_point = (lat, lon)
            
            if distance <= zone_radius:
                warning = {
                    "zone_name": zone["name"],
                    "description": zone["description"],
                    "distance_km": round(distance, 2)
                }
                warnings.append(warning)
                print(f"[CONSTRUCTION DETECTED] Route passes through {zone['name']} at distance {distance:.2f}km")
                break  # Found construction zone, no need to check more points
        
        if min_distance > zone_radius:
            print(f"[CONSTRUCTION CHECK] Route clear of {zone['name']}, closest point: {min_distance:.2f}km at {closest_point}")
    
    return (len(warnings) > 0, warnings)


def calculate_route_similarity(coords1: List[List[float]], coords2: List[List[float]]) -> float:
    """
    Calculate similarity between two routes using simplified Hausdorff distance.
    Returns a score between 0-1 where 1 = identical routes, 0 = completely different.
    """
    if not coords1 or not coords2:
        return 0.0
    
    # Sample points to reduce computation
    sample_size = min(20, len(coords1), len(coords2))
    step1 = max(1, len(coords1) // sample_size)
    step2 = max(1, len(coords2) // sample_size)
    
    sampled1 = coords1[::step1][:sample_size]
    sampled2 = coords2[::step2][:sample_size]
    
    # Calculate average minimum distance from route1 to route2
    total_dist = 0
    for pt1 in sampled1:
        min_dist = min(haversine_distance(pt1[0], pt1[1], pt2[0], pt2[1]) for pt2 in sampled2)
        total_dist += min_dist
    
    avg_dist = total_dist / len(sampled1)
    
    # Convert distance to similarity score (0-1)
    # Routes within 0.5km average distance are considered very similar
    similarity = max(0, 1 - (avg_dist / 0.5))
    return similarity


def filter_meaningful_routes(scored_routes: List[Dict]) -> Tuple[List[Dict], int, List[str]]:
    """
    Filter routes to show only meaningful alternatives.
    Removes routes that are:
    1. Passing through construction zones
    2. Too similar in geometry (same path with minor variations)
    3. Too similar in time, distance, and AQI
    4. Unnecessarily long detours without benefits
    
    Returns: (filtered_routes, filtered_count, construction_zones_avoided)
    """
    if len(scored_routes) <= 1:
        return (scored_routes, 0, [])
    
    # First, filter out routes with construction zones
    routes_without_construction = []
    routes_with_construction = []
    construction_zones_found = set()
    
    for route in scored_routes:
        coords = route["route_data"]["geometry"]["coordinates"]
        has_construction, warnings = check_construction_zones(coords)
        
        route["has_construction"] = has_construction
        route["construction_warnings"] = warnings
        
        if has_construction:
            routes_with_construction.append(route)
            for warning in warnings:
                construction_zones_found.add(warning["zone_name"])
            print(f"[CONSTRUCTION] Route filtered: {warnings[0]['zone_name']}")
        else:
            routes_without_construction.append(route)
    
    construction_zones_list = list(construction_zones_found)
    
    # If all routes have construction, keep them but warn user
    if len(routes_without_construction) == 0:
        print("[CONSTRUCTION] WARNING: All routes pass through construction zones!")
        working_routes = scored_routes
    else:
        working_routes = routes_without_construction
    
    if len(working_routes) <= 1:
        filtered_count = len(scored_routes) - len(working_routes)
        return (working_routes, filtered_count, construction_zones_list)
    
    filtered = [working_routes[0]]  # Always keep the best route
    
    for candidate in working_routes[1:]:
        should_include = True
        
        # Get candidate route geometry
        candidate_coords = candidate["route_data"]["geometry"]["coordinates"]
        
        # Compare with all already selected routes
        for selected in filtered:
            selected_coords = selected["route_data"]["geometry"]["coordinates"]
            
            # 1. Check geometry similarity (most important check)
            geometry_similarity = calculate_route_similarity(candidate_coords, selected_coords)
            
            if geometry_similarity > 0.85:  # Routes are >85% similar in path
                should_include = False
                break
            
            # 2. Calculate percentage differences in metrics
            time_diff_pct = abs(candidate["duration"] - selected["duration"]) / selected["duration"] * 100
            dist_diff_pct = abs(candidate["distance"] - selected["distance"]) / selected["distance"] * 100
            aqi_diff_pct = abs(candidate["avg_pm2_5"] - selected["avg_pm2_5"]) / max(selected["avg_pm2_5"], 1) * 100
            
            # 3. Check for meaningless detours
            # If route is >30% longer in distance but <10% better in AQI, it's a meaningless detour
            if dist_diff_pct > 30 and aqi_diff_pct < 10:
                should_include = False
                break
            
            # 4. Check if route is too similar in all metrics
            # If all three metrics are within thresholds, routes are too similar
            if time_diff_pct < 10 and dist_diff_pct < 8 and aqi_diff_pct < 15:
                should_include = False
                break
        
        if should_include:
            filtered.append(candidate)
            
        # Limit to max 4 routes for better UX
        if len(filtered) >= 4:
            break
    
    filtered_count = len(scored_routes) - len(filtered)
    return (filtered, filtered_count, construction_zones_list)


async def score_routes_from_candidates(
    client: httpx.AsyncClient,
    start_lat: float,
    start_lon: float,
    end_lat: float,
    end_lon: float,
    route_candidates: List[RouteCandidate],
) -> RouteResponse:
    """Score every provided route candidate by AQI and return meaningful routes sorted by PM2.5."""
    if not route_candidates:
        raise HTTPException(status_code=404, detail="No routes found between these locations.")

    scored_routes = []

    for route_candidate in route_candidates:
        coordinates = route_candidate.geometry.get("coordinates", [])
        if not coordinates:
            continue

        sample_points = sample_route_points(coordinates, num_samples=8)
        aqi_tasks = [fetch_aqi(client, pt[1], pt[0]) for pt in sample_points]
        aqi_scores = await asyncio.gather(*aqi_tasks)

        avg_pm2_5 = statistics.mean(aqi_scores) if aqi_scores else 0.0

        scored_routes.append({
            "route_data": {
                "geometry": route_candidate.geometry,
                "duration": route_candidate.duration,
                "distance": route_candidate.distance,
            },
            "avg_pm2_5": avg_pm2_5,
            "duration": route_candidate.duration,
            "distance": route_candidate.distance,
            "sample_points": sample_points,
            "aqi_scores": list(aqi_scores),
        })

    if not scored_routes:
        raise HTTPException(status_code=404, detail="No valid routes found in request.")

    # Sort by PM2.5 (best air quality first)
    scored_routes.sort(key=lambda x: x["avg_pm2_5"])
    
    # Filter to show only meaningful alternatives
    filtered_routes, filtered_count, construction_zones = filter_meaningful_routes(scored_routes)

    response_routes = []
    for i, sr in enumerate(filtered_routes):
        response_routes.append(ScoredRouteInfo(
            index=i,
            is_best=(i == 0),
            avg_pm2_5=round(sr["avg_pm2_5"], 2),
            duration_min=round(sr["duration"] / 60, 1),
            distance_km=round(sr["distance"] / 1000, 2),
            geometry=sr["route_data"]["geometry"],
            aqi_samples=[
                AQISample(lat=pt[1], lon=pt[0], pm2_5=round(aqi, 2))
                for pt, aqi in zip(sr["sample_points"], sr["aqi_scores"])
            ],
            google_maps_url=build_google_maps_url(
                start_lat,
                start_lon,
                end_lat,
                end_lon,
                sample_route_points(sr["route_data"]["geometry"]["coordinates"], num_samples=15),
            ),
            has_construction_warning=sr.get("has_construction", False),
            construction_warnings=[
                ConstructionWarning(**warning) 
                for warning in sr.get("construction_warnings", [])
            ],
        ))

    return RouteResponse(
        routes=response_routes, 
        best_index=0,
        filtered_count=filtered_count,
        construction_zones_avoided=construction_zones
    )

# ─── Endpoints ────────────────────────────────────────────────────

@app.post("/get-clean-route", response_model=RouteResponse)
async def get_clean_route(req: RouteRequest):
    """
    Returns up to 4 scored routes from Mapbox with per-route AQI data.
    Routes are ranked by PM2.5 — index 0 is the greenest.
    """
    async with httpx.AsyncClient() as client:
        mapbox_data = await get_mapbox_routes(
            client, req.start_lon, req.start_lat, req.end_lon, req.end_lat
        )

        routes = mapbox_data.get("routes", [])
        if not routes:
            raise HTTPException(status_code=404, detail="No routes found between these locations.")

        candidates = [
            RouteCandidate(
                geometry=route["geometry"],
                duration=float(route["duration"]),
                distance=float(route["distance"]),
            )
            for route in routes
        ]

        return await score_routes_from_candidates(
            client=client,
            start_lat=req.start_lat,
            start_lon=req.start_lon,
            end_lat=req.end_lat,
            end_lon=req.end_lon,
            route_candidates=candidates,
        )


@app.post("/score-routes", response_model=RouteResponse)
async def score_routes(req: ScoreRoutesRequest):
    """Score all routes sent by the frontend; return every route sorted by AQI."""
    async with httpx.AsyncClient() as client:
        return await score_routes_from_candidates(
            client=client,
            start_lat=req.start_lat,
            start_lon=req.start_lon,
            end_lat=req.end_lat,
            end_lon=req.end_lon,
            route_candidates=req.routes,
        )

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "greenpath-backend-2",
        "routing": "Mapbox Directions API",
        "mongodb": "connected" if db_client else "not configured"
    }

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
