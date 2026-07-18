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
              "fixed top-6 right-6 z-50 px-6 py-4 rounded-none flex items-center gap-3 border-2 border-black bg-white text-black font-bold text-sm shadow-[4px_4px_0_0_rgba(0,0,0,1)] transition-none"
            )}
          >
            {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <DashboardHeader />

      {loading ? (
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-black">
          <Loader2 className="animate-spin text-black mb-4" size={32} />
          <p className="font-bold text-sm uppercase tracking-widest">Syncing Client Workspace...</p>
        </div>
      ) : !client ? (
        <div className="flex-grow flex flex-col items-center justify-center py-24 text-black">
          <AlertCircle className="text-black mb-4" size={48} />
          <p className="font-black text-2xl text-black mb-2 uppercase tracking-tight">Client Profile Outage</p>
          <p className="text-sm text-gray-500 mb-6 font-bold">The requested client record does not exist or has been deleted.</p>
          <button 
            onClick={() => router.push('/dashboard/clients')}
            className="bg-white border-2 border-black px-6 py-3 rounded-none font-black text-black text-xs hover:bg-black hover:text-white uppercase tracking-widest transition-none shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
          >
            Return to Clients
          </button>
        </div>
      ) : (
        <div className="p-8 lg:p-10 flex-grow relative z-10 bg-white">
          {/* Back Navigation & Breadcrumbs */}
          <button 
            onClick={() => router.push('/dashboard/clients')}
            className="flex items-center gap-2 text-black hover:text-gray-500 font-black text-xs mb-8 uppercase tracking-widest transition-none"
          >
            <ArrowLeft size={14} /> Back to Clients List
          </button>

          {/* Client Profile Giant Header */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            
            {/* Left Box: Client Identity Card */}
            <div className="xl:col-span-2 p-8 bg-white border-2 border-black rounded-none shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <span className={cn(
                "inline-block text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-none mb-4 border-2 border-black",
                client.status === 'active' ? "bg-black text-white" : "bg-white text-black"
              )}>
                {client.status} Client Workspace
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-black tracking-tighter mb-2">{client.name}</h2>
              {client.company && (
                <p className="text-sm text-gray-500 font-bold flex items-center gap-1.5 mb-6">
                  <Building size={14} /> {client.company}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t-2 border-black text-xs font-bold text-black">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Email Address</span>
                  <span className="text-black font-black">{client.email}</span>
                </div>
                {client.phone && (
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Phone Number</span>
                    <span className="text-black font-black">{client.phone}</span>
                  </div>
                )}
                {client.address && (
                  <div className="flex flex-col gap-1 sm:col-span-2 md:col-span-1">
                    <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Billing Address</span>
                    <span className="text-black font-black truncate max-w-[200px]" title={client.address}>{client.address}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Box: Total Outstanding Dues */}
            <div className="p-8 bg-white border-2 border-black rounded-none flex flex-col justify-between shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <div>
                <p className="text-[10px] font-black text-black uppercase tracking-widest mb-2 border-b-2 border-black pb-2">Total Outstanding</p>
                <h3 className="text-5xl font-black text-black tracking-tighter mt-4">
                  {formatUsd(stats.totalOutstanding)}
                </h3>
              </div>

              <div className="pt-6 border-t-2 border-black mt-6 grid grid-cols-2 gap-4 text-xs font-black text-black">
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-0.5 text-gray-500">Active Invoices</p>
                  <p className="text-xl font-black text-black">{stats.totalInvoices}</p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-widest mb-0.5 text-gray-500">Settled Invoices</p>
                  <p className="text-xl font-black text-black">{stats.paidInvoicesCount}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Workspace Switcher Tabs */}
          <div className="flex border-b-2 border-black mb-6 text-xs font-black uppercase tracking-widest gap-2 bg-white">
            {[
              { key: 'invoices', label: 'Invoices Linked', count: invoices.length },
              { key: 'payments', label: 'Payments History', count: payments.length },
              { key: 'reminders', label: 'Reminder Activity Log', count: reminders.length }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={cn(
                  "px-4 py-3 transition-none flex items-center gap-2",
                  activeTab === tab.key 
                    ? "bg-black text-white" 
                    : "bg-white text-black hover:bg-gray-200"
                )}
              >
                <span>{tab.label}</span>
                <span className={cn("px-1.5 py-0.5 rounded-none text-[9px]", activeTab === tab.key ? "bg-white text-black" : "bg-black text-white")}>{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Tab View Contents */}
          <div className="bg-white border-2 border-black rounded-none p-6 lg:p-8 shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
            {activeTab === 'invoices' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b-2 border-black text-[10px] font-black tracking-widest text-black uppercase">
                      <th className="pb-4">Invoice Number</th>
                      <th className="pb-4">Amount</th>
                      <th className="pb-4">Due Date</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Action Trigger</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black text-xs font-bold text-black">
                    {invoices.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-500">
                          <FileText className="mx-auto text-black mb-3" size={32} />
                          No invoices have been billed to this client's email yet.
                        </td>
                      </tr>
                    ) : (
                      invoices.map((inv) => (
                        <tr key={inv.id} className="group hover:bg-gray-100 transition-none">
                          <td className="py-4 font-black text-black">
                            {inv.invoiceNumber}
                          </td>
                          <td className="py-4 text-black font-extrabold">{formatUsd(Number(inv.amount))}</td>
                          <td className="py-4 text-gray-600 font-black">
                            {new Date(inv.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-4">
                            <span className={cn(
                              "inline-block px-2 py-0.5 rounded-none text-[9px] font-black uppercase tracking-widest border-2",
                              inv.status === 'paid' ? "bg-white text-black border-black" : "bg-black text-white border-black"
                            )}>
                              {inv.status}
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            {inv.status !== 'paid' && inv.status !== 'cancelled' ? (
                              <button
                                onClick={() => handleSendReminder(inv.id)}
                                disabled={remindingId === inv.id}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-black hover:text-white text-[10px] font-black uppercase tracking-widest text-black border-2 border-black rounded-none transition-none shadow-[2px_2px_0_0_rgba(0,0,0,1)] disabled:opacity-50"
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
                              <span className="text-[10px] font-black uppercase text-black flex items-center justify-end gap-1">
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
                    <tr className="border-b-2 border-black text-[10px] font-black tracking-widest text-black uppercase">
                      <th className="pb-4">Transaction ID</th>
                      <th className="pb-4">Invoice Ref</th>
                      <th className="pb-4">Settled Amount</th>
                      <th className="pb-4">Method</th>
                      <th className="pb-4 text-right">Settlement Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black text-xs font-bold text-black">
                    {payments.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-12 text-center text-gray-500">
                          <DollarSign className="mx-auto text-black mb-3" size={32} />
                          No payment receipts registered for this client.
                        </td>
                      </tr>
                    ) : (
                      payments.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-100 transition-none">
                          <td className="py-4 font-black text-black truncate max-w-[150px]">
                            {p.id}
                          </td>
                          <td className="py-4 text-black font-black">
                            {p.invoice?.invoiceNumber || 'Workspace Invoice'}
                          </td>
                          <td className="py-4 text-black font-extrabold">{formatUsd(Number(p.amount))}</td>
                          <td className="py-4">
                            <span className="inline-block px-2 py-0.5 rounded-none border-2 border-black bg-white text-[10px] uppercase font-black text-black">
                              {p.paymentMethod}
                            </span>
                          </td>
                          <td className="py-4 text-right text-black font-black">
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
                  <div className="py-12 text-center text-black border-2 border-dashed border-black rounded-none">
                    <Send className="mx-auto text-black mb-3" size={32} />
                    <p className="font-black text-xs uppercase tracking-widest">No communications have been recorded yet.</p>
                  </div>
                ) : (
                  reminders.map((rem, idx) => (
                    <motion.div
                      key={rem.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 bg-white border-2 border-black rounded-none flex items-center justify-between hover:bg-gray-100 transition-none shadow-[4px_4px_0_0_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-none flex items-center justify-center text-xs font-black border-2 border-black",
                          rem.status === 'sent' ? "bg-black text-white" : "bg-white text-black"
                        )}>
                          {rem.status === 'sent' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        </div>
                        <div>
                          <h5 className="font-black text-xs text-black uppercase tracking-widest">
                            Automatic Workspace Notification
                          </h5>
                          <p className="text-[10px] font-bold text-gray-600 mt-0.5 uppercase tracking-wider">
                            Type: <span className="font-black text-black">{rem.emailType}</span> &bull; Sent to {rem.recipientEmail}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={cn(
                          "inline-block text-[9px] font-black px-2 py-0.5 rounded-none border-2 border-black uppercase tracking-widest",
                          rem.status === 'sent' ? "bg-white text-black" : "bg-black text-white"
                        )}>
                          {rem.status}
                        </span>
                        {rem.sentAt && (
                          <p className="text-[9px] text-gray-500 font-black uppercase mt-1 flex items-center gap-1 justify-end">
                            <Clock size={8} className="text-black" /> {new Date(rem.sentAt).toLocaleString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
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
