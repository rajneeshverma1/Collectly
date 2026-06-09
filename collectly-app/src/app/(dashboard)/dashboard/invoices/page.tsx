'use client';

/** Invoices Management Page */
import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Download, 
  Plus, 
  Search, 
  Filter, 
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign,
  X,
  Send,
  Loader2,
  ArrowUpDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partially_paid';
  createdAt: string;
  description: string;
  lastReminderSent?: string;
}

export default function InvoicesPage() {
  const { getToken } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Search, Filter, Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Create Invoice Modal State
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createForm, setCreateForm] = useState({
    clientName: '',
    clientEmail: '',
    amount: '',
    dueDate: '',
    description: '',
    status: 'sent'
  });
  const [createSubmitting, setCreateSubmitting] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Record Payment Modal State
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [paymentForm, setPaymentForm] = useState({
    amount: '',
    paymentMethod: 'credit_card',
    notes: ''
  });
  const [paymentSubmitting, setPaymentSubmitting] = useState(false);

  // Manual Reminders Dispatch State
  const [remindingId, setRemindingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSendReminder = async (invoiceId: string) => {
    try {
      setRemindingId(invoiceId);
      const token = await getToken();
      const response = await axios.post(`${API_URL}/invoices/${invoiceId}/remind`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status === 'success') {
        setToast({ message: response.data.message || 'Manual reminder dispatched!', type: 'success' });
        fetchInvoices();
      }
    } catch (err: any) {
      console.error('Failed to send reminder:', err);
      setToast({ 
        message: err.response?.data?.message || 'Failed to dispatch manual reminder.', 
        type: 'error' 
      });
    } finally {
      setRemindingId(null);
      setTimeout(() => setToast(null), 4000);
    }
  };

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      const params: any = {};
      if (searchTerm) params.search = searchTerm;
      if (filterStatus !== 'all') params.status = filterStatus;
      params.sortBy = sortBy;
      params.sortOrder = sortOrder;

      const response = await axios.get(`${API_URL}/invoices`, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });
      setInvoices(response.data.data.invoices);
    } catch (error) {
      console.error('Failed to fetch invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [searchTerm, filterStatus, sortBy, sortOrder]);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setCreateSubmitting(true);
      setCreateError(null);
      const token = await getToken();
      await axios.post(`${API_URL}/invoices`, createForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsCreateOpen(false);
      setCreateForm({
        clientName: '',
        clientEmail: '',
        amount: '',
        dueDate: '',
        description: '',
        status: 'sent'
      });
      fetchInvoices();
    } catch (error: any) {
      console.error('Failed to create invoice:', error);
      const msg = error.response?.data?.message || 'Failed to create invoice. Please check the input and try again.';
      setCreateError(msg);
    } finally {
      setCreateSubmitting(false);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInvoice) return;
    try {
      setPaymentSubmitting(true);
      const token = await getToken();
      await axios.post(`${API_URL}/invoices/${selectedInvoice.id}/payments`, paymentForm, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsPaymentOpen(false);
      setSelectedInvoice(null);
      setPaymentForm({
        amount: '',
        paymentMethod: 'credit_card',
        notes: ''
      });
      fetchInvoices();
    } catch (error) {
      console.error('Failed to record payment:', error);
    } finally {
      setPaymentSubmitting(false);
    }
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const generatePDF = (invoice: Invoice) => {
    const doc = new jsPDF() as any;

    // Header
    doc.setFontSize(22);
    doc.text('INVOICE', 14, 22);
    
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Invoice #: ${invoice.invoiceNumber}`, 14, 30);
    doc.text(`Date: ${new Date(invoice.createdAt).toLocaleDateString()}`, 14, 35);
    doc.text(`Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}`, 14, 40);

    // Client Info
    doc.setTextColor(0);
    doc.setFontSize(12);
    doc.text('BILL TO:', 14, 55);
    doc.setFontSize(11);
    doc.text(invoice.clientName, 14, 62);
    doc.text(invoice.clientEmail, 14, 68);

    // Table
    const tableData = [
      ['Description', 'Amount'],
      [invoice.description || 'Professional Services', `$${parseFloat(invoice.amount.toString()).toFixed(2)}`]
    ];

    autoTable(doc, {
      startY: 80,
      head: [tableData[0]],
      body: [tableData[1]],
      theme: 'grid',
      headStyles: { fillColor: [10, 10, 10], textColor: [255, 255, 255] },
    });

    // Total
    const finalY = (doc as any).lastAutoTable.finalY || 100;
    doc.setFontSize(14);
    doc.text(`Total Amount: $${parseFloat(invoice.amount.toString()).toFixed(2)}`, 140, finalY + 20);

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text('Thank you for your business!', 14, finalY + 40);

    doc.save(`Invoice_${invoice.invoiceNumber}.pdf`);
  };

  const generateRevenueReport = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(`${API_URL}/invoices/revenue-summary`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const summary = response.data.data.summary;
      
      const doc = new jsPDF() as any;
      doc.setFontSize(20);
      doc.text('Monthly Revenue Report', 14, 22);
      doc.setFontSize(10);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);

      const tableRows: any[] = [];
      Object.entries(summary).forEach(([month, clients]: [string, any]) => {
        Object.entries(clients).forEach(([client, amount]) => {
          tableRows.push([month, client, `$${parseFloat(amount as string).toLocaleString()}`]);
        });
      });

      autoTable(doc, {
        startY: 40,
        head: [['Month/Year', 'Client', 'Revenue']],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillColor: [10, 10, 10] },
      });

      doc.save(`Revenue_Report_${new Date().getMonth() + 1}_${new Date().getFullYear()}.pdf`);
    } catch (error) {
      console.error('Failed to generate revenue report:', error);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-50 text-emerald-700 border-emerald-200/50';
      case 'partially_paid': return 'bg-teal-50 text-teal-700 border-teal-200/50';
      case 'overdue': return 'bg-rose-50 text-rose-700 border-rose-200/50';
      case 'sent': return 'bg-blue-50 text-blue-700 border-blue-200/50';
      default: return 'bg-zinc-50 text-zinc-500 border border-zinc-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle size={14} />;
      case 'partially_paid': return <DollarSign size={14} />;
      case 'overdue': return <AlertCircle size={14} />;
      case 'sent': return <Clock size={14} />;
      default: return <Calendar size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f6] text-zinc-800 p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
          <div>
            <Link href="/dashboard" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 transition-colors mb-4 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
            </Link>
            <h1 className="text-4xl font-black tracking-tight text-zinc-900">Invoices</h1>
            <p className="text-zinc-500 mt-2 font-medium">Manage, track, and record client transactions easily.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateRevenueReport}
              className="bg-white border border-zinc-200 text-zinc-800 px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 hover:bg-zinc-50 transition-all cursor-pointer shadow-sm"
            >
              <Download size={18} /> Revenue Report
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setCreateError(null); setIsCreateOpen(true); }}
              className="bg-zinc-900 text-white px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
            >
              <Plus size={18} strokeWidth={3} /> Create New Invoice
            </motion.button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by client or invoice number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 transition-all placeholder:text-zinc-400 text-zinc-800 shadow-sm"
            />
          </div>
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" size={18} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900/5 focus:border-zinc-400 transition-all appearance-none cursor-pointer text-zinc-800 shadow-sm"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="sent">Sent</option>
              <option value="partially_paid">Partially Paid</option>
              <option value="paid">Paid</option>
              <option value="overdue">Overdue</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white border border-zinc-200/80 rounded-[40px] overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-100">
                <th 
                  onClick={() => handleSort('invoiceNumber')}
                  className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Invoice <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('clientName')}
                  className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Client <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('amount')}
                  className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Amount <ArrowUpDown size={12} />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('dueDate')}
                  className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] cursor-pointer hover:text-zinc-700 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    Due Date <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-zinc-50">
                      <td colSpan={6} className="px-8 py-6">
                        <div className="h-8 bg-zinc-100 rounded-xl w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : invoices.length > 0 ? (
                  invoices.map((invoice, idx) => (
                    <motion.tr 
                      key={invoice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-zinc-100 hover:bg-zinc-50/50 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-150 flex items-center justify-center text-zinc-400 group-hover:bg-zinc-100 group-hover:text-zinc-700 transition-all">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-zinc-900">#{invoice.invoiceNumber}</p>
                            <p className="text-[11px] text-zinc-400 font-medium">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                            {invoice.lastReminderSent && (
                              <div className="mt-1.5">
                                <span className="inline-block text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                                  Last Sent: {new Date(invoice.lastReminderSent).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{invoice.clientName}</p>
                          <p className="text-[11px] text-zinc-400 font-medium">{invoice.clientEmail}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black text-zinc-900">${parseFloat(invoice.amount.toString()).toLocaleString()}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-medium text-zinc-500">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border",
                          getStatusStyle(invoice.status)
                        )}>
                          {getStatusIcon(invoice.status)}
                          <span>{invoice.status.replace('_', ' ')}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {invoice.status !== 'paid' && invoice.status !== 'cancelled' && (
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              disabled={remindingId === invoice.id}
                              onClick={() => handleSendReminder(invoice.id)}
                              className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all disabled:opacity-50 cursor-pointer"
                              title="Send Email Reminder"
                            >
                              {remindingId === invoice.id ? (
                                <Loader2 size={16} className="animate-spin" />
                              ) : (
                                <Send size={16} />
                              )}
                            </motion.button>
                          )}
                          {invoice.status !== 'paid' && (
                            <motion.button 
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                setSelectedInvoice(invoice);
                                setPaymentForm(prev => ({ ...prev, amount: invoice.amount.toString() }));
                                setIsPaymentOpen(true);
                              }}
                              className="px-4 py-2 text-xs font-bold bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                            >
                              <DollarSign size={12} /> Pay
                            </motion.button>
                          )}
                          <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => generatePDF(invoice)}
                            className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-850 transition-all cursor-pointer"
                            title="Download PDF"
                          >
                            <Download size={16} />
                          </motion.button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-zinc-50 border border-zinc-150 flex items-center justify-center">
                          <Search size={32} className="text-zinc-350" />
                        </div>
                        <p className="text-zinc-400 font-medium">No invoices found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Create Invoice Modal --- */}
      <AnimatePresence>
        {isCreateOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCreateOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-zinc-200 w-full max-w-xl rounded-[32px] overflow-hidden shadow-2xl relative z-10 text-zinc-850"
            >
              <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-150 flex items-center justify-center text-zinc-500">
                    <FileText size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900">Create Invoice</h3>
                </div>
                <button 
                  onClick={() => setIsCreateOpen(false)}
                  className="p-2 bg-zinc-50 border border-zinc-150 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer text-zinc-400 hover:text-zinc-600"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleCreateInvoice} className="p-8 space-y-6">
                {createError && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl flex items-center gap-2 text-xs font-semibold"
                  >
                    <AlertCircle size={14} />
                    <span>{createError}</span>
                  </motion.div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Client Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={createForm.clientName}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, clientName: e.target.value }))}
                      className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Client Email</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@company.com"
                      value={createForm.clientEmail}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, clientEmail: e.target.value }))}
                      className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Amount ($)</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      placeholder="e.g. 1500"
                      value={createForm.amount}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, amount: e.target.value }))}
                      className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Due Date</label>
                    <input 
                      type="date" 
                      required
                      value={createForm.dueDate}
                      onChange={(e) => setCreateForm(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all text-zinc-800"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Description</label>
                  <textarea 
                    rows={3}
                    placeholder="Describe professional services or items sold..."
                    value={createForm.description}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800 resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Status</label>
                  <select 
                    value={createForm.status}
                    onChange={(e) => setCreateForm(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all appearance-none cursor-pointer text-zinc-800"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                  </select>
                </div>

                <div className="pt-4 flex items-center justify-end gap-4 border-t border-zinc-100">
                  <button 
                    type="button"
                    onClick={() => setIsCreateOpen(false)}
                    className="bg-zinc-50 border border-zinc-150 hover:bg-zinc-100 text-zinc-700 px-6 py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={createSubmitting}
                    className="bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50 px-8 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    {createSubmitting ? 'Creating...' : 'Create Invoice'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- Record Payment Modal --- */}
      <AnimatePresence>
        {isPaymentOpen && selectedInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setIsPaymentOpen(false);
                setSelectedInvoice(null);
              }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white border border-zinc-200 w-full max-w-md rounded-[32px] overflow-hidden shadow-2xl relative z-10 text-zinc-850"
            >
              <div className="p-8 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-50 border border-zinc-150 flex items-center justify-center text-emerald-500">
                    <DollarSign size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900">Record Payment</h3>
                    <p className="text-[10px] text-zinc-400 font-medium">For Invoice #{selectedInvoice.invoiceNumber}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    setIsPaymentOpen(false);
                    setSelectedInvoice(null);
                  }}
                  className="p-2 bg-zinc-50 border border-zinc-150 rounded-xl hover:bg-zinc-100 transition-colors cursor-pointer text-zinc-400 hover:text-zinc-600"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleRecordPayment} className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Amount Paid ($)</label>
                  <input 
                    type="number" 
                    required
                    max={selectedInvoice.amount}
                    min="1"
                    placeholder="e.g. 500"
                    value={paymentForm.amount}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800"
                  />
                  <p className="text-[10px] text-zinc-450 font-medium">Invoice Total: ${selectedInvoice.amount}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Payment Method</label>
                  <select 
                    value={paymentForm.paymentMethod}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, paymentMethod: e.target.value }))}
                    className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all appearance-none cursor-pointer text-zinc-800"
                  >
                    <option value="credit_card">Credit/Debit Card</option>
                    <option value="bank_transfer">Bank Transfer (Wire)</option>
                    <option value="paypal">PayPal</option>
                    <option value="cash">Cash</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Notes (Optional)</label>
                  <textarea 
                    rows={2}
                    placeholder="e.g. Paid first milestone tranche"
                    value={paymentForm.notes}
                    onChange={(e) => setPaymentForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800 resize-none"
                  />
                </div>

                <div className="pt-4 flex items-center justify-end gap-4 border-t border-zinc-100">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsPaymentOpen(false);
                      setSelectedInvoice(null);
                    }}
                    className="bg-zinc-50 border border-zinc-150 hover:bg-zinc-100 text-zinc-700 px-6 py-3.5 rounded-2xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={paymentSubmitting}
                    className="bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50 px-8 py-3.5 rounded-2xl text-xs font-black transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    {paymentSubmitting ? 'Recording...' : 'Record Payment'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={cn(
              "fixed bottom-8 right-8 z-50 px-6 py-4 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 font-bold text-xs transition-all uppercase tracking-wider",
              toast.type === 'success' 
                ? "bg-emerald-50 text-emerald-700 border-emerald-250" 
                : "bg-rose-50 text-rose-700 border-rose-250"
            )}
          >
            {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
