/**
 * Route Service — API client for the Vayu backend.
 * NO React. NO hooks. Pure async functions.
 */

import { ENDPOINTS, getPM25RouteColor } from "@/lib/constants";
import type {
	RouteApiResponse,
	RouteCandidateInput,
	RouteFeature,
	RouteFeatureCollection,
	ScoreRoutesRequest,
	ScoredRouteInfo,
} from "@/types/route";
import axios from "axios";

/** Full parsed result from the backend */
export interface ParsedRouteResult {
	geoJSON: RouteFeatureCollection;
	scoredRoutes: ScoredRouteInfo[];
	bestIndex: number;
	constructionZonesAvoided: string[];
	filteredCount: number;
}

interface MapboxRoute {
	geometry: GeoJSON.Geometry;
	duration: number;
	distance: number;
}

/**
 * Discover routes on the frontend, then send all candidates to backend for AQI scoring.
 */
export async function fetchBestRoute(
	startLat: number,
	startLon: number,
	endLat: number,
	endLon: number,
): Promise<ParsedRouteResult | null> {
	try {
		const candidates = await fetchRouteCandidates(
			startLat,
			startLon,
			endLat,
			endLon,
		);

		if (!candidates.length) return null;

		const payload: ScoreRoutesRequest = {
			start_lat: startLat,
			start_lon: startLon,
			end_lat: endLat,
			end_lon: endLon,
			routes: candidates,
		};

		const response = await axios.post<RouteApiResponse>(
			ENDPOINTS.SCORE_ROUTES,
			payload,
			{
				timeout: 45000,
			},
		);

		if (!response.data?.routes?.length) return null;

		const scoredRoutes = parseAllRoutes(response.data);
		const geoJSON = buildGeoJSON(scoredRoutes);

		return {
			geoJSON,
			scoredRoutes,
			bestIndex: response.data.best_index,
			constructionZonesAvoided: response.data.construction_zones_avoided || [],
			filteredCount: response.data.filtered_count || 0,
		};
	} catch (error) {
		console.error("[routeService] Error fetching route:", error);
		return null;
	}
}

async function fetchRouteCandidates(
	startLat: number,
	startLon: number,
	endLat: number,
	endLon: number,
): Promise<RouteCandidateInput[]> {
	const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
	if (!token) {
		throw new Error("NEXT_PUBLIC_MAPBOX_TOKEN is not configured.");
	}

	const uniqueRoutes = new Map<string, RouteCandidateInput>();

	const addRoutes = (rawRoutes: MapboxRoute[]) => {
		for (const route of rawRoutes) {
			const signature = geometrySignature(route.geometry);
			if (!signature || uniqueRoutes.has(signature)) continue;
			uniqueRoutes.set(signature, {
				geometry: route.geometry,
				duration: route.duration,
				distance: route.distance,
			});
		}
	};

	const baseRoutes = await callMapboxDirections(
		[startLon, startLat],
		[endLon, endLat],
		token,
		true,
	);
	addRoutes(baseRoutes);

	if (uniqueRoutes.size < 5) {
		const variants = generateWaypointVariants(
			startLat,
			startLon,
			endLat,
			endLon,
		);
		for (const waypoint of variants) {
			if (uniqueRoutes.size >= 5) break;
			const variantRoutes = await callMapboxDirections(
				[startLon, startLat],
				[endLon, endLat],
				token,
				false,
				[waypoint.lon, waypoint.lat],
			);
			addRoutes(variantRoutes);
		}
	}

	return Array.from(uniqueRoutes.values());
}

function geometrySignature(geometry: GeoJSON.Geometry): string {
	if (geometry.type !== "LineString") return "";
	const coords = geometry.coordinates as number[][];
	if (!coords.length) return "";

	const first = coords[0];
	const last = coords[coords.length - 1];
	const mid = coords[Math.floor(coords.length / 2)];
	return `${round(first[0])},${round(first[1])}|${round(mid[0])},${round(
		mid[1],
	)}|${round(last[0])},${round(last[1])}|${coords.length}`;
}

async function callMapboxDirections(
	start: [number, number],
	end: [number, number],
	token: string,
	includeAlternatives: boolean,
	waypoint?: [number, number],
): Promise<
	Array<{ geometry: GeoJSON.Geometry; duration: number; distance: number }>
> {
	const coordinates = waypoint
		? `${start[0]},${start[1]};${waypoint[0]},${waypoint[1]};${end[0]},${end[1]}`
		: `${start[0]},${start[1]};${end[0]},${end[1]}`;

	const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}`;
	const response = await axios.get(url, {
		params: {
			alternatives: includeAlternatives,
			geometries: "geojson",
			overview: "full",
			steps: false,
			access_token: token,
		},
		timeout: 15000,
	});

	const routes = response.data?.routes;
	if (!Array.isArray(routes)) return [];

	return (routes as Array<Record<string, unknown>>)
		.filter((route) => {
			const geometry = route.geometry as GeoJSON.Geometry | undefined;
			return geometry?.type === "LineString";
		})
		.map((route) => ({
			geometry: route.geometry as GeoJSON.Geometry,
			duration: Number(route.duration ?? 0),
			distance: Number(route.distance ?? 0),
		}));
}

function generateWaypointVariants(
	startLat: number,
	startLon: number,
	endLat: number,
	endLon: number,
): Array<{ lat: number; lon: number }> {
	const midLat = (startLat + endLat) / 2;
	const midLon = (startLon + endLon) / 2;
	const deltaLat = endLat - startLat;
	const deltaLon = endLon - startLon;
	const length = Math.sqrt(deltaLat * deltaLat + deltaLon * deltaLon) || 1;

	const perpLat = -deltaLon / length;
	const perpLon = deltaLat / length;
	const offsets = [0.01, -0.01, 0.015, -0.015, 0.02, -0.02, 0.025, -0.025];

	return offsets.map((offset) => ({
		lat: midLat + perpLat * offset,
		lon: midLon + perpLon * offset,
	}));
}

function round(value: number): string {
	return value.toFixed(4);
}

/**
 * Parse all routes from backend response into ScoredRouteInfo[].
 */
function parseAllRoutes(data: RouteApiResponse): ScoredRouteInfo[] {
	return data.routes.map((r) => ({
		index: r.index,
		isBest: r.is_best,
		avgPm25: r.avg_pm2_5,
		durationMin: r.duration_min,
		distanceKm: r.distance_km,
		geometry: r.geometry,
		aqiSamples: r.aqi_samples || [],
		googleMapsUrl: r.google_maps_url || "",
		hasConstructionWarning: r.has_construction_warning || false,
		constructionWarnings: r.construction_warnings || [],
	}));
}

/**
 * Build GeoJSON FeatureCollection showing only the best route in green color.
 */
function buildGeoJSON(routes: ScoredRouteInfo[]): RouteFeatureCollection {
	if (!routes.length) {
		return { type: "FeatureCollection", features: [] };
	}

	// Find the best route (isBest=true)
	const bestRoute = routes.find(r => r.isBest) || routes[0];
	
	const features: RouteFeature[] = [{
		type: "Feature",
		properties: {
			isPrimary: true,
			routeIndex: bestRoute.index,
			pollution: bestRoute.avgPm25,
			duration: bestRoute.durationMin,
			distance: bestRoute.distanceKm,
			routeColor: "#10b981", // Best route always green (emerald)
			isBestRoute: true,
		},
		geometry: bestRoute.geometry,
	}];

	return { type: "FeatureCollection", features };
}
