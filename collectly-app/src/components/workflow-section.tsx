"use client";

import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { FileText, CheckCircle2 } from 'lucide-react';

const data = [
    { name: 'Jan', collected: 120, revenue: 160 },
    { name: 'Feb', collected: 210, revenue: 240 },
    { name: 'Mar', collected: 180, revenue: 280 },
    { name: 'Apr', collected: 240, revenue: 210 },
    { name: 'May', collected: 290, revenue: 320 },
    { name: 'Jun', collected: 260, revenue: 290 },
];

export const WorkflowSection = () => {
    return (
        <section className="py-24 relative overflow-hidden bg-white">
            {/* Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <h2 className="text-2xl md:text-3xl font-medium text-white text-center mb-16 tracking-tight">
                    Automate Financial Workflows
                </h2>

                <div className="max-w-5xl mx-auto rounded-[32px] bg-white/5 backdrop-blur-md border border-transparent overflow-hidden grid md:grid-cols-2 shadow-2xl">
                    {/* Left Side — Revenue vs Collections Graph */}
                    <div className="p-10 border-b md:border-b-0 md:border-r border-transparent">
                        <div className="mb-10">
                            <h3 className="font-medium text-white mb-3">Revenue vs Collections tracking</h3>
                            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                                Monitor billed revenue against actual collections. Identify payment gaps instantly.
                            </p>
                        </div>

                        <div className="h-56 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#6b7280', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#111',
                                            borderRadius: '16px',
                                            border: '1px solid transparent',
                                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)'
                                        }}
                                        itemStyle={{ color: '#fff' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#6366f1' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="collected"
                                        stroke="#22c55e"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#22c55e' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Side — Invoice Preview */}
                    <div className="p-10 bg-white/[0.02]">
                        <div className="mb-10">
                            <h3 className="font-medium text-white mb-3">Automated smart invoicing</h3>
                            <p className="text-sm text-white/50 max-w-sm leading-relaxed">
                                AI-powered invoice generation and tracking. Get paid 30% faster with zero errors.
                            </p>
                        </div>

                        <div className="relative flex justify-center items-center py-6">
                            {/* Stacked Layers */}
                            <div className="absolute w-[80%] h-full bg-white/5 border border-transparent rounded-2xl shadow-sm rotate-2 translate-y-3 opacity-40" />
                            <div className="absolute w-[85%] h-full bg-white/5 border border-transparent rounded-2xl shadow-sm -rotate-1 translate-y-2 opacity-60" />

                            {/* Top Card */}
                            <div className="relative w-full bg-[#111111] border border-transparent rounded-2xl shadow-2xl p-7 flex flex-col gap-5 transition-colors duration-300">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 bg-indigo-600 rounded-lg flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                        <span className="text-[11px] font-bold text-white tracking-widest uppercase">Collectly</span>
                                    </div>
                                    <div className="text-[10px] text-white/30 font-medium font-mono">INV-456789</div>
                                </div>

                                <div className="mt-3">
                                    <div className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-1.5">Total Amount</div>
                                    <div className="text-3xl font-bold text-white tabular-nums">$284,342.57</div>
                                </div>

                                <div className="space-y-2 mt-2">
                                    <div className="h-2 w-full bg-white/5 rounded-full" />
                                    <div className="h-2 w-5/6 bg-white/5 rounded-full" />
                                    <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                                </div>

                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-widest">
                                        <CheckCircle2 size={14} strokeWidth={3} />
                                        Verified
                                    </div>
                                    <div className="bg-white/5 border border-transparent text-white/40 text-[9px] font-bold px-2.5 py-1 rounded-lg tracking-tight">
                                        Due in 15 days
                                    </div>
                                </div>

                                {/* Mini Document Icon Overlay (Top-Right of card) */}
                                <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#1A1A1A] border border-transparent rounded-2xl shadow-xl flex items-center justify-center text-indigo-400 animate-bounce-slow">
                                    <FileText size={22} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
