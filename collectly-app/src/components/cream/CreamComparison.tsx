'use client';

import React from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CreamComparison() {
  return (
    <section id="compare" className="py-24 sm:py-32 bg-[#F5EFEB] border-y border-[#E7DFD4]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DDD0] text-xs font-semibold text-[#8C7D70] uppercase tracking-wider mb-4">
            <span>Direct Comparison</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1F1914] leading-[1.15]">
            Stop doing manual billing gymnastics.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#65594E]">
            Here is what changes the day your team switches to Collectly.
          </p>
        </div>

        {/* 2-Column Comparison Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Card 1: Traditional Way */}
          <div className="bg-white/80 rounded-3xl p-7 sm:p-9 border border-[#E7DFD4] shadow-sm flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-red-600 uppercase tracking-wider mb-4">
                <span className="size-2 rounded-full bg-red-500" />
                <span>The Traditional Way</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1F1914] tracking-tight">
                Chasing, waiting, and spreadsheet dread
              </h3>
              
              <ul className="mt-6 space-y-4 text-sm text-[#65594E]">
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="size-3.5" />
                  </div>
                  <span>Writing awkward reminder emails manually every Monday morning.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="size-3.5" />
                  </div>
                  <span>Scattered checks, bank wires, and missed invoices slipping through the cracks.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="size-3.5" />
                  </div>
                  <span>Clients claiming they never received the invoice or billing email.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="size-3.5" />
                  </div>
                  <span>Days Sales Outstanding (DSO) averaging 45+ days.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#F0E8DD] text-xs text-[#8C7D70]">
              Result: 12+ lost hours every month and unpredictable cashflow.
            </div>
          </div>

          {/* Card 2: The Collectly Way */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border-2 border-[#C86524] shadow-lg shadow-[#C86524]/5 flex flex-col justify-between relative overflow-hidden">
            
            <div className="absolute top-0 right-0 bg-[#C86524] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
              Recommended
            </div>

            <div>
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#C86524] uppercase tracking-wider mb-4">
                <span className="size-2 rounded-full bg-[#C86524]" />
                <span>The Collectly Way</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1F1914] tracking-tight">
                Hands-off automation that gets you paid 3x faster
              </h3>
              
              <ul className="mt-6 space-y-4 text-sm text-[#3E342B]">
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5" />
                  </div>
                  <span>Automated 3-stage reminder tunnel: Dispatches before, on, and after due dates.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5" />
                  </div>
                  <span>Direct payment links for Apple Pay, Stripe, Razorpay & Bank Transfers in 1 click.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5" />
                  </div>
                  <span>Full SMTP delivery timeline proves exactly when client received and opened emails.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5" />
                  </div>
                  <span>Reminders instantly silence the second a checkout completes.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 pt-6 border-t border-[#F0E8DD] flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-700">
                Average collection time: Under 9 days.
              </span>
              <Link
                href="/auth"
                className="text-xs font-semibold text-[#C86524] hover:text-[#B35519] flex items-center gap-1"
              >
                <span>Get Started</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

