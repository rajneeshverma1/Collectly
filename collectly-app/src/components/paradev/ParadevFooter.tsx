'use client';

import React from 'react';
import Link from 'next/link';
import { Github, Mail } from 'lucide-react';

export default function ParadevFooter() {
  const openFounder = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-founder-modal'));
    }
  };

  return (
    <footer className="border-t border-[#232529]/70 bg-[#090a0b] py-14 sm:py-20 text-xs font-mono text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4 Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-14">
          <div>
            <div className="text-foreground font-semibold uppercase tracking-wider mb-4 text-[11px]">
              Features
            </div>
            <ul className="space-y-2.5">
              <li><Link href="#features" className="hover:text-foreground transition-colors">Invoice to Payment</Link></li>
              <li><Link href="#autopilot" className="hover:text-foreground transition-colors">Collections on Autopilot</Link></li>
              <li><Link href="#reconciliation" className="hover:text-foreground transition-colors">Payment Reconciliation</Link></li>
              <li><Link href="#features" className="hover:text-foreground transition-colors">AI Contract Extraction</Link></li>
              <li><Link href="#features" className="hover:text-foreground transition-colors">Multi-Currency (USD/EUR)</Link></li>
              <li><Link href="#configurable" className="hover:text-foreground transition-colors">Custom Voice & Tone</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-foreground font-semibold uppercase tracking-wider mb-4 text-[11px]">
              Who We Serve
            </div>
            <ul className="space-y-2.5">
              <li><Link href="#solutions" className="hover:text-foreground transition-colors">Freelancers</Link></li>
              <li><Link href="#solutions" className="hover:text-foreground transition-colors">B2B Companies</Link></li>
              <li><Link href="#solutions" className="hover:text-foreground transition-colors">Small Businesses</Link></li>
              <li><Link href="#solutions" className="hover:text-foreground transition-colors">Agencies & Studios</Link></li>
              <li><Link href="/pricing" className="hover:text-foreground transition-colors">Plans & Pricing</Link></li>
              <li><Link href="/careers" className="text-brand hover:text-brand-light transition-colors">Join us (Careers) →</Link></li>
              <li><Link href="/dashboard" className="text-foreground hover:text-brand transition-colors">Launch Dashboard →</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-foreground font-semibold uppercase tracking-wider mb-4 text-[11px]">
              Architecture & Trust
            </div>
            <ul className="space-y-2.5">
              <li><Link href="#about" className="hover:text-foreground transition-colors">Autonomous Operations</Link></li>
              <li><Link href="#about" className="hover:text-foreground transition-colors">Payment Signature Vault</Link></li>
              <li><Link href="#about" className="hover:text-foreground transition-colors">Zero-Dependency Sandbox</Link></li>
              <li><Link href="#about" className="hover:text-foreground transition-colors">SOC-2 & GDPR Compliance</Link></li>
              <li><Link href="#faq" className="hover:text-foreground transition-colors">Questions & Answers</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-foreground font-semibold uppercase tracking-wider mb-4 text-[11px]">
              Contact Founder
            </div>
            <div className="p-3 rounded border border-[#232529] bg-[#111214] space-y-2 mb-4">
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <span className="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>All Systems Normal</span>
              </div>
              <div className="text-[10px] text-muted-foreground/80">
                10x faster collections · 0 external deps
              </div>
            </div>
            <div className="space-y-2">
              <button 
                type="button" 
                onClick={openFounder}
                className="text-brand hover:underline cursor-pointer block"
              >
                Talk to Founder →
              </button>
              <a 
                href="mailto:rajneeshverma3536@gmail.com" 
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <Mail className="size-3.5" />
                <span>rajneeshverma3536@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#232529]/60 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-5 rounded-[2px] bg-brand flex items-center justify-center font-bold text-[10px] text-white">
              C
            </div>
            <span className="font-bold tracking-widest uppercase text-foreground">
              COLLECTLY
            </span>
            <span className="text-muted-foreground/60 text-[11px]">
              © 2026 Collectly Inc. AI Billing Automation for B2B.
            </span>
          </div>

          <div className="flex items-center gap-6 text-muted-foreground text-[11px]">
            <Link href="#about" className="hover:text-foreground transition-colors">Security</Link>
            <Link href="#faq" className="hover:text-foreground transition-colors">FAQ</Link>
            <a target="_blank" rel="noopener noreferrer" href="https://github.com" className="hover:text-foreground transition-colors flex items-center gap-1">
              <Github className="size-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
