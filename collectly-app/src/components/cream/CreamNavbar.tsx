'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function CreamNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-6">
      
      {/* ── Main Container: Simple without any box at top, becomes capsule on scroll ── */}
      <div className={`mx-auto max-w-4xl transition-all duration-300 ease-out pointer-events-auto ${
        scrolled ? 'mt-2.5 sm:mt-3' : 'mt-4 sm:mt-5'
      }`}>
        
        <header
          className={`w-full transition-all duration-300 ease-out ${
            scrolled
              ? 'bg-[#FAF6F0]/95 backdrop-blur-md rounded-full border border-white/90 shadow-[0_16px_40px_rgba(40,25,10,0.18)] px-5 sm:px-7 py-2 sm:py-2.5 text-[#1F1914]'
              : 'bg-transparent border-0 border-none shadow-none rounded-none px-2 sm:px-3 py-2 text-[#1F1914]'
          }`}
          style={!scrolled ? { border: 'none', background: 'transparent', boxShadow: 'none' } : undefined}
        >
          <div className="flex items-center justify-between">
            
            {/* Left: Brand Logo with new official logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <img
                  src="/images/logo.png"
                  alt="Collectly Logo"
                  className="size-6 sm:size-7 object-contain"
                />
              </div>
              <span className="font-semibold text-sm sm:text-base tracking-tight text-[#1F1914]">
                Collectly
              </span>
            </Link>

            {/* Center: Desktop Navigation Links (Features, Pricing, Compare) */}
            <nav className="hidden md:flex items-center gap-7 sm:gap-9">
              <Link
                href="#features"
                className="text-xs sm:text-[13px] font-medium text-[#2C241D] hover:text-black transition-colors"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-xs sm:text-[13px] font-medium text-[#2C241D] hover:text-black transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="#compare"
                className="text-xs sm:text-[13px] font-medium text-[#2C241D] hover:text-black transition-colors"
              >
                Compare
              </Link>
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3.5 sm:gap-5">
              <Link
                href="/auth"
                className="hidden sm:inline-block text-xs sm:text-[13px] font-medium text-[#2C241D] hover:text-black transition-colors"
              >
                Log in
              </Link>

              {/* Exact Caramel Pill Button from Reference */}
              <Link
                href="/auth"
                className="bg-gradient-to-b from-[#C46B1F] to-[#A35514] hover:from-[#B8621B] hover:to-[#924A0F] active:scale-[0.98] text-white px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-[13px] font-medium tracking-tight shadow-[inset_0_1px_0_rgba(255,255,255,0.3),0_3px_10px_rgba(163,85,20,0.35)] transition-all flex items-center justify-center shrink-0"
              >
                <span>Get Started</span>
              </Link>

              {/* Mobile Menu Toggle Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-full transition-colors text-[#1F1914] hover:bg-black/5"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>

          </div>

          {/* Mobile Collapsible Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 pt-3 border-t border-[#E7DFD4]/80 text-[#1F1914] space-y-2 animate-in fade-in duration-200">
              <Link
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-xs font-medium text-[#2C241D] hover:text-black"
              >
                Features
              </Link>
              <Link
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-xs font-medium text-[#2C241D] hover:text-black"
              >
                Pricing
              </Link>
              <Link
                href="#compare"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-xs font-medium text-[#2C241D] hover:text-black"
              >
                Compare
              </Link>
              <Link
                href="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-xs font-medium text-[#2C241D] hover:text-black sm:hidden"
              >
                Log in
              </Link>
            </div>
          )}

        </header>

      </div>

    </div>
  );
}
