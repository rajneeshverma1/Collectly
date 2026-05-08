"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export const DocumentStackCard = () => {
    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="w-[220px] h-[280px] bg-[#111111] border border-transparent rounded-2xl shadow-2xl p-6 flex flex-col gap-4 transition-all duration-300"
        >
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-400 border border-transparent">
                    <FileText size={20} />
                </div>
                <div className="bg-emerald-500/10 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase border border-transparent">
                    Pending
                </div>
            </div>

            <div className="space-y-3 mt-4">
                <div className="h-2 w-3/4 bg-white/5 rounded-full" />
                <div className="h-2 w-full bg-white/5 rounded-full" />
                <div className="h-2 w-5/6 bg-white/5 rounded-full" />
            </div>

            <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="h-4 w-12 bg-white/5 rounded-lg border border-transparent" />
                    <div className="h-4 w-8 bg-indigo-500/10 rounded-lg border border-transparent" />
                </div>
            </div>
        </motion.div>
    );
};
