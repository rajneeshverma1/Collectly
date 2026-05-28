'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Mail, 
  Building, 
  Phone, 
  MapPin, 
  Loader2, 
  ArrowLeft, 
  FileText, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle, 
  Send,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/DashboardHeader';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  status: 'active' | 'pending';
  createdAt: string;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
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
  };
}

interface Reminder {
  id: string;
  recipientEmail: string;
  emailType: string;
  status: 'pending' | 'sent' | 'failed';
  sentAt: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export default function ClientProfilePage() {
  const { user, getToken } = useAuth();
  const { id } = useParams();
  const router = useRouter();
  
  const [client, setClient] = useState<Client | null>(null);
  const [stats, setStats] = useState({ totalInvoices: 0, totalOutstanding: 0, paidInvoicesCount: 0 });
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Navigation Tabs
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'reminders'>('invoices');
  
  // Direct reminder spinner
  const [remindingId, setRemindingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchClientProfile = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(`${API_URL}/clients/${id}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        const { client, stats, invoices, payments, reminders } = response.data.data;
        setClient(client);
        setStats(stats || { totalInvoices: 0, totalOutstanding: 0, paidInvoicesCount: 0 });
        setInvoices(invoices || []);
        setPayments(payments || []);
        setReminders(reminders || []);
      }
    } catch (err) {
      console.error('Failed to fetch client profile:', err);
    } finally {
      setLoading(false);
    }
  }, [id, getToken]);

  useEffect(() => {
    if (user && id) {
      fetchClientProfile();
    }
  }, [user, id, fetchClientProfile]);

  const handleSendReminder = async (invoiceId: string) => {
    try {
      setRemindingId(invoiceId);
      const token = await getToken();
      const response = await axios.post(`${API_URL}/invoices/${invoiceId}/remind`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setToast({ message: response.data.message || 'Manual reminder dispatched!', type: 'success' });
        fetchClientProfile();
      }
    } catch (err: any) {
      console.error('Failed to send reminder:', err);
      setToast({ 
        message: err.response?.data?.message || 'Failed to dispatch manual email reminder.', 
        type: 'error' 
      });
    } finally {
      setRemindingId(null);
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

  return (
    <div className="h-full overflow-y-auto custom-scrollbar flex flex-col pb-16">
      {/* Toast Alert Portal */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed top-6 right-6 z-50 px-6 py-4 rounded-2xl flex items-center gap-3 border shadow-[0_24px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl transition-all font-semibold text-sm",
              toast.type === 'success' ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/30" : "bg-red-950/80 text-red-400 border-red-500/30"
            )}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <DashboardHeader />

      {loading ? (
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-white/30">
          <Loader2 className="animate-spin text-white/10 mb-4" size={32} />
          <p className="font-bold text-sm">Syncing Client Workspace...</p>
        </div>
      ) : !client ? (
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-white/30">
          <AlertCircle className="text-red-400 mb-4" size={48} />
          <p className="font-bold text-lg text-white mb-2">Client Profile Outage</p>
          <p className="text-sm text-white/40 mb-6">The requested client record does not exist or has been deleted.</p>
          <button 
            onClick={() => router.push('/dashboard/clients')}
            className="bg-white/5 border border-white/10 px-5 py-2.5 rounded-xl font-bold text-white text-xs hover:bg-white/10 transition-all"
          >
            Return to Clients
          </button>
        </div>
      ) : (
        <div className="p-8 lg:p-10 flex-grow relative z-10">
          {/* Back Navigation & Breadcrumbs */}
          <button 
            onClick={() => router.push('/dashboard/clients')}
            className="flex items-center gap-2 text-white/40 hover:text-white font-bold text-xs mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Clients List
          </button>

          {/* Client Profile Giant Header */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            
            {/* Left Box: Client Identity Card */}
            <div className="xl:col-span-2 p-8 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-[32px] backdrop-blur-3xl shadow-[0_16px_48px_rgba(0,0,0,0.3)]">
              <span className={cn(
                "inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-4 border",
                client.status === 'active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
              )}>
                {client.status} Client
              </span>
              <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-2">{client.name}</h2>
              {client.company && (
                <p className="text-sm text-white/40 font-bold flex items-center gap-1.5 mb-6">
                  <Building size={14} /> {client.company}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5 text-xs font-semibold text-white/60">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase text-white/20 tracking-wider">Email Address</span>
                  <span className="text-white font-bold">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase text-white/20 tracking-wider">Phone Number</span>
                    <span className="text-white font-bold">{client.phone}</span>
                  </div>
                )}
                {client.address && (
                  <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-1">
                    <span className="text-[10px] font-black uppercase text-white/20 tracking-wider">Billing Address</span>
                    <span className="text-white font-bold truncate max-w-[200px]" title={client.address}>{client.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Box: Total Outstanding Dues */}
            <div className="p-8 bg-red-950/10 border border-red-500/20 rounded-[32px] flex flex-col justify-between backdrop-blur-3xl shadow-[0_24px_48px_rgba(239,68,68,0.02)]">
              <div>
                <p className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] mb-2">Total Outstanding</p>
                <h3 className="text-5xl font-black text-white tracking-tight drop-shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                  {formatUsd(stats.totalOutstanding)}
                </h3>
              </div>

              <div className="pt-6 border-t border-red-500/10 mt-6 grid grid-cols-2 gap-4 text-xs font-bold text-white/40">
                <div>
                  <p className="text-[9px] uppercase tracking-wider mb-0.5 text-white/20">Active Invoices</p>
                  <p className="text-sm font-black text-white">{stats.totalInvoices} created</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-wider mb-0.5 text-white/20">Settled Invoices</p>
                  <p className="text-sm font-black text-white">{stats.paidInvoicesCount} paid</p>
                </div>
              </div>
            </div>

          </div>

          {/* Workspace Switcher Tabs */}
          <div className="flex border-b border-white/5 mb-6 text-xs font-black uppercase tracking-widest gap-2">
            {[
              { key: 'invoices', label: 'Invoices Linked', count: invoices.length },
              { key: 'payments', label: 'Payments History', count: payments.length },
              { key: 'reminders', label: 'Reminder Activity Log', count: reminders.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={cn(
                  "px-4 py-3 border-b-2 transition-all flex items-center gap-2",
                  activeTab === tab.key 
                    ? "border-white text-white font-bold" 
                    : "border-transparent text-white/40 hover:text-white/80"
                )}
              >
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-[9px] text-white/40">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Tab View Contents */}
          <div className="bg-white/[0.01] border border-white/5 rounded-[32px] p-6 lg:p-8 backdrop-blur-3xl">
            {activeTab === 'invoices' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black tracking-widest text-white/30 uppercase">
                      <th className="pb-4">Invoice Number</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Due Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Action Trigger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-bold text-white/60">
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-white/30">
                          <FileText className="mx-auto text-white/10 mb-3" size={32} />
                          No invoices have been billed to this client's email yet.
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv) => (
                        <tr key={inv.id} className="group hover:bg-white/[0.01] transition-colors">
                          <td className="py-4 font-black text-white group-hover:text-blue-400 transition-colors">
                            {inv.invoiceNumber}
                          </td>
                          <td className="py-4 text-white font-extrabold">{formatUsd(Number(inv.amount))}</td>
                          <td className="py-4 text-white/40 font-semibold">
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
                            {inv.status !== 'paid' && inv.status !== 'cancelled' ? (
                              <button
                                onClick={() => handleSendReminder(inv.id)}
                                disabled={remindingId === inv.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-wider text-white border border-white/10 rounded-lg transition-all"
                              >
                                {remindingId === inv.id ? (
                                  <>
                                    <Loader2 className="animate-spin" size={10} />
                                    Reminding...
                                  </>
                                ) : (
                                  <>
                                    <Send size={10} />
                                    Remind Client
                                  </>
                                )}
                              </button>
                            ) : (
                              <span className="text-[10px] font-black uppercase text-emerald-400 flex items-center justify-end gap-1">
                                <CheckCircle2 size={12} /> Settled
                              </span>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black tracking-widest text-white/30 uppercase">
                      <th className="pb-4">Transaction ID</th>
                      <th className="pb-4">Invoice Ref</th>
                      <th className="pb-4">Settled Amount</th>
                      <th className="pb-4">Method</th>
                      <th className="pb-4 text-right">Settlement Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-bold text-white/60">
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-white/30">
                          <DollarSign className="mx-auto text-white/10 mb-3" size={32} />
                          No payment receipts registered for this client.
                        </td>
                      </tr>
                    ) : (
                      payments.map((p) => (
                        <tr key={p.id} className="hover:bg-white/[0.01] transition-colors">
                          <td className="py-4 font-black text-white truncate max-w-[150px]">
                            {p.id}
                          </td>
                          <td className="py-4 text-white font-bold">
                            {p.invoice?.invoiceNumber || 'Workspace Invoice'}
                          </td>
                          <td className="py-4 text-emerald-400 font-extrabold">{formatUsd(Number(p.amount))}</td>
                          <td className="py-4">
                            <span className="inline-block px-2 py-0.5 rounded bg-white/5 text-[10px] uppercase font-bold text-white/50">
                              {p.paymentMethod}
                            </span>
                          </td>
                          <td className="py-4 text-right text-white/40">
                            {new Date(p.paidAt).toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reminders' && (
              <div className="space-y-4">
                {reminders.length === 0 ? (
                  <div className="py-12 text-center text-white/30 border border-dashed border-white/5 rounded-2xl">
                    <Send className="mx-auto text-white/10 mb-3" size={32} />
                    <p className="font-semibold text-xs">No communications have been recorded yet.</p>
                  </div>
                ) : (
                  reminders.map((rem, idx) => (
                    <motion.div
                      key={rem.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 bg-white/[0.01] border border-white/5 rounded-2xl flex items-center justify-between hover:bg-white/[0.03] transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black",
                          rem.status === 'sent' ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                        )}>
                          {rem.status === 'sent' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        </div>
                        <div>
                          <h5 className="font-bold text-xs text-white">
                            Automatic Workspace Notification
                          </h5>
                          <p className="text-[10px] text-white/30 mt-0.5">
                            Type: <span className="font-bold uppercase text-white/50">{rem.emailType}</span> &bull; Sent to {rem.recipientEmail}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={cn(
                          "inline-block text-[9px] font-black px-2 py-0.5 rounded border uppercase tracking-wider",
                          rem.status === 'sent' ? "bg-emerald-500/5 text-emerald-400 border-emerald-500/20" : "bg-red-500/5 text-red-400 border-red-500/20"
                        )}>
                          {rem.status}
                        </span>
                        {rem.sentAt && (
                          <p className="text-[9px] text-white/20 font-bold uppercase mt-1 flex items-center gap-1 justify-end">
                            <Clock size={8} /> {new Date(rem.sentAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
