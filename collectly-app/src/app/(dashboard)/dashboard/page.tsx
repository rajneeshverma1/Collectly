'use client';

import React from 'react';
import { LayoutDashboard, Users, FileText, Settings, LogOut, Bell, Search, Command, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { DashboardSummary } from '@/components/DashboardSummary';

const SidebarItem = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <button className={cn(
    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group w-full",
    active ? "bg-white/10 text-white shadow-sm ring-1 ring-white/10" : "text-white/40 hover:text-white hover:bg-white/5"
  )}>
    <Icon size={18} className={cn("transition-colors", active ? "text-white" : "group-hover:text-white")} />
    {label}
  </button>
);

export default function DashboardPage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="flex h-screen bg-black text-white font-sans selection:bg-white/20 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col p-4">
        <div className="flex items-center gap-2 px-2 mb-10">
          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
            <div className="w-4 h-4 rounded-[3px] border-2 border-black"></div>
          </div>
          <span className="text-sm font-bold tracking-tight uppercase">COLLECTLY</span>
        </div>

        <div className="space-y-1 flex-grow">
          <p className="px-3 text-[10px] font-bold text-white/20 uppercase tracking-widest mb-3">Main</p>
          <SidebarItem icon={LayoutDashboard} label="Overview" active />
          <SidebarItem icon={FileText} label="Invoices" />
          <SidebarItem icon={Users} label="Clients" />
          <SidebarItem icon={Bell} label="Notifications" />
          
          <div className="mt-8">
            <p className="px-3 text-[10px] font-bold text-white/20 uppercase tracking-widest mb-3">Account</p>
            <SidebarItem icon={Settings} label="Settings" />
            <button 
              onClick={logout}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all w-full mt-2 group"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>

        <div className="mt-auto p-3 bg-white/5 rounded-2xl border border-white/5">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName || 'User'}`}
              alt="Avatar"
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="overflow-hidden">
              <p className="text-xs font-bold truncate">{user.firstName} {user.lastName}</p>
              <p className="text-[10px] text-white/40 font-medium truncate">{user.emailAddresses?.[0]?.emailAddress}</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-1.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors">
            Upgrade <Plus size={10} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col bg-[#050505]">
        {/* Header */}
        <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-black/50 backdrop-blur-xl sticky top-0 z-20">
          <div className="relative w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/20"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-white/40 font-bold">
              <Command size={10} /> K
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
              <Bell size={20} className="text-white/60" />
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 overflow-hidden cursor-pointer hover:border-white/30 transition-all">
              <img src={user.imageUrl} alt="Avatar" />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="p-8 overflow-y-auto w-full">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Overview</h2>
              <p className="text-white/40 text-sm mt-1 font-medium italic">Welcome back, {user.firstName || 'User'}.</p>
            </div>
            <button className="bg-white text-black px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow-lg shadow-white/5">
              <Plus size={16} /> Create Invoice
            </button>
          </div>

          <DashboardSummary />

          <div className="h-96 bg-[#111] border border-white/5 rounded-[2rem] flex flex-col items-center justify-center p-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <FileText size={32} className="text-white/20" />
            </div>
            <h4 className="text-xl font-semibold mb-2 tracking-tight">No active invoices</h4>
            <p className="text-white/40 max-w-sm mb-8 leading-relaxed font-medium">
              Start by creating your first invoice to track your revenue and manage your clients.
            </p>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-6 py-2.5 rounded-xl font-bold text-sm transition-all">
              Learn more about invoicing
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
