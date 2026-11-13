'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Copy, Check, Terminal } from 'lucide-react';

export default function ParadevFinalCTA() {
  const [selectedTool, setSelectedTool] = useState<'brew' | 'curl' | 'npm'>('brew');
  const [copied, setCopied] = useState(false);

  const openFounder = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-founder-modal'));
    }
  };

  const commands = {
    brew: 'brew install collectly/tap/collectly',
    curl: 'curl -fsSL https://collectly.dev/install.sh | bash',
    npm: 'npm install -g @collectly/cli',
  };

  const copy = () => {
    navigator.clipboard.writeText(commands[selectedTool]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 sm:py-28 border-t border-[#232529]/70 bg-[#090a0b] relative overflow-hidden">
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute inset-0 z-0" 
        style={{
          background: 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(232,128,74,0.1), rgba(232,128,74,0.01) 60%, transparent 80%)'
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-foreground">
          Ready to automate your billing?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
          Our AI Billing Agent can transform how you manage invoicing, payments, and growth. Let&apos;s talk about what it can do for you.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={openFounder}
            className="group bg-brand text-white px-7 py-3 text-sm sm:text-base font-medium rounded-[2px] transition-colors hover:bg-brand-dark flex items-center gap-2 whitespace-nowrap shadow-xl shadow-brand/20 cursor-pointer"
          >
            <span>Talk to Founder</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </button>

          <Link
            href="/dashboard"
            className="px-6 py-3 text-sm sm:text-base font-medium rounded-[2px] bg-foreground text-background hover:bg-white/90 transition-colors"
          >
            Get Started
          </Link>
        </div>

        <p className="text-xs font-mono text-muted-foreground/50 mt-4">
          No credit card required.
        </p>

        {/* Terminal Installer Block */}
        <div className="mt-10 max-w-lg mx-auto rounded-lg border border-[#232529] bg-[#111214] p-4 text-left font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-[#232529]/60 text-xs">
            <span className="text-muted-foreground text-[11px]">Install the Collectly CLI:</span>
            <div className="flex items-center gap-1">
              {(['brew', 'curl', 'npm'] as const).map((tool) => (
                <button
                  key={tool}
                  type="button"
                  onClick={() => setSelectedTool(tool)}
                  className={`px-2 py-0.5 rounded-[2px] text-[11px] transition-colors ${
                    selectedTool === tool
                      ? 'bg-brand text-white'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tool}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
              <span className="text-brand">$</span>
              <span className="text-foreground/90 whitespace-nowrap">{commands[selectedTool]}</span>
            </div>
            <button
              type="button"
              onClick={copy}
              className="ml-3 shrink-0 p-1.5 rounded hover:bg-[#1a1d21] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Copy CLI command"
            >
              {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
