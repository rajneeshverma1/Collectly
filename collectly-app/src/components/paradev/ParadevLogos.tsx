'use client';

import React from 'react';

export default function ParadevLogos() {
  const logos = [
    { name: 'Stripe', label: 'STRIPE' },
    { name: 'Vercel', label: 'VERCEL' },
    { name: 'Linear', label: 'LINEAR' },
    { name: 'Supabase', label: 'SUPABASE' },
    { name: 'OpenAI', label: 'OPENAI' },
    { name: 'Mastra', label: 'MASTRA' },
    { name: 'Raycast', label: 'RAYCAST' },
    { name: 'GitHub', label: 'GITHUB' },
  ];

  return (
    <section className="py-12 border-y border-[#232529]/60 bg-[#090a0b]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground/60 mb-8">
          Trusted by builders, design studios, and agencies from
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 opacity-65 hover:opacity-100 transition-opacity">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="font-mono text-sm sm:text-base font-bold tracking-wider text-muted-foreground/80 hover:text-foreground transition-colors cursor-default"
            >
              {logo.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
