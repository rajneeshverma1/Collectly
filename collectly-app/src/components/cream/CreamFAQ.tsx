'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function CreamFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do automated reminders work?",
      a: "Collectly uses a background scheduler that evaluates your unpaid invoices against your organization's policy (by default: 3 days before due, on due date, and 7 days past due). Friendly, professional proximity templates are automatically dispatched via SMTP, and full delivery audit logs are saved to your dashboard."
    },
    {
      q: "Will reminders stop sending as soon as a client pays?",
      a: "Yes, instantly. When a client checks out via Stripe, Razorpay, or you record a manual transaction, our payment webhook updates the invoice state to 'paid' in real time and immediately deactivates all pending scheduled reminders."
    },
    {
      q: "Can I connect my own Stripe and Razorpay accounts?",
      a: "Absolutely. In your Settings panel, you can enter your Stripe Connect or Razorpay API keys. Payments settle directly into your own merchant account without intermediary escrow or hidden transaction markups."
    },
    {
      q: "Can I customize the email templates and sender name?",
      a: "Yes. Pro and Agency plans allow you to customize the reminder copy, add your company logo, set your business name as the sender, and configure DKIM/SPF DNS records to send directly from your custom domain."
    },
    {
      q: "How does the double-payment guard protect my business?",
      a: "Our backend webhook processor verifies webhook signatures and queries existing transaction IDs before executing state transitions. If a gateway sends duplicate webhook events, Collectly rejects duplicates, preventing double-credits or corrupt ledger history."
    },
    {
      q: "How long does setup take?",
      a: "Less than 3 minutes. Connect your gateway, add your first client, draft an invoice, and Collectly automatically takes care of schedule evaluations, delivery verification, and checkout links."
    }
  ];

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#FAF6F0]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3ECE2] border border-[#E5DDD0] text-xs font-semibold text-[#8C7D70] uppercase tracking-wider mb-4">
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1F1914] leading-[1.15]">
            Everything you need to know.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#65594E]">
            Have other questions? Reach out to our founders anytime.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-[#E7DFD4] overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base font-semibold text-[#1F1914]">
                    {faq.q}
                  </span>
                  <div
                    className={`size-7 rounded-full bg-[#FAF6F0] flex items-center justify-center text-[#8C7D70] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-[#C86524] text-white' : ''
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-[#524538] leading-relaxed border-t border-[#F5EFEB] pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

