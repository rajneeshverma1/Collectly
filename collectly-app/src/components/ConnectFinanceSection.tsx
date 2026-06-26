"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search } from 'lucide-react';

const IntegrationCard = ({ name, category, status, isConnected }: { name: string, category: string, status?: string, isConnected?: boolean }) => (
    <div className="bg-white rounded-xl p-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)] flex items-center gap-3 w-full">
        <div className="w-10 h-10 rounded-lg bg-gray-50 flex-shrink-0 flex items-center justify-center">
            {/* Placeholder for integration logo */}
            <div className="w-5 h-5 rounded-full bg-blue-100" />
        </div>
        <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-900">{name}</h4>
            <p className="text-xs text-gray-400">{category}</p>
            {isConnected && (
                <div className="flex items-center gap-1 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] font-medium text-green-600 uppercase tracking-wide">Synced</span>
                </div>
            )}
        </div>
    </div>
);

export const ConnectFinanceSection = () => {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className="max-w-lg"
                    >
                        <h2 className="text-4xl md:text-5xl font-normal text-gray-900 leading-tight mb-6 tracking-tight">
                            Connect Your Entire Finance Stack
                        </h2>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed font-normal">
                            Sync Stripe, QuickBooks, Xero, and Salesforce in minutes. One unified dashboard for all your billing and financial data across every platform.
                        </p>
                        <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-3.5 rounded-full font-medium transition-colors flex items-center gap-2 group shadow-md">
                            Sync my finance stack
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>

                    {/* Right Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.08)] overflow-hidden w-full max-w-[600px] mx-auto">
                            {/* Window Header */}
                            <div className="px-4 py-3 bg-white flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            
                            {/* Dashboard Content */}
                            <div className="p-6 pt-2">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-bold text-gray-900">Integrations</h3>
                                    <div className="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
                                        3 Connected
                                    </div>
                                </div>

                                {/* Search Bar */}
                                <div className="bg-gray-50 rounded-lg p-2.5 flex items-center gap-2 mb-6 shadow-sm">
                                    <Search className="w-4 h-4 text-gray-400" />
                                    <div className="text-sm text-gray-400 font-medium">Search integrations...</div>
                                </div>
                                
                                {/* Enabled Integrations */}
                                <div className="mb-6">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">Enabled Integrations</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <IntegrationCard name="Stripe" category="Payments" isConnected={true} />
                                        <IntegrationCard name="QuickBooks" category="Accounting" isConnected={true} />
                                        <IntegrationCard name="Xero" category="Accounting" isConnected={true} />
                                    </div>
                                </div>

                                {/* All Integrations */}
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3">All Integrations</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        <IntegrationCard name="Salesforce" category="CRM" />
                                        <IntegrationCard name="NetSuite" category="ERP" />
                                        <IntegrationCard name="Slack" category="Notifications" />
                                        <IntegrationCard name="PandaDoc" category="Contracts" />
                                        <IntegrationCard name="HubSpot" category="CRM" />
                                        <IntegrationCard name="Plaid" category="Banking" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                </div>
            </div>
        </section>
    );
};
