/**
 * Sidebar Component
 * Provides main navigation for the dashboard authenticated area.
 */
'use client';

import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Bell, 
  Plus,
  BarChart3 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SidebarItem = ({ icon: Icon, label, href, active }: { icon: any, label: string, href: string, active: boolean }) => (
  <Link href={href} className={cn(
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group w-full relative z-10",
    active ? "text-white shadow-sm" : "text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50"
  )}>
    <Icon size={18} className={cn("transition-colors", active ? "text-white" : "group-hover:text-zinc-700")} />
    <span>{label}</span>
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        className="absolute inset-0 bg-[#f04e23] rounded-xl -z-10"
        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
      />
    )}
  </Link>
);

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <aside className="w-72 border-r border-zinc-200 bg-[#ffffff] flex flex-col p-6 hidden lg:flex">
      <div className="flex items-center gap-3 px-2 mb-12">
        <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center">
          <div className="w-5 h-5 rounded-[4px] border-2 border-[#f04e23] bg-[#f04e23]"></div>
        </div>
        <span className="text-lg font-black tracking-tighter uppercase italic text-zinc-900">COLLECTLY</span>
      </div>

      <nav className="space-y-1.5 flex-grow">
        <p className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-4">Main Menu</p>
        <SidebarItem 
          icon={LayoutDashboard} 
          label="Overview" 
          href="/dashboard" 
          active={pathname === '/dashboard'} 
        />
        <SidebarItem 
          icon={FileText} 
          label="Invoices" 
          href="/dashboard/invoices" 
          active={pathname.startsWith('/dashboard/invoices')} 
        />
        <SidebarItem 
          icon={BarChart3} 
          label="Analytics" 
          href="/dashboard/analytics" 
          active={pathname.startsWith('/dashboard/analytics')} 
        />
        <SidebarItem 
          icon={Users} 
          label="Clients" 
          href="/dashboard/clients" 
          active={pathname.startsWith('/dashboard/clients')} 
        />
        <SidebarItem 
          icon={Bell} 
          label="Notifications" 
          href="/dashboard/notifications" 
          active={pathname.startsWith('/dashboard/notifications')} 
        />
        
        <div className="mt-10">
          <p className="px-4 text-[10px] font-black text-zinc-400 uppercase tracking-[0.3em] mb-4">Settings & Support</p>
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/dashboard/settings" 
            active={pathname.startsWith('/dashboard/settings')} 
          />
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-all w-full group mt-1 cursor-pointer"
          >
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="mt-auto group cursor-pointer">
        <div className="p-4 bg-zinc-50 hover:bg-zinc-100/85 rounded-[24px] border border-zinc-200/60 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src={user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName || 'User'}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-zinc-200"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#ffffff] rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate leading-tight text-zinc-800">{user.firstName} {user.lastName}</p>
              <p className="text-[11px] text-zinc-400 font-medium truncate">{user.emailAddresses?.[0]?.emailAddress}</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-[#f04e23] hover:bg-[#d83f18] text-white rounded-xl text-[11px] font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm">
            <span>Upgrade Pro</span> <Plus size={12} />
          </button>
        </div>
      </div>
    </aside>
  );
}
