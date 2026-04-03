const Navbar = () => {
  return (
    <nav className="w-full px-6 py-6 md:px-12 flex items-center justify-between max-w-7xl mx-auto animate-fade-in">
      <div className="flex items-center gap-2.5">
        <svg width="48" height="42" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloud shape */}
          <path d="M6 24c-3.5 0-6-2.5-6-5.5S2.5 13 6 12c0.5-4 3.5-7 8-7 3 0 5.5 1.5 7 4C22 8.5 23 8 24.5 8c3.5 0 6 2.8 6 6 0 0.4 0 0.8-0.1 1.1C32.5 16 34 18 34 20.5c0 2.8-2.2 5-5 5H6z" fill="white" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
          {/* V letter */}
          <path d="M12 11L17.5 24L23 11" stroke="#1A1A1A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className="text-xl font-bold text-slate-900 tracking-tight font-nunito">Vayu AI</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-700">
        <a href="#" className="hover:text-black transition-colors">Features</a>
        <a href="#" className="hover:text-black transition-colors">How It Works</a>
        <a href="#" className="hover:text-black transition-colors">Live Demo</a>
        <a href="#" className="hover:text-black transition-colors">About</a>
      </div>

      <div>
        <a href="/app">
          <button className="bg-[#1A1A1A] text-white text-[15px] font-medium px-6 py-2.5 rounded-full hover:bg-black transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            Try Free
          </button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
