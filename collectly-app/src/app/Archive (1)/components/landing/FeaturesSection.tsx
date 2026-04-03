import { Heart, Activity, Shield, Clock, Users, Rocket } from 'lucide-react';

const scrollIcons1 = [
  { icon: Heart, color: 'text-red-500' },
  { icon: Activity, color: 'text-blue-600' },
  { icon: Shield, color: 'text-green-500' },
  { icon: Clock, color: 'text-[#5865F2]' },
  { icon: Users, color: 'text-pink-500' },
  { icon: Rocket, color: 'text-orange-500' },
];

const FeaturesSection = () => {
  return (
    <section className="md:px-12 z-10 w-full max-w-7xl mx-auto px-4 py-24 relative">
      <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in">
        <span className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4 block font-sans">Features</span>
        <h2 className="md:text-[56px] leading-[1.1] text-4xl font-semibold text-[#1A1A1A] tracking-tight font-nunito mb-6">
          Built for every Lucknow commuter.
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Card 1: Time-of-Day Smart */}
        <div className="bg-[#F2EBE5] rounded-[32px] p-8 md:p-12 flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group border border-transparent hover:border-slate-200/50">
          <h3 className="md:text-[28px] leading-tight text-2xl font-semibold text-[#1A1A1A] font-nunito max-w-md mb-10">
            Time-of-Day Smart
          </h3>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/50 mb-10 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
            <div className="flex gap-3 overflow-x-auto mb-6 items-center p-2">
              <div className="w-10 h-10 rounded-full bg-[#4A4A4A] flex items-center justify-center text-white shrink-0 cursor-pointer shadow-md ring-2 ring-offset-2 ring-[#4A4A4A]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-500 hover:scale-110 transition-transform cursor-pointer shrink-0" />
              <div className="w-10 h-10 rounded-full bg-yellow-400 hover:scale-110 transition-transform cursor-pointer shrink-0" />
              <div className="w-10 h-10 rounded-full bg-orange-500 hover:scale-110 transition-transform cursor-pointer shrink-0" />
              <div className="w-10 h-10 rounded-full bg-green-500 hover:scale-110 transition-transform cursor-pointer shrink-0" />
              <div className="w-10 h-10 rounded-full bg-blue-500 hover:scale-110 transition-transform cursor-pointer shrink-0" />
              <div className="w-px h-8 bg-slate-200 mx-1" />
              <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                <span className="text-sm font-medium text-slate-700">Auto-avoid peak pollution</span>
                <div className="relative w-11 h-6 bg-green-500 rounded-full cursor-pointer transition-colors shadow-inner">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-transform" />
                </div>
              </div>

              <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-xl p-1.5">
                <button className="w-9 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                </button>
                <button className="w-9 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-slate-800 border border-slate-200/50">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
                </button>
              </div>
            </div>
          </div>

          <p className="text-[17px] leading-relaxed text-slate-600 font-sans">
            Charbagh at 7AM = AQI 240. At 10AM = AQI 156. Vayu knows when to go, not just where. Plan your trips around clean air windows.
          </p>
        </div>

        {/* Card 2: Sensitive Groups */}
        <div className="bg-[#F2EBE5] rounded-[32px] p-8 md:p-12 flex flex-col justify-between hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group border border-transparent hover:border-slate-200/50 relative overflow-hidden">
          <h3 className="md:text-[28px] leading-tight z-10 text-2xl font-semibold text-[#1A1A1A] font-nunito max-w-md mb-10 relative">
            Made for Sensitive Groups
          </h3>

          <div className="flex flex-col gap-6 z-0 h-48 mb-6 relative justify-center overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-[#F2EBE5] to-transparent z-10" />
            <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-[#F2EBE5] to-transparent z-10" />

            {/* Row 1 */}
            <div className="flex gap-4 animate-infinite-scroll-1 w-max">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex gap-4">
                  {scrollIcons1.map((item, i) => (
                    <div key={`${dup}-${i}`} className={`w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center p-3 ${item.color}`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Row 2 */}
            <div className="flex gap-4 animate-infinite-scroll-2 w-max">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex gap-4">
                  {scrollIcons1.map((item, i) => (
                    <div key={`${dup}-${i}`} className={`w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center p-3 ${item.color}`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <p className="text-[17px] leading-relaxed text-slate-600 font-sans mt-8">
            Asthma? COPD? Elderly parents? Vayu specifically routes to minimize PM2.5 exposure, effectively acting as a digital mask for your daily commute.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
