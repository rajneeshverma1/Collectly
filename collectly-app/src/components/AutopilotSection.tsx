"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bell, Clock, Send, Mail, Settings2 } from 'lucide-react';

export const AutopilotSection = () => {
    return (
        <section className="py-24 bg-[#0a0a0a]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="bg-[#121212] rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden w-full max-w-[500px] mx-auto border border-white/5">
                            {/* Window Header */}
                            <div className="px-4 py-3 bg-[#1a1a1a] flex items-center gap-2 border-b border-white/5">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            
                            {/* Dashboard Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-semibold text-white">Automatic Reminders</h3>
                                    <button className="border border-white/10 text-gray-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors">
                                        <Settings2 className="w-3.5 h-3.5" />
                                        AI Settings
                                    </button>
                                </div>
                                
                                <div className="flex items-center gap-4 mb-8 text-sm">
                                    <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
                                        87% collection rate
                                    </div>
                                    <div className="w-px h-4 bg-white/10" />
                                    <div className="text-gray-400">
                                        $284K collected this month
                                    </div>
                                </div>

                                {/* Reminder Sequence */}
                                <div className="border border-white/10 rounded-xl p-5 mb-4 bg-[#161616]">
                                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-5">Reminder Sequence</p>
                                    
                                    <div className="flex items-center justify-between relative">
                                        {/* Connecting Line */}
                                        <div className="absolute top-5 left-6 right-6 h-px bg-white/10 -z-0" />
                                        
                                        {/* Step 1 */}
                                        <div className="flex flex-col items-center gap-2 relative z-10">
                                            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-white/5 flex items-center justify-center text-gray-400">
                                                <Bell className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">Day 1</span>
                                        </div>
                                        
                                        {/* Step 2 */}
                                        <div className="flex flex-col items-center gap-2 relative z-10">
                                            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-white/5 flex items-center justify-center text-gray-400">
                                                <Clock className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">Day 7</span>
                                        </div>
                                        
                                        {/* Step 3 (Active) */}
                                        <div className="flex flex-col items-center gap-2 relative z-10">
                                            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-orange-500/50 flex items-center justify-center text-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.15)]">
                                                <Send className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] text-white font-medium">Day 14</span>
                                        </div>
                                        
                                        {/* Step 4 */}
                                        <div className="flex flex-col items-center gap-2 relative z-10">
                                            <div className="w-10 h-10 rounded-full bg-[#1e1e1e] border border-white/5 flex items-center justify-center text-gray-400">
                                                <Mail className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] text-gray-400 font-medium">Day 30</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Email Preview */}
                                <div className="border border-white/10 rounded-xl p-5 bg-[#161616]">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex items-center gap-2 text-gray-300 font-medium text-sm">
                                            <Mail className="w-4 h-4 text-gray-400" />
                                            Email Preview
                                        </div>
                                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-orange-500/10 text-orange-500">Urgent</span>
                                    </div>
                                    
                                    <p className="text-xs text-gray-400 mb-3">Escalation — INV-0042 (14 days)</p>
                                    <div className="space-y-2">
                                        <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
                                        <div className="h-1.5 w-1/2 bg-white/5 rounded-full" />
                                        <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="order-1 lg:order-2 max-w-lg"
                    >
                        <h2 className="text-4xl md:text-5xl font-normal text-white leading-tight mb-6 tracking-tight">
                            Collections on Autopilot
                        </h2>
                        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                            Automated payment reminders and escalation sequences that adapt to customer behavior, so your team stops chasing invoices and gets paid faster.
                        </p>
                        <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-3.5 rounded-full font-medium transition-colors flex items-center gap-2 group shadow-md">
                            Stop chasing payments
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                    
                </div>
            </div>
        </section>
    );
};
