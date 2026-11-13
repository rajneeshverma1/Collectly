'use client';

import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function ParadevFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const openFounder = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-founder-modal'));
    }
  };

  const faqs = [
    {
      q: "What does Collectly do?",
      a: "Collectly is an AI-powered financial operations platform that automates your entire billing cycle. We handle everything from invoicing and payment collection to reconciliation and dunning, acting as your 24/7 AI billing agent."
    },
    {
      q: "How does the AI Billing Agent work?",
      a: "Our AI Billing Agent intelligently interacts with your customers through voice or text to follow up on overdue payments, answer billing queries, and negotiate payment plans, all while maintaining a natural and empathetic tone."
    },
    {
      q: "What integrations does Collectly support?",
      a: "Collectly seamlessly integrates with major ERPs, accounting software (like QuickBooks, Xero, NetSuite), and payment gateways (Stripe, Authorize.net, Adyen) to ensure your data stays perfectly synced."
    },
    {
      q: "Can Collectly handle complex or usage-based billing?",
      a: "Absolutely. Our platform is built to handle complex billing models, including usage-based, tiered, and hybrid subscriptions. We ingest raw usage data and automatically calculate the correct billing amounts."
    },
    {
      q: "Do I need to replace Stripe to use Collectly?",
      a: "No, you don't. Collectly sits on top of your existing payment infrastructure like Stripe. We act as the intelligence layer that orchestrates the billing logic, while Stripe continues to process the actual transactions."
    },
    {
      q: "What kind of companies use Collectly?",
      a: "Collectly is built for fast-growing B2B companies, SaaS startups, agencies, and mid-market enterprises that want to streamline their financial operations and reduce revenue leakage."
    },
    {
      q: "Is my financial data secure?",
      a: "Security is our top priority. Collectly is SOC-2, GDPR, and HIPAA compliant. We use bank-grade encryption for data at rest and in transit, ensuring your sensitive financial information is always protected."
    },
    {
      q: "What makes Collectly different from other billing tools?",
      a: "Unlike traditional billing tools that just generate invoices, Collectly provides an active AI agent that actively works to recover revenue, resolve billing disputes, and automate the manual tasks that slow down your finance team."
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-[#232529]/70 bg-[#090a0b]" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column (Paradev styled) */}
          <div className="lg:col-span-5 space-y-6">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand">
              QUESTIONS & ANSWERS
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-tight">
              Questions and answers
            </h2>
            <p className="text-base text-muted-foreground font-light leading-relaxed">
              Tell us your most pressing billing challenge—whether it&apos;s getting paid on time, ensuring accurate and timely billing, or improving financial reporting—and we&apos;ll show you exactly how Collectly solves it.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={openFounder}
                className="inline-flex items-center gap-2 bg-brand text-white px-6 py-3 rounded-[2px] font-medium text-sm hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20 cursor-pointer"
              >
                <span>Still have questions? Talk to Founder</span>
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 space-y-3 font-mono">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-lg border border-[#232529] bg-[#111214] overflow-hidden transition-colors hover:border-[#34373b]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-base sm:text-lg font-medium text-foreground">
                      {faq.q}
                    </span>
                    <ChevronDown 
                      className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180 text-brand' : ''}`} 
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm font-sans text-muted-foreground font-light leading-relaxed border-t border-[#232529]/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
