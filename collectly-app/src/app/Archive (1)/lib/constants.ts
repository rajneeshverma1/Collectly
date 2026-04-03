 

import { TransportMode } from "@/types/health";

// ─── API Configuration ────────────────────────────────────────────
export const API_BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

export const ENDPOINTS = {
	CLEAN_ROUTE: `${API_BASE_URL}/get-clean-route`,
	SCORE_ROUTES: `${API_BASE_URL}/score-routes`,
	HEALTH_CHECK: `${API_BASE_URL}/health`,
} as const; 


export const MAPBOX_GEOCODING_URL =
	"https://api.mapbox.com/geocoding/v5/mapbox.places";
export const MAPBOX_STYLE = "mapbox://styles/mapbox/streets-v12";

export const DEFAULT_CENTER: [number, number] = [80.92313, 26.83928]; // Lucknow
export const DEFAULT_ZOOM = 12;

// ─── Breathing Rates (m³/hour) — EPA Reference ───────────────────
export const BREATHING_RATES: Record<TransportMode, number> = {
	[TransportMode.DRIVING]: 0.6,
	[TransportMode.CYCLING]: 2.5,
	[TransportMode.WALKING]: 1.5,
};

// ─── Pareto Scoring Weights ──────────────────────────────────────
export const DEFAULT_WEIGHTS = {
	exposure: 0.6,
	time: 0.3,
	distance: 0.1,
} as const;

export const VULNERABLE_WEIGHTS = {
	exposure: 0.9,
	time: 0.08,
	distance: 0.02,
} as const;

// ─── AQI Thresholds & Colors ─────────────────────────────────────
export const AQI_LEVELS = [
	{ max: 1, label: "Good", color: "#00e400", bg: "rgba(0, 228, 0, 0.15)" },
	{ max: 2, label: "Fair", color: "#ffff00", bg: "rgba(255, 255, 0, 0.15)" },
	{
		max: 3,
		label: "Moderate",
		color: "#ff7e00",
		bg: "rgba(255, 126, 0, 0.15)",
	},
	{ max: 4, label: "Poor", color: "#ff0000", bg: "rgba(255, 0, 0, 0.15)" },
	{
		max: 5,
		label: "Very Poor",
		color: "#8f3f97",
		bg: "rgba(143, 63, 151, 0.15)",
	},
] as const;

// ─── Route Display Colors (PM2.5-based) ──────────────────────────
export const ROUTE_COLORS = {
	primary: "#22c55e", // Green — best route (legacy)
	alternative: "#94a3b8", // Gray — other routes (legacy)
	primaryWidth: 6,
	alternativeWidth: 4,
	opacity: 0.9,
} as const;

// PM2.5-based route colors (EPA/WHO standards)
export const PM25_ROUTE_COLORS = [
	{ max: 12, color: "#10b981", label: "Good" },           // Emerald green
	{ max: 35.4, color: "#fbbf24", label: "Moderate" },     // Amber yellow
	{ max: 55.4, color: "#f97316", label: "Unhealthy (Sensitive)" }, // Orange
	{ max: 150.4, color: "#ef4444", label: "Unhealthy" },   // Red
	{ max: 250.4, color: "#a855f7", label: "Very Unhealthy" }, // Purple
	{ max: Infinity, color: "#881337", label: "Hazardous" }, // Dark red/maroon
] as const;

export function getPM25RouteColor(pm25: number): string {
	for (const level of PM25_ROUTE_COLORS) {
		if (pm25 <= level.max) return level.color;
	}
	return PM25_ROUTE_COLORS[PM25_ROUTE_COLORS.length - 1].color;
}

// ─── Timing Constants ────────────────────────────────────────────
export const GEOCODER_DEBOUNCE_MS = 300;
export const AQI_REFRESH_INTERVAL_MS = 30_000; // 30 seconds
export const GPS_TIMEOUT_MS = 15_000;
export const GPS_MAX_AGE_MS = 10_000;

// ─── Construction Zones ──────────────────────────────────────────
export const CONSTRUCTION_ZONES = [
	{
		lat: 26.882814,
		lon: 81.040728,
		radius_km: 0.5,
		name: "Deva Road Construction",
		description: "Active construction area - avoid this route"
	},
	{
		lat: 26.909222,
		lon: 80.956861,
		radius_km: 0.4,
		name: "Gomti Nagar Construction",
		description: "Road expansion work in progress"
	},
	{
		lat: 26.9092222,
		lon: 80.9568611,
		radius_km: 0.3,
		name: "Gomti Nagar Extension Construction",
		description: "Road development in progress"
	},
	{
		lat: 26.8467,
		lon: 80.9462,
		radius_km: 0.35,
		name: "Hazratganj Metro Construction",
		description: "Metro station construction work"
	},
	{
		lat: 26.8393,
		lon: 80.9231,
		radius_km: 0.45,
		name: "Charbagh Railway Flyover",
		description: "Flyover construction near railway station"
	},
	{
		lat: 26.8714,
		lon: 80.9100,
		radius_km: 0.3,
		name: "Old Lucknow Road Widening",
		description: "Heritage area road improvement"
	},
	{
		lat: 26.7606,
		lon: 80.8893,
		radius_km: 0.4,
		name: "Airport Road Expansion",
		description: "Airport approach road construction"
	},
	{
		lat: 26.8950,
		lon: 80.9850,
		radius_km: 0.35,
		name: "Gomti Riverfront Development",
		description: "Riverfront beautification project"
	},
] as const;

// ─── Quick Locations (Saved Places) ──────────────────────────────
export const QUICK_LOCATIONS = [
	// Historical & Architectural Landmarks
	{
		name: "Bara Imambara",
		address: "Old Lucknow",
		lat: 26.8692,
		lon: 80.9128,
		icon: "🕌",
	},
	{
		name: "Chota Imambara",
		address: "Hussainabad",
		lat: 26.8739,
		lon: 80.9044,
		icon: "🕌",
	},
	{
		name: "Rumi Darwaza",
		address: "Old Lucknow",
		lat: 26.8714,
		lon: 80.9100,
		icon: "🏛️",
	},
	{
		name: "The Residency",
		address: "Kaiser Bagh",
		lat: 26.8617,
		lon: 80.9278,
		icon: "🏛️",
	},
	{
		name: "Chhatar Manzil",
		address: "Kaiser Bagh",
		lat: 26.85,
		lon: 80.9167,
		icon: "🏰",
	},
	
	// Parks & Modern Destinations
	{
		name: "Ambedkar Memorial Park",
		address: "Gomti Nagar",
		lat: 26.85,
		lon: 80.95,
		icon: "🌳",
	},
	{
		name: "Janeshwar Mishra Park",
		address: "Gomti Nagar Extension",
		lat: 26.85,
		lon: 81.0167,
		icon: "🌳",
	},
	{
		name: "Gomti Riverfront Park",
		address: "Gomti Nagar",
		lat: 26.85,
		lon: 80.95,
		icon: "🌳",
	},
	{
		name: "Lucknow Zoo",
		address: "Hazratganj",
		lat: 26.8492,
		lon: 80.9397,
		icon: "🦁",
	},
	
	// Religious Sites
	{
		name: "Jama Masjid",
		address: "Hussainabad",
		lat: 26.8725,
		lon: 80.9011,
		icon: "🕌",
	},
	{
		name: "Maa Chandrika Devi Temple",
		address: "Kathwara",
		lat: 26.9167,
		lon: 80.9833,
		icon: "🛕",
	},
	{
		name: "St. Joseph Cathedral",
		address: "Hazratganj",
		lat: 26.85,
		lon: 80.9333,
		icon: "⛪",
	},
	
	// Educational
	{
		name: "Shri Ram Swaroop Memorial University",
		address: "Lucknow-Deva Road",
		lat: 26.951667,
		lon: 81.098333,
		icon: "🎓",
	},
	{
		name: "La Martiniere College",
		address: "Lucknow",
		lat: 26.8333,
		lon: 80.95,
		icon: "🎓",
	},
	
	// Shopping & Commercial
	{
		name: "Hazratganj",
		address: "Shopping District",
		lat: 26.8467,
		lon: 80.9462,
		icon: "🛍️",
	},
	
	// Transportation
	{
		name: "Lucknow Airport",
		address: "Chaudhary Charan Singh Airport",
		lat: 26.7606,
		lon: 80.8893,
		icon: "✈️",
	},
	{
		name: "Lucknow Railway Station",
		address: "Charbagh",
		lat: 26.8393,
		lon: 80.9231,
		icon: "🚂",
	},
] as const;
