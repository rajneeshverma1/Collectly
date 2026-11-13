'use client';

import React from 'react';
import { 
  FileText, 
  Globe, 
  Send, 
  RefreshCw, 
  BarChart3, 
  Mic, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

export default function ParadevFeatures() {
  return (
    <section className="py-20 sm:py-28 bg-[#090a0b]" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-3">
            Core Features
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            Unlock effortless revenue management for your startup
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground font-light">
            Stop chasing invoices. Simplify your complex workflows with AI billing from start to finish.
          </p>
        </div>

        {/* Feature Bento Grid (Paradev 7-card layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

          {/* 1. Automate Billing from Invoice to Payment (7 Cols) */}
          <div className="lg:col-span-7 rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-colors">
            <div>
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4">
                <Layers className="size-4" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                Automate Billing from Invoice to Payment
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                Create, send, and track invoices automatically with custom pricing models, scheduled billing cycles, and real-time payment tracking — zero manual work.
              </p>
            </div>

            {/* Micro-UI Row */}
            <div className="mt-6 rounded-lg border border-[#232529] bg-[#090a0b] p-3 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-muted-foreground text-[11px] pb-2 border-b border-[#232529]">
                <span>INVOICE ENGINE</span>
                <span className="text-emerald-400">STATUS: AUTO-TRACKED</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-foreground">INV-0089 (Linear Sprint 4)</span>
                <span className="text-emerald-400 font-semibold">$18,400.00 · Settled</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">INV-0042 (Vercel Monthly)</span>
                <span className="text-brand font-semibold">$14,000.00 · Escalated</span>
              </div>
            </div>
          </div>

          {/* 2. Collections on Autopilot (5 Cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-colors">
            <div>
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4">
                <Send className="size-4" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                Collections on Autopilot
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                Automated payment reminders and escalation sequences that adapt to customer behavior, so your team stops chasing invoices and gets paid faster.
              </p>
            </div>

            <div className="mt-6 p-3 rounded bg-[#090a0b] border border-[#232529] font-mono text-xs space-y-1">
              <div className="flex justify-between text-emerald-400 text-[11px] font-semibold">
                <span>✓ 87% collection rate</span>
                <span>$284K collected this month</span>
              </div>
              <div className="text-muted-foreground text-[10px]">
                Escalation sequence: Day 1, Day 7, Day 14, Day 30
              </div>
            </div>
          </div>

          {/* 3. Payment Reconciliation (5 Cols) */}
          <div className="lg:col-span-5 rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-colors">
            <div>
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4">
                <RefreshCw className="size-4" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                Payment Reconciliation
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                Automatically match payments from Stripe, bank accounts, and QuickBooks to invoices across multiple sources. No more manual reconciliation.
              </p>
            </div>

            <div className="mt-6 p-3 rounded bg-[#090a0b] border border-[#232529] font-mono text-[11px] space-y-1.5">
              <div className="text-emerald-400">✓ Stripe + Mercury + QuickBooks synced</div>
              <div className="text-muted-foreground">0 unmatched transactions found</div>
            </div>
          </div>

          {/* 4. Real-time Revenue & Cash Flow (7 Cols) */}
          <div className="lg:col-span-7 rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-colors">
            <div>
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4">
                <BarChart3 className="size-4" />
              </div>
              <h3 className="text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                Real-time Revenue & Cash Flow
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                Track collected vs outstanding payments, monitor revenue trends by month, and identify payment gaps instantly with live dashboards.
              </p>
            </div>

            <div className="mt-6 rounded-lg border border-[#232529] bg-[#090a0b] p-4 font-mono text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#232529]">
                <span className="text-muted-foreground">Revenue by Month</span>
                <span className="text-emerald-400 font-bold">$284K Collected</span>
              </div>
              <div className="pt-2 flex justify-between text-[11px] text-muted-foreground">
                <span>Collected (35%) $184k</span>
                <span>With AI (30%) $100k</span>
                <span>Pending (35%) $156k</span>
              </div>
            </div>
          </div>

          {/* 5. AI Contract Extraction (4 Cols) */}
          <div className="lg:col-span-4 rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-colors">
            <div>
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4">
                <FileText className="size-4" />
              </div>
              <h3 className="text-xl font-medium text-foreground tracking-tight">
                AI Contract Extraction
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                Upload contracts and our AI automatically extracts billing terms, payment schedules, and line items directly from PDF documents.
              </p>
            </div>

            <div className="mt-4 p-3 rounded bg-[#090a0b] border border-[#232529] font-mono text-[11px] text-muted-foreground flex justify-between items-center">
              <span>contract-scope.pdf</span>
              <span className="text-brand">Extracting terms...</span>
            </div>
          </div>

          {/* 6. Multi-Currency Support (4 Cols) */}
          <div className="lg:col-span-4 rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-colors">
            <div>
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4">
                <Globe className="size-4" />
              </div>
              <h3 className="text-xl font-medium text-foreground tracking-tight">
                Multi-Currency Support
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                Bill customers in their preferred currency with support for all major global currencies automatically: USD, EUR, GBP, and CAD.
              </p>
            </div>

            <div className="mt-4 p-3 rounded bg-[#090a0b] border border-[#232529] font-mono text-[11px] flex justify-between text-muted-foreground">
              <span className="text-foreground">USD · EUR · GBP · CAD</span>
              <span className="text-emerald-400">Live Rates</span>
            </div>
          </div>

          {/* 7. Fully Configurable (4 Cols) */}
          <div className="lg:col-span-4 rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8 flex flex-col justify-between hover:border-brand/40 transition-colors" id="configurable">
            <div>
              <div className="size-8 rounded-[2px] bg-brand/10 border border-brand/30 flex items-center justify-center text-brand mb-4">
                <Mic className="size-4" />
              </div>
              <h3 className="text-xl font-medium text-foreground tracking-tight">
                Your Brand, Your Voice
              </h3>
              <p className="mt-2 text-sm text-muted-foreground font-light leading-relaxed">
                Configure every detail of the payment experience so it feels like a seamless part of your brand: custom voice personality, custom messaging, and multi-language support.
              </p>
            </div>

            <div className="mt-4 p-3 rounded bg-[#090a0b] border border-[#232529] font-mono text-[11px] flex justify-between text-muted-foreground">
              <span>Tone, Pacing, Scripts</span>
              <span className="text-brand">100% Configurable</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
