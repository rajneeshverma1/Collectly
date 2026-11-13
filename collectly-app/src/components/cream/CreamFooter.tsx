'use client';

import React from 'react';
import Link from 'next/link';

export default function CreamFooter() {
  return (
    <footer className="bg-[#F5EFEB] border-t border-[#E7DFD4] text-[#65594E] py-16 text-sm font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#E7DFD4]">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2 text-[#1F1914] group">
              <svg
                width="26"
                height="26"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="16" r="9" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="20" cy="16" r="9" stroke="currentColor" strokeWidth="2.2" strokeOpacity="0.75" />
                <path d="M16 11.5L16 20.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
              <span className="font-semibold text-base tracking-tight">
                Collectly
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#786C60] max-w-sm leading-relaxed">
              Autonomous client billing, 3-stage automated reminder policies, and unified payment checkouts for modern agencies & freelancers.
            </p>

            <div className="flex items-center gap-2 pt-2 text-xs text-[#786C60]">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Systems Operational (99.9% Uptime)</span>
            </div>
          </div>

          {/* Product Col */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#1F1914] uppercase tracking-wider">
              Product
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#features" className="hover:text-[#1F1914] transition-colors">
                  Automated Reminders
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-[#1F1914] transition-colors">
                  Stripe & Razorpay
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-[#1F1914] transition-colors">
                  Client Directory
                </Link>
              </li>
              <li>
                <Link href="#features" className="hover:text-[#1F1914] transition-colors">
                  AI Financial Assistant
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Col */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#1F1914] uppercase tracking-wider">
              Company
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#compare" className="hover:text-[#1F1914] transition-colors">
                  Comparison
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-[#1F1914] transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#1F1914] transition-colors">
                  Careers <span className="text-[10px] bg-[#E8DDD0] text-[#786C60] px-1.5 py-0.5 rounded-full ml-1">Hiring</span>
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-[#1F1914] transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Col */}
          <div className="space-y-3">
            <div className="text-xs font-semibold text-[#1F1914] uppercase tracking-wider">
              Security & Legal
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="#" className="hover:text-[#1F1914] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#1F1914] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#1F1914] transition-colors">
                  Security Architecture
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#1F1914] transition-colors">
                  PCI-DSS Compliance
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7D70]">
          <div>
            © {new Date().getFullYear()} Collectly Technologies, Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="#hero" className="hover:text-[#1F1914] transition-colors">
              Back to Top ↑
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

