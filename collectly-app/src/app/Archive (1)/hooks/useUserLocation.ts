/**
 * useUserLocation — GPS-based user location with IP geolocation fallback.
 * Replaces the old utils/getUserLocation.tsx.
 *
 * Features:
 * - Uses watchPosition for continuous GPS updates
 * - Falls back to IP geolocation if GPS unavailable
 * - Manual override pauses GPS tracking
 * - Reset to GPS mode clears manual override
 */

"use client";

import {
	DEFAULT_CENTER,
	GPS_MAX_AGE_MS,
	GPS_TIMEOUT_MS,
} from "@/lib/constants";
import type { Coordinates } from "@/types/location";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseUserLocationReturn {
	location: Coordinates | null;
	isManual: boolean;
	isLoading: boolean;
	error: string | null;
	setManualLocation: (coords: Coordinates) => void;
	resetToGPS: () => void;
}

/**
 * Fetch user location using IP geolocation as fallback
 * Uses ipapi.co free API (no key required, 1000 requests/day)
 */
async function getIPBasedLocation(): Promise<Coordinates | null> {
	try {
		console.log("[useUserLocation] Trying IP-based geolocation...");
		const response = await fetch("https://ipapi.co/json/", {
			timeout: 5000,
		} as any);
		
		if (!response.ok) {
			throw new Error("IP geolocation API failed");
		}
		
		const data = await response.json();
		
		if (data.latitude && data.longitude) {
			console.log("[useUserLocation] IP-based location found:", {
				city: data.city,
				region: data.region,
				country: data.country_name,
				latitude: data.latitude,
				longitude: data.longitude,
			});
			return [data.longitude, data.latitude];
		}
		
		return null;
	} catch (error) {
		console.error("[useUserLocation] IP geolocation failed:", error);
		return null;
	}
}

export function useUserLocation(): UseUserLocationReturn {
	const [location, setLocation] = useState<Coordinates | null>(null);
	const [isManual, setIsManual] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const watchIdRef = useRef<number | null>(null);
	const hasTriedIPLocationRef = useRef(false);

	// Start GPS tracking with IP fallback
	useEffect(() => {
		console.log("[useUserLocation] Starting location detection...");
		
		if (!("geolocation" in navigator)) {
			console.error("[useUserLocation] Geolocation not supported in this browser");
			setError("Geolocation not supported");
			setIsLoading(false);
			
			// Try IP-based location
			if (!hasTriedIPLocationRef.current) {
				hasTriedIPLocationRef.current = true;
				getIPBasedLocation().then((coords) => {
					if (coords) {
						setLocation(coords);
					} else {
						setLocation(DEFAULT_CENTER);
					}
				});
			}
			return;
		}

		console.log("[useUserLocation] Geolocation API available");

		const options: PositionOptions = {
			enableHighAccuracy: false, // Changed to false for better compatibility
			timeout: 10000, // Reduced timeout
			maximumAge: 30000, // Increased cache age
		};

		console.log("[useUserLocation] GPS Options:", options);

		const onSuccess = (position: GeolocationPosition) => {
			const { longitude, latitude, accuracy } = position.coords;
			console.log("[useUserLocation] GPS Success:", {
				longitude,
				latitude,
				accuracy: `${accuracy.toFixed(0)}m`,
				timestamp: new Date(position.timestamp).toISOString(),
			});
			
			// Only update if NOT in manual mode
			if (!isManual) {
				setLocation([longitude, latitude]);
			}
			setIsLoading(false);
			setError(null);
		};

		const onError = async (err: GeolocationPositionError) => {
			console.error("[useUserLocation] GPS Error:", {
				code: err.code,
				message: err.message,
				type: err.code === 1 ? "PERMISSION_DENIED" : 
				      err.code === 2 ? "POSITION_UNAVAILABLE" : 
				      err.code === 3 ? "TIMEOUT" : "UNKNOWN",
			});
			
			// Try IP-based location as fallback
			if (!isManual && !location && !hasTriedIPLocationRef.current) {
				hasTriedIPLocationRef.current = true;
				const ipLocation = await getIPBasedLocation();
				
				if (ipLocation) {
					setLocation(ipLocation);
					setError(null);
				} else {
					console.warn("[useUserLocation] Using default location (Lucknow)");
					setLocation(DEFAULT_CENTER);
					setError(null);
				}
			}
			setIsLoading(false);
		};

		// Try GPS first
		console.log("[useUserLocation] Requesting GPS position...");
		navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
		
		// Watch for position updates
		watchIdRef.current = navigator.geolocation.watchPosition(
			onSuccess,
			onError,
			options,
		);

		return () => {
			if (watchIdRef.current !== null) {
				console.log("[useUserLocation] Clearing GPS watch");
				navigator.geolocation.clearWatch(watchIdRef.current);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isManual]);

	/** Override GPS with a manually entered location */
	const setManualLocation = useCallback((coords: Coordinates) => {
		setIsManual(true);
		setLocation(coords);
		setError(null);
	}, []);

	/** Reset to GPS-based location tracking */
	const resetToGPS = useCallback(() => {
		setIsManual(false);
		setLocation(null); // Will be re-populated by watchPosition
		setIsLoading(true);
		hasTriedIPLocationRef.current = false; // Reset IP location flag
	}, []);

	return {
		location,
		isManual,
		isLoading,
		error,
		setManualLocation,
		resetToGPS,
	};
}
