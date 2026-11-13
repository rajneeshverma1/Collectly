'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Smartphone, Landmark } from 'lucide-react';
import CreamDashboardCard from './CreamDashboardCard';

export default function CreamHero() {
  return (
    <section className="relative min-h-screen pt-32 sm:pt-40 pb-20 overflow-hidden flex flex-col items-center justify-start text-center">
      
      {/* ── Top Background: Warm Golden-Hour Sunset Room & Window ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'url("/hero-bg-faded.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center 15%',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />

      {/* Ambient warm lighting overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 15%, rgba(255, 230, 200, 0.18) 0%, rgba(200, 101, 36, 0.08) 40%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      {/* ── Bottom Layer: Exactly 40% of the actual Landscape Painting anchored from the bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[420px] sm:h-[500px] md:h-[600px] z-0 pointer-events-none overflow-hidden"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url("/hero-painting-40-feathered.jpg")',
            backgroundSize: '100% 100%',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to top, black 0%, black 65%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 65%, transparent 100%)',
            opacity: 0.92
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom feathering gradient to melt seamlessly into cream background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-48 z-0 pointer-events-none bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/80 to-transparent"
        aria-hidden="true"
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-white drop-shadow-[0_2px_18px_rgba(0,0,0,0.35)] max-w-4xl mx-auto leading-[1.08]">
          Ask your billing anything.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl font-normal text-white/90 drop-shadow-[0_1px_8px_rgba(0,0,0,0.3)] max-w-2xl mx-auto leading-relaxed">
          Track everything. Uncover missed opportunities. Get more from your money.
        </p>

        {/* 3 Translucent Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium shadow-sm">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 on Trustpilot</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium shadow-sm">
            <Smartphone className="size-3.5 text-white/90" />
            <span>iPhone, iPad and web</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/95 text-xs font-medium shadow-sm">
            <Landmark className="size-3.5 text-white/90" />
            <span>Works with 12,000+ banks</span>
          </div>

        </div>

        {/* CTA Button */}
        <div className="mt-7 sm:mt-8 flex flex-col items-center gap-2">
          <Link
            href="/auth"
            className="group bg-[#FAF6F0] hover:bg-white text-[#1F1914] px-7 py-3 rounded-full text-sm font-medium tracking-tight shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
          >
            <span>Start free trial</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <span className="text-xs text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.3)]">
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
