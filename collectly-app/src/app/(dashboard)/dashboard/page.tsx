'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  AlertTriangle, 
  Mail, 
  CheckCircle2, 
  ArrowUpRight, 
  Loader2, 
  Send, 
  TrendingUp, 
  DollarSign, 
  AlertCircle
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
              "fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl flex items-center gap-3 border shadow-[0_24px_48px_rgba(0,0,0,0.1)] backdrop-blur-xl transition-all font-semibold text-sm",
              toast.type === 'success' 
                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                : "bg-rose-50 text-rose-700 border-rose-200"
            )}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Blur Backdrops */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/[0.02] blur-[150px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/[0.02] blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none" />

      {/* Dashboard Top Header */}
      <DashboardHeader />

      <div className="p-8 lg:p-10 flex-grow relative z-10">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-2 text-zinc-900">Overview</h2>
            <p className="text-zinc-500 text-base font-medium">
              Welcome back, <span className="text-zinc-800 font-bold">{user.firstName || 'Developer'}</span>. Here's your performance snapshot.
            </p>
          </motion.div>
          
          <Link href="/dashboard/invoices">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-zinc-900 text-white px-6 py-3 rounded-[16px] font-black text-xs hover:bg-zinc-800 transition-all flex items-center gap-2 shadow-sm self-start sm:self-auto cursor-pointer"
            >
              <Plus size={16} strokeWidth={3} />
              <span>Create New Invoice</span>
            </motion.button>
          </Link>
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
              className="p-6 lg:p-8 bg-white border border-zinc-200/80 rounded-[32px] shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-zinc-900 mb-1">Recent Invoices</h4>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Billing Ledger</p>
                </div>

                {/* Filter and Search controls */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                    <input 
                      type="text" 
                      placeholder="Search invoice or client..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-white border border-zinc-200 rounded-xl pl-9 pr-4 py-2 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-zinc-400 w-48 md:w-56 transition-all shadow-sm"
                    />
                  </div>
                  
                  {/* Status Filters */}
                  <div className="flex items-center bg-zinc-100 p-0.5 rounded-xl border border-zinc-200/50">
                    {['all', 'draft', 'sent', 'paid', 'overdue'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={cn(
                          "px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer",
                          filterStatus === status 
                            ? "bg-white text-zinc-900 font-bold shadow-sm border border-zinc-200/20" 
                            : "text-zinc-400 hover:text-zinc-750"
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
                    <tr className="border-b border-zinc-100 text-[10px] font-black tracking-widest text-zinc-400 uppercase">
                      <th className="pb-4">Invoice Number</th>
                      <th className="pb-4">Client Name</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Due Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-sm">
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-zinc-400">
                          <Loader2 className="animate-spin mx-auto text-zinc-300 mb-2" size={24} />
                          Loading Ledger...
                        </td>
                      </tr>
                    ) : filteredInvoices.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-zinc-400 font-medium">
                          No matching invoices located.
                        </td>
                      </tr>
                    ) : (
                      filteredInvoices.map((inv) => (
                        <tr key={inv.id} className="group hover:bg-zinc-50/50 transition-colors">
                          <td className="py-4 font-bold text-zinc-900 group-hover:text-[#f04e23] transition-colors">
                            {inv.invoiceNumber}
                          </td>
                          <td className="py-4 text-zinc-600 font-semibold">{inv.clientName}</td>
                          <td className="py-4 font-extrabold text-zinc-900">{formatUsd(Number(inv.amount))}</td>
                          <td className="py-4 text-zinc-400 text-xs">
                            {new Date(inv.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-4">
                            <span className={cn(
                              "inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border",
                              inv.status === 'paid' && "bg-emerald-50 text-emerald-700 border-emerald-200/50",
                              inv.status === 'overdue' && "bg-rose-50 text-rose-700 border-rose-200/50",
                              inv.status === 'sent' && "bg-blue-50 text-blue-700 border-blue-200/50",
                              inv.status === 'draft' && "bg-zinc-50 text-zinc-550 border-zinc-200/50"
                            )}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <Link 
                              href={`/pay/${inv.id}`}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-400 hover:text-zinc-800 transition-colors"
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
              className="p-6 lg:p-8 bg-white border border-zinc-200/80 rounded-[32px] shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-zinc-900 mb-1">Reminder Activity Log</h4>
                  <p className="text-xs text-zinc-400 font-bold uppercase tracking-widest">Client contact history</p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-zinc-400">
                  <Mail size={16} />
                </div>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="py-12 text-center text-zinc-400">
                    <Loader2 className="animate-spin mx-auto text-zinc-300 mb-2" size={24} />
                    Syncing Activities...
                  </div>
                ) : reminders.length === 0 ? (
                  <div className="py-10 text-center border border-dashed border-zinc-200/80 rounded-2xl">
                    <Mail className="mx-auto text-zinc-300 mb-3" size={28} />
                    <p className="text-zinc-400 text-xs font-semibold">No reminders have been logged yet.</p>
                  </div>
                ) : (
                  reminders.map((rem, index) => (
                    <motion.div
                      key={rem.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-white border border-zinc-100 hover:bg-zinc-50/50 rounded-2xl flex items-center justify-between shadow-sm transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black border",
                          rem.status === 'sent' ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
                        )}>
                          {rem.status === 'sent' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-zinc-800">
                            {rem.client?.name || 'Client Workspace'}
                          </h5>
                          <p className="text-[10px] text-zinc-400 mt-0.5">
                            Type: <span className="font-bold uppercase text-zinc-500">{rem.emailType}</span> &bull; {rem.recipientEmail}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={cn(
                          "inline-block text-[9px] font-bold tracking-wider px-2 py-0.5 rounded uppercase border",
                          rem.status === 'sent' ? "bg-emerald-50 text-emerald-655 border-emerald-200/40" : "bg-rose-50 text-rose-655 border-rose-200/40"
                        )}>
                          {rem.status}
                        </span>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider mt-1">
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
              className="p-6 bg-rose-50/40 border border-rose-100 rounded-[32px] relative overflow-hidden shadow-sm"
            >
              {/* Pulse alert light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/[0.01] blur-[50px] rounded-full pointer-events-none" />

              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-lg font-bold tracking-tight text-zinc-900 mb-1">Overdue Action</h4>
                  <p className="text-[10px] text-rose-500 font-black uppercase tracking-wider">Immediate Attention Required</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 border border-rose-200 flex items-center justify-center animate-pulse">
                  <AlertTriangle size={18} />
                </div>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <div className="py-6 text-center text-zinc-400">
                    <Loader2 className="animate-spin mx-auto text-zinc-300 mb-2" size={20} />
                    Analyzing Debts...
                  </div>
                ) : overdueInvoices.length === 0 ? (
                  <div className="py-8 text-center bg-white border border-zinc-150 rounded-2xl shadow-sm">
                    <CheckCircle2 className="mx-auto text-emerald-500 mb-2" size={24} />
                    <p className="text-zinc-500 text-xs font-semibold">No overdue accounts outstanding.</p>
                  </div>
                ) : (
                  overdueInvoices.map((inv) => (
                    <div 
                      key={inv.id}
                      className="p-4 bg-white border border-rose-100 rounded-2xl flex flex-col gap-3 shadow-sm group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-xs text-zinc-800">{inv.invoiceNumber}</h5>
                          <p className="text-[10px] text-zinc-400 font-medium mt-0.5">{inv.clientName}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-black text-xs text-rose-600">{formatUsd(Number(inv.amount))}</p>
                          <p className="text-[9px] text-zinc-450 font-bold uppercase mt-0.5">
                            Due: {new Date(inv.dueDate).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>

                      {/* Manual Remind Trigger Action Button */}
                      <button
                        onClick={() => handleSendReminder(inv.id)}
                        disabled={remindingId === inv.id}
                        className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50 text-[10px] font-black uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        {remindingId === inv.id ? (
                          <>
                            <Loader2 className="animate-spin" size={10} />
                            <span>Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <Send size={10} />
                            <span>Manual Reminder</span>
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
              className="p-6 bg-white border border-zinc-200/80 rounded-[32px] shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h4 className="text-base font-bold tracking-tight text-zinc-900 mb-1">Cash Flow Trend</h4>
                  <p className="text-[9px] text-zinc-455 font-bold uppercase tracking-wider">H1 Performance</p>
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 text-emerald-600 text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">
                  <TrendingUp size={10} />
                  <span>+18.4%</span>
                </div>
              </div>

              {/* Premium SVG Status Chart */}
              <div className="h-32 w-full mt-4 flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  {/* SVG Gradient fill */}
                  <defs>
                    <linearGradient id="gradient-chart" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(0,0,0,0.02)" strokeWidth="0.5" />
                  <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(0,0,0,0.02)" strokeWidth="0.5" />
                  <line x1="0" y1="30" x2="100" y2="30" stroke="rgba(0,0,0,0.02)" strokeWidth="0.5" />
                  
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
                  <circle cx="100" cy="5" r="2" fill="#10b981" className="origin-center" style={{ transformOrigin: '100px 5px' }} />
                </svg>
              </div>

              <div className="flex justify-between mt-4 text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </div>
  );
}
