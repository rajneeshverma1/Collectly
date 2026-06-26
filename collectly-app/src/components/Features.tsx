"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    FileText,
    CheckCircle2,
    Send,
    Clock,
    AlertCircle
} from "lucide-react";

const FeatureCard = ({ title, description, children, delay }: { title: string, description: string, children: React.ReactNode, delay: number }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        className="bg-white/5 backdrop-blur-md border border-transparent rounded-[28px] p-8 md:p-10 shadow-2xl flex flex-col gap-8 transition-all duration-300 group"
    >
        <div className="flex-grow flex items-center justify-center min-h-[160px]">
            {children}
        </div>
        <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
            <p className="text-gray-900/50 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    </motion.div>
);

const Features = ({ id }: { id?: string }) => {
    return (
        <section id={id} className="py-24 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight tracking-tight max-w-3xl mx-auto"
                    >
                        Unlock effortless revenue management for your startup
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1: AI Contract Extraction */}
                    <FeatureCard
                        title="AI Contract Extraction"
                        description="Upload contracts and our AI automatically extracts billing terms, payment schedules, and line items."
                        delay={0.1}
                    >
                        <div className="w-full max-w-[240px] bg-white/5 border border-transparent rounded-2xl p-4 shadow-xl relative">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-400">
                                    <FileText size={20} />
                                </div>
                                <div className="flex-grow">
                                    <div className="text-xs font-semibold text-gray-900">invoice-jan-2025.pdf</div>
                                    <div className="text-[10px] text-gray-900/40 mt-0.5">45 KB / 145 KB</div>
                                </div>
                            </div>
                            <div className="mt-4 w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "80%" }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                    className="h-full bg-blue-500 rounded-full"
                                />
                            </div>
                        </div>
                    </FeatureCard>

                    {/* Card 2: Multi-Currency Support */}
                    <FeatureCard
                        title="Multi-Currency Support"
                        description="Bill customers in their preferred currency with support for all major global currencies automatically."
                        delay={0.2}
                    >
                        <div className="relative h-[120px] w-full flex justify-center items-center">
                            {[
                                { name: 'CAD', color: 'bg-purple-500/20 text-purple-400 border-transparent', x: 'translate-x-[45px] rotate-6' },
                                { name: 'GBP', color: 'bg-emerald-500/20 text-emerald-400 border-transparent', x: 'translate-x-[15px] rotate-2' },
                                { name: 'EUR', color: 'bg-rose-500/20 text-rose-400 border-transparent', x: '-translate-x-[15px] -rotate-2' },
                                { name: 'USD', color: 'bg-blue-500/20 text-blue-400 border-transparent', x: '-translate-x-[45px] -rotate-6' },
                            ].reverse().map((card, i) => (
                                <div
                                    key={i}
                                    className={`absolute w-16 h-24 ${card.color} border rounded-xl shadow-xl font-bold text-xs flex flex-col justify-between p-3 transform transition-transform ${card.x}`}
                                >
                                    <span>{card.name}</span>
                                    <div className="w-3 h-3 border border-current rounded-sm opacity-30 self-end" />
                                </div>
                            ))}
                        </div>
                    </FeatureCard>

                    {/* Card 3: AI-Powered Collections */}
                    <FeatureCard
                        title="AI-Powered Collections"
                        description="Automated payment reminders that adapt to customer behavior for faster intelligent follow-ups."
                        delay={0.3}
                    >
                        <div className="w-full max-w-[260px] bg-white/5 border border-transparent rounded-2xl overflow-hidden shadow-xl">
                            <div className="bg-white/5 px-4 py-2 flex items-center justify-between border-b border-transparent">
                                <span className="text-[10px] font-bold text-gray-900/40 uppercase tracking-wider">AI Agent</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] font-medium text-green-400">Active</span>
                                </div>
                            </div>
                            <div className="p-5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock size={12} className="text-gray-900/40" />
                                        <span className="text-[10px] text-gray-900/50">Follow-up schedule</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-blue-400">
                                        <CheckCircle2 size={12} />
                                        <span className="text-[10px] font-bold">Invoices paid</span>
                                    </div>
                                </div>
                                <div className="pt-3 flex items-center justify-between text-gray-900/40">
                                    <div className="flex items-center gap-1.5">
                                        <Send size={12} />
                                        <span className="text-[10px] font-medium">Auto-follow up</span>
                                    </div>
                                    <div className="w-4 h-4 rounded-full bg-white/10 border border-transparent" />
                                </div>
                            </div>
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    );
};

export default Features;
