"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const Testimonials = () => {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-secondary p-10 lg:p-20 rounded-[3rem] relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-8">
                                <Quote className="text-white" size={24} />
                            </div>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-3xl lg:text-4xl font-bold text-white mb-8 leading-tight"
                            >
                                &quot;With JustPaid, I can finally breathe easy knowing my finances are
                                under control. The automated processes and real-time insights give
                                me the peace of mind to focus on growing my business.&quot;
                            </motion.h2>
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-primary/20 rounded-full border border-transparent flex items-center justify-center text-primary font-bold">
                                    JS
                                </div>
                                <div>
                                    <p className="text-white font-bold">John Smith</p>
                                    <p className="text-primary/80 text-sm">CEO @ TechFlow</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full flex justify-center lg:justify-end">
                            <div className="bg-white/5 backdrop-blur-sm border border-transparent p-8 rounded-3xl w-full max-w-md">
                                <h4 className="text-white font-bold mb-6">Revenue Growth</h4>
                                <div className="space-y-6">
                                    {[
                                        { label: "Accounts Receivable", value: "98%", color: "bg-primary" },
                                        { label: "Payment Speed", value: "+30%", color: "bg-blue-400" },
                                        { label: "Manual Work", value: "-85%", color: "bg-indigo-400" },
                                    ].map((stat, i) => (
                                        <div key={i}>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-white/60">{stat.label}</span>
                                                <span className="text-white font-bold">{stat.value}</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: stat.value.includes("+") || stat.value.includes("-") ? "100%" : stat.value }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                                                    className={`h-full ${stat.color}`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
