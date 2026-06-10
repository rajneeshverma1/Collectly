"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface IntegrationCardProps {
  name: string;
  logo: React.ReactNode;
  delay: number;
}

const IntegrationCard: React.FC<Omit<IntegrationCardProps, 'name'>> = ({ logo, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.4, delay }}
    className="bg-[#111111] border border-transparent rounded-xl h-20 px-6 flex items-center justify-center transition-all duration-300 ease-in-out hover:shadow-xl hover:shadow-white/5 cursor-pointer group"
  >
    <div className="opacity-60 group-hover:opacity-100 transition-opacity duration-300">
      {logo}
    </div>
  </motion.div>
);

const DividerLabel: React.FC<{ text: string }> = ({ text }) => (
  <div className="flex items-center gap-4 my-10">
    <div className="flex-1 h-px bg-zinc-800" />
    <p className="text-xs uppercase tracking-wider text-zinc-500">{text}</p>
    <div className="flex-1 h-px bg-zinc-800" />
  </div>
);

export const IntegrationsSection: React.FC<{ id?: string }> = ({ id }) => {
  const voicePlatforms = [
    {
      name: "VAPI",
      logo: (
        <svg viewBox="0 0 120 40" className="h-6" fill="white">
          <text x="10" y="28" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold">VAPI</text>
        </svg>
      ),
    },
    {
      name: "Retell",
      logo: (
        <svg viewBox="0 0 120 40" className="h-6" fill="white">
          <text x="5" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold">Retell</text>
        </svg>
      ),
    },
    {
      name: "LiveKit",
      logo: (
        <svg viewBox="0 0 120 40" className="h-6" fill="white">
          <text x="5" y="28" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">LiveKit</text>
        </svg>
      ),
    },
    {
      name: "Twilio",
      logo: (
        <svg viewBox="0 0 120 40" className="h-6" fill="white">
          <text x="10" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold">Twilio</text>
        </svg>
      ),
    },
  ];

  const paymentGateways = [
    {
      name: "Stripe",
      logo: (
        <svg viewBox="0 0 120 40" className="h-7" fill="#635BFF">
          <path d="M53.2 33.2V14.4h-4.8v-4h9.2v22.8h-4.4zm-12.4 0V10.4h4.4v22.8h-4.4zm31.6 0V14.4h-4.8v-4h9.2v22.8h-4.4zM58 28.4c0-3.6-2.8-5.2-6-6-2.4-.6-3.2-1.2-3.2-2.4 0-1 .8-1.6 2-1.6 1.4 0 2.6.6 3.6 1.6l2.4-2.6c-1.4-1.6-3.4-2.6-6-2.6-3.6 0-6.4 2.2-6.4 5.8 0 3.8 2.6 5.2 5.8 6 2.6.6 3.4 1.2 3.4 2.4 0 1.2-1 2-2.4 2-1.8 0-3.4-1-4.6-2.4l-2.4 2.6c1.6 2 4 3.2 6.8 3.2 3.8 0 6.8-2 6.8-5.6l-.2-.4z"/>
        </svg>
      ),
    },
    {
      name: "Authorize.net",
      logo: (
        <svg viewBox="0 0 140 40" className="h-6" fill="white">
          <text x="5" y="27" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold">Authorize.net</text>
        </svg>
      ),
    },
    {
      name: "Adyen",
      logo: (
        <svg viewBox="0 0 120 40" className="h-7" fill="white">
          <text x="15" y="28" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="bold">Adyen</text>
        </svg>
      ),
    },
    {
      name: "Braintree",
      logo: (
        <svg viewBox="0 0 120 40" className="h-6" fill="white">
          <text x="5" y="27" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold">Braintree</text>
        </svg>
      ),
    },
  ];

  return (
    <section id={id} className="relative bg-[#0B0B0F] py-24 md:py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">INTEGRATIONS</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight mb-6">
            Works with your stack.
          </h2>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Platform-agnostic. Connect your voice platform and payment gateway with ease.
          </p>
        </motion.div>

        {/* Voice Platforms */}
        <DividerLabel text="VOICE PLATFORMS" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {voicePlatforms.map((platform, index) => (
            <IntegrationCard
              key={index}
              logo={platform.logo}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Payment Gateways */}
        <DividerLabel text="PAYMENT GATEWAYS" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {paymentGateways.map((gateway, index) => (
            <IntegrationCard
              key={index}
              logo={gateway.logo}
              delay={index * 0.1 + 0.2}
            />
          ))}
        </div>

        {/* More Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-10"
        >
          <p className="text-sm text-zinc-500 hover:text-zinc-400 transition-colors duration-300 cursor-pointer">
            + more
          </p>
        </motion.div>
      </div>
    </section>
  );
};
