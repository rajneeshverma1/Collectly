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
    "flex items-center gap-2 px-2 py-1.5 text-sm font-normal transition-none w-full",
    active ? "text-white bg-black" : "text-black hover:bg-gray-200"
  )}>
    <Icon size={14} className={cn("transition-none", active ? "text-white" : "text-black")} />
    <span>{label}</span>
  </Link>
);

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  return (
    <aside className="w-64 border-r border-black bg-white flex flex-col p-4 hidden lg:flex">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-black border border-black flex items-center justify-center text-white font-bold text-sm">
          Y
        </div>
        <span className="text-base font-bold text-black">Collectly</span>
      </div>

      <nav className="space-y-0.5 flex-grow">
        <p className="px-2 text-xs font-bold text-black mb-2">Main Menu</p>
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
        
        <div className="mt-8">
          <p className="px-2 text-xs font-bold text-black mb-2">Settings & Support</p>
          <SidebarItem 
            icon={Settings} 
            label="Settings" 
            href="/dashboard/settings" 
            active={pathname.startsWith('/dashboard/settings')} 
          />
          <button 
            onClick={logout}
            className="flex items-center gap-2 px-2 py-1.5 text-sm font-normal text-black hover:bg-gray-200 transition-none w-full cursor-pointer"
          >
            <LogOut size={14} className="text-black" />
            <span>Logout</span>
          </button>
        </div>
      </nav>

      <div className="mt-auto group cursor-pointer border-t border-black pt-4">
        <div className="bg-transparent transition-none">
          <div className="flex items-center gap-2 mb-2">
            <div className="relative">
              <img
                src={user.imageUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.firstName || 'User'}`}
                alt="Avatar"
                className="w-8 h-8 rounded-none border border-black"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-normal truncate leading-tight text-black">{user.firstName} {user.lastName}</p>
              <p className="text-xs text-black font-normal truncate">{user.emailAddresses?.[0]?.emailAddress}</p>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-1 border border-black hover:bg-gray-200 text-black rounded-none text-xs font-normal transition-none cursor-pointer">
            <span>Upgrade Pro</span> <Plus size={12} />
          </button>
        </div>
      </div>
    </aside>
  );
}
