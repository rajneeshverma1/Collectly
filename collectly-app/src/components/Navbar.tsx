"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Layers, 
  FileText, 
  Clock, 
  CheckCircle2, 
  CreditCard, 
  Box, 
  TrendingUp, 
  Search,
  User,
  Zap,
  Monitor,
  Building2,
  Heart,
  Bot,
  Home,
  Calculator,
  Target,
  Users,
  Building,
  Scale,
  Briefcase,
  Plug
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";

import { Show, UserButton } from "@/lib/auth-wrapper";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileFeaturesOpen, setIsMobileFeaturesOpen] = useState(false);
  const { scrollY } = useScroll();

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const smoothScrollY = useSpring(scrollY, {
    stiffness: 150,
    damping: 20,
    restDelta: 0.001
  });

  const navScale = useTransform(smoothScrollY, [0, 150], [1, 0.98]);
  const navWidth = useTransform(smoothScrollY, [0, 150], ["100%", "85%"]);
  const navBg = useTransform(smoothScrollY, [0, 150], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.95)"]);
  const navBorder = useTransform(smoothScrollY, [0, 150], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.1)"]);
  const navShadow = useTransform(smoothScrollY, [0, 150], ["none", "0 8px 32px rgba(0,0,0,0.05)"]);
  const navBlur = useTransform(smoothScrollY, [0, 150], ["blur(0px)", "blur(16px)"]);
  const navRadius = useTransform(smoothScrollY, [0, 150], ["0px", "32px"]);

  const navLinks = [
    { name: "Features", href: "/#features" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/#about" },
  ];

  const coreFeatures = [
    {
      icon: <Layers size={18} />,
      title: "Accounts Receivable",
      description: "Automate your AR workflow and capture dues efficiently.",
      href: "/#features"
    },
    {
      icon: <FileText size={18} />,
      title: "Contract & Billing AI",
      description: "AI extracts payment terms and schedules from uploaded files.",
      href: "/#features"
    },
    {
      icon: <Clock size={18} />,
      title: "Reminder AI",
      description: "Intelligent background email notifications run automatically.",
      href: "/#features"
    },
    {
      icon: <CheckCircle2 size={18} />,
      title: "Payment Hook Sync",
      description: "Instantly silences reminder dispatchers once payments clear.",
      href: "/#features"
    }
  ];

  const moreFeatures = [
    {
      icon: <CreditCard size={18} />,
      title: "Multi-Gateway Checkout",
      description: "Stripe Connect and Razorpay Secure signatures validated.",
      href: "/#features"
    },
    {
      icon: <Box size={18} />,
      title: "Local Sandbox",
      description: "Zero-dependency mock auth bypass for offline development.",
      href: "/#features"
    },
    {
      icon: <TrendingUp size={18} />,
      title: "Cashflow Analytics",
      description: "Track outstanding KPI summaries and active operations.",
      href: "/#features"
    },
    {
      icon: <Search size={18} />,
      title: "Client Directories",
      description: "Search customer ledger histories and historical SMTP logs.",
      href: "/#features"
    }
  ];

  const companySizeSolutions = [
    {
      icon: <User size={18} />,
      title: "Founders",
      description: "For startup founders",
      href: "/#solutions"
    },
    {
      icon: <Zap size={18} />,
      title: "Startups",
      description: "Scale your business",
      href: "/#solutions"
    },
    {
      icon: <Monitor size={18} />,
      title: "Mid-Market",
      description: "Growing companies",
      href: "/#solutions"
    },
    {
      icon: <Building2 size={18} />,
      title: "Enterprise",
      description: "Large organizations",
      href: "/#solutions"
    }
  ];

  const industrySolutions = [
    {
      icon: <Box size={18} />,
      title: "Collectly for Finance",
      description: "AI agents for finance teams",
      href: "/#solutions"
    },
    {
      icon: <Heart size={18} />,
      title: "Healthcare",
      description: "Medical billing solutions",
      href: "/#solutions"
    },
    {
      icon: <Bot size={18} />,
      title: "AI Companies",
      description: "For AI-native businesses",
      href: "/#solutions"
    },
    {
      icon: <Home size={18} />,
      title: "Real Estate",
      description: "Property management billing",
      href: "/#solutions"
    },
    {
      icon: <Calculator size={18} />,
      title: "Finance",
      description: "Financial services",
      href: "/#solutions"
    }
  ];

  const companyAbout = [
    {
      icon: <Target size={18} />,
      title: "Mission",
      description: "Our mission & vision",
      href: "/#about"
    },
    {
      icon: <Users size={18} />,
      title: "Team",
      description: "Meet our team",
      href: "/#about"
    },
    {
      icon: <Building size={18} />,
      title: "Customers",
      description: "Customer stories",
      href: "/#about"
    }
  ];

  const moreAbout = [
    {
      icon: <Scale size={18} />,
      title: "Compare",
      description: "See how we stack up",
      href: "/#about"
    },
    {
      icon: <Briefcase size={18} />,
      title: "Careers",
      description: "Join our team",
      href: "/#about"
    },
    {
      icon: <Plug size={18} />,
      title: "Integrations",
      description: "CRM, payments, accounting & more",
      href: "/#about"
    }
  ];

  return (
    <>
      {/* Maintenance Banner */}
      <div className="fixed top-0 left-0 right-0 z-[60] bg-gray-900 text-white py-2.5 px-4 text-center shadow-sm">
        <span className="text-[13px] font-medium text-gray-200">
          🚧 Website under maintenance. Reach out to <a href="mailto:wwrajneesh807@gmail.com" className="font-bold text-[#22c55e] hover:text-green-400 transition-colors underline">wwrajneesh807@gmail.com</a>
        </span>
      </div>

      <motion.nav 
        ref={navRef}
        style={{ 
          width: navWidth,
          scale: navScale,
          backgroundColor: navBg,
          borderColor: navBorder,
          boxShadow: navShadow,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          borderRadius: navRadius,
        }}
        transition={{ ease: "easeInOut" }}
        className="fixed top-12 left-1/2 -translate-x-1/2 z-50 border border-transparent py-4"
      >
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-6 md:px-8 relative">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-1.5 shrink-0">
              <span className="text-4xl font-extrabold tracking-tight text-gray-900">Collectly</span>
              <motion.span 
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="w-4 h-4 rounded-full bg-[#22c55e] mt-2" 
              />
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isDropdown = ["Features", "Solutions", "About"].includes(link.name);

              if (isDropdown) {
                let col1Title = "";
                let col2Title = "";
                let col1Data: any[] = [];
                let col2Data: any[] = [];

                if (link.name === "Features") {
                  col1Title = "Core Features";
                  col1Data = coreFeatures;
                  col2Title = "More Features";
                  col2Data = moreFeatures;
                } else if (link.name === "Solutions") {
                  col1Title = "BY COMPANY SIZE";
                  col1Data = companySizeSolutions;
                  col2Title = "BY INDUSTRY";
                  col2Data = industrySolutions;
                } else if (link.name === "About") {
                  col1Title = "COMPANY";
                  col1Data = companyAbout;
                  col2Title = "MORE";
                  col2Data = moreAbout;
                }

                const isOpen = activeDropdown === link.name;

                return (
                  <div 
                    key={link.name} 
                    className=""
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <button
                      className="flex items-center gap-1.5 text-lg font-medium text-gray-900 hover:text-black transition-colors bg-transparent border-0 cursor-pointer focus:outline-none py-2"
                    >
                      <span>{link.name}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="inline-flex items-center"
                      >
                        <ChevronDown size={14} className="opacity-70" />
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.98 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="absolute left-[-20px] top-[calc(100%-8px)] pt-6 w-[750px] z-50"
                          style={{ fontFamily: 'Satoshi, sans-serif' }}
                        >
                          <div className="bg-white border !border-gray-200 rounded-[24px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hidden md:grid grid-cols-2 gap-x-8 gap-y-0">
                            <div>
                              <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-widest mb-4 pl-3">{col1Title}</h3>
                              <div className="grid grid-cols-1 gap-2">
                                {col1Data.map((item) => (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group text-left"
                                  >
                                    <div className="w-11 h-11 rounded-xl bg-white border !border-gray-200 flex items-center justify-center text-gray-500 shadow-sm shrink-0 group-hover:!border-gray-300 transition-colors">
                                      {item.icon}
                                    </div>
                                    <div className="pt-0.5">
                                      <h4 className="text-[15px] font-medium text-gray-900 mb-0.5">{item.title}</h4>
                                      <p className="text-[13px] text-gray-500 leading-snug">{item.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-[12px] font-semibold text-gray-400 uppercase tracking-widest mb-4 pl-3">{col2Title}</h3>
                              <div className="grid grid-cols-1 gap-2">
                                {col2Data.map((item) => (
                                  <Link
                                    key={item.title}
                                    href={item.href}
                                    onClick={() => setActiveDropdown(null)}
                                    className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group text-left"
                                  >
                                    <div className="w-11 h-11 rounded-xl bg-white border !border-gray-200 flex items-center justify-center text-gray-500 shadow-sm shrink-0 group-hover:!border-gray-300 transition-colors">
                                      {item.icon}
                                    </div>
                                    <div className="pt-0.5">
                                      <h4 className="text-[15px] font-medium text-gray-900 mb-0.5">{item.title}</h4>
                                      <p className="text-[13px] text-gray-500 leading-snug">{item.description}</p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-gray-900 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              );
            })}
            </div>
          </div>

          {/* Right Actions (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <Show when="signed-out">
              <Link href="/sign-in">
                <button className="bg-gray-800 border border-transparent text-white text-base font-medium px-8 py-3 rounded-full transition-all duration-300 hover:bg-gray-700 active:scale-95">
                  Login
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="bg-[#6366f1] text-white text-base font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#4f46e5] hover:scale-[1.02] active:scale-95">
                  Book a demo
                </button>
              </Link>
            </Show>
            <Show when="signed-in">
              <Link href="/dashboard">
                <button className="bg-gray-800 border border-transparent text-white text-base font-medium px-8 py-3 rounded-full transition-all duration-300 hover:bg-gray-700 active:scale-95">
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
              className="text-gray-900 hover:text-gray-600 transition-colors p-2"
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
                {navLinks.map((link) => {
                  if (link.name === "Features") {
                    return (
                      <div key={link.name} className="py-2">
                        <button
                          onClick={() => setIsMobileFeaturesOpen(!isMobileFeaturesOpen)}
                          className="flex items-center justify-between w-full text-sm font-medium text-[#A1A1AA] hover:text-white focus:outline-none bg-transparent border-0 cursor-pointer text-left"
                        >
                          <span>{link.name}</span>
                          <motion.span
                            animate={{ rotate: isMobileFeaturesOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex items-center"
                          >
                            <ChevronDown size={16} />
                          </motion.span>
                        </button>
                        
                        <AnimatePresence>
                          {isMobileFeaturesOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden pl-4 pr-2 mt-2 space-y-2.5 border-l border-white/5"
                            >
                              {[...coreFeatures, ...moreFeatures].map((feat) => (
                                <Link
                                  key={feat.title}
                                  href={feat.href}
                                  className="block py-1.5 text-xs text-zinc-500 hover:text-white"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setIsMobileFeaturesOpen(false);
                                  }}
                                >
                                  {feat.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-center justify-between py-2 text-sm font-medium text-[#A1A1AA] hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  );
                })}
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
