"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const BrandLogos = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-12"
        >
            {/* Stripe Logo */}
            <div className="text-[#635BFF] text-2xl md:text-3xl font-bold tracking-tight">
                stripe
            </div>

            {/* Authorize.net Logo */}
            <div className="flex flex-col items-center">
                <span className="text-gray-900 text-xl md:text-2xl font-medium tracking-wide">authorize.net</span>
                <span className="text-gray-400 text-xs tracking-wider">A Visa Solution</span>
            </div>

            {/* Adyen Logo */}
            <div className="text-[#0ABF53] text-2xl md:text-3xl font-bold tracking-tight">
                adyen
            </div>

            {/* + More */}
            <div className="text-gray-300 text-lg md:text-xl font-medium">
                + more
            </div>
        </motion.div>
    );
};
