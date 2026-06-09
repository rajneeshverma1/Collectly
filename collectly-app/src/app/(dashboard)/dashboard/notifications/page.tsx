'use client';

/**
 * @file notifications/page.tsx
 * @description Premium notification history directory displaying client invoice payment completions.
 */
import React, { useEffect, useState, useCallback } from 'react';
import { 
  Bell, 
  Search, 
  DollarSign, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/DashboardHeader';
import axios from 'axios';

interface NotificationItem {
  id: string;
  amount: number;
  paymentMethod: string;
  paidAt: string;
  createdAt: string;
  notes?: string;
  Invoice?: {
    invoiceNumber: string;
    clientName: string;
    clientEmail: string;
    status: string;
    currency?: string;
  };
}

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

export default function NotificationsPage() {
  const { user, getToken } = useAuth();
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(`${API_URL}/payments/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status === 'success') {
        // Exclusively show notifications for invoices paid in full
        const transactions = (response.data.data || []).filter(
          (t: any) => t.Invoice?.status === 'paid'
        );
        setNotifications(transactions);
        
        // Mark as read in localStorage when viewing the main notifications page
        localStorage.setItem('collectly_notifications_last_read', new Date().toISOString());
      }
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user, fetchNotifications]);

  if (!user) return null;

  const filteredNotifications = notifications.filter(n => 
    n.Invoice?.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.Invoice?.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.paymentMethod?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto custom-scrollbar flex flex-col pb-16">
      <DashboardHeader />

      <div className="p-8 lg:p-10 flex-grow relative z-10">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-2 text-white">Notifications</h2>
            <p className="text-white/40 text-base font-medium">
              Real-time payment captures and system notification events.
            </p>
          </motion.div>
        </div>

        {/* Search controls */}
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input 
            type="text" 
            placeholder="Search by client, invoice number..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/10 w-full transition-all"
          />
        </div>

        {/* Notifications Listing */}
        {loading ? (
          <div className="py-24 text-center text-white/30">
            <Loader2 className="animate-spin mx-auto text-white/10 mb-4" size={32} />
            <p className="font-bold text-sm">Fetching notifications...</p>
          </div>
        ) : filteredNotifications.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-[32px] max-w-xl mx-auto">
            <Bell className="mx-auto text-white/10 mb-4 animate-pulse" size={48} />
            <h4 className="text-white font-bold text-lg mb-2">No Notifications</h4>
            <p className="text-white/30 text-sm max-w-md mx-auto">
              Real-time notifications will show up here as clients pay invoices.
            </p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 max-w-4xl"
          >
            {filteredNotifications.map((notif, index) => (
              <motion.div
                key={notif.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                className="p-6 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-[24px] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0">
                    <DollarSign size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white">Full Payment Captured</h4>
                    <p className="text-xs text-white/40 font-medium mt-1">
                      Client <span className="font-bold text-white">{notif.Invoice?.clientName}</span> paid{' '}
                      <span className="font-bold text-[#f04e23]">{notif.Invoice?.currency === 'INR' ? '₹' : '$'}{notif.amount}</span>{' '}
                      to settle invoice <span className="font-bold text-white">{notif.Invoice?.invoiceNumber}</span> in full.
                    </p>
                    {notif.notes && (
                      <p className="text-[10px] text-white/20 mt-1 italic">{notif.notes}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2 shrink-0 border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full">
                    Succeeded
                  </span>
                  <span className="text-[10px] text-white/20 font-bold">
                    {formatRelativeTime(notif.paidAt || notif.createdAt)}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
