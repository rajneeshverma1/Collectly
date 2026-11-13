'use client';

import React from 'react';

export default function CreamLogos() {
  const logos = [
    { name: "Acme Corp", font: "font-serif tracking-widest uppercase font-bold" },
    { name: "LINEAR", font: "font-mono tracking-[0.2em] font-semibold" },
    { name: "RAMP", font: "font-sans tracking-tight font-black" },
    { name: "retool", font: "font-mono tracking-tighter lowercase font-bold" },
    { name: "stripe", font: "font-sans tracking-tight font-bold italic" },
    { name: "framer", font: "font-sans tracking-widest uppercase font-light" },
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#FAF6F0] border-y border-[#E7DFD4]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8C7D70]">
          Trusted by modern agencies, freelancers, and high-growth finance teams
        </p>
        
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
          {logos.map((logo, idx) => (
            <div
              key={idx}
              className={`text-lg sm:text-xl text-[#4A3F35] hover:text-[#1F1914] transition-colors ${logo.font}`}
            >
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

