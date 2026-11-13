'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CreamDashboardCard from './CreamDashboardCard';

export default function CreamHero() {
  return (
    <section className="relative min-h-screen pt-32 sm:pt-40 pb-20 overflow-hidden flex flex-col items-center justify-start text-center bg-[#FAF6F0]">
      
      {/* ── Background: Only the user-provided Landscape Painting (40% of actual image, anchored from the bottom) ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[480px] sm:h-[580px] md:h-[660px] z-0 pointer-events-none overflow-hidden"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url("/hero-painting-40-feathered.jpg")',
            backgroundSize: '100% 100%',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to top, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 70%, transparent 100%)',
            opacity: 0.95
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom feathering gradient to melt seamlessly into cream background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-36 z-0 pointer-events-none bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/80 to-transparent"
        aria-hidden="true"
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#1F1914] max-w-4xl mx-auto leading-[1.08]">
          Ask your billing anything.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl font-normal text-[#5A4E44] max-w-2xl mx-auto leading-relaxed">
          Track everything. Uncover missed opportunities. Get more from your money.
        </p>

        {/* CTA Button */}
        <div className="mt-8 sm:mt-9 flex flex-col items-center gap-2">
          <Link
            href="/auth"
            className="group bg-gradient-to-b from-[#C46B1F] to-[#A35514] hover:from-[#B8621B] hover:to-[#924A0F] active:scale-[0.98] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_20px_rgba(163,85,20,0.35)] hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <span>Start free trial</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="text-xs text-[#7A6D63]">
            14 days free. Cancel anytime.
          </span>
        </div>

        {/* ── Centerpiece: Interactive Floating Cream Dashboard Card ── */}
        <div className="w-full mt-12 sm:mt-16 relative">
          <CreamDashboardCard />
        </div>

      </div>

    </section>
  );
}
