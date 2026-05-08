"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Clock } from 'lucide-react';

export const AIProcessingCard = () => {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="w-[220px] h-[280px] bg-[#111111] border border-transparent rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-center text-center gap-4 transition-all duration-300"
        >
            <div className="w-14 h-14 bg-violet-500/10 rounded-full flex items-center justify-center text-violet-400 mb-2 border border-transparent">
                <Cpu size={28} />
            </div>

            <div className="space-y-1">
                <h3 className="font-semibold text-white">AI Processing</h3>
                <p className="text-xs text-white/50 flex items-center justify-center gap-1.5 font-medium">
                    <Clock size={12} /> Analyzing invoice...
                </p>
            </div>

            <div className="w-full mt-4 px-2">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: "30%" }}
                        animate={{ width: ["30%", "60%", "30%"] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="h-full bg-indigo-500 rounded-full"
                    />
                </div>
            </div>

            <div className="mt-4 flex gap-1.5">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-1 w-6 bg-white/10 rounded-full" />
                ))}
            </div>
        </motion.div>
    );
};
