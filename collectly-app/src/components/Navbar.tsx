"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#" },
    { name: "About", href: "#" },
    { name: "Pricing", href: "#" },
  ];

  return (
    <nav
      className={cn(
        "fixed z-50 transition-all duration-300 ease-out",
        scrolled
          ? "top-11 left-1/2 -translate-x-1/2 w-[85%] max-w-5xl rounded-2xl bg-white shadow-md py-3 px-8"
          : "top-9 left-0 right-0 w-full bg-transparent py-5 px-6"
      )}
    >
      <div className="flex justify-between items-center max-w-[1000px] mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-2xl font-bold text-gray-900 tracking-tight">collectly.ai</span>
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5" />
          </Link>
        </div>

        {/* Center Nav Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-7">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="flex items-center gap-1 text-sm font-normal text-gray-600 hover:text-gray-900 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <Link href="/auth">
            <button className="bg-[#333C4D] text-white text-sm font-normal px-6 py-2.5 rounded-xl transition-all hover:brightness-110 active:scale-95">
              Login
            </button>
          </Link>
          <Link href="/auth">
            <button className="bg-[#6366F1] text-white text-sm font-normal px-6 py-2.5 rounded-xl shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95">
              Get Started
            </button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 hover:text-gray-900 transition-colors p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 w-full mt-4 bg-white rounded-2xl shadow-2xl p-6 md:hidden overflow-hidden"
          >
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex items-center justify-between py-2 text-base font-normal text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={18} className="text-gray-400" />}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button className="w-full bg-[#333C4D] text-white py-3 rounded-xl font-normal">
                  Login
                </button>
                <button className="w-full bg-[#6366F1] text-white py-3 rounded-xl font-normal shadow-lg shadow-indigo-500/20">
                  Book a demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
