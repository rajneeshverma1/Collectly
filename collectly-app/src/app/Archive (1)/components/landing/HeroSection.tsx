const HeroSection = () => {
  return (
    <div className="text-center max-w-4xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <h1 className="md:text-[80px] leading-[1] text-6xl font-semibold text-[#1A1A1A] tracking-tight font-nunito mb-8">
        Navigate Lucknow.<br />Breathe Cleaner.
      </h1>
      <p className="md:text-[19px] leading-relaxed text-lg font-medium text-slate-600 font-sans max-w-2xl mr-auto mb-10 ml-auto">
        🌿 India's First Health-First Navigation App. Every route has a health cost. Vayu AI picks the one your lungs can afford.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <a href="/app" className="w-full sm:w-auto">
          <button className="text-[17px] hover:bg-black transition-all hover:shadow-xl hover:-translate-y-0.5 sm:w-auto font-medium text-white bg-[#1A1A1A] w-full rounded-full pt-3.5 pr-8 pb-3.5 pl-8 shadow-lg">
            Find My Clean Route →
          </button>
        </a>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-500">Free · No login needed · Lucknow only (expanding soon)</p>
    </div>);

};

export default HeroSection;