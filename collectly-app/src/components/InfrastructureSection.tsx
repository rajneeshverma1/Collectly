"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, RefreshCw, Calendar } from 'lucide-react';

const cardData = [
    {
        title: "AI review complete",
        icon: <Bot className="w-4 h-4 text-blue-500" />,
        stat1Label: "Invoices",
        stat1Value: "128 scanned",
        stat2Label: "Flags",
        stat2Value: "3 anomalies",
    },
    {
        title: "Smart retry queued",
        icon: <RefreshCw className="w-4 h-4 text-blue-500" />,
        stat1Label: "Invoice",
        stat1Value: "#1920",
        stat2Label: "Status",
        stat2Value: "Retrying at best time",
    },
    {
        title: "Upcoming renewal",
        icon: <Calendar className="w-4 h-4 text-red-400" />,
        stat1Label: "Contract",
        stat1Value: "SaaS-0291",
        stat2Label: "Renewal",
        stat2Value: "In 7 days",
    }
];

const alternateData = [
    {
        title: "Anomaly Detected",
        icon: <Bot className="w-4 h-4 text-orange-500" />,
        stat1Label: "Invoice",
        stat1Value: "#2045",
        stat2Label: "Action",
        stat2Value: "Flagged for review",
    },
    {
        title: "Payment Captured",
        icon: <RefreshCw className="w-4 h-4 text-green-500" />,
        stat1Label: "Amount",
        stat1Value: "$4,500.00",
        stat2Label: "Method",
        stat2Value: "ACH Transfer",
    },
    {
        title: "Contract Upgraded",
        icon: <Calendar className="w-4 h-4 text-purple-500" />,
        stat1Label: "Account",
        stat1Value: "Enterprise",
        stat2Label: "MRR",
        stat2Value: "+$1,200",
    }
];

export const InfrastructureSection = () => {
    const [useAlternate, setUseAlternate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setUseAlternate(prev => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const activeData = useAlternate ? alternateData : cardData;

    return (
        <section className="py-32 bg-white relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Globe & Cards Area */}
                <div className="relative h-[400px] mb-20 flex justify-center items-center">
                    
                    {/* Rotating Globe Placeholder */}
                    {/* In a real app, you would use a library like globe.gl or cobe for a 3D dotted globe. */}
                    {/* Here we use a CSS animated representation of a dotted rotating sphere */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-20">
                        <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="w-full h-full rounded-full border-[1px] border-dashed border-gray-400"
                            style={{
                                background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.05) 100%)',
                                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                                borderRadius: '50%',
                                maskImage: 'radial-gradient(circle, black 30%, transparent 70%)',
                                WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)'
                            }}
                        />
                    </div>

                    {/* Glowing orange dots on globe */}
                    <motion.div 
                        animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="absolute top-[30%] left-[35%] w-4 h-4 bg-orange-500 rounded-full blur-[2px]"
                    />
                    <motion.div 
                        animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.3, 1] }}
                        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                        className="absolute top-[45%] right-[38%] w-3 h-3 bg-orange-500 rounded-full blur-[2px]"
                    />

                    {/* Floating Cards */}
                    <div className="absolute right-0 md:right-[10%] top-10 flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {activeData.map((card, index) => (
                                <motion.div
                                    key={card.title + index}
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.08)] w-[280px]"
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        {card.icon}
                                        <h4 className="font-semibold text-gray-900 text-sm">{card.title}</h4>
                                    </div>
                                    <div className="flex justify-between text-xs mb-1.5">
                                        <span className="text-gray-400">{card.stat1Label}</span>
                                        <span className="font-medium text-gray-900">{card.stat1Value}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400">{card.stat2Label}</span>
                                        <span className="font-medium text-gray-900">{card.stat2Value}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mt-12"
                >
                    <h2 className="text-4xl md:text-5xl font-normal text-gray-900 leading-tight mb-6 tracking-tight">
                        Battle-tested billing infrastructure
                    </h2>
                    <p className="text-lg text-gray-500 leading-relaxed">
                        Processing millions in payments across global businesses — automated invoicing, collections, and reconciliation that finance teams trust.
                    </p>
                </motion.div>

            </div>
        </section>
    );
};
