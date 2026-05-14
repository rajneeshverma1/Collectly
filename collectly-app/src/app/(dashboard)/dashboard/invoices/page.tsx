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
  MoreVertical,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  createdAt: string;
  description: string;
}

export default function InvoicesPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('collectly_token');
      const response = await axios.get(`${API_URL}/invoices`, {
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
  }, []);

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

    doc.autoTable({
      startY: 80,
      head: [tableData[0]],
      body: [tableData[1]],
      theme: 'grid',
      headStyles: { fillStyle: [10, 10, 10], textColor: [255, 255, 255] },
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
      const token = localStorage.getItem('collectly_token');
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

      doc.autoTable({
        startY: 40,
        head: [['Month/Year', 'Client', 'Revenue']],
        body: tableRows,
        theme: 'striped',
        headStyles: { fillStyle: [10, 10, 10] },
      });

      doc.save(`Revenue_Report_${new Date().getMonth() + 1}_${new Date().getFullYear()}.pdf`);
    } catch (error) {
      console.error('Failed to generate revenue report:', error);
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || inv.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'sent': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-white/5 text-white/40 border-white/10';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle size={14} />;
      case 'overdue': return <AlertCircle size={14} />;
      case 'sent': return <Clock size={14} />;
      default: return <Calendar size={14} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
            </Link>
            <h1 className="text-4xl font-black tracking-tight">Invoices</h1>
            <p className="text-white/40 mt-2 font-medium">Manage, track and download your professional invoices.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={generateRevenueReport}
              className="bg-white/5 border border-white/10 text-white px-6 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 hover:bg-white/10 transition-all"
            >
              <Download size={18} /> Revenue Report
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white text-black px-8 py-4 rounded-2xl font-black text-sm flex items-center gap-3 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
            >
              <Plus size={18} strokeWidth={3} /> Create New Invoice
            </motion.button>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by client or invoice number..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/20"
            />
          </div>
          <div className="relative group">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="paid">Paid</option>
              <option value="sent">Sent</option>
              <option value="overdue">Overdue</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Invoice Table */}
        <div className="bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-3xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5">
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Invoice</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Client</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Amount</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Due Date</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse border-b border-white/[0.02]">
                      <td colSpan={6} className="px-8 py-6">
                        <div className="h-8 bg-white/5 rounded-xl w-full"></div>
                      </td>
                    </tr>
                  ))
                ) : filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice, idx) => (
                    <motion.tr 
                      key={invoice.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border-b border-white/[0.02] hover:bg-white/[0.03] transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:bg-white/10 group-hover:text-white transition-all">
                            <FileText size={18} />
                          </div>
                          <div>
                            <p className="text-sm font-bold">#{invoice.invoiceNumber}</p>
                            <p className="text-[11px] text-white/20 font-medium">{new Date(invoice.createdAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="text-sm font-bold">{invoice.clientName}</p>
                          <p className="text-[11px] text-white/20 font-medium">{invoice.clientEmail}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-black">${parseFloat(invoice.amount.toString()).toLocaleString()}</p>
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-sm font-medium text-white/60">{new Date(invoice.dueDate).toLocaleDateString()}</p>
                      </td>
                      <td className="px-8 py-6">
                        <div className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border",
                          getStatusStyle(invoice.status)
                        )}>
                          {getStatusIcon(invoice.status)}
                          {invoice.status}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center gap-2">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => generatePDF(invoice)}
                            className="p-3 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white hover:text-black transition-all group"
                            title="Download PDF"
                          >
                            <Download size={16} />
                          </motion.button>
                          <button className="p-3 rounded-xl bg-white/[0.05] border border-white/10 hover:bg-white/10 transition-all">
                            <MoreVertical size={16} className="text-white/40" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                          <Search size={32} className="text-white/10" />
                        </div>
                        <p className="text-white/40 font-medium">No invoices found matching your criteria.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
