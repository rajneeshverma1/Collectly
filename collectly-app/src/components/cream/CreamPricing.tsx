'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

export default function CreamPricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      tagline: "For solo freelancers and boutique consultants.",
      priceMonthly: 29,
      priceAnnual: 23,
      features: [
        "Up to 15 active clients",
        "Automated 3-stage email reminders",
        "Stripe & Razorpay checkouts",
        "Client directory & invoice logs",
        "Standard SMTP delivery"
      ],
      popular: false,
      ctaText: "Start 14-day trial"
    },
    {
      name: "Pro",
      tagline: "For growing studios, agencies, and high-volume teams.",
      priceMonthly: 79,
      priceAnnual: 63,
      features: [
        "Unlimited active clients",
        "Custom reminder schedule policy",
        "Natural language AI queries",
        "Custom email domain (DKIM / SPF)",
        "Strict double-payment guards",
        "Priority payout notifications"
      ],
      popular: true,
      ctaText: "Start 14-day trial"
    },
    {
      name: "Agency",
      tagline: "For established agencies requiring full white-label control.",
      priceMonthly: 199,
      priceAnnual: 159,
      features: [
        "Everything in Pro",
        "Multi-member team access",
        "White-label client billing portal",
        "Custom SMTP & webhooks integration",
        "Dedicated onboarding manager",
        "99.9% uptime SLA guarantee"
      ],
      popular: false,
      ctaText: "Contact Sales"
    }
  ];

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-[#F5EFEB] border-y border-[#E7DFD4]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E5DDD0] text-xs font-semibold text-[#8C7D70] uppercase tracking-wider mb-4">
            <span>Simple, Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1F1914] leading-[1.15]">
            Invest in peace of mind. Get paid on time.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#65594E]">
            All plans include a 14-day risk-free trial. No credit card required to start.
          </p>

          {/* Billing Switch */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full bg-[#EAE2D7] border border-[#DDD3C6]">
            <button
              type="button"
              onClick={() => setAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                !annual ? 'bg-white text-[#1F1914] shadow-sm' : 'text-[#6E6155] hover:text-[#1F1914]'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                annual ? 'bg-[#C86524] text-white shadow-sm' : 'text-[#6E6155] hover:text-[#1F1914]'
              }`}
            >
              <span>Annual</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                annual ? 'bg-white/20 text-white' : 'bg-[#C86524]/10 text-[#C86524]'
              }`}>
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {plans.map((p, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all ${
                p.popular
                  ? 'bg-white border-2 border-[#C86524] shadow-xl relative'
                  : 'bg-white/80 border border-[#E7DFD4] shadow-sm hover:bg-white'
              }`}
            >
              {p.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C86524] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-sm">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold text-[#1F1914]">{p.name}</h3>
                <p className="text-xs text-[#6E6155] mt-1 min-h-[32px]">{p.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#1F1914]">
                    ${annual ? p.priceAnnual : p.priceMonthly}
                  </span>
                  <span className="text-xs text-[#8C7D70]">/ month</span>
                </div>
                {annual && (
                  <div className="text-[11px] text-emerald-600 font-medium mt-1">
                    Billed annually (${p.priceAnnual * 12}/yr)
                  </div>
                )}

                <div className="mt-7 pt-6 border-t border-[#F0E8DD]">
                  <div className="text-xs font-semibold text-[#8C7D70] uppercase tracking-wider mb-3">
                    What is included:
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-[#3E342B]">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F0E8DD]">
                <Link
                  href="/auth"
                  className={`w-full py-3 rounded-full text-xs sm:text-sm font-medium tracking-tight transition-all flex items-center justify-center gap-1.5 ${
                    p.popular
                      ? 'bg-[#C86524] hover:bg-[#B35519] text-white shadow-md'
                      : 'bg-[#F4ECE2] hover:bg-[#EAE1D4] text-[#1F1914]'
                  }`}
                >
                  <span>{p.ctaText}</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

