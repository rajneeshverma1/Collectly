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
            className="w-[220px] h-[280px] bg-white rounded-2xl shadow-sm p-6 flex flex-col gap-4 border border-gray-50"
        >
            <div className="flex items-center justify-between">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-500">
                    <FileText size={20} />
                </div>
                <div className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-md tracking-wider uppercase">
                    Pending
                </div>
            </div>

            <div className="space-y-3 mt-4">
                <div className="h-2 w-3/4 bg-gray-100 rounded-full" />
                <div className="h-2 w-full bg-gray-100 rounded-full" />
                <div className="h-2 w-5/6 bg-gray-100 rounded-full" />
            </div>

            <div className="mt-auto flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="h-4 w-12 bg-gray-50 rounded-lg" />
                    <div className="h-4 w-8 bg-indigo-50 rounded-lg" />
                </div>
            </div>
        </motion.div>
    );
};
