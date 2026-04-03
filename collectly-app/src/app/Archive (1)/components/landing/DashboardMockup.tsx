"use client";

import { useEffect, useState, useRef } from 'react';
import {
  Home, MapPin, Activity, Map, ArrowLeftCircle,
  Footprints, Bike, Car, Search, Bell, Wind,
  ShieldCheck, AlertTriangle, HeartPulse, Navigation,
  AlertOctagon, WifiOff, Settings, ChevronDown
} from 'lucide-react';
import { MapContainer, TileLayer, Polyline, Marker, Circle, Tooltip, useMap } from 'react-leaflet';
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

const DASHBOARD_ROUTES = [
  {
    name: 'Route A (Charbagh)',
    osrmUrl: 'https://router.project-osrm.org/route/v1/driving/80.9462,26.8467;80.9168,26.8550;80.9050,26.8450;80.9300,26.8200;81.0049,26.8085?overview=full&geometries=geojson',
    color: '#EF4444', aqi: 248, duration: '45 min',
  },
  {
    name: 'Route B (Gomti Nagar)',
    osrmUrl: 'https://router.project-osrm.org/route/v1/driving/80.9462,26.8467;80.9750,26.8500;81.0049,26.8085?overview=full&geometries=geojson',
    color: '#22C55E', aqi: 89, duration: '32 min',
  },
  {
    name: 'Route C (Faizabad Rd)',
    osrmUrl: 'https://router.project-osrm.org/route/v1/driving/80.9462,26.8467;80.9600,26.8700;80.9900,26.8650;81.0200,26.8400;81.0049,26.8085?overview=full&geometries=geojson',
    color: '#F97316', aqi: 195, duration: '41 min',
  },
];

const AQI_ZONES = [
  { center: [26.855, 80.92] as [number, number], aqi: 280, radius: 600 },
  { center: [26.84, 80.95] as [number, number], aqi: 180, radius: 500 },
  { center: [26.85, 80.975] as [number, number], aqi: 60, radius: 700 },
  { center: [26.835, 81.0] as [number, number], aqi: 120, radius: 550 },
  { center: [26.82, 80.97] as [number, number], aqi: 220, radius: 450 },
  { center: [26.86, 80.99] as [number, number], aqi: 95, radius: 500 },
  { center: [26.81, 81.005] as [number, number], aqi: 160, radius: 400 },
];

const getAqiColor = (aqi: number) => {
  if (aqi < 100) return '#22C55E';
  if (aqi < 200) return '#F97316';
  return '#EF4444';
};

interface DashboardRoute {
  name: string;
  positions: [number, number][];
  color: string;
  aqi: number;
  duration: string;
  distance: string;
}

const MovingMarker = ({ positions, color }: { positions: [number, number][]; color: string }) => {
  const map = useMap();
  const markerRef = useRef<L.CircleMarker | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    if (positions.length === 0) return;
    const marker = L.circleMarker(positions[0], {
      radius: 5, fillColor: color, color: '#fff', weight: 2, fillOpacity: 1,
    }).addTo(map);
    markerRef.current = marker;
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % positions.length;
      marker.setLatLng(positions[indexRef.current]);
    }, 80);
    return () => { clearInterval(interval); marker.remove(); };
  }, [positions, color, map]);

  return null;
};

const DashboardMockup = () => {
  const [routes, setRoutes] = useState<DashboardRoute[]>([]);
  const [selectedRoute, setSelectedRoute] = useState(1);

  useEffect(() => {
    const fetchRoutes = async () => {
      const results: DashboardRoute[] = [];
      for (const config of DASHBOARD_ROUTES) {
        try {
          const res = await fetch(config.osrmUrl);
          const data = await res.json();
          if (data.routes?.[0]) {
            const coords: [number, number][] = data.routes[0].geometry.coordinates.map(
              ([lng, lat]: [number, number]) => [lat, lng] as [number, number]
            );
            results.push({
              name: config.name, positions: coords, color: config.color,
              aqi: config.aqi, duration: config.duration,
              distance: `${(data.routes[0].distance / 1000).toFixed(1)} km`,
            });
          }
        } catch { /* skip */ }
      }
      if (results.length === 0) {
        results.push({ name: 'Route A', positions: [[26.8467, 80.9462], [26.82, 80.94], [26.8085, 81.0049]], color: '#EF4444', aqi: 248, duration: '45 min', distance: '14 km' });
        results.push({ name: 'Route B', positions: [[26.8467, 80.9462], [26.855, 80.975], [26.8085, 81.0049]], color: '#22C55E', aqi: 89, duration: '32 min', distance: '11 km' });
        results.push({ name: 'Route C', positions: [[26.8467, 80.9462], [26.87, 80.99], [26.8085, 81.0049]], color: '#F97316', aqi: 195, duration: '41 min', distance: '13 km' });
      }
      setRoutes(results);
    };
    fetchRoutes();
  }, []);

  const sidebarNav = [
    { icon: Home, label: 'Home', active: true },
    { icon: MapPin, label: 'Saved Routes' },
    { icon: Activity, label: 'Health Stats' },
    { icon: Map, label: 'Air Map' },
  ];

  const modes = [
    { icon: Footprints, label: 'Walk' },
    { icon: Bike, label: 'Cycle' },
    { icon: Car, label: 'Auto / Car' },
  ];

  const stats = [
    { icon: Wind, label: 'Avg AQI Today', value: '142', badge: 'Poor', badgeColor: 'text-red-500 bg-red-100/50' },
    { icon: ShieldCheck, label: 'Safe Routes', value: '3', badge: 'Found', badgeColor: 'text-green-600 bg-green-100/50' },
    { icon: AlertTriangle, label: 'Toxic Zones', value: '5', badge: 'Near you', badgeColor: 'text-red-500 bg-red-100/50' },
    { icon: HeartPulse, label: 'Hours Saved', value: '12hrs', badge: 'Clean air', badgeColor: 'text-green-600 bg-green-100/50' },
  ];

  const actions = [
    { icon: Navigation, label: 'Route A' },
    { icon: Navigation, label: 'Route B' },
    { icon: Navigation, label: 'Route C' },
    { icon: AlertOctagon, label: 'Report Dust' },
    { icon: WifiOff, label: 'Offline Mode' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div
      className="w-full max-w-[1300px] bg-[#FDFBF9] rounded-t-[32px] shadow-2xl border border-white/60 overflow-hidden flex flex-col md:flex-row relative animate-slide-up"
      style={{
        animationDelay: '0.3s',
        boxShadow: '0 50px 100px -20px rgba(50, 50, 93, 0.15), 0 30px 60px -30px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-slate-100 p-6 bg-white/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-8 px-2">
          <svg width="24" height="21" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 24c-3.5 0-6-2.5-6-5.5S2.5 13 6 12c0.5-4 3.5-7 8-7 3 0 5.5 1.5 7 4C22 8.5 23 8 24.5 8c3.5 0 6 2.8 6 6 0 0.4 0 0.8-0.1 1.1C32.5 16 34 18 34 20.5c0 2.8-2.2 5-5 5H6z" fill="white" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M12 11L17.5 24L23 11" stroke="#1A1A1A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-lg font-bold text-slate-900 font-nunito">Vayu AI</span>
          <div className="ml-auto">
            <ArrowLeftCircle className="w-5 h-5 text-slate-400 stroke-[1.5]" />
          </div>
        </div>

        <nav className="space-y-1 mb-8">
          {sidebarNav.map((item) => (
            <a
              key={item.label}
              href="#"
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium text-sm ${
                item.active
                  ? 'bg-[#EAE5DC] text-slate-900'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors'
              }`}
            >
              <item.icon className="w-4 h-4 stroke-[1.5]" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto">
          <p className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Modes</p>
          <nav className="space-y-1">
            {modes.map((item) => (
              <a
                key={item.label}
                href="#"
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm"
              >
                <item.icon className="w-4 h-4 stroke-[1.5]" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 md:p-8 bg-[#FDFBF9] p-6 max-h-[70vh] md:max-h-none overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900 font-nunito">Hello, Traveler</h2>
            <p className="text-sm text-slate-500 mt-0.5">Where are we going today?</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 stroke-[1.5]" />
              <input
                type="text"
                placeholder="From: Polytechnic Chauraha, Lucknow"
                defaultValue="To: Shri Ramswaroop Memorial University"
                className="pl-10 pr-4 py-2 bg-white border border-slate-100 rounded-full text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 w-80 shadow-sm text-slate-600"
              />
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <button className="hover:text-slate-900 transition">
                <Bell className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>

            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <span className="font-mono text-sm font-medium text-slate-700">LIVE AQI</span>
              <button className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg hover:scale-105 transition">
                <span className="text-[10px] font-bold">218</span>
              </button>
            </div>
          </div>
        </header>

        {/* Live Map */}
        <div className="w-full h-64 rounded-xl overflow-hidden mb-8 border border-slate-100 shadow-sm relative">
          <MapContainer
            center={[26.8300, 80.9750]}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom={false}
            dragging={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* AQI Heatmap zones */}
            {AQI_ZONES.map((zone, i) => (
              <Circle
                key={i}
                center={zone.center}
                radius={zone.radius}
                fillColor={getAqiColor(zone.aqi)}
                fillOpacity={0.25}
                stroke={false}
              />
            ))}

            {/* All 3 color-coded routes */}
            {routes.map((route, i) => (
              <Polyline
                key={route.name}
                positions={route.positions}
                color={route.color}
                weight={i === selectedRoute ? 6 : 4}
                opacity={i === selectedRoute ? 1 : 0.8}
              />
            ))}

            {/* Moving vehicle simulation */}
            {routes.map((route) => (
              <MovingMarker key={`mv-${route.name}`} positions={route.positions} color={route.color} />
            ))}

            {/* Start & End markers */}
            {routes.length > 0 && (
              <>
                <Marker position={[26.8467, 80.9462]} icon={startIcon}>
                  <Tooltip permanent direction="top" offset={[0, -42]} className="!bg-white !border-slate-200 !text-[9px] !font-bold !text-slate-800 !rounded-lg !shadow-lg !px-1.5 !py-0.5">
                    Start
                  </Tooltip>
                </Marker>
                <Marker position={[26.8085, 81.0049]} icon={endIcon}>
                  <Tooltip permanent direction="top" offset={[0, -42]} className="!bg-white !border-slate-200 !text-[9px] !font-bold !text-slate-800 !rounded-lg !shadow-lg !px-1.5 !py-0.5">
                    SRMU
                  </Tooltip>
                </Marker>
              </>
            )}
          </MapContainer>

          {/* Route legend */}
          <div className="absolute bottom-2 left-2 z-[1000] flex gap-1.5">
            {routes.map((route, i) => (
              <button
                key={route.name}
                onClick={() => setSelectedRoute(i)}
                className={`rounded-lg px-2 py-1 text-left transition-all shadow backdrop-blur-sm ${
                  i === selectedRoute ? 'bg-white/95 ring-1' : 'bg-white/75'
                }`}
                style={{ '--tw-ring-color': route.color } as React.CSSProperties}
              >
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: route.color }} />
                  <span className="text-[8px] font-bold text-slate-700">{route.duration}</span>
                </div>
                <span className="text-[7px] font-bold px-1 rounded-full" style={{
                  backgroundColor: route.aqi < 100 ? '#DCFCE7' : route.aqi < 200 ? '#FEF3C7' : '#FEE2E2',
                  color: route.aqi < 100 ? '#166534' : route.aqi < 200 ? '#92400E' : '#991B1B',
                }}>AQI {route.aqi}</span>
              </button>
            ))}
          </div>

          <div className="absolute top-2 left-2 z-[1000] bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md text-[10px] font-bold text-slate-700">
            Polytechnic → SRMU
          </div>
          <div className="absolute top-2 right-2 z-[1000] bg-red-500 text-white text-[8px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            LIVE
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-[#F6F4F0] p-5 rounded-xl border border-transparent hover:border-slate-200 transition-colors">
              <div className="flex items-center gap-2 text-slate-500 mb-6">
                <div className="p-1.5 bg-white rounded-md shadow-sm">
                  <stat.icon className="w-4 h-4 text-slate-700 stroke-[1.5]" />
                </div>
                <span className="text-xs font-semibold">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold font-nunito text-slate-900">{stat.value}</span>
                <span className={`text-[11px] font-bold ${stat.badgeColor} px-1.5 py-0.5 rounded`}>{stat.badge}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {actions.map((action) => (
            <div
              key={action.label}
              className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col items-start justify-center gap-3 hover:border-slate-300 transition-colors cursor-pointer group"
            >
              <div className="p-2 bg-[#F6F4F0] rounded-lg group-hover:bg-[#EAE5DC] transition-colors">
                <action.icon className="w-5 h-5 text-slate-700 stroke-[1.5]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700">{action.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
