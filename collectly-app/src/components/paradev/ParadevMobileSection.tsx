'use client';

import React from 'react';
import Link from 'next/link';
import { Smartphone, Check, ArrowRight, Bell, Shield, ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ParadevMobileSection() {
  return (
    <section className="relative py-20 sm:py-28 border-t border-[#232529]/70 bg-[#090a0b]" id="mobile">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            Start work from anywhere
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground font-light">
            Run your collection agents from your phone. Approve reminder drafts, inspect live bank diffs, and watch invoices settle without sitting at your desk.
          </p>
        </div>

        {/* Mobile Mockup & Highlights Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[300px] sm:w-[320px] rounded-[36px] border-4 border-[#232529] bg-[#111214] p-3 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9)] relative overflow-hidden">
              
              {/* Dynamic Island / Notch */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20"></div>

              {/* Screen Area */}
              <div className="rounded-[28px] bg-[#090a0b] p-4 text-foreground font-mono min-h-[540px] flex flex-col justify-between pt-7">
                
                {/* Status Bar */}
                <div className="flex justify-between items-center text-[10px] text-muted-foreground px-1 pb-3 border-b border-[#232529]/60">
                  <span>9:41</span>
                  <span className="text-brand">Collectly iOS</span>
                  <span>5G 100%</span>
                </div>

                {/* Account Header */}
                <div className="mt-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase">ACME DESIGN CO.</div>
                      <div className="text-sm font-semibold text-foreground">Live Receivables</div>
                    </div>
                    <span className="text-xs bg-brand/10 text-brand px-2 py-0.5 rounded-[2px] border border-brand/30">
                      3 Active
                    </span>
                  </div>

                  <div className="mt-3 p-2.5 rounded border border-[#232529] bg-[#111214]">
                    <div className="text-[10px] text-muted-foreground">TOTAL IN FLIGHT</div>
                    <div className="text-xl font-bold text-foreground mt-0.5">$41,650.00</div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">● 2 paid today (+$27,650)</div>
                  </div>
                </div>

                {/* Invoices List on Phone */}
                <div className="mt-3 space-y-2 flex-1">
                  <div className="p-2 rounded bg-[#111214] border border-[#232529] text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Linear Retainer</span>
                      <span className="text-emerald-400 font-bold">+$18,400</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>INV-2026-089</span>
                      <span className="text-emerald-400">Settled via ACH</span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-[#111214] border border-[#232529] text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Vercel Contract</span>
                      <span className="text-amber-400 font-bold">+$14,000</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>INV-2026-042</span>
                      <span className="text-brand-light">⠋ Autopilot chaser sent</span>
                    </div>
                  </div>

                  <div className="p-2 rounded bg-[#111214] border border-[#232529] text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-foreground">Supabase Dev</span>
                      <span className="text-emerald-400 font-bold">+$9,250</span>
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                      <span>INV-2026-031</span>
                      <span className="text-muted-foreground">Paid via Stripe</span>
                    </div>
                  </div>
                </div>

                {/* Instant Push Notification Simulation */}
                <div className="mt-3 p-2.5 rounded bg-brand/10 border border-brand/40 text-[11px]">
                  <div className="flex items-center gap-1.5 text-brand-light font-bold text-[10px]">
                    <Bell className="size-3" />
                    PUSH ALERT: WIRE CLEARED
                  </div>
                  <div className="text-foreground text-[10px] mt-0.5">
                    $18,400 from Linear settled into Mercury. Ledger automatically reconciled.
                  </div>
                </div>

                {/* Quick Action Button */}
                <button
                  type="button"
                  className="mt-3 w-full py-2 bg-foreground text-background text-xs font-semibold rounded hover:bg-brand hover:text-white transition-colors"
                >
                  Approve Daily Triage (4)
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Features and Value Props */}
          <div className="lg:col-span-7 space-y-6">
            <div className="border border-[#232529] bg-[#111214] p-6 rounded-lg space-y-3">
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
                <Bell className="size-4" />
              </div>
              <h3 className="text-lg font-medium text-foreground">Real-time Payout Webhooks</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Whenever a client pays via Stripe, Razorpay, or direct bank ACH, Collectly immediately silences all scheduled reminder sequences and triggers instant push notifications to your phone.
              </p>
            </div>

            <div className="border border-[#232529] bg-[#111214] p-6 rounded-lg space-y-3">
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
                <Shield className="size-4" />
              </div>
              <h3 className="text-lg font-medium text-foreground">One-Tap Human Approval Gate</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Keep the AI on a leash. Configure Collectly to require your biometric approval on your phone before any late fee is added or aggressive reminder is dispatched to high-value enterprise accounts.
              </p>
            </div>

            <div className="border border-[#232529] bg-[#111214] p-6 rounded-lg space-y-3">
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand">
                <ArrowUpRight className="size-4" />
              </div>
              <h3 className="text-lg font-medium text-foreground">Deep Links to Banking & Gateways</h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Native deep linking directly opens the corresponding payment receipt in your Stripe Dashboard, Mercury app, or Wise portal with a single tap.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
