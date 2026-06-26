"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';

const DocumentMockup = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2.5 w-[110px]">
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-blue-100" />
            <div className="h-1.5 w-8 bg-gray-200 rounded-full" />
        </div>
        <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
        <div className="h-1.5 w-12 bg-gray-200 rounded-full" />
        <div className="h-1.5 w-full bg-gray-100 rounded-full mt-1" />
        <div className="h-1.5 w-3/4 bg-gray-100 rounded-full" />
        <div className="mt-2 flex justify-end">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
        </div>
    </div>
);

export const HeroVisual = () => {
    return (
        <div className="w-full max-w-5xl mx-auto mt-20 relative z-20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                
                {/* Step 1: Documents */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] w-full md:w-[320px] flex items-center justify-center"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <DocumentMockup />
                        <DocumentMockup />
                        <DocumentMockup />
                        <DocumentMockup />
                    </div>
                </motion.div>

                {/* Arrow 1 */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="hidden md:block text-gray-400"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                    </svg>
                </motion.div>

                {/* Step 2: Notification */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] w-full md:w-[320px] h-[350px] flex flex-col items-center justify-center relative"
                >
                    <div className="bg-white rounded-2xl p-5 shadow-md w-full mb-6">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                                <Bell size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 text-lg">Invoice Due</h4>
                                <p className="text-gray-500 text-sm">PARKE-0003</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="space-y-2">
                                <div className="h-1.5 w-12 bg-gray-200 rounded-full" />
                                <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-gray-900 text-lg">$284,342.57</p>
                                <p className="text-orange-500 text-sm font-medium mt-1">Due in 15 days</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* Dots indicator */}
                    <div className="flex gap-1.5 mt-2">
                        <div className="h-1.5 w-6 rounded-full bg-indigo-500" />
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                        <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                    </div>
                </motion.div>

                {/* Arrow 2 */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="hidden md:block text-white/80"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" />
                    </svg>
                </motion.div>

                {/* Step 3: Final Invoice Stack */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] w-full md:w-[320px] h-[350px] relative flex items-end justify-center"
                >
                    {/* Background stacked cards */}
                    <div className="absolute top-6 left-8 right-8 h-full bg-white/40 rounded-2xl shadow-sm" style={{ transform: 'translateY(-10px) scale(0.9)' }} />
                    <div className="absolute top-8 left-6 right-6 h-full bg-white/60 rounded-2xl shadow-sm" style={{ transform: 'translateY(-5px) scale(0.95)' }} />
                    
                    {/* Main top card */}
                    <div className="bg-white rounded-2xl p-6 shadow-lg w-full h-[90%] relative z-10 flex flex-col items-center text-center">
                        <div className="flex items-center gap-1.5 mb-6 mt-2">
                            <span className="font-bold text-xl tracking-tight text-gray-900">Collectly</span>
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                        </div>
                        
                        <p className="text-gray-500 text-sm mb-2 tracking-wide font-mono">INV-456789</p>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">$284,342.57</h2>
                        <p className="text-gray-900 text-sm font-medium mb-8">Due in 15 days</p>
                        
                        <div className="w-full space-y-4 mt-auto">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">To</span>
                                <div className="h-2.5 w-12 bg-gray-200 rounded-full" />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400">From</span>
                                <div className="h-2.5 w-20 bg-gray-200 rounded-full" />
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};
