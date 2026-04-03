"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const startIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const endIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface RouteData {
  name: string;
  positions: [number, number][];
  color: string;
  aqi: number;
  duration: string;
  distance: string;
  selected?: boolean;
}

const ROUTES_CONFIG = [
  {
    name: 'Route A (via Charbagh)',
    // South route: Polytechnic → Charbagh → Aminabad → Husainabad → east to SRMU
    osrmUrl: 'https://router.project-osrm.org/route/v1/driving/80.9462,26.8467;80.9168,26.8550;80.9050,26.8450;80.9300,26.8200;81.0049,26.8085?overview=full&geometries=geojson',
    color: '#EF4444',
    aqi: 248,
    duration: '45 min',
  },
  {
    name: 'Route B (via Gomti Nagar)',
    // Middle route: Polytechnic → Gomti Nagar → straight east to SRMU
    osrmUrl: 'https://router.project-osrm.org/route/v1/driving/80.9462,26.8467;80.9750,26.8500;81.0049,26.8085?overview=full&geometries=geojson',
    color: '#22C55E',
    aqi: 89,
    duration: '32 min',
    selected: true,
  },
  {
    name: 'Route C (via Faizabad Rd)',
    // North route: Polytechnic → north on Faizabad Rd → Indira Nagar → loop south to SRMU
    osrmUrl: 'https://router.project-osrm.org/route/v1/driving/80.9462,26.8467;80.9600,26.8700;80.9900,26.8650;81.0200,26.8400;81.0049,26.8085?overview=full&geometries=geojson',
    color: '#F97316',
    aqi: 195,
    duration: '41 min',
  },
];

const LiveAirMap = () => {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState(1); // Route B default

  useEffect(() => {
    const fetchRoutes = async () => {
      const results: RouteData[] = [];

      for (const config of ROUTES_CONFIG) {
        try {
          const res = await fetch(config.osrmUrl);
          const data = await res.json();
          if (data.routes?.[0]) {
            const coords: [number, number][] = data.routes[0].geometry.coordinates.map(
              ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
            );
            const dist = (data.routes[0].distance / 1000).toFixed(1);
            results.push({
              name: config.name,
              positions: coords,
              color: config.color,
              aqi: config.aqi,
              duration: config.duration,
              distance: `${dist} km`,
              selected: config.selected,
            });
          }
        } catch {
          // Skip failed routes
        }
      }

      if (results.length === 0) {
        // Fallback
        results.push({
          name: 'Route A', positions: [[26.8467, 80.9462], [26.82, 80.98], [26.8085, 81.0049]],
          color: '#EF4444', aqi: 248, duration: '38 min', distance: '12.3 km',
        });
        results.push({
          name: 'Route B', positions: [[26.8467, 80.9462], [26.855, 80.965], [26.8085, 81.0049]],
          color: '#22C55E', aqi: 89, duration: '32 min', distance: '10.8 km', selected: true,
        });
        results.push({
          name: 'Route C', positions: [[26.8467, 80.9462], [26.85, 80.99], [26.8085, 81.0049]],
          color: '#F97316', aqi: 195, duration: '41 min', distance: '14.1 km',
        });
      }

      setRoutes(results);
      setLoading(false);
    };

    fetchRoutes();
  }, []);

  return (
    <div className="w-full h-full rounded-2xl overflow-hidden relative" style={{ minHeight: 380 }}>
      {loading && (
        <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
          <div className="text-sm font-semibold text-slate-500 animate-pulse">Loading routes...</div>
        </div>
      )}
      <MapContainer
        center={[26.8300, 80.9750]}
        zoom={12}
        style={{ height: '100%', width: '100%', minHeight: 380 }}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={false}
        dragging={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        
        {/* Show all 3 routes simultaneously with full color */}
        {routes.map((route, i) => (
          <Polyline
            key={route.name}
            positions={route.positions}
            color={route.color}
            weight={i === selectedRoute ? 7 : 5}
            opacity={i === selectedRoute ? 1 : 0.85}
          />
        ))}

        {/* Start & End markers */}
        {routes.length > 0 && (
          <>
            <Marker position={[26.8467, 80.9462]} icon={startIcon}>
              <Tooltip permanent direction="top" offset={[0, -42]} className="!bg-white !border-slate-200 !text-[11px] !font-bold !text-slate-800 !rounded-lg !shadow-lg !px-2 !py-1">
                Polytechnic
              </Tooltip>
            </Marker>
            <Marker position={[26.8085, 81.0049]} icon={endIcon}>
              <Tooltip permanent direction="top" offset={[0, -42]} className="!bg-white !border-slate-200 !text-[11px] !font-bold !text-slate-800 !rounded-lg !shadow-lg !px-2 !py-1">
                SRMU
              </Tooltip>
            </Marker>
          </>
        )}
      </MapContainer>

      {/* Route cards - Google Maps style */}
      <div className="absolute bottom-3 left-3 right-3 z-[1000] flex gap-2">
        {routes.map((route, i) => (
          <button
            key={route.name}
            onClick={() => setSelectedRoute(i)}
            className={`flex-1 rounded-xl px-3 py-2.5 text-left transition-all shadow-lg backdrop-blur-sm ${
              i === selectedRoute
                ? 'bg-white/95 ring-2 ring-offset-1 scale-[1.02]'
                : 'bg-white/80 hover:bg-white/90'
            }`}
            style={{ '--tw-ring-color': route.color } as React.CSSProperties}
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: route.color }} />
              <span className="text-[10px] font-bold text-slate-800 truncate">{route.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[13px] font-bold text-slate-900">{route.duration}</span>
              <span className="text-[10px] text-slate-500">{route.distance}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full" style={{
                backgroundColor: route.aqi < 100 ? '#DCFCE7' : route.aqi < 200 ? '#FEF3C7' : '#FEE2E2',
                color: route.aqi < 100 ? '#166534' : route.aqi < 200 ? '#92400E' : '#991B1B',
              }}>
                AQI {route.aqi}
              </span>
              <span className="text-[9px] text-slate-400">
                {route.aqi < 100 ? 'Good' : route.aqi < 200 ? 'Moderate' : 'Unhealthy'}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Live badge */}
      <div className="absolute top-3 right-3 z-[1000] bg-red-500 text-white text-[10px] font-bold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-lg">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        LIVE
      </div>

      {/* From-To header */}
      <div className="absolute top-3 left-3 z-[1000] bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Route</div>
        <div className="text-[12px] font-bold text-slate-800">Polytechnic → SRMU</div>
      </div>
    </div>
  );
};

export default LiveAirMap;
