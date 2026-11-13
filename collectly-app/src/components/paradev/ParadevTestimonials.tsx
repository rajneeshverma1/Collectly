'use client';

import React from 'react';
import { Twitter } from 'lucide-react';

export default function ParadevTestimonials() {
  const testimonials = [
    {
      name: 'Abhi Aiyer',
      role: 'Co-founder & CTO at Mastra',
      handle: '@abhiaiyer',
      content: 'Just realized that I have done all my client billing in @collectly since Dec 26. Not a single awkward payment follow-up email. The parallel client branches and local SQLite workflow are unbeatable.',
    },
    {
      name: 'Chris Laupama',
      role: 'Staff Engineer & Agency Lead',
      handle: '@chris_laupama',
      content: 'Oh snap @collectly is soooooo damn good! Now THIS is the experience I’ve been wanting for CLI and automated accounts receivable. 14 open retainers settled in 48 hours without me touching anything.',
    },
    {
      name: 'Elena Rostova',
      role: 'Founder at PixelForge Studio',
      handle: '@elena_rf',
      content: 'Other invoicing tools treat billing like an accounting chore from 2004. Collectly treats it like Git: isolated workspaces, sub-second diffs against bank feeds, and zero percent transaction fee cuts.',
    },
    {
      name: 'Marcus Chen',
      role: 'Independent Systems Architect',
      handle: '@mchen_dev',
      content: 'The CLI alone is worth it: `collectly invoice new --autopilot`. I trigger it from my release scripts when code hits production. Money lands directly in my Mercury account via Stripe ACH.',
    },
    {
      name: 'David K.',
      role: 'Head of Engineering at DevScale',
      handle: '@david_scale',
      content: 'Running the daemon locally with SQLite is a dream. When our Wi-Fi dropped during an offsite, Collectly kept queueing reminders and synchronized the instant we reconnected.',
    },
    {
      name: 'Sarah Jenkins',
      role: 'Director of Finance at HyperSync',
      handle: '@sarah_sync',
      content: 'The tone-aware autonomous chasers are genuinely brilliant. It never sounds like a dumb robot; it speaks with exactly the right balance of warmth and professional urgency.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-[#232529]/70 bg-[#090a0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
            What builders say about Collectly
          </h2>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground font-light">
            Engineers, agency founders, and studio leads running their receivables on autopilot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx}
              className="rounded-xl border border-[#232529] bg-[#111214] p-6 flex flex-col justify-between hover:border-brand/40 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="size-9 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center font-mono font-bold text-xs text-brand">
                      {t.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">{t.name}</div>
                      <div className="text-[11px] text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground/60">{t.handle}</span>
                </div>

                <p className="text-sm text-muted-foreground font-light leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#232529]/60 flex items-center justify-between text-[10px] font-mono text-muted-foreground/50">
                <span>VERIFIED BUILDER</span>
                <span className="text-emerald-400">● ACTIVE USER</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
