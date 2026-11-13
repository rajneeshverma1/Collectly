'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Minus, ArrowRight, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

interface ParadevPricingProps {
  id?: string;
  showComparison?: boolean;
}

export default function ParadevPricing({ id = "pricing", showComparison = true }: ParadevPricingProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [mobileTab, setMobileTab] = useState<'free' | 'pro' | 'team' | 'enterprise'>('pro');

  const openFounder = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-founder-modal'));
    }
  };

  const plans = [
    {
      id: "free",
      name: "Free",
      target: "For individuals and early-stage companies getting started",
      priceMonthly: "$0",
      priceYearly: "$0",
      period: "forever",
      subtext: "Free for everyone. No credit card required.",
      isPopular: false,
      ctaText: "Start Free",
      ctaAction: "dashboard",
      features: [
        "1 active user seat",
        "Up to $100K annual revenue throughput",
        "1 active client workspace",
        "Local SQLite database engine",
        "Native desktop app & CLI",
        "Standard Day 30 reminder templates",
        "Direct Stripe checkout link",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      target: "For growing studios and agencies that need more power",
      priceMonthly: "$20",
      priceYearly: "$16",
      period: "per user/month",
      subtext: "$192 per user, billed yearly",
      isPopular: true,
      ctaText: "Get Pro",
      ctaAction: "dashboard",
      features: [
        "Everything in Free",
        "Up to $1M annual revenue throughput",
        "Unlimited client workspaces",
        "Tone-aware autonomous chasers (Day 1, 7, 14, 30)",
        "Stripe & Razorpay dual payment tunnels",
        "Mobile companion app & push alerts",
        "Slack & webhook event notifications",
      ],
    },
    {
      id: "team",
      name: "Team",
      target: "For teams that run billing automation every day",
      priceMonthly: "$60",
      priceYearly: "$54",
      period: "per user/month",
      subtext: "$648 per user, billed yearly",
      isPopular: false,
      ctaText: "Get Team",
      ctaAction: "dashboard",
      features: [
        "Everything in Pro",
        "Up to $5M annual revenue throughput",
        "Sub-second bank & Stripe reconciliation",
        "QuickBooks & Xero two-way sync",
        "Custom voice, pacing & messaging persona",
        "Multi-currency auto-conversion (40+ FX)",
        "Team seat roles & permissions",
      ],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      target: "For organizations with advanced compliance and volume needs",
      priceMonthly: "Custom",
      priceYearly: "Custom",
      period: "annual billing only",
      subtext: "Dedicated infrastructure & SLA",
      isPopular: false,
      ctaText: "Contact sales",
      ctaAction: "founder",
      features: [
        "Everything in Team",
        "Unlimited revenue throughput",
        "SAML SSO & SCIM provisioning",
        "Audit logs & SOC 2 Type II report",
        "99.99% uptime SLA & dedicated lead",
        "Custom ERP connectors (NetSuite / SAP)",
        "Zero-dependency on-prem deployment",
      ],
    },
  ];

  const comparisonCategories = [
    {
      name: "Usage & Limits",
      rows: [
        {
          feature: "Annual Revenue Throughput",
          free: "$100K / yr",
          pro: "$1M / yr",
          team: "$5M / yr",
          enterprise: "Unlimited",
        },
        {
          feature: "Active Client Workspaces",
          free: "1 workspace",
          pro: "Unlimited",
          team: "Unlimited",
          enterprise: "Unlimited",
        },
        {
          feature: "Team Seats",
          free: "1 user",
          pro: "Unlimited ($16/seat)",
          team: "Unlimited ($54/seat)",
          enterprise: "Custom allocation",
        },
        {
          feature: "Transaction Commission",
          free: "0% fee",
          pro: "0% fee",
          team: "0% fee",
          enterprise: "0% fee",
        },
      ],
    },
    {
      name: "Autonomous Dunning & Chasing",
      rows: [
        {
          feature: "Autopilot Reminder Cadence",
          free: "Day 30 only",
          pro: "Day 1, 7, 14, 30 sequence",
          team: "Custom multi-stage sequence",
          enterprise: "AI dynamic smart timing",
        },
        {
          feature: "Tone-Aware Escalation AI",
          free: false,
          pro: true,
          team: true,
          enterprise: true,
        },
        {
          feature: "PDF & Contract Auto-Extraction",
          free: "Manual entry",
          pro: "50 invoices / mo",
          team: "Unlimited extraction",
          enterprise: "Unlimited + custom schema",
        },
        {
          feature: "Custom Voice & Tone Rules",
          free: false,
          pro: "Standard presets",
          team: "Full persona customization",
          enterprise: "Custom fine-tuned prompts",
        },
      ],
    },
    {
      name: "Reconciliation & Integrations",
      rows: [
        {
          feature: "Local SQLite Engine & Sync",
          free: true,
          pro: true,
          team: true,
          enterprise: true,
        },
        {
          feature: "Multi-Source Bank Matching",
          free: false,
          pro: "Daily batch",
          team: "Sub-second live match",
          enterprise: "Sub-second live match",
        },
        {
          feature: "Payment Gateways (Stripe & Razorpay)",
          free: "Stripe Checkout only",
          pro: "Stripe & Razorpay",
          team: "Stripe, Razorpay & ACH",
          enterprise: "All + Direct Bank Wires",
        },
        {
          feature: "QuickBooks & Xero Two-Way Sync",
          free: false,
          pro: false,
          team: true,
          enterprise: true,
        },
        {
          feature: "Multi-Currency Auto-FX",
          free: false,
          pro: "3 currencies",
          team: "40+ currencies",
          enterprise: "Global multi-entity FX",
        },
      ],
    },
    {
      name: "Security, Governance & Support",
      rows: [
        {
          feature: "Desktop App & Terminal CLI",
          free: true,
          pro: true,
          team: true,
          enterprise: true,
        },
        {
          feature: "Mobile Companion App",
          free: false,
          pro: true,
          team: true,
          enterprise: true,
        },
        {
          feature: "Slack & Webhook Alerts",
          free: false,
          pro: true,
          team: true,
          enterprise: true,
        },
        {
          feature: "Role-Based Permissions",
          free: false,
          pro: false,
          team: true,
          enterprise: true,
        },
        {
          feature: "SAML SSO & SCIM Provisioning",
          free: false,
          pro: false,
          team: false,
          enterprise: true,
        },
        {
          feature: "Audit Logs & SOC 2 Type II",
          free: false,
          pro: false,
          team: false,
          enterprise: true,
        },
        {
          feature: "Support & SLA",
          free: "Community",
          pro: "Priority Email (24h)",
          team: "Priority Slack channel",
          enterprise: "Dedicated SLA + Founder Phone",
        },
      ],
    },
  ];

  return (
    <section className="relative border-b border-[#232529]/70 bg-[#090a0b] py-16 sm:py-24" id={id}>
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Paradev corner tick crosshairs */}
        <div className="relative border border-[#232529] bg-[#111214]/60 p-8 sm:p-12 mb-12 sm:mb-16 max-w-4xl mx-auto rounded-lg">
          {/* Top-Left Corner Tick */}
          <div className="absolute top-0 left-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-px h-5 bg-brand"></div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-px bg-brand"></div>
          </div>
          {/* Top-Right Corner Tick */}
          <div className="absolute top-0 right-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-px h-5 bg-brand"></div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-px bg-brand"></div>
          </div>
          {/* Bottom-Left Corner Tick */}
          <div className="absolute bottom-0 left-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-px h-5 bg-brand"></div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-px bg-brand"></div>
          </div>
          {/* Bottom-Right Corner Tick */}
          <div className="absolute bottom-0 right-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-px h-5 bg-brand"></div>
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-5 h-px bg-brand"></div>
          </div>

          <div className="text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground block mb-3">
              Pricing
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
              Simple pricing for every team
            </h1>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
              Start free. Upgrade when your team outgrows it. Enterprise plans for organizations with advanced security, audit, and custom volume needs.
            </p>

            {/* Monthly / Yearly Toggle (Paradev exact style) */}
            <div className="mt-8 inline-flex items-center gap-1 rounded-md border border-[#232529] bg-[#111214] p-1 font-mono text-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`inline-flex items-center rounded-sm px-4 py-1.5 transition-colors cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-[#1c1e22] text-foreground font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('yearly')}
                className={`inline-flex items-center rounded-sm px-4 py-1.5 transition-colors gap-2 cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-foreground text-background font-semibold shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span>Yearly</span>
                <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded ${
                  billingCycle === 'yearly' 
                    ? 'bg-background text-foreground' 
                    : 'bg-brand/20 text-brand-light'
                }`}>
                  Save up to 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Pricing Cards Grid (Subgrid Paradev style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => {
            const isCustom = plan.priceMonthly === "Custom";
            const price = isCustom
              ? "Custom"
              : billingCycle === 'yearly'
                ? plan.priceYearly
                : plan.priceMonthly;
            const originalPrice = plan.priceMonthly;

            return (
              <div
                key={plan.id}
                className={`rounded-lg border p-6 md:p-8 flex flex-col justify-between transition-all duration-200 relative ${
                  plan.isPopular
                    ? 'border-brand/70 bg-[#121316] shadow-[0_0_35px_rgba(232,128,74,0.12)]'
                    : 'border-[#232529] bg-[#111214]/60 hover:border-[#34373b]'
                }`}
              >
                {/* Popular Badge */}
                {plan.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-foreground text-background font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-[2px] shadow-sm">
                    Popular
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-medium text-foreground tracking-tight">
                      {plan.name}
                    </h3>
                  </div>

                  <p className="text-xs text-muted-foreground font-light leading-relaxed min-h-[38px]">
                    {plan.target}
                  </p>

                  {/* Price Block */}
                  <div className="mt-6 mb-4 min-h-[58px]">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      {!isCustom && billingCycle === 'yearly' && plan.priceMonthly !== "$0" && (
                        <span className="text-2xl font-medium tracking-tight text-muted-foreground line-through">
                          {originalPrice}
                        </span>
                      )}
                      <span className="text-4xl font-medium tracking-tight text-foreground">
                        {price}
                      </span>
                      {!isCustom && (
                        <span className="text-xs text-muted-foreground font-mono">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1.5 font-light">
                      {isCustom ? plan.period : billingCycle === 'yearly' ? plan.subtext : "Billed monthly"}
                    </p>
                  </div>

                  {/* Action CTA */}
                  <div className="my-6">
                    {plan.ctaAction === 'founder' ? (
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={openFounder}
                          className="w-full inline-flex items-center justify-center h-10 px-6 rounded-md text-sm font-medium border border-[#232529] bg-[#1c1e22] text-foreground hover:bg-brand hover:text-white transition-colors cursor-pointer"
                        >
                          {plan.ctaText}
                        </button>
                        <a
                          href="#security"
                          className="text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground transition-colors"
                        >
                          Review our security
                        </a>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Link
                          href="/dashboard"
                          className={`w-full inline-flex items-center justify-center h-10 px-6 rounded-md text-sm font-medium transition-all ${
                            plan.isPopular
                              ? 'bg-foreground text-background hover:bg-white/90 shadow-sm'
                              : 'border border-[#232529] bg-background hover:bg-[#1a1d21] text-foreground'
                          }`}
                        >
                          {plan.ctaText}
                        </Link>
                        {plan.name === "Free" && (
                          <p className="text-center text-xs text-muted-foreground">
                            No credit card required.
                          </p>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Checklist features */}
                  <ul className="flex flex-col gap-3 border-t border-[#232529] pt-6 font-sans">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-foreground/90">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-brand" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-[#232529]/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                  <span>Commission fee</span>
                  <span className="text-brand font-medium">0% forever</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trusted By Builders Logos */}
        <div className="mt-20 py-8 border-y border-[#232529]/60 text-center">
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-muted-foreground mb-6">
            Trusted by founders, finance leads & agencies from
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-75">
            <span className="font-mono text-sm tracking-wider font-semibold text-foreground/80 hover:text-foreground transition-colors">STRIPE</span>
            <span className="font-mono text-sm tracking-wider font-semibold text-foreground/80 hover:text-foreground transition-colors">MERCURY</span>
            <span className="font-mono text-sm tracking-wider font-semibold text-foreground/80 hover:text-foreground transition-colors">QUICKBOOKS</span>
            <span className="font-mono text-sm tracking-wider font-semibold text-foreground/80 hover:text-foreground transition-colors">VERCEL</span>
            <span className="font-mono text-sm tracking-wider font-semibold text-foreground/80 hover:text-foreground transition-colors">LINEAR</span>
            <span className="font-mono text-sm tracking-wider font-semibold text-foreground/80 hover:text-foreground transition-colors">RAZORPAY</span>
          </div>
        </div>

        {/* Side-by-side Feature Comparison Matrix (Paradev Table) */}
        {showComparison && (
          <div className="mt-20 sm:mt-28">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand block mb-2">
                Compare plans
              </span>
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
                All features, side by side
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                Every detail of our billing automation engine, dunning sequences, and accounting integrations.
              </p>
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto rounded-lg border border-[#232529] bg-[#111214]/60">
              <table className="w-full table-fixed border-separate border-spacing-0">
                <thead>
                  <tr>
                    <th className="sticky top-16 z-10 w-1/3 border-b border-[#232529] bg-[#111214] py-4 px-6 text-left text-sm font-medium text-muted-foreground">
                      Features
                    </th>
                    <th className="sticky top-16 z-10 border-b border-[#232529] bg-[#111214] py-4 px-4 text-left text-sm font-medium text-foreground">
                      Free
                      <span className="block font-mono text-xs font-normal text-muted-foreground">$0</span>
                    </th>
                    <th className="sticky top-16 z-10 border-b border-[#232529] bg-[#111214] py-4 px-4 text-left text-sm font-medium text-foreground">
                      Pro
                      <span className="block font-mono text-xs font-normal text-brand-light">from $16/user/mo</span>
                    </th>
                    <th className="sticky top-16 z-10 border-b border-[#232529] bg-[#111214] py-4 px-4 text-left text-sm font-medium text-foreground">
                      Team
                      <span className="block font-mono text-xs font-normal text-muted-foreground">from $54/user/mo</span>
                    </th>
                    <th className="sticky top-16 z-10 border-b border-[#232529] bg-[#111214] py-4 px-4 text-left text-sm font-medium text-foreground">
                      Enterprise
                      <span className="block font-mono text-xs font-normal text-muted-foreground">Custom</span>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonCategories.map((cat, catIdx) => (
                    <React.Fragment key={catIdx}>
                      {/* Section Category Header */}
                      <tr>
                        <td
                          colSpan={5}
                          className="border-b border-[#232529] bg-[#16181c] px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                        >
                          {cat.name}
                        </td>
                      </tr>

                      {/* Rows */}
                      {cat.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="border-b border-[#232529]/60 py-4 px-6 text-sm text-foreground">
                            {row.feature}
                          </td>
                          <td className="border-b border-[#232529]/60 px-4 py-4 text-sm text-muted-foreground">
                            {renderCellContent(row.free)}
                          </td>
                          <td className="border-b border-[#232529]/60 px-4 py-4 text-sm text-foreground">
                            {renderCellContent(row.pro)}
                          </td>
                          <td className="border-b border-[#232529]/60 px-4 py-4 text-sm text-foreground">
                            {renderCellContent(row.team)}
                          </td>
                          <td className="border-b border-[#232529]/60 px-4 py-4 text-sm text-foreground">
                            {renderCellContent(row.enterprise)}
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Table with Plan Selector Tab */}
            <div className="md:hidden flex flex-col gap-6">
              <div className="flex overflow-x-auto rounded-md border border-[#232529] bg-[#111214] p-1">
                {(['free', 'pro', 'team', 'enterprise'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setMobileTab(tab)}
                    className={`flex-1 whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-medium uppercase font-mono transition-colors ${
                      mobileTab === tab
                        ? 'bg-foreground text-background font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="rounded-lg border border-[#232529] bg-[#111214] p-4 divide-y divide-[#232529]/60">
                {comparisonCategories.map((cat, catIdx) => (
                  <div key={catIdx} className="py-4 first:pt-0 last:pb-0">
                    <div className="font-mono text-xs uppercase tracking-wider text-brand mb-3">
                      {cat.name}
                    </div>
                    <div className="space-y-3">
                      {cat.rows.map((row, rIdx) => {
                        const val = row[mobileTab];
                        return (
                          <div key={rIdx} className="flex items-center justify-between gap-3 text-xs">
                            <span className="text-muted-foreground">{row.feature}</span>
                            <span className="text-right text-foreground font-medium shrink-0">
                              {renderCellContent(val)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Custom volume callout banner */}
        <div className="mt-16 rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-brand mb-1">
                <Building2 className="size-3.5" />
                <span>ENTERPRISE & HIGH VOLUME</span>
              </div>
              <h3 className="text-lg font-medium text-foreground">Need custom volume or on-prem deployment?</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-light mt-1 max-w-2xl">
                Collectly can be deployed on your private VPC, air-gapped infrastructure, or custom database cluster with dedicated SLA and NetSuite connectors.
              </p>
            </div>
            <button
              type="button"
              onClick={openFounder}
              className="bg-brand text-white px-5 py-2.5 rounded-[2px] text-xs font-medium hover:bg-brand-dark transition-colors cursor-pointer whitespace-nowrap shrink-0 shadow-sm"
            >
              Talk to Founder
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

function renderCellContent(val: string | boolean) {
  if (val === true) {
    return <Check className="size-4 text-brand" />;
  }
  if (val === false) {
    return <Minus className="size-4 text-muted-foreground/40" />;
  }
  return <span className="font-mono text-xs">{val}</span>;
}
