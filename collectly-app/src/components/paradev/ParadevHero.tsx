'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Terminal, 
  Copy, 
  Check, 
  Play, 
  Bell, 
  Clock, 
  Send, 
  Mail, 
  Settings2,
  CheckCircle2, 
  Layers, 
  RefreshCw, 
  PieChart, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function ParadevHero() {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'autopilot' | 'invoices' | 'reconciliation' | 'cashflow'>('autopilot');

  const copyCommand = () => {
    navigator.clipboard.writeText('brew install collectly/tap/collectly');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openFounder = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-founder-modal'));
    }
  };

  return (
    <section className="relative flex flex-col items-center pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-24 overflow-hidden">
      {/* Background radial copper ambient glow (Paradev aesthetic) */}
      <div 
        className="pointer-events-none absolute inset-0 z-0" 
        style={{
          background: 'radial-gradient(ellipse 55% 42% at 50% 18%, rgba(232,128,74,0.12), rgba(232,128,74,0.02) 55%, transparent 78%)'
        }}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          
          {/* Announcement Pill */}
          <Link 
            href="#features" 
            className="group mb-6 sm:mb-8 inline-flex max-w-full items-center gap-2 rounded-[2px] border border-[#232529] bg-[#111214]/90 px-3.5 py-1.5 text-xs font-mono text-muted-foreground transition-colors hover:text-foreground hover:border-brand/40"
          >
            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand animate-pulse"></span>
            <span className="truncate">Collectly v2.4: AI Billing Automation for B2B is now live</span>
            <span aria-hidden="true" className="shrink-0 transition-transform group-hover:translate-x-0.5 text-brand">→</span>
          </Link>

          {/* Main Hero Headline - Actual Collectly Text with Paradev typography */}
          <div className="space-y-4 sm:space-y-6 max-w-5xl mx-auto">
            <h1 className="text-[min(2.5rem,8.8vw)] sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.08] text-foreground">
              <span className="block">Billing Automation for B2B</span>
              <span className="block font-medium text-brand">That Actually Works.</span>
            </h1>

            <p className="text-base sm:text-xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stop chasing invoices. Simplify your complex workflows with AI billing from start to finish — zero manual work.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10">
            <button
              type="button"
              onClick={openFounder}
              className="group bg-brand text-white px-6 sm:px-8 py-3 text-sm sm:text-base font-medium rounded-[2px] transition-colors hover:bg-brand-dark flex items-center gap-2 whitespace-nowrap shadow-lg shadow-brand/20 cursor-pointer"
            >
              <span>Talk to Founder</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>

            <Link
              href="/dashboard"
              className="bg-foreground text-background px-6 py-3 text-sm sm:text-base font-medium rounded-[2px] transition-colors hover:bg-white/90 flex items-center gap-2 whitespace-nowrap"
            >
              <span>Get Started</span>
            </Link>

            <button
              type="button"
              onClick={openFounder}
              className="flex items-center gap-2 border border-[#232529] bg-[#111214] text-foreground px-5 py-3 text-sm sm:text-base font-medium transition-colors hover:bg-[#1a1d21] rounded-[2px] cursor-pointer"
            >
              <Play className="size-3.5 fill-current text-brand" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Quick CLI command pill */}
          <div className="mt-6 flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#111214]/60 border border-[#232529] text-xs font-mono text-muted-foreground">
            <span className="text-brand">$</span>
            <span>brew install collectly/tap/collectly</span>
            <button
              type="button"
              onClick={copyCommand}
              className="ml-2 hover:text-foreground transition-colors p-1 cursor-pointer"
              aria-label="Copy install command"
            >
              {copied ? <Check className="size-3 text-emerald-400" /> : <Copy className="size-3" />}
            </button>
          </div>
        </div>

        {/* =========================================================================
            Interactive App Showcase (Paradev Mac Window Layout + Collectly Data)
           ========================================================================= */}
        <div className="relative w-full mt-14 sm:mt-20 lg:mt-24" id="autopilot">
          
          {/* Top Tabs Switcher */}
          <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4 overflow-x-auto scrollbar-hide py-1">
            {[
              { id: 'autopilot', label: 'Collections on Autopilot', icon: Bell },
              { id: 'invoices', label: 'Automate Billing', icon: Layers },
              { id: 'reconciliation', label: 'Payment Reconciliation', icon: RefreshCw },
              { id: 'cashflow', label: 'Real-time Cash Flow', icon: PieChart },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-mono whitespace-nowrap rounded-[2px] transition-colors cursor-pointer ${
                    isActive 
                      ? 'text-foreground bg-[#141619] border border-brand/50' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-[#111214] border border-transparent'
                  }`}
                >
                  <Icon className={`size-3.5 ${isActive ? 'text-brand' : 'text-muted-foreground/60'}`} />
                  <span>{tab.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* The Mac Window Shell */}
          <div className="relative w-full overflow-hidden rounded-xl border border-[#232529] bg-[#0d0f10] shadow-[0_1px_1px_rgba(0,0,0,0.6),0_16px_40px_-12px_rgba(0,0,0,0.8),0_32px_90px_-24px_rgba(0,0,0,0.95)]">
            
            {/* Window Titlebar */}
            <div className="flex h-10 items-center justify-between border-b border-[#232529]/70 bg-[#111214] px-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-[#ff5f57]/90 border border-[#ff5f57]"></div>
                <div className="size-3 rounded-full bg-[#febc2e]/90 border border-[#febc2e]"></div>
                <div className="size-3 rounded-full bg-[#28c840]/90 border border-[#28c840]"></div>
              </div>
              <div className="text-[11px] text-muted-foreground flex items-center gap-2">
                <span className="text-foreground/90 font-medium">collectly-billing-daemon</span>
                <span>—</span>
                <span className="text-emerald-400 font-mono text-[10px]">● 87% collection rate</span>
                <span>—</span>
                <span className="text-muted-foreground">$284K collected this month</span>
              </div>
              <div className="text-[11px] text-brand cursor-pointer hover:underline" onClick={openFounder}>
                AI Settings
              </div>
            </div>

            {/* Window Body (Sidebar + Content) */}
            <div className="flex flex-col lg:flex-row min-h-[460px]">
              
              {/* Left Column: Accounts Directory */}
              <div className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-[#232529]/70 bg-[#111214]/60 p-3 flex flex-col font-mono text-xs">
                <div className="flex items-center justify-between px-2 py-1 text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                  <span>ACTIVE INVOICES</span>
                  <span className="text-brand">4 IN QUEUE</span>
                </div>

                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-[2px] bg-brand/10 border-l-2 border-brand text-foreground">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-brand text-[10px]">⠋</span>
                      <span className="truncate">INV-0042 (Vercel)</span>
                    </div>
                    <span className="text-amber-400 text-[10px] tabular-nums">Day 14</span>
                  </div>

                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-[2px] hover:bg-[#1a1d21] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400"></span>
                      <span className="truncate">INV-0089 (Linear)</span>
                    </div>
                    <span className="text-emerald-400 text-[10px] tabular-nums">Paid $18.4k</span>
                  </div>

                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-[2px] hover:bg-[#1a1d21] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 truncate">
                      <span className="size-1.5 rounded-full bg-emerald-400"></span>
                      <span className="truncate">INV-0031 (Supabase)</span>
                    </div>
                    <span className="text-muted-foreground/60 text-[10px] tabular-nums">Paid $9.2k</span>
                  </div>

                  <div className="flex items-center justify-between px-2.5 py-1.5 rounded-[2px] hover:bg-[#1a1d21] text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <div className="flex items-center gap-2 truncate">
                      <span className="size-1.5 rounded-full bg-muted-foreground/40"></span>
                      <span className="truncate">INV-0104 (Acme)</span>
                    </div>
                    <span className="text-muted-foreground/60 text-[10px] tabular-nums">Draft $32k</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#232529]/60">
                  <div className="flex items-center justify-between px-2 py-1 text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
                    <span>SECURITY & AUDIT</span>
                    <span className="text-emerald-400">SOC 2 TYPE II</span>
                  </div>
                  <div className="px-2 py-1 text-[11px] text-muted-foreground space-y-1">
                    <div className="flex justify-between">
                      <span>Webhook Signatures:</span>
                      <span className="text-foreground">HMAC valid</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Offline Sandbox:</span>
                      <span className="text-emerald-400">Zero Dep</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Collection Lift:</span>
                      <span className="text-brand">10x faster</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Tab View */}
              <div className="flex-1 bg-[#090a0b] flex flex-col">
                
                {/* Secondary Header inside Main Pane */}
                <div className="flex items-center justify-between border-b border-[#232529]/60 px-4 py-2 bg-[#111214]/40 font-mono text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-brand font-semibold">● ACTIVE SEQUENCE:</span>
                    <span className="text-foreground">Automated Dunning & Escalations</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
                    <span className="text-emerald-400 font-mono">87% Recovery Rate</span>
                  </div>
                </div>

                {/* View Content based on activeTab */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between font-mono text-xs">
                  
                  {/* TAB 1: Collections on Autopilot */}
                  {activeTab === 'autopilot' && (
                    <div className="space-y-4">
                      {/* Reminder Sequence Flow */}
                      <div className="rounded border border-[#232529] bg-[#111214] p-4">
                        <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-4">
                          <span className="uppercase font-semibold tracking-wider text-foreground">REMINDER SEQUENCE</span>
                          <span className="text-brand">Auto-adapts to customer behavior</span>
                        </div>

                        <div className="grid grid-cols-4 gap-2 relative">
                          <div className="flex flex-col items-center gap-1.5 p-2 rounded bg-[#141619] border border-[#232529] text-center">
                            <div className="size-8 rounded-full bg-[#1e1e22] flex items-center justify-center text-muted-foreground">
                              <Bell className="size-3.5" />
                            </div>
                            <span className="text-[11px] text-foreground font-semibold">Day 1</span>
                            <span className="text-[10px] text-muted-foreground">Polite reminder</span>
                          </div>

                          <div className="flex flex-col items-center gap-1.5 p-2 rounded bg-[#141619] border border-[#232529] text-center">
                            <div className="size-8 rounded-full bg-[#1e1e22] flex items-center justify-center text-muted-foreground">
                              <Clock className="size-3.5" />
                            </div>
                            <span className="text-[11px] text-foreground font-semibold">Day 7</span>
                            <span className="text-[10px] text-muted-foreground">Due proximity</span>
                          </div>

                          <div className="flex flex-col items-center gap-1.5 p-2 rounded bg-brand/10 border border-brand/50 text-center shadow-lg shadow-brand/10">
                            <div className="size-8 rounded-full bg-brand flex items-center justify-center text-white">
                              <Send className="size-3.5" />
                            </div>
                            <span className="text-[11px] text-brand font-bold">Day 14</span>
                            <span className="text-[10px] text-brand-light">Urgent escalation</span>
                          </div>

                          <div className="flex flex-col items-center gap-1.5 p-2 rounded bg-[#141619] border border-[#232529] text-center">
                            <div className="size-8 rounded-full bg-[#1e1e22] flex items-center justify-center text-muted-foreground">
                              <Mail className="size-3.5" />
                            </div>
                            <span className="text-[11px] text-foreground font-semibold">Day 30</span>
                            <span className="text-[10px] text-muted-foreground">Final notice</span>
                          </div>
                        </div>
                      </div>

                      {/* Email Preview Mock */}
                      <div className="rounded border border-[#232529] bg-[#111214] p-4 text-[11px] space-y-2">
                        <div className="flex justify-between items-center pb-2 border-b border-[#232529]">
                          <div className="flex items-center gap-2 text-foreground font-medium">
                            <Mail className="size-3.5 text-brand" />
                            <span>Adaptive Outreach Preview</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] bg-brand/10 text-brand border border-brand/30">
                            Urgent · Escalation — INV-0042 (14 days)
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          &quot;Hi Sarah, noticing that invoice #INV-0042 for $14,000.00 is now 14 days overdue. To prevent any pause on production APIs, please use the instant one-click payment link below.&quot;
                        </p>
                        <div className="flex items-center justify-between text-brand-light pt-1">
                          <span>Pay link attached: https://pay.collectly.dev/inv_0042</span>
                          <span className="text-emerald-400">✓ Sent automatically</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Automate Billing */}
                  {activeTab === 'invoices' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-muted-foreground text-xs font-semibold mb-1">
                        <span>AUTOMATED INVOICE LIFECYCLE</span>
                        <span className="text-brand">Zero manual data entry</span>
                      </div>
                      <div className="border border-[#232529] rounded overflow-hidden">
                        <div className="grid grid-cols-4 bg-[#141619] px-3 py-2 text-[10px] uppercase font-semibold text-muted-foreground border-b border-[#232529]">
                          <span>CLIENT / RECIPIENT</span>
                          <span>INVOICE ID</span>
                          <span>AMOUNT</span>
                          <span className="text-right">STATUS</span>
                        </div>
                        {[
                          { client: 'Linear App Q4 Retainer', id: 'INV-0089', amount: '$18,400.00', status: 'Settled via ACH', color: 'text-emerald-400' },
                          { client: 'Vercel Scope Sprint', id: 'INV-0042', amount: '$14,000.00', status: 'Escalation (Day 14)', color: 'text-amber-400' },
                          { client: 'Supabase Open Source', id: 'INV-0031', amount: '$9,250.00', status: 'Paid via Stripe', color: 'text-emerald-400' },
                          { client: 'Acme Cloud Advisory', id: 'INV-0104', amount: '$32,000.00', status: 'Scheduled (Nov 1)', color: 'text-muted-foreground' },
                        ].map((row, idx) => (
                          <div key={idx} className="grid grid-cols-4 px-3 py-2 text-xs border-b border-[#232529]/60 hover:bg-[#141619] transition-colors items-center">
                            <span className="text-foreground font-medium truncate">{row.client}</span>
                            <span className="text-muted-foreground text-[11px]">{row.id}</span>
                            <span className="text-foreground font-semibold">{row.amount}</span>
                            <span className={`text-right font-medium text-[11px] ${row.color}`}>{row.status}</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] text-muted-foreground">
                        Create, send, and track invoices automatically with custom pricing models, scheduled billing cycles, and real-time payment tracking.
                      </p>
                    </div>
                  )}

                  {/* TAB 3: Payment Reconciliation */}
                  {activeTab === 'reconciliation' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                        <span>MULTI-SOURCE PAYMENT RECONCILIATION</span>
                        <span className="text-emerald-400">100% AUTOMATED MATCH</span>
                      </div>
                      <div className="border border-[#232529] rounded bg-[#0b0c0e] p-3 text-[11px] font-mono leading-relaxed space-y-2">
                        <div className="text-muted-foreground">
                          Automatically match payments from Stripe, bank accounts, and QuickBooks to invoices across multiple sources.
                        </div>
                        <div className="bg-emerald-500/10 text-emerald-300 p-2 rounded border border-emerald-500/20">
                          ✓ Stripe Charge #ch_3L4x matched to INV-0031 ($9,250.00) — Fees verified: $268.25
                        </div>
                        <div className="bg-emerald-500/10 text-emerald-300 p-2 rounded border border-emerald-500/20">
                          ✓ Mercury ACH Wire #99318 matched to INV-0089 ($18,400.00) — Ref: LINEAR-TECH
                        </div>
                        <div className="text-brand-light pl-2">
                          ✓ QuickBooks Sync: Two-way journal entry created. No manual reconciliation needed.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: Real-time Cash Flow */}
                  {activeTab === 'cashflow' && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>REAL-TIME REVENUE & CASH FLOW</span>
                        <span className="text-brand font-semibold">Monthly Trends</span>
                      </div>

                      {/* Cashflow progress visual */}
                      <div className="border border-[#232529] rounded bg-[#111214] p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4 pb-3 border-b border-[#232529]">
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase">TOTAL COLLECTED</div>
                            <div className="text-xl font-bold text-emerald-400 mt-0.5">$284,000.00</div>
                          </div>
                          <div>
                            <div className="text-[10px] text-muted-foreground uppercase">OUTSTANDING DUES</div>
                            <div className="text-xl font-bold text-amber-400 mt-0.5">$156,000.00</div>
                          </div>
                        </div>

                        {/* Progress Bar (Paradev dark style) */}
                        <div className="h-3 w-full bg-[#1e1e22] rounded-full overflow-hidden flex">
                          <div className="h-full bg-brand w-[35%]"></div>
                          <div className="h-full bg-emerald-500 w-[30%]"></div>
                          <div className="h-full bg-muted-foreground/30 w-[35%]"></div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 text-[10px] text-muted-foreground pt-1">
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-brand"></span>
                            <span>Collected (35%) $184k</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-emerald-500"></span>
                            <span>With AI (30%) $100k</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="size-2 rounded-full bg-muted-foreground/40"></span>
                            <span>Pending (35%) $156k</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Window Bottom Bar */}
                  <div className="mt-4 pt-3 border-t border-[#232529]/60 flex items-center justify-between text-muted-foreground text-[11px]">
                    <div className="flex items-center gap-2">
                      <Terminal className="size-3 text-brand" />
                      <span>Background scheduler worker evaluating balances daily at midnight</span>
                    </div>
                    <button onClick={openFounder} className="text-brand hover:underline cursor-pointer">
                      Talk to Founder →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
