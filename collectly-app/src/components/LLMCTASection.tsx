"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export const LLMCTASection = () => {
  const llmLinks = [
    {
      name: "Ask ChatGPT",
      url: "https://chatgpt.com/?q=What+is+Collectly.ai+and+how+does+it+automate+billing%3F",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2057 5.9847 5.9847 0 0 0 3.989-2.9 6.051 6.051 0 0 0-.7388-7.0732ZM13.2599 22.5A4.5401 4.5401 0 0 1 9.4 20.0886l5.7766-3.3364a.925.925 0 0 0 .4635-.805v-6.6857l1.7135.9897a4.536 4.536 0 0 1 1.7047 6.185 4.5401 4.5401 0 0 1-5.7984 2.0633v4.0005ZM3.8188 18.0673A4.536 4.536 0 0 1 2.378 12.822l5.7766 3.3364v6.6713a4.5401 4.5401 0 0 1-4.3358-4.7624Zm14.2818-6.6857a.925.925 0 0 0-.4635-.805L11.8605 7.2402v-1.979L17.637 8.597a4.536 4.536 0 0 1 1.7047 6.185 4.5401 4.5401 0 0 1-1.2411 1.5721v-4.9725Zm-9.8211 4.4144v-6.6713a.925.925 0 0 0-.4635-.805L2.0396 5.0294A4.5401 4.5401 0 0 1 6.3754 2.5a4.536 4.536 0 0 1 3.5284 1.6851L8.1903 5.1748a4.5401 4.5401 0 0 1 .0893 6.6212Zm3.5284-5.321-2.909-1.6806 2.909-1.6806 2.909 1.6806-2.909 1.6806Zm2.4455-2.5298a4.5401 4.5401 0 0 1 4.3358-2.0633 4.536 4.536 0 0 1 1.4408 5.2453l-5.7766-3.3364v1.544Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "Ask Claude",
      url: "https://claude.ai/new?q=What+is+Collectly.ai+and+how+does+it+automate+billing%3F",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "Ask Perplexity",
      url: "https://www.perplexity.ai/search?q=What+is+Collectly.ai+and+how+does+it+automate+billing%3F",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "Ask Gemini",
      url: "https://gemini.google.com/app?q=What+is+Collectly.ai+and+how+does+it+automate+billing%3F",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-2">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9v-2h2v2zm0-4H9V7h2v5zm4 4h-2v-2h2v2zm0-4h-2V7h2v5z" fill="currentColor"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 px-6 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-normal text-gray-900 mb-3 tracking-tight">
            Still not sure Collectly is right for you?
          </h2>
          <p className="text-base text-gray-500 mb-10">
            Let your favorite LLM tell you.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-4 mb-24"
        >
          {llmLinks.map((link, index) => (
            <Link 
              key={index} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-5 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-semibold text-gray-800 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <p className="text-[15px] text-gray-500 mb-5">
            Already convinced?
          </p>
          <button className="bg-[#6366F1] hover:bg-[#4F46E5] text-white text-[15px] font-semibold py-3.5 px-8 rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 mb-3">
            Talk to Founder
          </button>
          <p className="text-[13px] text-gray-400">
            No credit card required.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
