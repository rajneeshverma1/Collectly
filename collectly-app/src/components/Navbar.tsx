"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

import { Show, UserButton } from "@/lib/auth-wrapper";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 50,
    damping: 25,
    restDelta: 0.001
  });

  const navScale = useTransform(smoothScrollY, [0, 250], [1, 0.98]);
  const navTop = useTransform(smoothScrollY, [0, 250], [24, 20]);
  const navWidth = useTransform(smoothScrollY, [0, 250], ["90%", "85%"]);
  const navBg = useTransform(smoothScrollY, [0, 250], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.12)"]);
  const navBorder = useTransform(smoothScrollY, [0, 250], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.18)"]);
  const navShadow = useTransform(smoothScrollY, [0, 250], ["none", "0 8px 32px rgba(0,0,0,0.8)"]);
  const navBlur = useTransform(smoothScrollY, [0, 250], ["blur(0px)", "blur(12px)"]);
  const navGap = useTransform(smoothScrollY, [0, 250], ["36px", "32px"]);
  const navPadding = useTransform(smoothScrollY, [0, 250], ["24px", "20px"]);
  const navPy = useTransform(smoothScrollY, [0, 250], ["14px", "12px"]);

  const navLinks = [
    { name: "Problem", href: "/#problem" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Integrations", href: "/#integrations" },
  ];

  return (
    <>
      {/* Top Blur Mask / Zone */}
      <div className="fixed top-0 left-0 right-0 h-32 z-40 pointer-events-none bg-gradient-to-b from-[#0B0B0F]/40 to-transparent backdrop-blur-xl mask-blur"
        style={{ maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)' }} />

      <motion.nav 
        style={{ 
          top: navTop,
          width: navWidth,
          scale: navScale,
          backgroundColor: navBg,
          borderColor: navBorder,
          boxShadow: navShadow,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          paddingLeft: navPadding,
          paddingRight: navPadding,
          paddingTop: navPy,
          paddingBottom: navPy,
        }}
        transition={{ ease: "easeInOut" }}
        className="fixed z-50 left-1/2 -translate-x-1/2 max-w-7xl rounded-[24px] border py-4">
        <div className="flex justify-between items-center w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white">Collectly</span>
            </Link>
          </div>

          {/* Center Nav Links (Desktop) */}
          <motion.div 
            style={{ gap: navGap }}
            className="hidden md:flex items-center"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[14px] font-medium text-[#A1A1A1] hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Show when="signed-out">
              <Link href="/sign-in">
                <button className="bg-transparent border border-transparent text-white/90 text-[14px] font-medium px-7 py-2.5 rounded-2xl transition-all duration-300 hover:bg-white/5 hover:border-gray-600 active:scale-95">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="bg-white text-black text-[14px] font-semibold px-7 py-2.5 rounded-2xl shadow-lg transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-95">
                  Get Started
                </button>
              </Link>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <button className="bg-white/5 border border-white/10 text-white text-[14px] font-medium px-7 py-2.5 rounded-2xl transition-all duration-300 hover:bg-white/10 active:scale-95">
                  Dashboard
                </button>
              </Link>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: 'w-10 h-10'
                  }
                }}
              />
            </Show>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-gray-300 transition-colors p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute top-full left-1/2 -translate-x-1/2 w-full mt-4 bg-black/80 backdrop-blur-xl border border-transparent rounded-3xl shadow-2xl p-6 md:hidden overflow-hidden"
            >
              <div className="space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center justify-between py-2 text-sm font-medium text-[#A1A1AA] hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Show when="signed-out">
                    <Link href="/sign-in" className="w-full">
                      <button className="w-full bg-transparent border border-transparent text-white py-3 rounded-xl text-sm font-medium">
                        Sign In
                      </button>
                    </Link>
                    <Link href="/sign-up" className="w-full">
                      <button className="w-full bg-white text-black py-3 rounded-xl text-sm font-medium shadow-lg">
                        Get Started
                      </button>
                    </Link>
                  </Show>
                  <Show when="signed-in">
                    <Link href="/dashboard" className="w-full">
                      <button className="w-full bg-white/5 border border-white/10 text-white py-3 rounded-xl text-sm font-medium">
                        Dashboard
                      </button>
                    </Link>
                    </Show>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
