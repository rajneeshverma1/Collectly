const Footer = () => {
  return (
    <footer className="bg-white/80 backdrop-blur-lg border-t border-slate-200/60 pt-16 pb-8 px-6 mt-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
        <div className="max-w-xs">
          <div className="flex items-center gap-2 mb-6">
            <svg width="32" height="28" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 24c-3.5 0-6-2.5-6-5.5S2.5 13 6 12c0.5-4 3.5-7 8-7 3 0 5.5 1.5 7 4C22 8.5 23 8 24.5 8c3.5 0 6 2.8 6 6 0 0.4 0 0.8-0.1 1.1C32.5 16 34 18 34 20.5c0 2.8-2.2 5-5 5H6z" fill="white" stroke="#1A1A1A" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M12 11L17.5 24L23 11" stroke="#1A1A1A" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold text-slate-900 tracking-tight font-nunito">Vayu AI</span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed font-sans">
            Making clean air navigation accessible to everyone. Built with ❤️ in Lucknow to help you breathe easy.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 font-sans">
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 font-nunito">Product</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-black transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Live Map</a></li>
              <li><a href="#" className="hover:text-black transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Download</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 font-nunito">Company</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-black transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 font-nunito">Legal</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li><a href="#" className="hover:text-black transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-400 font-medium">© 2024 Vayu AI Technologies. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="text-slate-400 hover:text-black transition-colors">
            <span className="sr-only">Twitter</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-12.7 14.6-2.6-2.1-3-5.7-1.7-8.8 6.7 6.9 15.3 4 15.3 4-1.6-2.6-.7-5.5 0-7 0 0-2 .5-3 1.5-2.5-3.5-8-3.5-8-3.5" /></svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-black transition-colors">
            <span className="sr-only">Instagram</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a href="#" className="text-slate-400 hover:text-black transition-colors">
            <span className="sr-only">LinkedIn</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
