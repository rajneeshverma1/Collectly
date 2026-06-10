"use client";

import React from "react";
import { motion } from "framer-motion";

export const WordmarkSection = () => {
    return (
        <section className="relative w-full h-[300px] md:h-[450px] overflow-hidden select-none pointer-events-none" style={{ backgroundColor: '#0B0B0F' }}>
            {/* 1. Depth Overlay (Radial Wash) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,41,59,0.1),transparent_70%)] z-10" />

            {/* 2. Giant Background Wordmark */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center z-20 pb-10 md:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline"
                >
                    <span className="text-[100px] sm:text-[180px] md:text-[24vw] lg:text-[23vw] font-semibold tracking-[-0.08em] leading-[0.8] whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-b from-white/30 via-white/10 to-transparent">
                        Collectly.ai
                    </span>
                    {/* Giant Green Dot */}
                    <div className="w-5 h-5 sm:w-12 sm:h-12 md:w-[4vw] md:h-[4vw] bg-green-400 rounded-full mb-1 sm:mb-2 md:mb-[0.7vw] ml-0.5 sm:ml-1 md:ml-[0.7vw] shadow-[0_0_60px_rgba(74,222,128,0.7)]" />
                </motion.div>
            </div>

            {/* 3. Deep Bottom Shadow / Fade (The "Hiding" layer) */}
            <div className="absolute bottom-0 left-0 right-0 h-48 z-30" style={{ background: 'linear-gradient(to top, #0B0B0F, rgba(11,11,15,0.9), transparent)' }} />
        </section>
    );
};
