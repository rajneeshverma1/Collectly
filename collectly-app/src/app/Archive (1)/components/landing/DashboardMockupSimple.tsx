"use client";

import {
  Home, MapPin, Activity, Map, ArrowLeftCircle,
  Footprints, Bike, Car, Search, Bell, Wind,
  ShieldCheck, AlertTriangle, HeartPulse, Navigation,
  AlertOctagon, WifiOff, Settings
} from 'lucide-react';

const DashboardMockupSimple = () => {
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
                placeholder="Search location..."
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

        {/* Map Placeholder */}
        <div className="w-full h-64 rounded-xl overflow-hidden mb-8 border border-slate-100 shadow-sm relative bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
          <div className="text-center">
            <Map className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 font-medium">Interactive Map Preview</p>
            <p className="text-sm text-slate-400 mt-2">Click "Try Free" to see live routes</p>
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

export default DashboardMockupSimple;
