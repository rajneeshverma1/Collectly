'use client';

import React from 'react';
import { Search, Command, Bell } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="h-20 border-b border-white/[0.05] flex items-center justify-between px-10 bg-black/20 backdrop-blur-2xl sticky top-0 z-20">
      <div className="relative w-[400px] group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search anything..." 
          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-2.5 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/20 hover:bg-white/[0.05]"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg border border-white/10 bg-white/5 text-[10px] text-white/30 font-black group-focus-within:text-white group-focus-within:border-white/20 transition-all">
          <Command size={10} /> K
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-300">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-[#ffffff] bg-neutral-800 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform cursor-pointer">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-[#ffffff] bg-white/5 flex items-center justify-center text-[10px] font-bold hover:scale-110 transition-transform cursor-pointer">
            +12
          </div>
        </div>
        <div className="h-8 w-px bg-white/10 mx-2" />
        <div className="relative cursor-pointer group">
          <div className="w-11 h-11 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white/[0.08] transition-all">
            <Bell size={20} className="text-white/60 group-hover:text-white transition-colors" />
          </div>
          <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-[#ffffff]"></div>
        </div>
      </div>
    </header>
  );
}
