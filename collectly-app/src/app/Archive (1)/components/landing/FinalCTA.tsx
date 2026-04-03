import { Smartphone, Map } from 'lucide-react';

const FinalCTA = () => {
  return (
    <div className="w-full bg-[#1A1A1A] rounded-[32px] p-8 md:p-16 text-center relative overflow-hidden group shadow-2xl mt-16">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-blue-500/30 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-colors duration-700" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-green-500/30 rounded-full blur-3xl group-hover:bg-green-400/30 transition-colors duration-700" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="md:text-5xl text-3xl font-bold text-white font-nunito mb-6 tracking-tight">
          Ready to change how you move?
        </h2>
        <p className="text-lg text-slate-300 mb-10 font-sans font-medium">
          Join 10,000+ Lucknow citizens saving their lungs one trip at a time. Available now on Android and iOS.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="/app" className="w-full sm:w-auto">
            <button className="bg-white text-[#1A1A1A] px-8 py-4 rounded-full font-bold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 w-full flex items-center justify-center gap-2">
              <Smartphone className="w-5 h-5" />
              Launch App
            </button>
          </a>
          <a href="/app" className="w-full sm:w-auto">
            <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all w-full flex items-center justify-center gap-2">
              <Map className="w-5 h-5" />
              View Web Map
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default FinalCTA;
