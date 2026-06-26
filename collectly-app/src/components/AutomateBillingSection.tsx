"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';

const InvoiceRow = ({ 
    id, 
    amount, 
    status, 
    statusColor,
    statusBg,
    isFaded = false
}: { 
    id: string; 
    amount: string; 
    status: string; 
    statusColor: string;
    statusBg: string;
    isFaded?: boolean;
}) => (
    <div className={`grid grid-cols-4 items-center py-3 border-b border-gray-100 last:border-0 ${isFaded ? 'opacity-30' : ''}`}>
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex-shrink-0" />
            <div className="space-y-1">
                <div className="h-1.5 w-16 bg-gray-200 rounded-full" />
                <div className="h-1 w-24 bg-gray-100 rounded-full" />
            </div>
        </div>
        <div className="text-gray-400 text-sm font-mono">{id}</div>
        <div className="font-semibold text-gray-900">{amount}</div>
        <div className="flex justify-end">
            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusBg} ${statusColor}`}>
                {status}
            </span>
        </div>
    </div>
);

export const AutomateBillingSection = () => {
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
                            Automate Billing from Invoice to Payment
                        </h2>
                        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                            Create, send, and track invoices automatically with custom pricing models, scheduled billing cycles, and real-time payment tracking — zero manual work.
                        </p>
                        <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-8 py-3.5 rounded-full font-medium transition-colors flex items-center gap-2 group">
                            Automate my invoicing
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
                            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-400" />
                                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                <div className="w-3 h-3 rounded-full bg-green-400" />
                            </div>
                            
                            {/* Dashboard Content */}
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-gray-900">Invoices</h3>
                                    <button className="bg-[#6366f1] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5">
                                        <Plus className="w-4 h-4" />
                                        Create Invoice
                                    </button>
                                </div>
                                
                                {/* Tabs */}
                                <div className="flex gap-6 border-b border-gray-100 mb-6 text-sm">
                                    <button className="pb-3 border-b-2 border-gray-900 text-gray-900 font-medium">All</button>
                                    <button className="pb-3 text-gray-400 font-medium hover:text-gray-600">Draft</button>
                                    <button className="pb-3 text-gray-400 font-medium hover:text-gray-600">Scheduled</button>
                                    <button className="pb-3 text-gray-400 font-medium hover:text-gray-600">Sent</button>
                                    <button className="pb-3 text-gray-400 font-medium hover:text-gray-600">Overdue</button>
                                </div>

                                {/* Table Header */}
                                <div className="grid grid-cols-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                                    <div>Customer</div>
                                    <div>Invoice</div>
                                    <div>Amount</div>
                                    <div className="text-right">Status</div>
                                </div>

                                {/* Table Rows */}
                                <div className="flex flex-col">
                                    <InvoiceRow 
                                        id="INV-0087" 
                                        amount="$12,450.00" 
                                        status="Sent" 
                                        statusColor="text-orange-500" 
                                        statusBg="bg-orange-50" 
                                    />
                                    <InvoiceRow 
                                        id="INV-0086" 
                                        amount="$8,200.00" 
                                        status="Paid" 
                                        statusColor="text-green-500" 
                                        statusBg="bg-green-50" 
                                    />
                                    <InvoiceRow 
                                        id="INV-0085" 
                                        amount="$3,780.00" 
                                        status="Sent" 
                                        statusColor="text-orange-500" 
                                        statusBg="bg-orange-50" 
                                    />
                                    <InvoiceRow 
                                        id="INV-0084" 
                                        amount="$24,100.00" 
                                        status="Overdue" 
                                        statusColor="text-red-500" 
                                        statusBg="bg-red-50" 
                                        isFaded={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    
                </div>
            </div>
        </section>
    );
};
