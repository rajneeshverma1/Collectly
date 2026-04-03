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
            className="w-[220px] h-[280px] bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4 border border-gray-50"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 bg-gray-900 rounded-lg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    </div>
                    <span className="text-xs font-bold text-gray-900">Collectly.ai</span>
                </div>
                <div className="text-[10px] text-gray-400 font-medium">INV-456789</div>
            </div>

            <div className="mt-4 text-center">
                <div className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Total Amount</div>
                <div className="text-[26px] font-bold text-gray-900 tracking-tight mt-1">$284,342.57</div>
            </div>

            <div className="space-y-2.5 mt-2">
                <div className="h-1.5 w-full bg-gray-50 rounded-full" />
                <div className="h-1.5 w-5/6 bg-gray-50 rounded-full" />
            </div>

            <div className="mt-auto flex flex-col items-center gap-2">
                <div className="flex items-center gap-1.5 text-emerald-500 font-bold text-[10px] uppercase tracking-wide">
                    <CheckCircle2 size={12} strokeWidth={3} />
                    Verified <span className="text-gray-400 font-medium">Due in 15 days</span>
                </div>
            </div>
        </motion.div>
    );
};
