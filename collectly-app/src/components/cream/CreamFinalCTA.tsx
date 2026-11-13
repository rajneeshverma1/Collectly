'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function CreamFinalCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* ── Background: 40% Landscape Painting anchored from bottom of landing page ── */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[380px] sm:h-[480px] z-0 pointer-events-none overflow-hidden opacity-30"
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'url("/hero-painting-40-feathered.jpg")',
            backgroundSize: '100% 100%',
            backgroundPosition: 'bottom center',
            backgroundRepeat: 'no-repeat',
            maskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 0%, black 50%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-[#2E251E] via-[#241D17] to-[#1A140F] text-white p-8 sm:p-14 md:p-18 overflow-hidden shadow-2xl">
          
          {/* Subtle warm amber ambient glow inside card */}
          <div 
            className="absolute -top-24 -right-24 size-96 rounded-full bg-[#C86524]/20 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div 
            className="absolute -bottom-24 -left-24 size-96 rounded-full bg-[#E08A3C]/15 blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white/90 uppercase tracking-wider mb-6">
              <Sparkles className="size-3 text-[#E08A3C]" />
              <span>Get Started Today</span>
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
              Ready to collect every invoice effortlessly?
            </h2>

            <p className="mt-5 text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Join modern freelancers and fast-growing agencies who spend zero hours chasing unpaid invoices.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/auth"
                className="bg-[#C86524] hover:bg-[#B35519] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-tight shadow-lg shadow-[#C86524]/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
              >
                <span>Start free trial</span>
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/auth"
                className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-7 py-3.5 rounded-full text-sm font-medium tracking-tight transition-all"
              >
                Schedule Demo
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>14 days free trial</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="size-4 text-emerald-400" />
                <span>Cancel anytime</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
