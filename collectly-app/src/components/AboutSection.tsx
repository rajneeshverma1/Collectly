"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, ShieldCheck, HeartHandshake } from "lucide-react";

interface PillarCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const PillarCard: React.FC<PillarCardProps> = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/[0.01] border border-white/5 rounded-3xl p-8 backdrop-blur-3xl hover:border-indigo-500/30 transition-all duration-300 group"
  >
    <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-6 text-gray-900 group-hover:text-indigo-400 group-hover:scale-105 transition-all duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-zinc-500 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

export const AboutSection: React.FC<{ id?: string }> = ({ id }) => {
  const pillars = [
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "Autonomous Operations",
      description: "Our background scheduler worker evaluates unpaid balances daily at midnight, transitioning status configurations and dispatching automated outreach templates adaptively.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Payment Signature Vault",
      description: "Uses cryptographic webhook signature validation (constructEvent / HMAC) and transaction-id locks to guarantee double-payment protections.",
    },
    {
      icon: <HeartHandshake className="w-6 h-6" />,
      title: "Zero-Dependency Sandbox",
      description: "Ensures developers run and test invoicing immediately via local mock auth environments and offline database seeders, completely isolated from Clerk or Stripe CDN outages.",
    },
  ];

  const stats = [
    { value: "10x", label: "Faster Collections" },
    { value: "99.9%", label: "Signature Security" },
    { value: "0", label: "External Dependencies" },
  ];

  return (
    <section id={id} className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-white/5">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Mission & Stats */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 font-bold">ABOUT COLLECTLY</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Our mission is to accelerate capital flows.
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                Collectly is designed to bridge the gap between completed work and captured revenue. Through custom-tailored reminder policies, multi-gateway payments, and sandbox environments, we empower modern agencies to run automated, consistent revenue pipelines.
              </p>
            </motion.div>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="space-y-1.5"
                >
                  <div className="text-2xl md:text-3xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-bold leading-normal">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Architectural Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-6">
              <PillarCard
                icon={pillars[0].icon}
                title={pillars[0].title}
                description={pillars[0].description}
                delay={0.1}
              />
              <PillarCard
                icon={pillars[1].icon}
                title={pillars[1].title}
                description={pillars[1].description}
                delay={0.2}
              />
            </div>
            <div className="sm:pt-12">
              <PillarCard
                icon={pillars[2].icon}
                title={pillars[2].title}
                description={pillars[2].description}
                delay={0.3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
