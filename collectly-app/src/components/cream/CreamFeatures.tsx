'use client';

import React from 'react';
import { 
  BellRing, 
  CreditCard, 
  Sparkles, 
  Users, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Receipt
} from 'lucide-react';
import Link from 'next/link';

export default function CreamFeatures() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-[#FAF6F0] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE2] border border-[#E5DDD0] text-xs font-semibold text-[#8C7D70] uppercase tracking-wider mb-4">
            <Sparkles className="size-3 text-[#C86524]" />
            <span>Autonomous Invoicing Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1F1914] leading-[1.15]">
            Everything you need to collect revenue on autopilot.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#65594E] leading-relaxed">
            Eliminate awkward follow-up conversations. Collectly synchronizes automated email policies, multi-gateway checkouts, and client ledgers into one calm workspace.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Feature 1: Dual-Reminders Synchronization Tunnel (Span 2) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-7 sm:p-9 border border-[#E7DFD4] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="size-11 rounded-2xl bg-[#F5ECE1] text-[#C86524] flex items-center justify-center mb-6">
                <BellRing className="size-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1F1914] tracking-tight">
                Automated 3-Stage Reminder Policies
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#65594E] leading-relaxed max-w-xl">
                Set and forget. A background scheduler evaluates due date proximity and dispatches customizable proximity email templates before due date, on due date, and past due.
              </p>
            </div>

            {/* Interactive Visual Element */}
            <div className="mt-8 pt-6 border-t border-[#F0E8DD] grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#E7DFD4]">
                <div className="text-[11px] font-semibold text-[#8C7D70] uppercase tracking-wider">Stage 1</div>
                <div className="text-xs font-medium text-[#1F1914] mt-1">3 Days Before</div>
                <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Gentle Heads-up</div>
              </div>
              <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#E7DFD4]">
                <div className="text-[11px] font-semibold text-[#8C7D70] uppercase tracking-wider">Stage 2</div>
                <div className="text-xs font-medium text-[#1F1914] mt-1">Due Date Today</div>
                <div className="text-[11px] text-amber-600 font-medium mt-0.5">Direct Checkout Link</div>
              </div>
              <div className="bg-[#FAF6F0] p-3.5 rounded-2xl border border-[#E7DFD4]">
                <div className="text-[11px] font-semibold text-[#8C7D70] uppercase tracking-wider">Stage 3</div>
                <div className="text-xs font-medium text-[#1F1914] mt-1">7 Days Past Due</div>
                <div className="text-[11px] text-red-600 font-medium mt-0.5">Urgent Escalation</div>
              </div>
            </div>
          </div>

          {/* Feature 2: Multi-Gateway Checkouts */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#E7DFD4] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="size-11 rounded-2xl bg-[#EAF2EC] text-emerald-700 flex items-center justify-center mb-6">
                <CreditCard className="size-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1F1914] tracking-tight">
                Stripe & Razorpay
              </h3>
              <p className="mt-2 text-sm text-[#65594E] leading-relaxed">
                Accept ACH, Apple Pay, credit cards, and UPI. Strict double-payment guards check transaction IDs before persisting ledgers.
              </p>
            </div>

            <div className="mt-8 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E7DFD4] space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#65594E]">Webhook Ingestion</span>
                <span className="font-semibold text-emerald-600">Active (200 OK)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#65594E]">Double-Payment Guard</span>
                <span className="font-semibold text-[#1F1914]">Enforced</span>
              </div>
            </div>
          </div>

          {/* Feature 3: Client Directory Profiles */}
          <div className="bg-white rounded-3xl p-7 sm:p-9 border border-[#E7DFD4] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="size-11 rounded-2xl bg-[#ECE7F2] text-purple-700 flex items-center justify-center mb-6">
                <Users className="size-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1F1914] tracking-tight">
                Client Directory
              </h3>
              <p className="mt-2 text-sm text-[#65594E] leading-relaxed">
                Instant ledger aggregation tracking unpaid/paid invoices, visual SMTP communication timelines, and payment histories per client.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-[#8C7D70]">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>Full audit log of delivered emails</span>
            </div>
          </div>

          {/* Feature 4: Natural Language Billing AI (Span 2) */}
          <div className="md:col-span-2 bg-white rounded-3xl p-7 sm:p-9 border border-[#E7DFD4] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <div>
              <div className="size-11 rounded-2xl bg-[#F8EFE7] text-[#C86524] flex items-center justify-center mb-6">
                <Sparkles className="size-5" />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-[#1F1914] tracking-tight">
                Natural Language Financial Intelligence
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#65594E] leading-relaxed max-w-xl">
                Type questions in plain English like <em>&quot;Which clients owe more than $2,000 this month?&quot;</em> or <em>&quot;When will my payout settle?&quot;</em> and get instant ledger queries.
              </p>
            </div>

            <div className="mt-8 bg-[#FAF6F0] p-4 rounded-2xl border border-[#E7DFD4] flex items-center justify-between">
              <span className="text-xs text-[#65594E] font-medium">
                Try asking: &quot;Why is Spotify go up to $12.99?&quot; in the hero demo above
              </span>
              <Link
                href="#hero"
                className="text-xs font-semibold text-[#C86524] hover:text-[#B35519] flex items-center gap-1"
              >
                <span>Try Demo</span>
                <ArrowRight className="size-3" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

