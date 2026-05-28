'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Users, 
  FileText, 
  Search, 
  Plus, 
  AlertTriangle, 
  Mail, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Loader2, 
  Filter, 
  Send, 
  TrendingUp, 
  DollarSign, 
  Calendar,
  AlertCircle,
  TrendingDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { DashboardSummary } from '@/components/DashboardSummary';
import { DashboardHeader } from '@/components/DashboardHeader';
import Link from 'next/link';
import axios from 'axios';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partially_paid';
  dueDate: string;
  createdAt: string;
}

interface Payment {
  id: string;
  amount: number;
  paymentMethod: string;
  paidAt: string;
  invoice?: {
    invoiceNumber: string;
    clientName: string;
  };
}

interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: string;
  createdAt: string;
}

interface Reminder {
  id: string;
  recipientEmail: string;
  emailType: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt: string;
  client?: {
    name: string;
    company?: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export default function DashboardPage() {
  const { user, getToken } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Table state filters
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Reminding visual status loader
  const [remindingId, setRemindingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchDashboardActivity = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(`${API_URL}/dashboard/activity`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        const { recentInvoices, recentPayments, recentClients, recentReminders } = response.data.data;
        setInvoices(recentInvoices || []);
        setPayments(recentPayments || []);
        setClients(recentClients || []);
        setReminders(recentReminders || []);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard activity:', err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      fetchDashboardActivity();
    }
  }, [user, fetchDashboardActivity]);

  // Handle immediate action: manual reminder dispatch
  const handleSendReminder = async (invoiceId: string) => {
    try {
      setRemindingId(invoiceId);
      const token = await getToken();
      const response = await axios.post(`${API_URL}/invoices/${invoiceId}/remind`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setToast({ message: response.data.message || 'Reminder sent successfully!', type: 'success' });
        // Re-fetch activity to update the dynamic Reminder Logs stream
        fetchDashboardActivity();
      } else {
        setToast({ message: response.data.message || 'Failed to dispatch reminder.', type: 'error' });
      }
    } catch (err: any) {
      console.error('Failed to dispatch reminder:', err);
      setToast({ 
        message: err.response?.data?.message || 'Outage or local connection issue. Failed to dispatch email.', 
        type: 'error' 
      });
    } finally {
      setRemindingId(null);
      // Dismiss toast automatically after 4 seconds
      setTimeout(() => setToast(null), 4000);
    }
  };

  const formatUsd = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(val);
  };

  if (!user) return null;

  // Filtered invoices for display
  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          inv.clientName.toLowerCase().includes(searchQuery.toLowerCase());
    if (filterStatus === 'all') return matchesSearch;
    return matchesSearch && inv.status === filterStatus;
  });

  // Overdue invoices needing immediate action
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueInvoices = invoices.filter(inv => 
    inv.status === 'overdue' || 
    (inv.status !== 'paid' && inv.status !== 'cancelled' && new Date(inv.dueDate) < today)
  );

  return (
    <div className="h-full overflow-y-auto custom-scrollbar flex flex-col pb-16">
      {/* Dynamic Toast Portal */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={cn(
              "fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl flex items-center gap-3 border shadow-[0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all font-semibold text-sm",
              toast.type === 'success' 
                ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30" 
                : "bg-red-950/80 text-red-400 border-red-500/30"
            )}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Blur Backdrops */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[150px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      {/* Dashboard Top Header */}
      <DashboardHeader />

      <div className="p-8 lg:p-10 flex-grow relative z-10">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-2 text-white">Overview</h2>
            <p className="text-white/40 text-base font-medium">
              Welcome back, <span className="text-white font-bold">{user.firstName || 'Developer'}</span>. Here's your SaaS performance metric.
            </p>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-black px-6 py-3 rounded-[16px] font-black text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_20px_40px_rgba(255,255,255,0.05)] self-start sm:self-auto"
          >
            <Plus size={16} strokeWidth={3} />
            <Link href="/dashboard/invoices">Create New Invoice</Link>
          </motion.button>
        </div>

        {/* 1. Top KPI Summary Cards Section */}
        <DashboardSummary />

        {/* Outer Section Layout Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-4">
          
          {/* Main Content Area (Column Span 2) */}
          <div className="xl:col-span-2 space-y-8">
            
            {/* 2. Recent Invoices Table with Client-Side Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 lg:p-8 bg-white/[0.01] border border-white/5 rounded-[32px] backdrop-blur-3xl"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-white mb-1">Recent Invoices</h4>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest">SaaS Billing Ledger</p>
                </div>

                {/* Filter and Search controls */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search invoice or client..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white/5 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/10 w-48 md:w-56 transition-all"
                    />
                  </div>
                  
                  {/* Status Filters */}
                  <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
                    {['all', 'draft', 'sent', 'paid', 'overdue'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={cn(
                          "px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                          filterStatus === status 
                            ? "bg-white text-black font-bold shadow-md" 
                            : "text-white/40 hover:text-white/80"
                        )}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Invoices Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black tracking-widest text-white/30 uppercase">
                      <th className="pb-4">Invoice Number</th>
                      <th className="pb-4">Client Name</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Due Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-white/30">
                          <Loader2 className="animate-spin mx-auto text-white/10 mb-2" size={24} />
                          Loading SaaS Ledger...
                        </td>
                      </tr>
                    ) : filteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-white/30 font-medium">
                          No matching invoices located.
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map((inv) => (
                        <tr key={inv.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 font-bold text-white group-hover:text-blue-400 transition-colors">
                            {inv.invoiceNumber}
                          </td>
                          <td className="py-4 text-white/60 font-semibold">{inv.clientName}</td>
                          <td className="py-4 font-extrabold text-white">{formatUsd(Number(inv.amount))}</td>
                          <td className="py-4 text-white/40 text-xs">
                            {new Date(inv.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-4">
                            <span className={cn(
                              "inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider",
                              inv.status === 'paid' && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
                              inv.status === 'overdue' && "bg-red-500/10 text-red-400 border border-red-500/20",
                              inv.status === 'sent' && "bg-blue-500/10 text-blue-400 border border-blue-500/20",
                              inv.status === 'draft' && "bg-white/5 text-white/40 border border-white/5"
                            )}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <Link 
                              href={`/pay/${inv.id}`}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-white/40 hover:text-white transition-colors"
                            >
                              Checkout <ArrowUpRight size={12} />
                            </Link>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* 3. Reminder Activity Section (Showing dynamic EmailLogs contacted to clients) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 lg:p-8 bg-white/[0.01] border border-white/5 rounded-[32px] backdrop-blur-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-white mb-1">Reminder Activity Log</h4>
                  <p className="text-xs text-white/30 font-bold uppercase tracking-widest">Client contact history</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/30">
                  <Mail size={16} />
                </div>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="py-12 text-center text-white/20">
                    <Loader2 className="animate-spin mx-auto text-white/10 mb-2" size={24} />
                    Syncing Activities...
                  </div>
                ) : reminders.length === 0 ? (
                  <div className="py-10 text-center border border-dashed border-white/5 rounded-2xl">
                    <Mail className="mx-auto text-white/10 mb-3" size={28} />
                    <p className="text-white/30 text-xs font-semibold">No reminders have been logged yet.</p>
                  </div>
                ) : (
                  reminders.map((rem, index) => (
                    <motion.div
                      key={rem.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.04] transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black",
                          rem.status === 'sent' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                        )}>
                          {rem.status === 'sent' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-white">
                            {rem.client?.name || 'Client Workspace'}
                          </h5>
                          <p className="text-[10px] text-white/30 mt-0.5">
                            Type: <span className="font-bold uppercase text-white/50">{rem.emailType}</span> &bull; {rem.recipientEmail}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={cn(
                          "inline-block text-[9px] font-bold tracking-wider px-2 py-0.5 rounded uppercase border",
                          rem.status === 'sent' ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" : "bg-red-500/5 text-red-400 border-red-500/20"
                        )}>
                          {rem.status}
                        </span>
                        <p className="text-[9px] text-white/20 font-bold uppercase tracking-wider mt-1">
                          {new Date(rem.sentAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>

          </div>

          {/* Sidebar Area (Column Span 1) */}
          <div className="space-y-8">
            
            {/* 4. Overdue Invoices Needing Immediate Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-6 bg-red-950/10 border border-red-500/20 rounded-[32px] relative overflow-hidden backdrop-blur-3xl shadow-[0_24px_48px_rgba(239,68,68,0.05)]"
            >
              {/* Pulse alert light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[50px] rounded-full pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-bold tracking-tight text-white mb-1">Overdue Action</h4>
                  <p className="text-[10px] text-red-400 font-black uppercase tracking-wider">Immediate Attention Required</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 border border-red-500/20 animate-pulse">
                  <AlertTriangle size={18} />
                </div>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="py-6 text-center text-white/30">
                    <Loader2 className="animate-spin mx-auto text-white/10 mb-2" size={20} />
                    Analyzing Debts...
                  </div>
                ) : overdueInvoices.length === 0 ? (
                  <div className="py-8 text-center bg-white/[0.02] border border-white/5 rounded-2xl">
                    <CheckCircle2 className="mx-auto text-emerald-400/30 mb-2" size={24} />
                    <p className="text-white/40 text-xs font-semibold">Perfect! No overdue accounts outstanding.</p>
                  </div>
                ) : (
                  overdueInvoices.map((inv) => (
                    <div 
                      key={inv.id}
                      className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex flex-col gap-3 group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-xs text-white">{inv.invoiceNumber}</h5>
                          <p className="text-[10px] text-white/40 font-medium mt-0.5">{inv.clientName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-xs text-red-400">{formatUsd(Number(inv.amount))}</p>
                          <p className="text-[9px] text-white/20 font-bold uppercase mt-0.5">
                            Due: {new Date(inv.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Manual Remind Trigger Action Button */}
                      <button
                        onClick={() => handleSendReminder(inv.id)}
                        disabled={remindingId === inv.id}
                        className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 disabled:opacity-50 text-[10px] font-black uppercase tracking-wider rounded-xl border border-red-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        {remindingId === inv.id ? (
                          <>
                            <Loader2 className="animate-spin" size={10} />
                            Dispatching...
                          </>
                        ) : (
                          <>
                            <Send size={10} />
                            Manual Reminder
                          </>
                        )}
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>

            {/* 5. Small Chart: Cash Flow & Status Trend Visualizer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="p-6 bg-white/[0.01] border border-white/5 rounded-[32px] relative overflow-hidden backdrop-blur-3xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-base font-bold tracking-tight text-white mb-1">Cash Flow Trend</h4>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-wider">H1 Performance</p>
                </div>
                <div className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg border border-emerald-500/20">
                  <TrendingUp size={10} />
                  +18.4%
                </div>
              </div>

              {/* Premium Minimalist SVG Status Chart */}
              <div className="h-32 w-full mt-4 flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  {/* SVG Gradient fill */}
                  <defs>
                    <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                  
                  {/* Trend Area path */}
                  <path 
                    d="M 0 35 Q 20 20 40 28 T 80 10 T 100 5 L 100 40 L 0 40 Z" 
                    fill="url(#gradient-chart)"
                  />
                  
                  {/* Trend Stroke line */}
                  <path 
                    d="M 0 35 Q 20 20 40 28 T 80 10 T 100 5" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                  />
                  
                  {/* Glowing anchor dots */}
                  <circle cx="40" cy="28" r="1.5" fill="#10b981" />
                  <circle cx="80" cy="10" r="1.5" fill="#10b981" />
                  <circle cx="100" cy="5" r="2" fill="#34d399" className="animate-ping origin-center" style={{ transformOrigin: '100px 5px' }} />
                </svg>
              </div>

              <div className="flex justify-between mt-4 text-[9px] font-bold text-white/20 uppercase tracking-widest">
                <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
