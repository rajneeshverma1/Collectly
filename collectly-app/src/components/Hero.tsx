"use client";

import React from 'react';
import { motion } from 'framer-motion';
import localFont from 'next/font/local';
import { GradientButton } from './gradient-button';
import { BrandLogos } from './brand-logos';

const collectlyFont = localFont({
    src: '../app/fonts/collectly-font.woff2',
    variable: '--font-collectly',
    display: 'swap',
});

export const Hero = () => {
    return (
        <section className={`${collectlyFont.variable} font-sans relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden`} style={{ fontFamily: 'var(--font-collectly)' }}>
            {/* Background Image Layer */}
            <div className="absolute inset-x-0 top-[28%] bottom-0 overflow-hidden z-0">
                <div
                    className="absolute inset-0 bg-[url('/images/panel_1.png')] bg-cover bg-top opacity-60"
                />
                {/* Gradient Fade Overlay - Fade from clean white at the top to visible image */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-white/50 to-white" />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center relative z-10 py-20">

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-5xl md:text-6xl font-normal text-gray-900 leading-tight max-w-[700px] mx-auto"
                >
                    Billing <span className="font-bold">Automation for B2B</span> <br className="hidden md:block" /> that actually works
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-gray-500 font-normal mt-4 max-w-[600px] mx-auto leading-relaxed"
                >
                    Stop chasing invoices. Simplify your complex <br className="hidden md:block" /> workflows with AI billing from start to finish.
                </motion.p>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-6"
                >
                    <GradientButton>
                        Schedule demo
                    </GradientButton>
                </motion.div>

                {/* Brand Logos */}
                <div className="mt-auto pt-12">
                    <BrandLogos />
                </div>
            </div>
        </section>
    );
};
