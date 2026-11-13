'use client';

import React from 'react';
import { User, Building2, Store, Layers } from 'lucide-react';

export default function ParadevWhoWeServe() {
  const segments = [
    {
      icon: <User className="size-5 text-brand" />,
      title: "Freelancers",
      description: "Get paid faster for your work with seamless payment collection and automated gentle reminders.",
    },
    {
      icon: <Building2 className="size-5 text-brand" />,
      title: "B2B Companies",
      description: "Streamline invoicing and collect large enterprise transactions securely with dual gateways.",
    },
    {
      icon: <Store className="size-5 text-brand" />,
      title: "Small Businesses",
      description: "Simplify payments, eliminate manual reconciliation, and focus on business growth.",
    },
    {
      icon: <Layers className="size-5 text-brand" />,
      title: "Agencies & Studios",
      description: "Manage multiple clients, retainers, and milestone contracts across isolated workspaces effortlessly.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-[#232529]/70 bg-[#090a0b]" id="solutions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand mb-3">
            WHO WE SERVE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            Built for businesses that grow with smarter payments.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground font-light">
            We empower freelancers, B2B companies, small businesses, and agencies to collect payments seamlessly through modern workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="rounded-xl border border-[#232529] bg-[#111214] p-6 flex flex-col justify-between hover:border-brand/40 transition-colors"
            >
              <div>
                <div className="size-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center mb-5">
                  {segment.icon}
                </div>
                <h3 className="text-lg font-medium text-foreground tracking-tight mb-2">
                  {segment.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {segment.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-[#232529]/60 text-[11px] font-mono text-brand flex items-center gap-1">
                <span>Explore workflows</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
