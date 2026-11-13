'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Smartphone, Landmark } from 'lucide-react';
import CreamDashboardCard from './CreamDashboardCard';

export default function CreamHero() {
  return (
    <section className="relative min-h-screen pt-32 sm:pt-40 pb-20 overflow-hidden flex flex-col items-center justify-start text-center">
      
      {/* ── Background: Landscape painting (Top 30% visible only, bottom 70% hidden & faded to cream) ── */}
      <div
        className="absolute top-0 left-0 right-0 h-[520px] sm:h-[620px] lg:h-[720px] z-0 pointer-events-none overflow-hidden"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url("/hero-painting-faded.jpg")',
            backgroundSize: '100% auto',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 88%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 88%)',
            opacity: 0.95
          }}
          aria-hidden="true"
        />
      </div>

      {/* Subtle ambient warm lighting overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 12%, rgba(255, 245, 230, 0.35) 0%, rgba(200, 101, 36, 0.04) 45%, transparent 75%)'
        }}
        aria-hidden="true"
      />

      {/* Bottom feathering gradient to melt seamlessly into cream background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-96 z-0 pointer-events-none bg-gradient-to-t from-[#FAF6F0] via-[#FAF6F0]/90 to-transparent"
        aria-hidden="true"
      />

      {/* ── Hero Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight text-[#1F1914] max-w-4xl mx-auto leading-[1.08] drop-shadow-[0_1px_2px_rgba(255,255,255,0.8)]">
          Ask your billing anything.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl font-normal text-[#5A4E44] max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]">
          Track everything. Uncover missed opportunities. Get more from your money.
        </p>

        {/* 3 Translucent Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-6 sm:mt-8">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#E7DFD4] text-[#2C241D] text-xs font-medium shadow-sm">
            <Star className="size-3.5 fill-amber-500 text-amber-500" />
            <span>4.9 on Trustpilot</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#E7DFD4] text-[#2C241D] text-xs font-medium shadow-sm">
            <Smartphone className="size-3.5 text-[#5A4E44]" />
            <span>iPhone, iPad and web</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-[#E7DFD4] text-[#2C241D] text-xs font-medium shadow-sm">
            <Landmark className="size-3.5 text-[#5A4E44]" />
            <span>Works with 12,000+ banks</span>
          </div>

        </div>

        {/* CTA Button */}
        <div className="mt-7 sm:mt-8 flex flex-col items-center gap-2">
          <Link
            href="/auth"
            className="group bg-gradient-to-b from-[#C46B1F] to-[#A35514] hover:from-[#B8621B] hover:to-[#924A0F] active:scale-[0.98] text-white px-8 py-3 rounded-full text-sm font-medium tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_6px_20px_rgba(163,85,20,0.35)] hover:scale-[1.02] transition-all flex items-center gap-2"
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
