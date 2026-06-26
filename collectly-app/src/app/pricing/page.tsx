'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Info } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Show } from '@/lib/auth-wrapper';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'Monthly' | 'Annual'>('Monthly');

  const plans = [
    {
      name: "Startup",
      revenue: "Up to $100K Annual Revenue*",
      target: "For early-stage companies",
      price: "Free",
      period: "",
      isPopular: false,
    },
    {
      name: "Starter",
      revenue: "Up to $1M Annual Revenue*",
      target: "",
      price: "$624",
      period: "/mo",
      isPopular: false,
    },
    {
      name: "Growth",
      revenue: "Up to $5M Annual Revenue*",
      target: "",
      price: "$1,249",
      period: "/mo",
      isPopular: false,
    },
    {
      name: "Scale",
      revenue: "Up to $10M Annual Revenue*",
      target: "",
      price: "$2,499",
      period: "/mo",
      isPopular: true,
    },
    {
      name: "Professional",
      revenue: "Up to $50M Annual Revenue*",
      target: "",
      price: "$3,749",
      period: "/mo",
      isPopular: false,
    }
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-900 font-sans overflow-x-hidden">
      <Navbar />

      {/* Main Container */}
      <main className="max-w-[1400px] mx-auto px-6 pt-40 pb-24 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-gray-900"
          >
            Pricing Plans
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-500 mt-4 leading-relaxed font-normal"
          >
            Revenue-based pricing designed for teams at every stage.
          </motion.p>

          {/* Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-10 inline-flex items-center p-1 bg-white border border-gray-200 rounded-full shadow-sm"
          >
            <button
              onClick={() => setBillingCycle('Monthly')}
              className={`px-8 py-2.5 rounded-full text-[15px] font-medium transition-colors ${
                billingCycle === 'Monthly' 
                  ? 'text-gray-900 bg-gray-50 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('Annual')}
              className={`px-8 py-2.5 rounded-full text-[15px] font-medium transition-colors ${
                billingCycle === 'Annual' 
                  ? 'text-gray-900 bg-gray-50 shadow-sm' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Annual
            </button>
          </motion.div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-4 lg:gap-6 mb-8 pb-12 pt-8">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              className={`flex-1 p-6 lg:p-8 rounded-[32px] bg-white border relative flex flex-col justify-between transition-all hover:-translate-y-1 hover:shadow-xl ${
                plan.isPopular 
                  ? 'border-[#5B50FF] shadow-[0_8px_30px_rgb(91,80,255,0.12)] z-10 lg:scale-105' 
                  : 'border-gray-100 shadow-sm'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-[#5B50FF] text-white text-[11px] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center flex-1">
                <h3 className="text-[22px] font-medium text-gray-900 tracking-tight">{plan.name}</h3>
                
                <div className="mt-3 mb-1 min-h-[40px]">
                  <p className="text-[13px] font-semibold text-gray-700">{plan.revenue}</p>
                  {plan.target ? (
                    <p className="text-[11px] text-gray-400 mt-1">{plan.target}</p>
                  ) : null}
                </div>

                <div className="mt-8 mb-12 flex items-center justify-center gap-1">
                  <span className="text-[40px] font-medium tracking-tight text-gray-900 leading-none">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[15px] text-gray-500 font-medium">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-auto">
                <button className="w-full flex items-center justify-center py-2 text-gray-300 hover:text-gray-500 transition-colors mb-4">
                  <ChevronDown size={20} />
                </button>
                <div className="flex items-center justify-center gap-2 border-t border-gray-100 pt-6 mb-6">
                  <span className="text-[14px] font-semibold text-gray-900">Implementation Team</span>
                  <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 cursor-help">
                    <Info size={10} strokeWidth={3} />
                  </div>
                </div>

                <Show when="signed-out">
                  <Link 
                    href="/sign-up" 
                    className={`block w-full py-3.5 rounded-2xl text-[14px] font-semibold text-center transition-all ${
                      plan.isPopular 
                        ? 'bg-[#5B50FF] hover:bg-[#4a40e0] text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Get Started
                  </Link>
                </Show>
                <Show when="signed-in">
                  <Link 
                    href="/dashboard" 
                    className={`block w-full py-3.5 rounded-2xl text-[14px] font-semibold text-center transition-all ${
                      plan.isPopular 
                        ? 'bg-[#5B50FF] hover:bg-[#4a40e0] text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Go to Dashboard
                  </Link>
                </Show>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enterprise Banner */}
        <div className="max-w-[1000px] mx-auto mb-32 bg-[#f8f9fa] border border-gray-200/60 rounded-[24px] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <h3 className="text-[22px] font-medium text-gray-900">Enterprise</h3>
            <p className="text-[13px] font-semibold text-gray-500 mt-1">$50M+ Annual Revenue</p>
            
            <h4 className="text-[28px] font-medium text-gray-900 mt-6">Custom</h4>
            <p className="text-[13px] text-gray-500 mt-2 max-w-2xl leading-relaxed">
              Everything in Professional + Custom integrations, Custom AI collections, Custom dashboards, Unlimited AI actions
            </p>
            
            <div className="mt-4">
              <span className="bg-[#10b981] text-white text-[12px] font-semibold px-3 py-1 rounded-full">
                Implementation Team: Included
              </span>
            </div>
          </div>
          
          <div className="shrink-0">
            <Link 
              href="/contact" 
              className="inline-block bg-[#5B50FF] hover:bg-[#4a40e0] text-white text-[15px] font-medium px-8 py-3.5 rounded-full shadow-sm transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
