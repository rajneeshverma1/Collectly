import { AlertTriangle, FileText, Globe, Shield } from 'lucide-react';
import LiveAirMap from './LiveAirMapWrapper';

const pills = [
  { icon: AlertTriangle, label: 'Live Alerts' },
  { icon: FileText, label: 'CPCB Data' },
  { icon: Globe, label: 'Hotspots' },
  { icon: Shield, label: 'Green Belts' },
];

const AirMapFeature = () => {
  return (
    <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-24 mt-32">
      {/* Content */}
      <div className="w-full lg:w-[45%]">
        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4 block font-sans">Lucknow Air Map</span>
        <h2 className="lg:text-[46px] leading-[1.15] text-4xl font-semibold text-[#1A1A1A] tracking-tight font-nunito mb-6">
          Know before you go.
        </h2>
        <p className="text-lg text-slate-600 font-medium mb-10 leading-relaxed font-sans">
          These zones are Lucknow's worst air corridors — updated daily from CPCB stations and citizen reports. Avoid Charbagh and Talkatora during peak hours.
        </p>
        <button className="bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-[15px] font-semibold hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-12">
          Explore Air Map
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

      {/* Live Map */}
      <div className="w-full lg:w-[55%] relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-[#9AC1EB] via-[#C5DFF7] to-[#EFE6D8] rounded-[40px] transform -rotate-1 transition-transform duration-700 group-hover:rotate-0" />
        <div className="md:p-12 transition-transform duration-500 hover:scale-[1.01] bg-gradient-to-br from-[#9AC1EB] via-[#C5DFF7] to-[#EFE6D8] rounded-3xl p-8 relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]">
          <div className="font-sans bg-white border-white/60 border rounded-2xl mx-auto shadow-xl overflow-hidden">
            <LiveAirMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirMapFeature;
