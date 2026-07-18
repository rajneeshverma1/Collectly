"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left group py-2"
      >
        <span className="text-[15px] font-semibold text-gray-900 group-hover:text-black transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-gray-400 ml-4 shrink-0 group-hover:text-gray-600 transition-colors"
        >
          <ChevronDown size={18} strokeWidth={2} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-2 pb-4 text-sm text-gray-500 leading-relaxed pr-8">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQSection = () => {
  const faqs = [
    {
      question: "What does Collectly do?",
      answer: "Collectly is an AI-powered financial operations platform that automates your entire billing cycle. We handle everything from invoicing and payment collection to reconciliation and dunning, acting as your 24/7 AI billing agent."
    },
    {
      question: "How does the AI Billing Agent work?",
      answer: "Our AI Billing Agent intelligently interacts with your customers through voice or text to follow up on overdue payments, answer billing queries, and negotiate payment plans, all while maintaining a natural and empathetic tone."
    },
    {
      question: "What integrations does Collectly support?",
      answer: "Collectly seamlessly integrates with major ERPs, accounting software (like QuickBooks, Xero, NetSuite), and payment gateways (Stripe, Authorize.net, Adyen) to ensure your data stays perfectly synced."
    },
    {
      question: "Can Collectly handle complex or usage-based billing?",
      answer: "Absolutely. Our platform is built to handle complex billing models, including usage-based, tiered, and hybrid subscriptions. We ingest raw usage data and automatically calculate the correct billing amounts."
    },
    {
      question: "Do I need to replace Stripe to use Collectly?",
      answer: "No, you don't. Collectly sits on top of your existing payment infrastructure like Stripe. We act as the intelligence layer that orchestrates the billing logic, while Stripe continues to process the actual transactions."
    },
    {
      question: "What kind of companies use Collectly?",
      answer: "Collectly is built for fast-growing B2B companies, SaaS startups, agencies, and mid-market enterprises that want to streamline their financial operations and reduce revenue leakage."
    },
    {
      question: "Is my financial data secure?",
      answer: "Security is our top priority. Collectly is SOC-2, GDPR, and HIPAA compliant. We use bank-grade encryption for data at rest and in transit, ensuring your sensitive financial information is always protected."
    },
    {
      question: "What makes Collectly different from other billing tools?",
      answer: "Unlike traditional billing tools that just generate invoices, Collectly provides an active AI agent that actively works to recover revenue, resolve billing disputes, and automate the manual tasks that slow down your finance team."
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#fafafa]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-[40px] font-normal text-gray-900 mb-6 tracking-tight leading-tight"
            >
              Questions and answers
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <p className="text-gray-500 text-[15px] leading-relaxed mb-8 pr-4">
                Tell us your most pressing billing challenge—whether it's getting paid on
                time, ensuring accurate and timely billing, or improving financial
                reporting—and we'll show you exactly how Collectly.ai can solve it.
                <br /><br />
                Browse the <span className="font-semibold text-gray-700">Collectly Help Center</span> for guides and FAQs anytime.
              </p>
              
              <button onClick={() => window.dispatchEvent(new Event('open-founder-modal'))} className="bg-[#2D2D35] hover:bg-[#1a1a1f] text-white text-[13px] font-semibold py-3.5 px-6 rounded-full inline-flex items-center gap-1 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm tracking-wide">
                Still have questions? Talk to Founder <span className="ml-1 text-lg leading-none">&rarr;</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
