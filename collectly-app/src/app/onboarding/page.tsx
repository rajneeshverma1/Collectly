'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, User, ArrowRight, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState<'Freelancer' | 'Agency'>('Freelancer');
  const [isLoading, setIsLoading] = useState(false);
  const { user, createOrg, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if user already has an organization or is not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    } else if (!authLoading && user?.organizationId) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      const result = await createOrg({ name: orgName, type: orgType });
      if (!result.success) {
        // Handle error (maybe show a toast or message)
        console.error(result.message);
      }
    } catch (err) {
      console.error('Failed to create organization');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 selection:bg-purple-500/30">
      {/* Background radial glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[25%] -left-[10%] w-[70%] h-[70%] bg-purple-900/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[25%] -right-[10%] w-[70%] h-[70%] bg-indigo-900/10 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-12 space-y-4 text-center">
          <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 mb-2">
            <span className="text-2xl font-bold tracking-tighter">C</span>
          </div>
          <div className="flex gap-2">
            {[1, 2].map((i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1 w-12 rounded-full transition-all duration-500",
                  step >= i ? "bg-white" : "bg-white/10"
                )} 
              />
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-3xl font-semibold mb-3 tracking-tight">Create your workspace</h1>
                <p className="text-white/40 text-sm">Every account on Collectly needs an organization. You can invite teammates later.</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/40 ml-1">Organization Name</label>
                  <input
                    id="org-name"
                    autoFocus
                    value={orgName}
                    onChange={(e) => setOrgName(e.target.value)}
                    placeholder="e.g. Acme Studio"
                    className="w-full bg-[#111111] border border-white/5 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/30 transition-all duration-200 placeholder:text-white/5 shadow-inner"
                  />
                </div>

                <button
                  disabled={!orgName}
                  onClick={() => setStep(2)}
                  className="w-full py-4 bg-white text-black font-semibold rounded-2xl mt-4 hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5"
                >
                  <span>Continue</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="text-center">
                <h1 className="text-3xl font-semibold mb-3 tracking-tight">Tell us about {orgName}</h1>
                <p className="text-white/40 text-sm">We'll tailor your experience based on your business type.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: 'Freelancer', icon: <User size={24} />, desc: 'Solopreneur or individual' },
                  { id: 'Agency', icon: <LayoutGrid size={24} />, desc: 'A team or registered company' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setOrgType(option.id as any)}
                    className={cn(
                      "flex items-center gap-5 p-6 rounded-3xl border transition-all duration-300 text-left relative overflow-hidden group",
                      orgType === option.id 
                        ? "bg-white/5 border-purple-500/30 ring-1 ring-purple-500/20" 
                        : "bg-[#0A0A0A]/60 border-white/5 hover:border-white/20"
                    )}
                  >
                    <div className={cn(
                      "p-3 rounded-xl transition-all duration-300",
                      orgType === option.id ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20" : "bg-white/5 text-white/20 group-hover:text-white/40"
                    )}>
                      {option.icon}
                    </div>
                    <div className="flex-grow">
                      <div className="font-semibold text-lg">{option.id}</div>
                      <div className="text-sm text-white/30">{option.desc}</div>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                      orgType === option.id ? "bg-white border-white scale-110" : "border-white/10"
                    )}>
                      {orgType === option.id && <Check size={12} className="text-black" strokeWidth={4} />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="w-1/3 py-4 bg-[#141414] hover:bg-[#1A1A1A] border border-white/5 text-white/60 font-medium rounded-2xl transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="flex-grow py-4 bg-white text-black font-semibold rounded-2xl hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 transition-all flex items-center justify-center gap-2 group shadow-xl shadow-white/5"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <span>Finish setup</span>
                      <Check size={20} className="group-hover:scale-110 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-16 text-center relative z-10">
        <p className="text-[10px] text-white/10 uppercase tracking-widest font-bold">
          Logged in as <span className="text-white/30">{user?.email}</span>
        </p>
      </div>
    </div>
  );
}
