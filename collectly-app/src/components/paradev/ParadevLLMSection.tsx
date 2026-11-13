'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ParadevLLMSection() {
  const openFounder = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('open-founder-modal'));
    }
  };

  const llmLinks = [
    {
      name: "Ask ChatGPT",
      url: "https://chatgpt.com/?q=What+is+Collectly.ai+and+how+does+it+automate+billing%3F",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 mr-2">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2057 5.9847 5.9847 0 0 0 3.989-2.9 6.051 6.051 0 0 0-.7388-7.0732ZM13.2599 22.5A4.5401 4.5401 0 0 1 9.4 20.0886l5.7766-3.3364a.925.925 0 0 0 .4635-.805v-6.6857l1.7135.9897a4.536 4.536 0 0 1 1.7047 6.185 4.5401 4.5401 0 0 1-5.7984 2.0633v4.0005ZM3.8188 18.0673A4.536 4.536 0 0 1 2.378 12.822l5.7766 3.3364v6.6713a4.5401 4.5401 0 0 1-4.3358-4.7624Zm14.2818-6.6857a.925.925 0 0 0-.4635-.805L11.8605 7.2402v-1.979L17.637 8.597a4.536 4.536 0 0 1 1.7047 6.185 4.5401 4.5401 0 0 1-1.2411 1.5721v-4.9725Zm-9.8211 4.4144v-6.6713a.925.925 0 0 0-.4635-.805L2.0396 5.0294A4.5401 4.5401 0 0 1 6.3754 2.5a4.536 4.536 0 0 1 3.5284 1.6851L8.1903 5.1748a4.5401 4.5401 0 0 1 .0893 6.6212Zm3.5284-5.321-2.909-1.6806 2.909-1.6806 2.909 1.6806-2.909 1.6806Zm2.4455-2.5298a4.5401 4.5401 0 0 1 4.3358-2.0633 4.536 4.536 0 0 1 1.4408 5.2453l-5.7766-3.3364v1.544Z" fill="currentColor"/>
        </svg>
      )
    },
    {
      name: "Ask Claude",
      url: "https://claude.ai/new?q=What+is+Collectly.ai+and+how+does+it+automate+billing%3F",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 mr-2">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Ask Perplexity",
      url: "https://www.perplexity.ai/search?q=What+is+Collectly.ai+and+how+does+it+automate+billing%3F",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-4 mr-2">
          <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      name: "Ask Gemini",
      url: "https://gemini.google.com/app?q=What+is+Collectly.ai+and+how+does+it+automate+billing%3F",
      icon: (
        <Sparkles className="size-4 mr-2 text-brand" />
      )
    }
  ];

  return (
    <section className="py-20 sm:py-28 border-t border-[#232529]/70 bg-[#090a0b]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground">
          Still not sure Collectly is right for you?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground font-light mb-10">
          Let your favorite LLM tell you.
        </p>

        {/* LLM Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-14">
          {llmLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 sm:px-5 py-2.5 rounded-[2px] border border-[#232529] bg-[#111214] text-xs sm:text-sm font-mono text-foreground hover:border-brand/40 hover:bg-[#1a1d21] transition-all"
            >
              {link.icon}
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        {/* Quick Founder Trigger */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-mono text-muted-foreground mb-4">
            Already convinced?
          </p>
          <button
            type="button"
            onClick={openFounder}
            className="bg-brand text-white text-sm sm:text-base font-medium py-3 px-8 rounded-[2px] hover:bg-brand-dark transition-colors shadow-lg shadow-brand/20 cursor-pointer flex items-center gap-2"
          >
            <span>Talk to Founder</span>
            <ArrowRight className="size-4" />
          </button>
          <p className="text-xs font-mono text-muted-foreground/50 mt-3">
            No credit card required.
          </p>
        </div>

      </div>
    </section>
  );
}
