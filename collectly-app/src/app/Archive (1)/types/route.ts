/**
 * Route Types — All interfaces related to routing and route scoring.
 * Used across services, hooks, and components.
 */

/** State machine for async route fetching */
export type RouteState = "idle" | "loading" | "success" | "error";

/** A sampled AQI point along a route */
export interface AQISamplePoint {
	lat: number;
	lon: number;
	pm2_5: number;
}

/** Construction zone warning */
export interface ConstructionWarning {
	zone_name: string;
	description: string;
	distance_km: number;
}

/** Individual scored route from the backend (returned for ALL routes) */
export interface ScoredRouteInfo {
	index: number;
	isBest: boolean;
	avgPm25: number;
	durationMin: number;
	distanceKm: number;
	geometry: GeoJSON.Geometry;
	aqiSamples: AQISamplePoint[];
	googleMapsUrl: string;
	hasConstructionWarning?: boolean;
	constructionWarnings?: ConstructionWarning[];
}

/** Raw backend response */
export interface RouteApiResponse {
	routes: Array<{
		index: number;
		is_best: boolean;
		avg_pm2_5: number;
		duration_min: number;
		distance_km: number;
		geometry: GeoJSON.Geometry;
		aqi_samples: AQISamplePoint[];
		google_maps_url: string;
		has_construction_warning?: boolean;
		construction_warnings?: Array<{
			zone_name: string;
			description: string;
			distance_km: number;
		}>;
	}>;
	best_index: number;
	filtered_count?: number;
	construction_zones_avoided?: string[];
}

export interface RouteCandidateInput {
	geometry: GeoJSON.Geometry;
	duration: number;
	distance: number;
}

export interface ScoreRoutesRequest {
	start_lat: number;
	start_lon: number;
	end_lat: number;
	end_lon: number;
	routes: RouteCandidateInput[];
}

/** A single route as a GeoJSON Feature (for Mapbox rendering) */
export interface RouteFeature {
	type: "Feature";
	properties: {
		isPrimary: boolean;
		routeIndex: number;
		pollution?: number;
		duration?: number;
		distance?: number;
		routeColor?: string; // PM2.5-based color
		isBestRoute?: boolean; // Track if this is the best route
	};
	geometry: GeoJSON.Geometry;
}

/** Parsed route data as a GeoJSON FeatureCollection */
export interface RouteFeatureCollection {
	type: "FeatureCollection";
	features: RouteFeature[];
}

/** Stats for a single route */
export interface RouteStats {
	avgPm25: number;
	durationMin: number;
	distanceKm: number;
}
