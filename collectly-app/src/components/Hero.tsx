"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GradientButton } from './gradient-button';
import { BrandLogos } from './brand-logos';
import { HeroVisual } from './HeroVisual';

export const Hero = () => {
    return (
        <section
            className="font-sans relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-white"
        >
            {/* ── Layer 1: Full landing page background (30% of the image) ── */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'url("/Image%2020-06-26%20at%2020.23.jpg")',
                    backgroundSize: '100% 333%', // Shows only 30% of the image vertically
                    backgroundPosition: 'top center', // Uses the top part, hiding the yellowish bottom
                    backgroundRepeat: 'no-repeat',
                    maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 65%, black 80%, black 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 65%, black 80%, black 100%)',
                    opacity: 0.95
                }}
            />


            {/* ── Content ── */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center relative z-10 pt-48 md:pt-56 pb-10">


                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-normal text-gray-900 leading-tight max-w-[850px] mx-auto tracking-tight"
                >
                    Billing <span className="font-bold" style={{ fontFamily: 'Satoshi, sans-serif' }}>Automation for<br />B2B</span> that actually works
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-xl text-gray-500 font-normal mt-8 max-w-[600px] mx-auto leading-relaxed"
                >
                    Stop chasing invoices. Simplify your complex{' '}
                    <br className="hidden md:block" /> workflows with AI billing from start to finish.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row items-center gap-4 justify-center"
                >
                    <button className="w-full sm:w-auto bg-[#6366f1] hover:bg-[#4f46e5] text-gray-900 px-10 py-4 text-lg rounded-full font-medium transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        Talk to Founder
                    </button>
                    <button className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 px-10 py-4 text-lg rounded-full font-medium transition-all shadow-[0_0_0_1px_rgba(0,0,0,0.1)] hover:shadow-[0_0_0_1px_rgba(0,0,0,0.2)]">
                        Watch demo
                    </button>
                </motion.div>

                {/* Visual Workflow Illustration */}
                <div className="relative w-full mt-10">
                    <HeroVisual />
                </div>

                <div className="mt-auto pt-20">
                    {/* The cards from JustPaid can be added here or in a separate section */}
                </div>
            </div>
        </section>
    );
};
