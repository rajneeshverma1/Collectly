/**
 * Home Page — Google Maps Style Layout
 * Mobile-first design with sidebar on desktop, bottom sheet on mobile
 */

"use client";

import CompactSearchBar from "@/components/CompactSearchBar";
import GoogleMapsLayout from "@/components/GoogleMapsLayout";
import LoadingOverlay from "@/components/LoadingOverlay";
import Map from "@/components/Map";
import { useAirQuality } from "@/hooks/useAirQuality";
import { useHealthScore } from "@/hooks/useHealthScore";
import { useRoute } from "@/hooks/useRoute";
import { useUserLocation } from "@/hooks/useUserLocation";
import type { Coordinates } from "@/types/location";
import { CONSTRUCTION_ZONES } from "@/lib/constants";
import { useState } from "react";

export default function Home() {
	// ─── Hooks: Data Layer ─────────────────────────────────────────
	const {
		location: userLocation,
		isManual,
		setManualLocation,
		resetToGPS,
	} = useUserLocation();

	const [destination, setDestination] = useState<Coordinates | null>(null);

	const {
		routeData,
		routeState,
		scoredRoutes,
		selectedIndex,
		setSelectedIndex,
		constructionZonesAvoided,
		filteredCount,
	} = useRoute(userLocation, destination);

	const { aqiData, isLoading: aqiLoading } = useAirQuality(userLocation);

	// Derive stats from selected route
	const selectedRoute = scoredRoutes[selectedIndex] ?? null;
	const bestRoute = scoredRoutes[0] ?? null;

	const selectedStats = selectedRoute
		? {
			avgPm25: selectedRoute.avgPm25,
			durationMin: selectedRoute.durationMin,
			distanceKm: selectedRoute.distanceKm,
		}
		: null;

	// Health score: compare selected route against greenest reference route
	const { exposureScore, doseReduction, isVulnerableWarning } = useHealthScore(
		selectedStats,
		bestRoute?.durationMin ?? 0,
		bestRoute?.avgPm25 ?? 0
	);

	// ─── Handlers ──────────────────────────────────────────────────
	const handleStartChange = (coords: Coordinates) => {
		setManualLocation(coords);
	};

	const handleDestinationChange = (coords: Coordinates) => {
		setDestination(coords);
	};

	// ─── Render ────────────────────────────────────────────────────
	return (
		<GoogleMapsLayout
			searchBar={
				<CompactSearchBar
					onStartChange={handleStartChange}
					onDestinationChange={handleDestinationChange}
					onResetGPS={resetToGPS}
					isManualStart={isManual}
					userLocation={userLocation}
				/>
			}
			routes={scoredRoutes}
			selectedIndex={selectedIndex}
			onSelectRoute={setSelectedIndex}
			showRoutes={routeState === "success"}
			constructionZonesAvoided={constructionZonesAvoided}
			filteredCount={filteredCount}>
			{/* Map — Full screen background */}
			<Map
				key={`route-${selectedIndex}`}
				userLocation={userLocation}
				destination={destination}
				routeGeoJSON={routeData}
				aqiSamples={selectedRoute?.aqiSamples}
				selectedRouteIndex={selectedIndex}
				constructionZones={CONSTRUCTION_ZONES}
			/>

			{/* Loading Overlay */}
			{routeState === "loading" && <LoadingOverlay />}
		</GoogleMapsLayout>
	);
}
