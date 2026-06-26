"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export const ResultInvoiceCard = () => {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="w-[220px] h-[280px] bg-[#111111] border border-transparent rounded-2xl shadow-2xl p-6 flex flex-col gap-4 transition-all duration-300"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-white/5 border border-transparent rounded-lg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                    <span className="text-[10px] font-bold text-white tracking-widest uppercase">Collectly</span>
                </div>
                <div className="text-[10px] text-white/30 font-medium font-mono">INV-456789</div>
            </div>

            <div className="mt-4 text-center">
                <div className="text-[9px] text-white/30 uppercase tracking-widest font-bold">Total Amount</div>
                <div className="text-[26px] font-bold text-white tracking-tight mt-1 tabular-nums">$284,342.57</div>
            </div>

            <div className="space-y-2.5 mt-2">
                <div className="h-1.5 w-full bg-white/5 rounded-full" />
                <div className="h-1.5 w-5/6 bg-white/5 rounded-full" />
            </div>

            <div className="mt-auto flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] uppercase tracking-wider">
                    <CheckCircle2 size={12} strokeWidth={3} />
                    Verified
                </div>
                <div className="text-white/20 text-[9px] font-medium tracking-tight">
                    Due in 15 days
                </div>
            </div>
        </motion.div>
    );
};
