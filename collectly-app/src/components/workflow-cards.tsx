"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { DocumentStackCard } from './document-stack-card';
import { AIProcessingCard } from './ai-processing-card';
import { ResultInvoiceCard } from './result-invoice-card';

export const WorkflowCards = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" as any }
        }
    };

    const arrowVariants = {
        hidden: { opacity: 0, x: -10 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.5, delay: 0.8 }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center justify-center gap-10 mt-12"
        >
            {/* Card 1 */}
            <motion.div variants={itemVariants}>
                <DocumentStackCard />
            </motion.div>

            {/* Arrow 1 */}
            <motion.div variants={arrowVariants} className="hidden md:block text-gray-200">
                <ChevronRight size={32} strokeWidth={1.5} />
            </motion.div>

            {/* Card 2 */}
            <motion.div variants={itemVariants}>
                <AIProcessingCard />
            </motion.div>

            {/* Arrow 2 */}
            <motion.div variants={arrowVariants} className="hidden md:block text-gray-200">
                <ChevronRight size={32} strokeWidth={1.5} />
            </motion.div>

            {/* Card 3 */}
            <motion.div variants={itemVariants}>
                <ResultInvoiceCard />
            </motion.div>
        </motion.div>
    );
};
