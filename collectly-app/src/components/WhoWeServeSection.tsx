"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { User, Building2, Store, Layers } from 'lucide-react';

interface ServeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const ServeCard: React.FC<ServeCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl p-6 transition-all duration-300 ease-in-out group hover:shadow-xl hover:-translate-y-1 shadow-sm"
  >
    <div className="flex flex-col items-center text-center">
      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-[12px] text-gray-500 leading-relaxed max-w-[180px]">{description}</p>
    </div>
  </motion.div>
);

export const WhoWeServeSection: React.FC<{ id?: string }> = ({ id }) => {
  const segments = [
    {
      icon: <User className="w-4 h-4 text-gray-600" />,
      title: "Freelancers",
      description: "Get paid faster for your work with seamless payment collection.",
    },
    {
      icon: <Building2 className="w-4 h-4 text-gray-600" />,
      title: "B2B",
      description: "Streamline invoicing and collect large transactions securely.",
    },
    {
      icon: <Store className="w-4 h-4 text-gray-600" />,
      title: "Small Businesses",
      description: "Simplify payments, reduce manual work, and focus on growth.",
    },
    {
      icon: <Layers className="w-4 h-4 text-gray-600" />,
      title: "Agencies",
      description: "Manage multiple clients and scale your operations effortlessly.",
    },
  ];

  return (
    <section id={id} className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4">WHO WE SERVE</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight mb-4">
            Built for businesses that <br /> grow with smarter payments.
          </h2>
          <p className="text-sm md:text-base text-gray-500 max-w-xl mx-auto leading-relaxed">
            We empower freelancers, B2B companies, small businesses, and agencies to collect payments seamlessly through modern workflows.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {segments.map((segment, index) => (
            <ServeCard
              key={index}
              icon={segment.icon}
              title={segment.title}
              description={segment.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
