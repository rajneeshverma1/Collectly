"use client";

import React from "react";
import { motion } from "framer-motion";

export const FinalCTA = () => {
    return (
        <section className="py-20 px-6" style={{ backgroundColor: '#0B0B0F' }}>
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="bg-[#111111] rounded-[32px] py-12 md:py-16 px-8 md:px-24 text-center flex flex-col items-center shadow-2xl"
                >
                    <h2 className="text-xl md:text-3xl font-normal text-white tracking-tight mb-4">
                        Schedule a personalized demo today
                    </h2>

                    <p className="text-[#94A3B8] text-base md:text-lg max-w-[800px] leading-relaxed mb-8">
                        our AI Billing Agent can transform how you manage invoicing, payments,
                        and growth. Let&apos;s talk about what it can do for you.
                    </p>

                    <div className="flex flex-col items-center gap-4">
                        <button className="bg-[#6366F1] text-white font-semibold py-2 px-10 rounded-full shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:scale-105 transition-all duration-300 hover:brightness-110 active:scale-95 leading-none overflow-hidden">
                            Talk to an expert
                        </button>

                        <span className="text-xs md:text-sm text-[#94A3B8] font-medium opacity-60">
                            No credit card required.
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
