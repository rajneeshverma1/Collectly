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
    "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group w-full relative",
    active ? "bg-white text-black shadow-[0_10px_20px_rgba(255,255,255,0.1)]" : "text-white/40 hover:text-white hover:bg-white/[0.03]"
  )}>
    <Icon size={18} className={cn("transition-colors", active ? "text-black" : "group-hover:text-white")} />
    {label}
    {active && (
      <motion.div 
        layoutId="sidebar-active"
        className="absolute inset-0 bg-white rounded-xl -z-10"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
          <div className="w-5 h-5 rounded-[4px] border-2 border-black"></div>
        </div>
        <span className="text-lg font-black tracking-tighter uppercase italic">COLLECTLY</span>
      </div>

      <nav className="space-y-1.5 flex-grow">
        <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4">Main Menu</p>
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
          <p className="px-4 text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] mb-4">Settings & Support</p>
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/dashboard/settings" 
            active={pathname.startsWith('/dashboard/settings')} 
          />
          <button 
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-400 hover:bg-red-400/10 transition-all w-full group mt-1"
          >
            <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
            Logout
          </button>
        </div>
      </nav>

      <div className="mt-auto group cursor-pointer">
        <div className="p-4 bg-white/[0.03] hover:bg-white/[0.05] rounded-[24px] border border-white/[0.05] transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <img
                src={user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName || 'User'}`}
                alt="Avatar"
                className="w-10 h-10 rounded-full border border-white/10"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 border-2 border-[#ffffff] rounded-full"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate leading-tight">{user.firstName} {user.lastName}</p>
              <p className="text-[11px] text-white/30 font-medium truncate">{user.emailAddresses?.[0]?.emailAddress}</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-2 bg-white text-black hover:bg-neutral-200 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-lg shadow-white/5">
            Upgrade Pro <Plus size={12} />
          </button>
        </div>
      </div>
    </aside>
  );
}
