"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { GradientButton } from './gradient-button';
import { BrandLogos } from './brand-logos';

export const Hero = () => {
    return (
        <section
            className="font-sans relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
            style={{ backgroundColor: '#0B0B0F' }}
        >
            {/* ── Layer 1: Radial spotlight gradient ── */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at 50% -20%, #1e1b4b, transparent 60%)',
                }}
            />

            {/* ── Layer 2: Subtle grid overlay — fades out toward bottom ── */}
            <div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)
                    `,
                    backgroundSize: '64px 64px',
                    maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
                }}
            />

            {/* ── Layer 3: Floating particles ── */}
            <div className="absolute top-[15%] left-[12%] w-2 h-2 rounded-full bg-blue-500 blur-xl opacity-70 animate-pulse pointer-events-none z-0" />
            <div className="absolute top-[25%] right-[18%] w-2 h-2 rounded-full bg-purple-500 blur-xl opacity-60 animate-pulse pointer-events-none z-0" style={{ animationDelay: '1s' }} />
            <div className="absolute bottom-[30%] left-[22%] w-2 h-2 rounded-full bg-orange-500 blur-xl opacity-50 animate-pulse pointer-events-none z-0" style={{ animationDelay: '2s' }} />
            <div className="absolute bottom-[20%] right-[14%] w-2 h-2 rounded-full bg-cyan-400 blur-xl opacity-60 animate-pulse pointer-events-none z-0" style={{ animationDelay: '0.5s' }} />

            {/* ── Bottom fade — seamlessly blends into #0B0B0F sections below ── */}
            <div className="absolute inset-x-0 bottom-0 h-48 z-10 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #0B0B0F, transparent)' }} />

            {/* ── Content ── */}
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center relative z-10 pt-44 pb-20">

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl md:text-6xl font-normal text-white leading-tight max-w-[850px] mx-auto tracking-tight"
                >
                    Billing <span className="font-bold">Automation for B2B and freelancers</span>
                    <br />
                    that actually works
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-lg text-white/50 font-normal mt-10 max-w-[600px] mx-auto leading-relaxed"
                >
                    Stop chasing invoices. Simplify your complex{' '}
                    <br className="hidden md:block" /> workflows with AI billing from start to finish.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-12"
                >
                    <GradientButton>Schedule demo</GradientButton>
                </motion.div>

                <div className="mt-auto pt-10">
                    <BrandLogos />
                </div>
            </div>
        </section>
    );
};
