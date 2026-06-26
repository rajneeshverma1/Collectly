"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, MessageCircle, Globe, Palette, Shield, Sliders } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className="relative bg-white p-10 transition-all duration-500 ease-out group overflow-hidden shadow-sm hover:shadow-md rounded-3xl"
  >
    {/* Subtle highlight gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed max-w-[280px]">{description}</p>
    </div>
  </motion.div>
);

export const ConfigurableSection: React.FC = () => {
  const features = [
    {
      icon: <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}><Mic className="w-5 h-5 text-gray-900/80" /></motion.div>,
      title: "Custom Voice",
      description: "Choose the voice personality that matches your brand. Male, female, tone, pacing. It's all yours.",
    },
    {
      icon: <MessageCircle className="w-5 h-5 text-gray-900/80" />,
      title: "Custom Messaging",
      description: "Set your own greeting, transfer message, confirmation script, and error handling. Every word is configurable.",
    },
    {
      icon: <Globe className="w-5 h-5 text-gray-900/80" />,
      title: "Multi-Language",
      description: "Serve customers in their preferred language. Maven handles payment collection across languages.",
    },
  ];

  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-3 py-1 rounded-full bg-gray-50 mb-6">
            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-medium">FULLY CONFIGURABLE</p>
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            Your brand, your voice.
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            Maven doesn't sound like a third party. Configure every detail of the payment experience so it feels like a seamless part of your agent.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
