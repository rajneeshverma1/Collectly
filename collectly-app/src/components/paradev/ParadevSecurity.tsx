'use client';

import React from 'react';
import { Cpu, ShieldCheck, HeartHandshake, Lock, HardDrive, Key } from 'lucide-react';

export default function ParadevSecurity() {
  const pillars = [
    {
      icon: <Cpu className="size-5 text-brand" />,
      title: "Autonomous Operations",
      description: "Our background scheduler worker evaluates unpaid balances daily at midnight, transitioning status configurations and dispatching automated outreach templates adaptively.",
      badge: "Background Cron Active",
    },
    {
      icon: <ShieldCheck className="size-5 text-brand" />,
      title: "Payment Signature Vault",
      description: "Uses cryptographic webhook signature validation (constructEvent / HMAC) and transaction-id locks to guarantee double-payment protections.",
      badge: "HMAC Hardened",
    },
    {
      icon: <HeartHandshake className="size-5 text-brand" />,
      title: "Zero-Dependency Sandbox",
      description: "Ensures developers run and test invoicing immediately via local mock auth environments and offline database seeders, completely isolated from Clerk or Stripe CDN outages.",
      badge: "Local SQLite Offline",
    },
  ];

  const stats = [
    { value: "10x", label: "Faster Collections" },
    { value: "99.9%", label: "Signature Security" },
    { value: "0", label: "External Dependencies" },
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-[#232529]/70 bg-[#090a0b]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Compliance Badge */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] border border-[#232529] bg-[#111214] text-[11px] font-mono text-muted-foreground mb-4">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span>SOC-2 · GDPR · Bank-Grade Encryption</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            Private by default. You&apos;re in control.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground font-light">
            Your billing ledgers stay local by default, with explicit control over connected gateways and services.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx}
              className="rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8 space-y-4 hover:border-brand/40 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="size-10 rounded-lg bg-brand/10 border border-brand/20 flex items-center justify-center">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-medium text-foreground tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#232529]/60 flex items-center justify-between text-[11px] font-mono text-brand">
                <span>{pillar.badge}</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3 Stats Bar (Paradev dark minimalist style) */}
        <div className="rounded-xl border border-[#232529] bg-[#111214] p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-[#232529]">
            {stats.map((s, idx) => (
              <div key={idx} className={idx > 0 ? "pt-6 md:pt-0" : ""}>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-brand mb-1">
                  {s.value}
                </div>
                <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
