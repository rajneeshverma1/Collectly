"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export const InvoiceCard = () => {
    return (
        <div className="relative w-full max-w-[280px] h-[240px] flex items-center justify-center">
            {/* Background stacked cards */}
            <div className="absolute top-4 left-6 w-full h-full bg-white border border-gray-100 rounded-2xl shadow-sm rotate-[-6deg]" />
            <div className="absolute top-2 left-3 w-full h-full bg-white border border-gray-100 rounded-2xl shadow-sm rotate-[-3deg]" />

            {/* Main active card */}
            <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full bg-white border border-gray-200 rounded-2xl shadow-xl p-5 flex flex-col gap-4"
            >
                <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-500">
                        <FileText size={20} />
                    </div>
                    <div className="px-2 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded uppercase tracking-wider">
                        Pending
                    </div>
                </div>

                <div className="space-y-3">
                    <div className="h-2 w-3/4 bg-gray-100 rounded" />
                    <div className="h-2 w-1/2 bg-gray-100 rounded" />
                    <div className="h-2 w-2/3 bg-gray-100 rounded" />
                </div>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="h-3 w-16 bg-gray-900/5 rounded" />
                    <div className="h-4 w-12 bg-indigo-500/10 rounded" />
                </div>
            </motion.div>
        </div>
    );
};
