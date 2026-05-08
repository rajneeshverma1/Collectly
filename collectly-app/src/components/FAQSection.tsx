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
    <div className="bg-[#111114] border border-white/[0.03] rounded-2xl px-6 md:px-8 mb-2 last:mb-0 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="text-base md:text-lg font-medium text-white/90 group-hover:text-white transition-colors">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-zinc-600 group-hover:text-zinc-400 transition-colors ml-4"
        >
          <ChevronDown size={20} />
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
            <div className="pb-6 text-sm text-zinc-500 leading-relaxed max-w-2xl">
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
      question: "Do I need to be PCI compliant?",
      answer: "No. Collectly handles all card data through our secure, PCI-compliant infrastructure. Your servers never see or touch sensitive payment information, keeping you entirely out of PCI scope.",
    },
    {
      question: "What does the caller actually hear?",
      answer: "Callers hear a natural, human-like voice that guides them through the payment process. You can customize the voice, tone, and specific messaging to match your brand&apos;s personality perfectly.",
    },
    {
      question: "How long does integration take?",
      answer: "Most integrations are completed within 3-7 days. Our developer-first API and pre-built components make it simple to connect your existing voice platform and payment gateway.",
    },
    {
      question: "What payment gateways do you support?",
      answer: "We support all major payment gateways including Stripe, Authorize.net, Adyen, Braintree, and many others through our unified integration layer.",
    },
    {
      question: "Can I preauthorize cards without charging?",
      answer: "Yes. Our system supports full authorization and capture workflows, allowing you to verify funds and hold them before finalizing the transaction at a later time.",
    },
    {
      question: "What happens if the payment fails?",
      answer: "If a payment fails, our AI agent can gracefully handle the error, explain the reason to the caller, and offer alternative payment methods or retry options immediately.",
    },
  ];

  return (
    <section className="pt-24 pb-12 px-6 bg-[#0B0B0F]">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Common questions.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};
