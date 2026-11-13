'use client';

import React from 'react';
import { Star } from 'lucide-react';

export default function CreamTestimonials() {
  const reviews = [
    {
      name: "Sarah Jenkins",
      role: "Design Studio Founder",
      company: "Studio Apex",
      text: "Collectly completely eradicated that sinking feeling I used to get every Monday when following up on $10k+ invoices. Clients pay via Stripe or Razorpay in seconds.",
      avatar: "SJ",
      bgColor: "bg-[#E8D1BE]",
      textColor: "text-[#8B481B]"
    },
    {
      name: "Michael Chen",
      role: "Managing Director",
      company: "Hyperion Digital",
      text: "The 3-stage reminder tunnel paid for itself on day two. We dropped our DSO from 38 days down to 8 days, and our cashflow has never been more predictable.",
      avatar: "MC",
      bgColor: "bg-[#D6E2D5]",
      textColor: "text-[#2B612A]"
    },
    {
      name: "Elena Rostova",
      role: "Independent Consultant",
      company: "Rostova Advisory",
      text: "The calm cream interface and automated reminders mean I can focus on high-impact client work instead of chasing accounts receivable. It feels like having a full-time finance assistant.",
      avatar: "ER",
      bgColor: "bg-[#DDD5E8]",
      textColor: "text-[#58327B]"
    }
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F3ECE2] border border-[#E5DDD0] text-xs font-semibold text-[#8C7D70] uppercase tracking-wider mb-4">
            <Star className="size-3 fill-amber-500 text-amber-500" />
            <span>4.9 / 5 Rating from 1,200+ Businesses</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1F1914] leading-[1.15]">
            Loved by modern teams who value their time.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#65594E]">
            Here is what agencies and freelancers say after automating their billing with Collectly.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-7 border border-[#E7DFD4] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-[#3E342B] leading-relaxed italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-[#F0E8DD] flex items-center gap-3">
                <div className={`size-10 rounded-full ${r.bgColor} ${r.textColor} flex items-center justify-center font-semibold text-xs`}>
                  {r.avatar}
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#1F1914]">{r.name}</div>
                  <div className="text-[11px] text-[#8C7D70]">{r.role} • {r.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

