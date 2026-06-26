"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { CheckCircle, MessageSquare, Phone, CreditCard, Shield } from 'lucide-react';

// Timeline Dot Component
const TimelineDot: React.FC<{ isActive: boolean; isCompleted: boolean }> = ({ isActive, isCompleted }) => (
  <motion.div
    animate={{
      scale: isActive ? 1.2 : 1,
      backgroundColor: isCompleted || isActive ? '#ffffff' : '#52525B',
      boxShadow: isActive ? '0 0 20px rgba(255, 255, 255, 0.5)' : 'none',
    }}
    transition={{ duration: 0.4 }}
    className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-transparent z-10"
  />
);

// Code Block Component
const CodeBlock: React.FC = () => (
    <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="bg-zinc-900/80 border border-transparent rounded-2xl p-5 font-mono text-xs backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 shadow-xl"
  >
    <div className="flex items-center gap-2 mb-4">
      <div className="w-3 h-3 rounded-full bg-red-500/80" />
      <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
      <div className="w-3 h-3 rounded-full bg-green-500/80" />
    </div>
    <div className="space-y-2">
      <p><span className="text-purple-400">const</span> <span className="text-blue-400">session</span> <span className="text-gray-900">=</span> <span className="text-purple-400">await</span> <span className="text-yellow-400">collectly</span><span className="text-gray-900">.</span><span className="text-green-400">createSession</span><span className="text-gray-900">({"{"}</span></p>
      <p className="pl-4"><span className="text-gray-900">amount:</span> <span className="text-orange-400">4999</span><span className="text-gray-900">,</span></p>
      <p className="pl-4"><span className="text-gray-900">currency:</span> <span className="text-green-300">"INR"</span><span className="text-gray-900">,</span></p>
      <p className="pl-4"><span className="text-gray-900">channel:</span> <span className="text-green-300">"voice"</span></p>
      <p><span className="text-gray-900">{"}"})</span></p>
    </div>
  </motion.div>
);

// Option Card Component
const OptionCard: React.FC<{ icon: React.ReactNode; title: string; steps: string[] }> = ({ icon, title, steps }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-zinc-900/50 border border-transparent rounded-2xl p-5 backdrop-blur-sm cursor-pointer transition-all duration-300 shadow-lg"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="text-gray-900 font-semibold text-base">{title}</h4>
    </div>
    <div className="flex items-center gap-2 flex-wrap">
      {steps.map((step, idx) => (
        <React.Fragment key={idx}>
          <span className="text-xs text-zinc-400 bg-white/5 px-2 py-1.5 rounded-lg border border-transparent">{step}</span>
          {idx < steps.length - 1 && <span className="text-zinc-600">→</span>}
        </React.Fragment>
      ))}
    </div>
  </motion.div>
);

// Payment Success Card
const PaymentSuccessCard: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay: 0.2 }}
    className="bg-zinc-900/80 border border-transparent rounded-2xl p-5 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 shadow-2xl"
  >
    <div className="flex items-start justify-between mb-5">
      <div>
        <p className="text-xs text-zinc-500 mb-1">Payment Status</p>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span className="text-base font-semibold text-gray-900">Payment Successful</span>
        </div>
      </div>
      <div className="bg-green-500/10 border border-transparent rounded-lg px-3 py-1.5">
        <span className="text-green-400 font-semibold text-sm">₹4,999</span>
      </div>
    </div>
    
    <div className="space-y-2 border-t border-transparent pt-3">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-500">Transaction ID</span>
        <span className="text-zinc-300 font-mono">TXN_8X92KD</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-zinc-500">Timestamp</span>
        <span className="text-zinc-300">2024-01-15 14:32:07</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-zinc-500">Channel</span>
        <span className="text-zinc-300">Voice Call</span>
      </div>
      <div className="flex justify-between text-xs">
        <span className="text-zinc-500">Status</span>
        <span className="text-green-400 font-semibold">Confirmed</span>
      </div>
    </div>
  </motion.div>
);export const HowItWorksSection: React.FC<{ id?: string }> = ({ id }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineProgress = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  useEffect(() => {
    const unsubscribe = lineProgress.on("change", (latest) => {
      if (latest < 0.33) setActiveStep(1);
      else if (latest < 0.66) setActiveStep(2);
      else setActiveStep(3);
    });
    return () => unsubscribe();
  }, [lineProgress]);

  return (
    <section ref={containerRef} id={id} className="relative bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 mb-3">HOW IT WORKS</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
            Three steps. Zero card data.
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-zinc-800">
            <motion.div
              style={{ scaleY: lineProgress }}
              className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-400 origin-top"
            />
          </div>

          {/* Step 1 */}
          <div className="relative mb-20">
            <TimelineDot isActive={activeStep === 1} isCompleted={activeStep > 1} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="md:text-right"
              >
                <span className="inline-block bg-white/[0.02] border border-transparent rounded-full px-2 py-0.5 text-[10px] text-zinc-500 mb-2">
                  Step 1
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Create a Session</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm ml-auto">
                  Generate a secure payment session with a single API call. No PCI compliance needed. Just specify amount and channel.
                </p>
              </motion.div>

              {/* Right Code Block */}
              <div className="md:pl-8">
                <CodeBlock />
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative mb-20">
            <TimelineDot isActive={activeStep === 2} isCompleted={activeStep > 2} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Option Cards */}
              <div className="md:pr-8 space-y-3">
                <OptionCard
                  icon={<Phone className="w-4 h-4 text-blue-400" />}
                  title="Voice Flow"
                  steps={['Agent', 'Maven', 'Pay']}
                />
                <OptionCard
                  icon={<MessageSquare className="w-4 h-4 text-purple-400" />}
                  title="SMS Flow"
                  steps={['Trigger', 'Link', 'Done']}
                />
              </div>

              {/* Right Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-white/[0.02] border border-transparent rounded-full px-2 py-0.5 text-[10px] text-zinc-500 mb-2">
                  Step 2
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Collect Payment</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm">
                  Our AI agent handles the payment conversation via voice or SMS. Secure UPI collection happens automatically.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative pb-8">
            <TimelineDot isActive={activeStep === 3} isCompleted={false} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="md:text-right"
              >
                <span className="inline-block bg-white/[0.02] border border-transparent rounded-full px-2 py-0.5 text-[10px] text-zinc-500 mb-2">
                  Step 3
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm & Track</h3>
                <p className="text-xs text-zinc-500 leading-relaxed max-w-sm ml-auto">
                  Receive real-time updates and payment status directly in your dashboard. Monitor transactions effortlessly.
                </p>
              </motion.div>

              {/* Right Success Card */}
              <div className="md:pl-8">
                <PaymentSuccessCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
