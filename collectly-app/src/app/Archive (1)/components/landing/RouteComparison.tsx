import { Search, ChevronDown, Wind, BarChart3, CircleDot, Factory } from 'lucide-react';

const routes = [
  { name: 'Route A · Via Charbagh', status: 'Avoid', statusColor: 'bg-red-50 border-red-100 text-red-700', dotColor: 'bg-red-500', barColor: 'bg-red-500', score: '28/100', scoreColor: 'text-red-600', time: '22 min' },
  { name: 'Route B · Via Hazratganj', status: 'Moderate', statusColor: 'bg-yellow-50 border-yellow-100 text-yellow-700', dotColor: 'bg-yellow-500', barColor: 'bg-[#FBBF24]', score: '54/100', scoreColor: 'text-yellow-600', time: '26 min' },
  { name: 'Route C · Via Riverfront', status: 'Cleanest', statusColor: 'bg-green-50 border-green-100 text-green-700', dotColor: 'bg-green-500', barColor: 'bg-green-500', score: '91/100', scoreColor: 'text-green-600', time: '31 min' },
];

const pills = [
  { icon: Wind, label: 'AQI Along Route' },
  { icon: BarChart3, label: 'Traffic Congestion' },
  { icon: CircleDot, label: 'Construction Zones' },
  { icon: Factory, label: 'Industrial Areas' },
];

const RouteComparison = () => {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 md:px-12 py-24 relative z-10">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Mockup */}
        <div className="w-full lg:w-[55%] relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-[#9AC1EB] via-[#C5DFF7] to-[#EFE6D8] rounded-[40px] transform rotate-1 transition-transform duration-700 group-hover:rotate-0" />
          <div className="md:p-12 transition-transform duration-500 hover:scale-[1.01] bg-gradient-to-br from-[#9AC1EB] via-[#C5DFF7] to-[#EFE6D8] rounded-3xl p-8 relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
            <div className="overflow-hidden font-sans bg-white max-w-lg border-white/60 border rounded-2xl mx-auto shadow-xl">
              {/* Header */}
              <div className="border-slate-100 border-b p-6">
                <h3 className="font-bold text-lg text-slate-900 mb-4 font-nunito">Route Options</h3>
                <div className="flex gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="text" placeholder="From: Polytechnic..." className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all shadow-sm" />
                  </div>
                  <button className="flex items-center gap-2 px-5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                    Options
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="bg-slate-50/60 pb-2">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-slate-900 transition-colors">
                    <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">Suggested</span>
                    <span className="bg-white border border-slate-200 px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-500 shadow-sm">3</span>
                  </div>
                </div>

                <div className="grid grid-cols-[1.8fr_0.8fr_0.5fr_0.6fr] gap-4 px-6 pb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <div>Route</div>
                  <div>Status</div>
                  <div className="text-center">Score</div>
                  <div className="text-right">Time</div>
                </div>

                <div className="bg-white border-t border-slate-100 shadow-sm">
                  {routes.map((route) => (
                    <div key={route.name} className="grid grid-cols-[1.8fr_0.8fr_0.5fr_0.6fr] gap-4 px-6 py-4 items-center border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-default group/row">
                      <div className="flex items-center gap-3">
                        <div className={`w-1 h-8 ${route.barColor} rounded-full opacity-0 group-hover/row:opacity-100 transition-opacity`} />
                        <span className="font-semibold text-[13px] text-slate-900 -ml-4 group-hover/row:ml-0 transition-all">{route.name}</span>
                      </div>
                      <div>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${route.statusColor}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${route.dotColor}`} />
                          {route.status}
                        </span>
                      </div>
                      <div className="flex justify-center">
                        <span className={`text-xs font-bold ${route.scoreColor}`}>{route.score}</span>
                      </div>
                      <div className="flex justify-end">
                        <span className="text-xs font-bold text-slate-600">{route.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-[45%]">
          <span className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4 block font-sans">The Vayu Score</span>
          <h2 className="lg:text-[46px] leading-[1.15] text-4xl font-semibold text-[#1A1A1A] tracking-tight font-nunito mb-6">
            Not just a route. A health decision.
          </h2>
          <p className="leading-relaxed text-lg font-medium text-slate-600 font-sans mb-10">
            Our Health Score is built from four real factors that determine how much pollution you breathe. We prioritize your lungs over saving a few minutes.
          </p>
          <button className="bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[15px] font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-12">
            Find My Clean Route
          </button>
          <div className="grid grid-cols-2 gap-4">
            {pills.map((pill) => (
              <div key={pill.label} className="flex items-center gap-3 px-6 py-4 rounded-2xl border border-slate-100 bg-white/50 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all cursor-default">
                <pill.icon className="w-5 h-5 text-slate-800 stroke-[1.5]" />
                <span className="text-sm font-semibold text-slate-700">{pill.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RouteComparison;
