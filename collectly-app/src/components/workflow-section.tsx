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
        <section className="py-24 relative overflow-hidden bg-sky-50">
            <div className="max-w-[1200px] mx-auto px-6 relative z-10">
                <h2 className="text-2xl md:text-3xl font-medium text-gray-900 text-center mb-12">
                    Automate Financial Workflows
                </h2>

                <div className="max-w-5xl mx-auto rounded-2xl bg-white shadow-sm overflow-hidden grid md:grid-cols-2">
                    {/* Left Side — Revenue vs Collections Graph */}
                    <div className="p-8">
                        <div className="mb-8">
                            <h3 className="font-medium text-gray-900 mb-2">Revenue vs Collections tracking</h3>
                            <p className="text-sm text-gray-500 max-w-sm">
                                Monitor billed revenue against actual collections. Identify payment gaps instantly.
                            </p>
                        </div>

                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data}>
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9ca3af', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{
                                            borderRadius: '12px',
                                            border: '1px solid #e5e7eb',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke="#6366f1"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 4, strokeWidth: 0 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="collected"
                                        stroke="#22c55e"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 4, strokeWidth: 0 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Right Side — Invoice Preview */}
                    <div className="p-8 bg-gray-50/30">
                        <div className="mb-8">
                            <h3 className="font-medium text-gray-900 mb-2">Automated smart invoicing</h3>
                            <p className="text-sm text-gray-500 max-w-sm">
                                AI-powered invoice generation and tracking. Get paid 30% faster with zero errors.
                            </p>
                        </div>

                        <div className="relative flex justify-center items-center py-4">
                            {/* Stacked Layers */}
                            <div className="absolute w-[85%] h-full bg-white rounded-xl shadow-sm rotate-2 translate-y-2 opacity-40" />
                            <div className="absolute w-[88%] h-full bg-white rounded-xl shadow-sm -rotate-1 translate-y-1 opacity-60" />

                            {/* Top Card */}
                            <div className="relative w-full bg-white rounded-xl shadow-sm p-6 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        </div>
                                        <span className="text-xs font-bold text-gray-900">JustPaid</span>
                                    </div>
                                    <div className="text-[10px] text-gray-400 font-medium">INV-456789</div>
                                </div>

                                <div className="mt-2">
                                    <div className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">Total Amount</div>
                                    <div className="text-2xl font-bold text-gray-900">$284,342.57</div>
                                </div>

                                <div className="space-y-2 mt-2">
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full" />
                                    <div className="h-1.5 w-5/6 bg-gray-50 rounded-full" />
                                    <div className="h-1.5 w-3/4 bg-gray-50 rounded-full" />
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] uppercase tracking-wide">
                                        <CheckCircle2 size={12} strokeWidth={3} />
                                        Verified
                                    </div>
                                    <div className="bg-gray-50 text-gray-400 text-[9px] font-bold px-2 py-1 rounded tracking-tight">
                                        Due in 15 days
                                    </div>
                                </div>

                                {/* Mini Document Icon Overlay (Top-Right of card) */}
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-xl shadow-md flex items-center justify-center text-indigo-500">
                                    <FileText size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
