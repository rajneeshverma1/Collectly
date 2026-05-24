'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Show } from '@clerk/nextjs';

export default function PricingPage() {
  const plans = [
    {
      name: "Free Beta",
      badge: "Early Adopter Special",
      price: "$0",
      period: "forever for beta signups",
      description: "Get full platform access for $0/mo. Lock in early adopter benefits during our public beta.",
      cta: "Get Started Free",
      ctaHref: "/sign-up",
      isPopular: true,
      features: [
        "Unlimited Invoices & PDF generation",
        "Dual Payment Connection (Stripe & Razorpay)",
        "Background Reminders Engine",
        "Full Financial Analytics (MRR, Outstanding)",
        "Automated Status Syncing & Webhooks",
        "SQLite Secure Storage Sync",
        "Email Support"
      ]
    },
    {
      name: "Pro",
      badge: "Future Tier",
      price: "$29",
      period: "per month",
      description: "For scaling agencies and freelancers needing advanced team sync and automated customer calling.",
      cta: "Coming Soon",
      ctaHref: "#",
      isPopular: false,
      features: [
        "Everything in Free Beta",
        "Dedicated AI Voice Calling Agent",
        "Multi-User workspaces (up to 5 team members)",
        "Custom Voice, Scripts & Language configs",
        "Advanced Payment Analytics & Reports",
        "Priority Customer Support (24hr SLA)"
      ]
    },
    {
      name: "Enterprise",
      badge: "Future Tier",
      price: "Custom",
      period: "tailored billing",
      description: "For high-volume transaction networks requiring dedicated hardware, custom compliance, and SLAs.",
      cta: "Coming Soon",
      ctaHref: "#",
      isPopular: false,
      features: [
        "Everything in Pro",
        "Custom-Trained Voice models",
        "Unlimited Workspace Seats & Roles",
        "Dedicated Server Deployment & Node sync",
        "Custom SSL Encryption Vault",
        "Dedicated Account Manager (24/7 SLA)"
      ]
    }
  ];

  const featuresList = [
    {
      category: "Invoicing Operations",
      items: [
        { name: "Unlimited Invoices", free: true, pro: true, enterprise: true },
        { name: "Custom PDF Invoices", free: true, pro: true, enterprise: true },
        { name: "Manual Payment Recording", free: true, pro: true, enterprise: true },
        { name: "Dynamic Partial Payments", free: true, pro: true, enterprise: true },
        { name: "Team Workspaces", free: false, pro: "Up to 5 seats", enterprise: "Unlimited" },
      ]
    },
    {
      category: "Payment Operations",
      items: [
        { name: "Stripe Connect Integration", free: true, pro: true, enterprise: true },
        { name: "Razorpay Connect Integration", free: true, pro: true, enterprise: true },
        { name: "Automated Checkout Sessions", free: true, pro: true, enterprise: true },
        { name: "Webhooks Auto-Capture", free: true, pro: true, enterprise: true },
        { name: "Custom SSL Gateway Vault", free: false, pro: false, enterprise: true },
      ]
    },
    {
      category: "AI & Automation",
      items: [
        { name: "Background reminders (12h scan)", free: true, pro: true, enterprise: true },
        { name: "Email Payment Reminders", free: true, pro: true, enterprise: true },
        { name: "AI Invoice Term Extraction", free: "Soon", pro: true, enterprise: true },
        { name: "AI Customer Calling Agent", free: false, pro: true, enterprise: true },
        { name: "Custom Voice & Language Configurations", free: false, pro: true, enterprise: true },
      ]
    },
    {
      category: "Security & Support",
      items: [
        { name: "Clerk-Secured Authentication", free: true, pro: true, enterprise: true },
        { name: "Data Encryption In-Transit & At-Rest", free: true, pro: true, enterprise: true },
        { name: "Support Channels", free: "Email support", pro: "Priority (24hr)", enterprise: "Dedicated 24/7 Support" },
        { name: "Service Level Agreement (SLA)", free: "None", pro: "99% Uptime", enterprise: "99.99% Uptime & SLA" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      {/* Hero Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[130px] rounded-full -mr-72 -mt-72 pointer-events-none" />
      <div className="absolute top-[400px] left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -ml-64 pointer-events-none" />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-40 pb-24 relative z-10">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.02] border border-white/5 mb-6 shadow-inner"
          >
            <Sparkles size={12} className="text-indigo-400" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-bold">Public Beta Phase</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight"
          >
            Simple, Transparent Pricing Tiers
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-white/40 mt-6 leading-relaxed max-w-xl mx-auto font-medium"
          >
            Sign up during our public beta and secure full access for $0/month. No credit card required, build your dashboard instantly.
          </motion.p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6 }}
              className={`p-8 rounded-[40px] border relative overflow-hidden backdrop-blur-3xl flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular 
                  ? 'bg-gradient-to-b from-white/[0.04] to-white/[0.01] border-indigo-500/30 shadow-[0_30px_60px_rgba(99,102,241,0.08)]' 
                  : 'bg-white/[0.01] border-white/5 shadow-2xl'
              }`}
            >
              {/* Highlight Glow for Popular Plan */}
              {plan.isPopular && (
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 bg-indigo-500/20 rounded-full blur-[40px] pointer-events-none" />
              )}

              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/10">
                    {plan.badge}
                  </span>
                </div>

                {/* Plan Title */}
                <h3 className="text-2xl font-black tracking-tight">{plan.name} Plan</h3>
                <p className="text-xs text-white/40 font-medium mt-2 leading-relaxed h-12">
                  {plan.description}
                </p>

                {/* Price Display */}
                <div className="my-8 flex items-baseline gap-2 border-b border-white/5 pb-8">
                  <span className="text-5xl font-black tracking-tighter">{plan.price}</span>
                  <span className="text-xs text-white/30 font-semibold">{plan.period}</span>
                </div>

                {/* Features Checklist */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-xs text-white/60 font-semibold items-start leading-normal">
                      <div className="w-4 h-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={10} strokeWidth={4} />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-4">
                <Show when="signed-out">
                  <Link 
                    href={plan.ctaHref} 
                    className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 group ${
                      plan.isPopular 
                        ? 'bg-white text-black hover:bg-neutral-200 shadow-xl' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                    }`}
                  >
                    <span>{plan.cta}</span>
                    {plan.isPopular && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                  </Link>
                </Show>
                <Show when="signed-in">
                  <Link 
                    href="/dashboard"
                    className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      plan.isPopular 
                        ? 'bg-white text-black hover:bg-neutral-200' 
                        : 'bg-white/5 border border-white/10 hover:bg-white/10 text-white'
                    }`}
                  >
                    <span>Go to Dashboard</span>
                  </Link>
                </Show>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature Comparison Section */}
        <div className="mb-32">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl font-black tracking-tight">Detailed Feature Matrix</h2>
            <p className="text-xs text-white/40 mt-2 font-medium">Analyze how the Free Beta compares to our upcoming commercial versions.</p>
          </div>

          <div className="w-full overflow-x-auto rounded-[32px] border border-white/5 bg-white/[0.01] backdrop-blur-3xl">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="p-6 text-[10px] font-black uppercase tracking-wider text-white/40">Capability Matrix</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-wider text-white/40 text-center w-40">Free Beta Plan</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-wider text-white/40 text-center w-40">Pro (Future)</th>
                  <th className="p-6 text-[10px] font-black uppercase tracking-wider text-white/40 text-center w-40">Enterprise (Future)</th>
                </tr>
              </thead>
              <tbody>
                {featuresList.map((cat) => (
                  <React.Fragment key={cat.category}>
                    {/* Category Title Row */}
                    <tr className="bg-white/[0.01]">
                      <td colSpan={4} className="p-4 px-6 text-xs font-black text-indigo-400 uppercase tracking-widest border-b border-white/5">
                        {cat.category}
                      </td>
                    </tr>
                    {cat.items.map((item) => (
                      <tr key={item.name} className="border-b border-white/5 hover:bg-white/[0.01] transition-all">
                        <td className="p-5 px-6 text-xs font-semibold text-white/70">{item.name}</td>
                        
                        {/* Free Beta Cell */}
                        <td className="p-5 text-xs text-center font-bold">
                          {typeof item.free === 'boolean' ? (
                            item.free ? (
                              <Check size={14} className="text-emerald-400 mx-auto" strokeWidth={3} />
                            ) : (
                              <span className="text-white/20">-</span>
                            )
                          ) : (
                            <span className="text-indigo-400 font-bold bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/10 text-[9px] uppercase tracking-wider">{item.free}</span>
                          )}
                        </td>

                        {/* Pro Cell */}
                        <td className="p-5 text-xs text-center font-bold">
                          {typeof item.pro === 'boolean' ? (
                            item.pro ? (
                              <Check size={14} className="text-emerald-400 mx-auto" strokeWidth={3} />
                            ) : (
                              <span className="text-white/20">-</span>
                            )
                          ) : (
                            <span className="text-white/60 font-semibold">{item.pro}</span>
                          )}
                        </td>

                        {/* Enterprise Cell */}
                        <td className="p-5 text-xs text-center font-bold">
                          {typeof item.enterprise === 'boolean' ? (
                            item.enterprise ? (
                              <Check size={14} className="text-emerald-400 mx-auto" strokeWidth={3} />
                            ) : (
                              <span className="text-white/20">-</span>
                            )
                          ) : (
                            <span className="text-white/80 font-bold">{item.enterprise}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security / Compliance Banner */}
        <div className="p-8 md:p-10 bg-white/[0.02] border border-white/5 rounded-[40px] flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden backdrop-blur-3xl mb-24">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-500/5 rounded-full blur-[40px] pointer-events-none" />
          
          <div className="flex gap-4 items-start text-left">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h4 className="text-lg font-bold">Secure Payout Encryption Vault</h4>
              <p className="text-xs text-white/40 mt-1 max-w-xl leading-relaxed font-semibold">
                Collectly utilizes full SSL/TLS tunnels and AES keys to transfer credentials. Card data is securely isolated via Stripe Connect and Razorpay infrastructure, protecting your operations from exposure.
              </p>
            </div>
          </div>

          <Link href="/sign-up">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black hover:bg-neutral-200 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-wider shrink-0 transition-colors shadow-xl"
            >
              Get Started Free
            </motion.button>
          </Link>
        </div>

      </main>

      <Footer />
    </div>
  );
}
