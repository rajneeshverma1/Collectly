'use client';

import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, Search, Command, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { DashboardSummary } from '@/components/DashboardSummary';
import { DashboardHeader } from '@/components/DashboardHeader';
import { RecentActivity } from '@/components/RecentActivity';
import Link from 'next/link';

// Metadata is not supported in client components, but we can document it or handle it in a parent layout.
// For now, adding a descriptive comment and ensuring the structure is clean.

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="h-full overflow-y-auto custom-scrollbar flex flex-col">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      {/* Header */}
      <DashboardHeader />

      {/* Dashboard Grid */}
      <div className="p-10 flex-grow">
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-5xl font-extrabold tracking-tight mb-3">Overview</h2>
            <p className="text-white/50 text-lg font-medium leading-relaxed">
              Welcome back, <span className="text-white font-bold">{user.firstName || 'User'}</span>. Here's what's happening today.
            </p>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            title="Create a new invoice for a client"
            className="bg-white text-black px-8 py-3.5 rounded-[18px] font-black text-sm hover:bg-neutral-200 transition-all flex items-center gap-2.5 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
          >
            <Plus size={18} strokeWidth={3} /> Create New Invoice
          </motion.button>
        </div>

        <DashboardSummary />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
          {/* Revenue Chart Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 p-8 bg-white/[0.02] border border-white/5 rounded-[40px] relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-bold mb-1">Revenue Stream</h4>
                <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Monthly Growth</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-bold text-white/60">Weekly</div>
                <div className="px-3 py-1.5 rounded-lg bg-white text-black text-[10px] font-bold">Monthly</div>
              </div>
            </div>
            
            {/* Mock Chart Visualization */}
            <div className="h-64 w-full flex items-end gap-3 px-2">
              {[40, 70, 45, 90, 65, 80, 50, 95, 75, 85, 60, 100].map((height, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: 0.6 + i * 0.05, duration: 1.5, ease: "easeOut" }}
                  className="flex-grow bg-gradient-to-t from-blue-600/40 to-blue-400/80 rounded-t-xl relative group shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-shadow"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${height * 120}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-2 text-[10px] font-bold text-white/20 uppercase tracking-widest">
              <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-b from-[#111] to-black border border-white/5 rounded-[40px] flex flex-col p-8"
          >
            <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <FileText size={28} className="text-white/40" />
            </div>
            <h4 className="text-xl font-bold mb-3 tracking-tight">Quick Actions</h4>
            <p className="text-white/40 text-sm mb-10 leading-relaxed font-medium">
              Easily manage your invoices and clients from one place.
            </p>
            
            <div className="space-y-3 mt-auto">
              <Link href="/dashboard/invoices" className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[20px] font-bold text-xs transition-all flex items-center justify-center gap-2 group">
                View Templates <Search size={14} className="group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="/dashboard/clients" className="w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-[20px] font-bold text-xs transition-all flex items-center justify-center gap-2 group">
                 Add Client <Plus size={14} className="group-hover:rotate-90 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
