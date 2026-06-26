"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Plug, Cpu } from 'lucide-react';

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  accentColor: 'red' | 'yellow' | 'blue' | 'purple';
  index: number;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ icon, title, description, accentColor, index }) => {
  const colorMap = {
    red: {
      bg: 'from-red-500/5 to-transparent',
      border: 'border-red-500/20',
      borderHover: 'group-hover:border-red-500/40',
      iconBg: 'bg-red-500/10',
      iconBorder: 'border-red-500/30',
      iconGlow: 'shadow-red-500/10',
    },
    yellow: {
      bg: 'from-yellow-500/5 to-transparent',
      border: 'border-yellow-500/20',
      borderHover: 'group-hover:border-yellow-500/40',
      iconBg: 'bg-yellow-500/10',
      iconBorder: 'border-yellow-500/30',
      iconGlow: 'shadow-yellow-500/10',
    },
    blue: {
      bg: 'from-blue-500/5 to-transparent',
      border: 'border-blue-500/20',
      borderHover: 'group-hover:border-blue-500/40',
      iconBg: 'bg-blue-500/10',
      iconBorder: 'border-blue-500/30',
      iconGlow: 'shadow-blue-500/10',
    },
    purple: {
      bg: 'from-purple-500/5 to-transparent',
      border: 'border-purple-500/20',
      borderHover: 'group-hover:border-purple-500/40',
      iconBg: 'bg-purple-500/10',
      iconBorder: 'border-purple-500/30',
      iconGlow: 'shadow-purple-500/10',
    },
  };

  const colors = colorMap[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-5 rounded-2xl border ${colors.border} bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-sm`}
    >
      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${colors.iconBg} border ${colors.iconBorder} shadow-lg ${colors.iconGlow} mb-4`}>
        {React.cloneElement(icon as React.ReactElement<{ size: number }>, { size: 18 })}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs text-gray-500 leading-relaxed max-w-xs">
        {description}
      </p>
    </motion.div>
  );
};

export const ProblemSection: React.FC<{ id?: string }> = ({ id }) => {
  const problems = [
    {
      icon: <span className="text-red-400 rotate-[15deg]">{"\u233d"}</span>, // Mic off or similar
      title: "Voice Transcription Wasn't Built for This",
      description: "STT models can't reliably capture 16-digit card numbers. We built custom digit extraction so you don't have to.",
      accentColor: 'red' as const,
    },
    {
      icon: <Shield className="text-yellow-400" />,
      title: "PCI Compliance Is a Minefield",
      description: "Card data on your servers means quarterly PCI audits on your entire system. Maven keeps you out of scope.",
      accentColor: 'yellow' as const,
    },
    {
      icon: <Plug className="text-blue-400" />,
      title: "Multi-Gateway Headache",
      description: "Different clients, different processors. One Maven integration covers them all.",
      accentColor: 'blue' as const,
    },
    {
      icon: <Cpu className="text-purple-400" />,
      title: "IVRs Are Dead",
      description: "&quot;Press 1, then enter your card number.&quot; Callers hate it. Maven talks to them like a human, not a menu.",
      accentColor: 'purple' as const,
    },
  ];

  return (
    <section id={id} className="relative bg-white py-16 md:py-24 overflow-hidden">
      {/* Content */}
      <div className="relative max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight">
            <span className="text-gray-500">Every voice AI company</span>
            <br />
            <span className="text-gray-900">hits the payment wall.</span>
          </h2>
          <p className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            The infrastructure that worked at Series A breaks at scale. Payment failures and legacy systems become the bottleneck to growth.
          </p>
        </motion.div>

        {/* Card Grid - 2x2 as per reference image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              icon={problem.icon}
              title={problem.title}
              description={problem.description}
              accentColor={problem.accentColor}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
