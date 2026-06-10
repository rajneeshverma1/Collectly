"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
        title: "Track prepaid expenses, sync amortization schedules automatically.",
        category: "Accountants",
        image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "Reconciliation with Stripe, QuickBooks, and bank feeds in real-time.",
        category: "Financial experts",
        image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "Centralize global billing and manage multi-currency revenue.",
        category: "Entrepreneurs & business owners",
        image: "https://images.unsplash.com/photo-1548449112-96a38a643324?auto=format&fit=crop&q=80&w=800",
    },
    {
        title: "Autonomous AI billing for high-growth tech startups.",
        category: "CFOs & Finance Teams",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    },
];

const CarouselCard = ({ item }: { item: typeof testimonials[0] }) => (
    <div className="flex-shrink-0 group cursor-pointer w-[450px] md:w-[650px] lg:w-[750px]">
        <div className="relative aspect-[21/9] md:aspect-[2.4/1] w-full rounded-3xl overflow-hidden transition-all duration-500 shadow-2xl">
            {/* Background Image */}
            <img
                src={item.image}
                alt={item.category}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Dark Overlay - More subtle and cinematic */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Content Container (Centered Text) */}
            <div className="absolute inset-0 flex items-center justify-center p-12 text-center">
                <h3 className="text-xl md:text-2xl font-medium text-white leading-tight max-w-[85%] transition-all duration-500 group-hover:scale-[1.02]">
                    {item.title}
                </h3>
            </div>
        </div>
        {/* Caption - Left Aligned Below Card */}
        <div className="mt-5 px-2 flex items-center gap-3">
            <div className="h-px w-8 bg-indigo-500/50" />
            <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                {item.category}
            </span>
        </div>
    </div>
);

export const TestimonialsCarousel = () => {
    return (
        <section className="py-24 overflow-hidden select-none" style={{ backgroundColor: '#0B0B0F' }}>
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 16px)); }
                }
                .scroll-track {
                    display: flex;
                    width: max-content;
                    animation: scroll 50s linear infinite;
                    gap: 32px;
                }
                .scroll-track:hover {
                    animation-play-state: paused;
                }
            `}} />

            <div className="max-w-5xl mx-auto px-6 mb-16 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-medium text-white mb-6 tracking-tight"
                >
                    Built for modern finance teams that demand more
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-lg text-[#94A3B8] max-w-[700px] mx-auto leading-relaxed"
                >
                    Join hundreds of high-growth companies using Collectly to bridge the gap <br className="hidden md:block" /> between their billing systems and actual cash flow.
                </motion.p>
            </div>

            <div className="relative">
                {/* Horizontal Scrolling Track */}
                <div className="scroll-track">
                    {/* First set of cards */}
                    {testimonials.map((item, idx) => (
                        <CarouselCard key={`t1-${idx}`} item={item} />
                    ))}
                    {/* Duplicate set for seamless looping */}
                    {testimonials.map((item, idx) => (
                        <CarouselCard key={`t2-${idx}`} item={item} />
                    ))}
                </div>

                {/* Soft side gradients */}
                <div className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to right, #0B0B0F, transparent)' }} />
                <div className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10" style={{ background: 'linear-gradient(to left, #0B0B0F, transparent)' }} />
            </div>
        </section>
    );
};
