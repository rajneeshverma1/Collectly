/**
 * useRoute — Route fetching state machine.
 * Calls routeService when start + destination are both set.
 * Returns all discovered routes (target >=5) with per-route AQI data.
 *
 * States: idle → loading → success | error
 */

"use client";

import { fetchBestRoute } from "@/services/routeService";
import type { Coordinates } from "@/types/location";
import type {
	RouteFeatureCollection,
	RouteState,
	ScoredRouteInfo,
} from "@/types/route";
import { getPM25RouteColor } from "@/lib/constants";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseRouteReturn {
	routeData: RouteFeatureCollection | null;
	routeState: RouteState;
	scoredRoutes: ScoredRouteInfo[];
	selectedIndex: number;
	setSelectedIndex: (i: number) => void;
	error: string | null;
	refetch: () => void;
	constructionZonesAvoided: string[];
	filteredCount: number;
}

export function useRoute(
	start: Coordinates | null,
	destination: Coordinates | null
): UseRouteReturn {
	const [routeData, setRouteData] = useState<RouteFeatureCollection | null>(
		null
	);
	const [routeState, setRouteState] = useState<RouteState>("idle");
	const [scoredRoutes, setScoredRoutes] = useState<ScoredRouteInfo[]>([]);
	const [selectedIndex, setSelectedIndex] = useState<number>(0);
	const [error, setError] = useState<string | null>(null);
	const [constructionZonesAvoided, setConstructionZonesAvoided] = useState<string[]>([]);
	const [filteredCount, setFilteredCount] = useState<number>(0);
	const lastRequestKeyRef = useRef<string | null>(null);
	const inFlightKeyRef = useRef<string | null>(null);

	const buildRequestKey = useCallback(
		(startCoords: Coordinates, destinationCoords: Coordinates): string => {
			const [startLon, startLat] = startCoords;
			const [endLon, endLat] = destinationCoords;
			return [startLon, startLat, endLon, endLat]
				.map((value) => value.toFixed(4))
				.join("|");
		},
		[]
	);

	// Rebuild GeoJSON to show only selected route with color
	// Best route (isBest=true) always gets green color, others get PM2.5-based color
	const rebuildGeoJSON = useCallback((routes: ScoredRouteInfo[], primaryIndex: number) => {
		if (!routes.length) return null;

		// Only include the selected route
		const selectedRoute = routes[primaryIndex];
		if (!selectedRoute) return null;

		console.log("[rebuildGeoJSON] Selected route:", {
			index: primaryIndex,
			isBest: selectedRoute.isBest,
			avgPm25: selectedRoute.avgPm25,
		});

		// Best route (isBest=true) always green, others PM2.5-based color
		const routeColor = selectedRoute.isBest ? "#10b981" : getPM25RouteColor(selectedRoute.avgPm25);
		
		console.log("[rebuildGeoJSON] Route color:", routeColor, selectedRoute.isBest ? "(BEST - GREEN)" : "(PM2.5-based)");

		const features = [{
			type: "Feature" as const,
			properties: {
				isPrimary: true,
				routeIndex: selectedRoute.index,
				pollution: selectedRoute.avgPm25,
				duration: selectedRoute.durationMin,
				distance: selectedRoute.distanceKm,
				routeColor: routeColor,
				isBestRoute: selectedRoute.isBest, // Track if this is best route
			},
			geometry: selectedRoute.geometry,
		}];

		return { type: "FeatureCollection" as const, features };
	}, []);

	const fetchRoute = useCallback(async () => {
		if (!start || !destination) {
			setRouteState("idle");
			return;
		}

		const requestKey = buildRequestKey(start, destination);
		if (inFlightKeyRef.current === requestKey) {
			return;
		}
		if (lastRequestKeyRef.current === requestKey && scoredRoutes.length > 0) {
			return;
		}

		inFlightKeyRef.current = requestKey;

		setRouteState("loading");
		setError(null);

		try {
			const result = await fetchBestRoute(
				start[1],
				start[0], // lat, lon
				destination[1],
				destination[0]
			);

			if (result) {
				setScoredRoutes(result.scoredRoutes);
				setSelectedIndex(result.bestIndex);
				setRouteData(rebuildGeoJSON(result.scoredRoutes, result.bestIndex));
				setConstructionZonesAvoided(result.constructionZonesAvoided || []);
				setFilteredCount(result.filteredCount || 0);
				setRouteState("success");
				lastRequestKeyRef.current = requestKey;
			} else {
				setRouteState("error");
				setError("No routes found between these locations.");
			}
		} catch (err) {
			setRouteState("error");
			setError(err instanceof Error ? err.message : "Failed to fetch route");
		} finally {
			inFlightKeyRef.current = null;
		}
	}, [buildRequestKey, destination, scoredRoutes.length, start, rebuildGeoJSON]);

	// Update GeoJSON when selected index changes
	useEffect(() => {
		console.log("[useRoute] Selected index changed:", selectedIndex, "Total routes:", scoredRoutes.length);
		if (scoredRoutes.length > 0) {
			const newGeoJSON = rebuildGeoJSON(scoredRoutes, selectedIndex);
			console.log("[useRoute] Setting new GeoJSON for route", selectedIndex);
			setRouteData(newGeoJSON);
		}
	}, [selectedIndex, scoredRoutes, rebuildGeoJSON]);

	useEffect(() => {
		fetchRoute();
	}, [fetchRoute]);

	return {
		routeData,
		routeState,
		scoredRoutes,
		selectedIndex,
		setSelectedIndex,
		error,
		refetch: fetchRoute,
		constructionZonesAvoided,
		filteredCount,
	};
}
