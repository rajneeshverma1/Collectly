"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const EverythingElseSection = () => {
  return (
    <section className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-gray-900 tracking-tight">
            Everything else you need
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Payment Reconciliation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between"
          >
            {/* Visual Area */}
            <div className="h-64 w-full relative mb-12 flex items-center justify-center">
                {/* Dotted Map Pattern */}
                <div 
                    className="absolute inset-0 opacity-40" 
                    style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, #d1d5db 1px, transparent 0)',
                        backgroundSize: '12px 12px',
                        maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
                    }}
                />
                
                {/* Simulated World Map Shape Overlay (Just abstract shapes) */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                    <svg viewBox="0 0 400 200" className="w-full h-full fill-gray-400">
                        <path d="M70,80 Q90,60 120,70 T150,90 T120,130 T80,110 Z" />
                        <path d="M220,50 Q260,30 290,60 T320,100 T260,140 T210,90 Z" />
                    </svg>
                </div>

                {/* Avatars */}
                <div className="absolute top-1/2 left-1/4 -translate-y-4">
                    <div className="w-10 h-10 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-200">
                        <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="absolute top-2/3 left-1/2 -translate-x-1/2">
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-lg overflow-hidden bg-yellow-100 flex items-center justify-center text-yellow-500">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 22h20L12 2z"/></svg>
                    </div>
                </div>
                <div className="absolute top-1/3 right-1/4 translate-y-4">
                    <div className="w-12 h-12 rounded-full border-2 border-white shadow-lg overflow-hidden bg-gray-200">
                        <img src="https://i.pravatar.cc/100?img=32" alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Payment Reconciliation
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Automatically match payments from Stripe, bank accounts, and QuickBooks to invoices across multiple sources. No more manual reconciliation.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Real-time Revenue & Cash Flow */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-[32px] p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between"
          >
            {/* Visual Area */}
            <div className="h-64 w-full relative mb-12 flex items-center justify-center pt-8">
                {/* Background stacked cards effect */}
                <div className="absolute top-4 w-[85%] h-full bg-gray-50 border border-gray-100 rounded-2xl -z-20"></div>
                <div className="absolute top-8 w-[92%] h-full bg-white border border-gray-100 shadow-sm rounded-2xl -z-10"></div>
                
                {/* Main inner card */}
                <div className="w-full h-full bg-white border border-gray-100 shadow-lg rounded-2xl p-6 flex flex-col z-10">
                    <div className="mb-6">
                        <h4 className="text-gray-900 font-medium text-sm">Cash Flow</h4>
                        <p className="text-gray-400 text-xs mt-1">Revenue by month</p>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex mb-6">
                        <div className="h-full bg-[#3b357e] w-[35%]"></div>
                        <div className="h-full bg-[#6366f1] w-[30%]"></div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 mb-6">
                        <div>
                            <div className="text-xl font-semibold text-gray-900">$284K</div>
                            <div className="text-xs text-gray-500 mt-1">Collected</div>
                        </div>
                        <div>
                            <div className="text-xl font-semibold text-gray-900">$156K</div>
                            <div className="text-xs text-gray-500 mt-1">Outstanding</div>
                        </div>
                    </div>

                    <div className="w-full border-t border-dashed border-gray-200 mb-4"></div>

                    {/* Legend */}
                    <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3b357e]"></div>
                            <span className="text-gray-700 font-medium">Collected <span className="text-gray-400 font-normal">(35%)</span> $184,342</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#6366f1]"></div>
                            <span className="text-gray-700 font-medium">Collected with JustPaid <span className="text-gray-400 font-normal">(30%)</span> $100,000</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full border border-gray-300"></div>
                            <span className="text-gray-400">Pending <span className="text-gray-400 font-normal">(35%)</span> $156,000</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-time Revenue & Cash Flow
              </h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                Track collected vs outstanding payments, monitor revenue trends by month, and identify payment gaps instantly with live dashboards.
              </p>
            </div>
          </motion.div>


        </div>
      </div>
    </section>
  );
};
