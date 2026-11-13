'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu, X, ArrowRight, Github } from 'lucide-react';

export default function ParadevNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const openFounder = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-founder-modal'));
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#232529]/70 bg-[#090a0b]/80 backdrop-blur-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 text-foreground hover:opacity-90 transition-opacity">
              <div className="size-6 rounded-[3px] bg-brand flex items-center justify-center font-mono font-bold text-white text-xs tracking-tighter shadow-[0_0_12px_rgba(232,128,74,0.4)]">
                C
              </div>
              <span className="font-mono text-sm tracking-[0.16em] uppercase font-bold text-foreground">
                COLLECTLY
              </span>
              <span className="hidden sm:inline-flex items-center text-[10px] font-mono uppercase tracking-wider text-brand-light bg-brand/[0.12] border border-brand/30 px-1.5 py-0.5 rounded-[2px]">
                v2.4
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <div className="relative" onMouseLeave={() => setProductOpen(false)}>
              <button
                type="button"
                onClick={() => setProductOpen(!productOpen)}
                onMouseEnter={() => setProductOpen(true)}
                className="inline-flex items-center justify-center h-8 px-3 text-[13px] tracking-[0.01em] font-normal text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Features
                <ChevronDown className={`ml-1 size-3 transition-transform duration-200 ${productOpen ? 'rotate-180 text-foreground' : ''}`} />
              </button>

              {productOpen && (
                <div 
                  className="absolute left-0 top-full mt-1 w-72 rounded-md border border-[#232529] bg-[#111214] p-2 shadow-2xl z-50 font-sans"
                  onMouseEnter={() => setProductOpen(true)}
                  onMouseLeave={() => setProductOpen(false)}
                >
                  <Link href="#features" className="block px-3 py-2 rounded text-xs text-foreground hover:bg-[#1a1d21] transition-colors">
                    <div className="font-medium text-foreground">Invoice to Payment</div>
                    <div className="text-[11px] text-muted-foreground">Automated invoice generation & tracking</div>
                  </Link>
                  <Link href="#autopilot" className="block px-3 py-2 rounded text-xs text-foreground hover:bg-[#1a1d21] transition-colors">
                    <div className="font-medium text-foreground">Collections on Autopilot</div>
                    <div className="text-[11px] text-muted-foreground">Tone-aware day 1, 7, 14, 30 reminder sequences</div>
                  </Link>
                  <Link href="#reconciliation" className="block px-3 py-2 rounded text-xs text-foreground hover:bg-[#1a1d21] transition-colors">
                    <div className="font-medium text-foreground">Payment Reconciliation</div>
                    <div className="text-[11px] text-muted-foreground">Match Stripe, bank accounts & QuickBooks</div>
                  </Link>
                  <Link href="#configurable" className="block px-3 py-2 rounded text-xs text-foreground hover:bg-[#1a1d21] transition-colors">
                    <div className="font-medium text-foreground">Custom Voice & Tone</div>
                    <div className="text-[11px] text-muted-foreground">Your brand personality across languages</div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="#solutions"
              className="inline-flex items-center justify-center h-8 px-3 text-[13px] tracking-[0.01em] font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              Who We Serve
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center justify-center h-8 px-3 text-[13px] tracking-[0.01em] font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              Architecture
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center h-8 px-3 text-[13px] tracking-[0.01em] font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/careers"
              className="inline-flex items-center justify-center h-8 px-3 text-[13px] tracking-[0.01em] font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              Join us
            </Link>
            <Link
              href="#faq"
              className="inline-flex items-center justify-center h-8 px-3 text-[13px] tracking-[0.01em] font-normal text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={openFounder}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-[2px] border border-[#232529] hover:bg-[#141619] cursor-pointer"
            >
              Talk to Founder
            </button>

            <Link
              href="/sign-in"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
            >
              Sign In
            </Link>

            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 bg-foreground text-background hover:bg-brand hover:text-white px-3.5 py-1.5 text-xs font-medium rounded-[2px] transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={openFounder}
              className="text-xs text-brand border border-brand/30 px-2 py-1 rounded-[2px]"
            >
              Founder
            </button>
            <Link
              href="/dashboard"
              className="bg-foreground text-background hover:bg-brand hover:text-white px-3 py-1 text-xs font-medium rounded-[2px] transition-colors"
            >
              App
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 text-muted-foreground hover:text-foreground"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#232529] bg-[#090a0b] px-4 py-4 space-y-3 font-sans">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground"
          >
            Features & Autopilot
          </Link>
          <Link
            href="#solutions"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground"
          >
            Who We Serve
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground"
          >
            System Architecture
          </Link>
          <Link
            href="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/careers"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground"
          >
            Join us
          </Link>
          <Link
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-muted-foreground hover:text-foreground"
          >
            Questions & Answers
          </Link>
          <div className="pt-2 border-t border-[#232529] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openFounder();
              }}
              className="text-xs text-brand font-medium"
            >
              Talk to Founder →
            </button>
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-brand text-white px-3.5 py-1.5 text-xs font-medium rounded-[2px]"
            >
              Get Started Free →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
