"use client";

import React from "react";
import { motion } from "framer-motion";

export const WordmarkSection = () => {
    return (
        <section className="relative w-full h-[300px] md:h-[400px] overflow-hidden bg-black select-none pointer-events-none">
            {/* 1. Depth Overlay (Radial Wash) */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(30,41,59,0.1),transparent_70%)] z-10" />

            {/* 2. Giant Background Wordmark */}
            <div className="absolute inset-x-0 bottom-0 top-0 flex items-end justify-center z-20 pb-12 md:pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-baseline"
                >
                    <span className="text-[180px] xs:text-[200px] md:text-[340px] font-semibold text-slate-800/15 tracking-tighter leading-[0.8]">
                        Collectly.ai
                    </span>
                    {/* Giant Green Dot */}
                    <div className="w-8 h-8 md:w-20 md:h-20 bg-green-500 rounded-full mb-2 md:mb-6 ml-1 md:ml-4 shadow-[0_0_60px_rgba(34,197,94,0.4)]" />
                </motion.div>
            </div>

            {/* 3. Deep Bottom Shadow / Fade (The "Hiding" layer) */}
            <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black via-black/90 to-transparent z-30" />
        </section>
    );
};
