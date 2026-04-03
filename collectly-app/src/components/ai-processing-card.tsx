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
            className="w-[220px] h-[280px] bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center justify-center text-center gap-4 border border-gray-50"
        >
            <div className="w-14 h-14 bg-violet-50 rounded-full flex items-center justify-center text-violet-500 mb-2">
                <Cpu size={28} />
            </div>

            <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">AI Processing</h3>
                <p className="text-xs text-gray-400 flex items-center justify-center gap-1.5 font-medium">
                    <Clock size={12} /> Analyzing invoice...
                </p>
            </div>

            <div className="w-full mt-4 px-2">
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
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
                    <div key={i} className="h-1 w-6 bg-gray-50 rounded-full" />
                ))}
            </div>
        </motion.div>
    );
};
