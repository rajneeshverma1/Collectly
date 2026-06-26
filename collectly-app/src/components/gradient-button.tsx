"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GradientButtonProps {
    children: React.ReactNode;
    className?: string;
}

export const GradientButton = ({ children, className }: GradientButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "h-8 px-6 inline-flex items-center justify-center gap-2 rounded-full",
                "bg-[#6366F1]",
                "text-gray-900 font-medium text-sm md:text-base antialiased",
                "shadow-md shadow-indigo-500/20 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
                "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2",
                "transition-all duration-200 ease-out",
                className
            )}
        >
            {children}
        </motion.button>
    );
};
