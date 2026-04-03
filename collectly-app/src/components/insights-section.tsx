"use client";

import React from "react";
import { motion } from "framer-motion";

const InsightCard = ({ title, description, children, delay }: { title: string, description: string, children: React.ReactNode, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-white rounded-[24px] p-8 md:p-10 shadow-sm flex flex-col gap-8 hover:-translate-y-1 transition-transform duration-300"
    >
        <div className="flex-grow flex items-center justify-center min-h-[220px]">
            {children}
        </div>
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-500 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    </motion.div>
);

export const InsightsSection = () => {
    return (
        <section className="py-24 bg-sky-50">
            <div className="max-w-[1200px] mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Card A: Real-time Cash Flow */}
                    <InsightCard
                        title="Real-time Cash Flow"
                        description="Track collected vs outstanding payments. Monitor cash flow trends with crystal clear visibility."
                        delay={0.1}
                    >
                        <div className="relative w-full max-w-[320px] flex justify-center items-center py-6">
                            {/* Stacked Layers */}
                            <div className="absolute inset-0 bg-white/40 rounded-2xl rotate-3 translate-y-2" />
                            <div className="absolute inset-0 bg-white/60 rounded-2xl -rotate-2 translate-y-1" />

                            {/* Main Widget */}
                            <div className="relative w-full bg-white rounded-2xl p-6 shadow-sm">
                                <div className="mb-6">
                                    <div className="text-sm font-bold text-gray-900">Cash Flow</div>
                                    <div className="text-[10px] text-gray-400">Revenue by month</div>
                                </div>

                                {/* Segmented Progress Bar */}
                                <div className="h-2 w-full flex rounded-full overflow-hidden mb-6">
                                    <div className="h-full bg-indigo-600 w-[35%]" />
                                    <div className="h-full bg-blue-500 w-[30%]" />
                                    <div className="h-full bg-gray-100 w-[35%]" />
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">Collected</div>
                                        <div className="text-lg font-bold text-gray-900 leading-none">$284,342</div>
                                    </div>
                                    <div className="pl-4">
                                        <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mb-1">Outstanding</div>
                                        <div className="text-lg font-bold text-gray-900 leading-none">$156,000</div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    {[
                                        { label: 'Collected', percentage: '35%', amount: '$184,342', color: 'bg-indigo-600' },
                                        { label: 'Projected', percentage: '30%', amount: '$100,000', color: 'bg-blue-500' },
                                        { label: 'Remaining', percentage: '35%', amount: '$156,000', color: 'bg-gray-100' },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between text-[10px]">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                                                <span className="text-gray-500">{item.label} ({item.percentage})</span>
                                            </div>
                                            <span className="font-bold text-gray-900">{item.amount}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </InsightCard>

                    {/* Card B: Payment Reconciliation */}
                    <InsightCard
                        title="Payment Reconciliation"
                        description="Automatically match payments from multiple sources including Stripe, bank accounts, QuickBooks..."
                        delay={0.2}
                    >
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center p-4">
                            {/* Stippled World Map (SVG) */}
                            <svg viewBox="0 0 400 240" className="w-full h-auto text-gray-200 opacity-60">
                                <pattern id="dots" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                                </pattern>
                                <rect width="400" height="240" fill="url(#dots)" mask="url(#map-mask)" />

                                {/* Simple World Map Outline Mask (Simplified) */}
                                <mask id="map-mask">
                                    <g fill="white">
                                        {/* Americas */}
                                        <path d="M60 40 Q 40 100 80 160 Q 100 200 80 220 L 70 230 L 100 220 Q 120 180 110 120 Q 130 80 100 40 Z" />
                                        {/* Africa/Europe */}
                                        <path d="M180 40 Q 160 80 180 120 Q 190 160 220 200 Q 250 160 240 100 Q 230 40 200 30 Z" />
                                        {/* Asia/Australia */}
                                        <path d="M280 40 Q 260 100 300 160 Q 320 210 360 220 L 380 230 L 340 180 Q 320 120 350 60 Q 330 30 290 30 Z" />
                                    </g>
                                </mask>
                            </svg>

                            {/* Avatars */}
                            <div className="absolute top-[35%] left-[20%] group transition-all duration-300">
                                <div className="w-8 h-8 rounded-full bg-blue-100 shadow-sm flex items-center justify-center overflow-hidden">
                                    <img src="https://api.uifaces.co/our-content/donated/x3AB9z9V.jpg" alt="User" />
                                </div>
                            </div>
                            <div className="absolute top-[25%] left-[52%] group transition-all duration-300">
                                <div className="w-8 h-8 rounded-full bg-rose-100 shadow-sm flex items-center justify-center overflow-hidden">
                                    <img src="https://api.uifaces.co/our-content/donated/vY_H6p_7.jpg" alt="User" />
                                </div>
                            </div>
                            <div className="absolute top-[40%] left-[82%] group transition-all duration-300">
                                <div className="w-8 h-8 rounded-full bg-emerald-100 shadow-sm flex items-center justify-center overflow-hidden">
                                    <img src="https://api.uifaces.co/our-content/donated/KtCFh_cK.jpg" alt="User" />
                                </div>
                            </div>
                        </div>
                    </InsightCard>

                </div>
            </div>
        </section>
    );
};
