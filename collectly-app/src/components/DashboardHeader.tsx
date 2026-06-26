'use client';

import React, { useEffect, useState, useRef } from 'react';
import { Search, Command, Bell, CheckCircle2, DollarSign, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

function formatRelativeTime(dateString: string) {
  if (!dateString) return 'Just now';
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

export function DashboardHeader() {
  const { getToken, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    try {
      const token = await getToken();
      if (!token) return;
      const res = await axios.get(`${API_URL}/payments/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data.status === 'success') {
        // Exclusively show notifications for invoices paid in full
        const transactions = (res.data.data || []).filter(
          (t: any) => t.Invoice?.status === 'paid'
        );
        setNotifications(transactions);
        
        // Check if there are new payments since the last time notifications were opened
        const lastRead = localStorage.getItem('collectly_notifications_last_read');
        if (transactions.length > 0) {
          if (!lastRead) {
            setHasNew(true);
          } else {
            const lastReadTime = new Date(lastRead).getTime();
            const newestPaymentTime = new Date(transactions[0].paidAt || transactions[0].createdAt).getTime();
            setHasNew(newestPaymentTime > lastReadTime);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotifications();
      // Poll notifications/transactions every 15 seconds for real-time payments updates
      const interval = setInterval(fetchNotifications, 15000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // Click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
    setHasNew(false);
    localStorage.setItem('collectly_notifications_last_read', new Date().toISOString());
  };

  return (
    <header className="h-20 border-b border-gray-200 flex items-center justify-between px-10 bg-white/50 backdrop-blur-2xl sticky top-0 z-20">
      <div className="relative w-[400px] group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900/20 group-focus-within:text-gray-900 transition-colors" size={18} />
        <input 
          type="text" 
          placeholder="Search anything..." 
          className="w-full bg-white border border-gray-200 rounded-2xl py-2.5 pl-12 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all placeholder:text-gray-400 hover:bg-gray-50 shadow-sm"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2 py-1 rounded-lg border border-gray-200 bg-gray-50 text-[10px] text-gray-500 font-black group-focus-within:text-gray-900 group-focus-within:border-gray-300 transition-all">
          <Command size={10} /> K
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex -space-x-3 hover:-space-x-1 transition-all duration-300">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden hover:scale-110 transition-transform cursor-pointer shadow-sm">
               <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} alt="User" />
            </div>
          ))}
          <div className="w-8 h-8 rounded-full border-2 border-[#ffffff] bg-white/5 flex items-center justify-center text-[10px] font-bold hover:scale-110 transition-transform cursor-pointer">
            +12
          </div>
        </div>
        <div className="h-8 w-px bg-gray-200 mx-2" />
        
        {/* Dynamic Notification Bell and Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button onClick={handleOpenDropdown} className="w-10 h-10 rounded-full border border-gray-200 bg-white flex items-center justify-center relative hover:bg-gray-50 hover:scale-105 transition-all shadow-sm">
            <Bell size={18} className="text-gray-600" />
            {hasNew && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#F26522] rounded-full ring-2 ring-white"></span>}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.95 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="absolute right-0 top-full mt-4 w-80 bg-white backdrop-blur-3xl border border-gray-200 rounded-2xl shadow-xl overflow-hidden py-2 origin-top-right z-50"
              >
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 text-sm">Notifications</h3>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
                
                <div className="max-h-64 overflow-y-auto custom-scrollbar">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center flex flex-col items-center justify-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400">
                        <CheckCircle2 size={18} />
                      </div>
                      <p className="text-xs font-bold text-zinc-500">All caught up</p>
                      <p className="text-[10px] text-zinc-400">No payment events recorded yet.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-zinc-50">
                      {notifications.slice(0, 10).map((notif) => (
                        <div key={notif.id} className="p-4 hover:bg-zinc-50/50 transition-colors flex gap-3 items-start text-left">
                          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
                            <DollarSign size={14} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold leading-tight">Full Payment Received</p>
                            <p className="text-[10px] text-zinc-500 leading-normal mt-0.5">
                              <span className="font-bold text-zinc-700">{notif.Invoice?.clientName || 'Client'}</span> paid{' '}
                              <span className="font-black text-[#f04e23]">{notif.Invoice?.currency === 'INR' ? '₹' : '$'}{notif.amount}</span>{' '}
                              to settle invoice <span className="font-bold text-zinc-700">{notif.Invoice?.invoiceNumber}</span> in full.
                            </p>
                            <span className="text-[9px] text-zinc-400 font-bold block mt-1">
                              {formatRelativeTime(notif.paidAt || notif.createdAt)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
