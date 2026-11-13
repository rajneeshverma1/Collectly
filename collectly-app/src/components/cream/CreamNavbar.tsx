'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

export default function CreamNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E7DFD4]/90 shadow-sm py-3 text-[#1F1914]'
          : 'bg-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center">
              <svg
                width="28"
                height="28"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 group-hover:scale-105"
              >
                <circle cx="12" cy="16" r="9" stroke="currentColor" strokeWidth="2.2" className="opacity-90" />
                <circle cx="20" cy="16" r="9" stroke="currentColor" strokeWidth="2.2" className="opacity-70" />
                <path d="M16 11.5L16 20.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight">
              Collectly
            </span>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className={`text-sm font-medium transition-colors hover:opacity-100 ${
                scrolled ? 'text-[#65594E] hover:text-[#1F1914]' : 'text-white/80 hover:text-white'
              }`}
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className={`text-sm font-medium transition-colors hover:opacity-100 ${
                scrolled ? 'text-[#65594E] hover:text-[#1F1914]' : 'text-white/80 hover:text-white'
              }`}
            >
              Pricing
            </Link>
            <Link
              href="#compare"
              className={`text-sm font-medium transition-colors hover:opacity-100 ${
                scrolled ? 'text-[#65594E] hover:text-[#1F1914]' : 'text-white/80 hover:text-white'
              }`}
            >
              Compare
            </Link>
            <Link
              href="#faq"
              className={`text-sm font-medium transition-colors hover:opacity-100 ${
                scrolled ? 'text-[#65594E] hover:text-[#1F1914]' : 'text-white/80 hover:text-white'
              }`}
            >
              Changelog
            </Link>
          </nav>

          {/* Right: Actions */}
          <div className="hidden md:flex items-center gap-5">
            <Link
              href="/auth"
              className={`text-sm font-medium transition-colors ${
                scrolled ? 'text-[#4A3F35] hover:text-[#1F1914]' : 'text-white/90 hover:text-white'
              }`}
            >
              Log in
            </Link>

            <Link
              href="/auth"
              className="bg-[#C86524] hover:bg-[#B35519] active:scale-[0.98] text-white px-5 py-2.5 rounded-full text-sm font-medium tracking-tight shadow-[0_4px_16px_rgba(200,101,36,0.35)] transition-all flex items-center gap-1.5"
            >
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? 'text-[#1F1914] hover:bg-black/5' : 'text-white hover:bg-white/10'
            }`}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#E7DFD4] px-5 py-6 space-y-4 text-[#1F1914] shadow-xl">
          <nav className="flex flex-col space-y-3 font-medium text-base">
            <Link
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#52463C] hover:text-[#1F1914] py-1"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#52463C] hover:text-[#1F1914] py-1"
            >
              Pricing
            </Link>
            <Link
              href="#compare"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#52463C] hover:text-[#1F1914] py-1"
            >
              Compare
            </Link>
            <Link
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[#52463C] hover:text-[#1F1914] py-1"
            >
              Changelog
            </Link>
          </nav>
          <div className="pt-4 border-t border-[#E7DFD4] flex flex-col gap-3">
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 font-medium text-sm text-[#4A3F35]"
            >
              Log in
            </Link>
            <Link
              href="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#C86524] hover:bg-[#B35519] text-white text-center py-3 rounded-full text-sm font-medium shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

