'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Users, Mail, Phone, Building, MapPin, Search, Loader2, X, MoreHorizontal, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from './DashboardHeader';
import { cn } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  status: 'pending' | 'active';
  createdAt: string;
}

export function ClientSection() {
  const { user, getToken } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sendInvite, setSendInvite] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: '',
  });

  const searchParams = useSearchParams();

  const fetchClients = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1'}/clients`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setClients(data.data.clients);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    if (searchParams.get('add') === 'true') {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const token = await getToken();
      
      let endpoint = '/clients';
      let body: any = { ...formData };

      if (sendInvite) {
        // Generate PDF
        const doc = new jsPDF();
        doc.setFontSize(20);
        doc.text('BILL RECEIPT & AGREEMENT', 20, 20);
        doc.setFontSize(12);
        doc.text(`Client Name: ${formData.name}`, 20, 40);
        doc.text(`Email: ${formData.email}`, 20, 50);
        doc.text(`Company: ${formData.company || 'N/A'}`, 20, 60);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 70);
        
        doc.text('This document serves as a formal agreement between the freelancer and the client.', 20, 90);
        doc.text('By accepting this, you agree to the terms of service provided by Collectly.', 20, 100);
        
        const pdfBase64 = doc.output('datauristring');
        endpoint = '/clients/send-invitation';
        body.pdfBase64 = pdfBase64;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1'}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setIsModalOpen(false);
        setFormData({ name: '', email: '', phone: '', company: '', address: '' });
        setSendInvite(false);
        fetchClients(); // Refresh list
      }
    } catch (err) {
      console.error('Failed to add client:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col relative">
      <DashboardHeader />

      <div className="p-10 flex-grow overflow-y-auto custom-scrollbar">
        <div className="flex items-end justify-between mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-2">
               <div className="p-2 bg-white/5 border border-white/10 rounded-xl">
                 <Users size={20} className="text-white/60" />
               </div>
               <h2 className="text-4xl font-bold tracking-tight">Clients</h2>
            </div>
            <p className="text-white/40 text-base font-medium">
              Manage your client relationships and contact details.
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
             <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" size={18} />
                <input 
                  type="text" 
                  placeholder="Search clients..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/20 w-64"
                />
             </div>
             <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-black px-8 py-3.5 rounded-[18px] font-black text-sm hover:bg-neutral-200 transition-all flex items-center gap-2.5 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                <UserPlus size={18} strokeWidth={3} /> Add Client
              </motion.button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px]"
           >
              <p className="text-xs text-white/30 font-bold uppercase tracking-widest mb-1">Total Clients</p>
              <h3 className="text-3xl font-black">{loading ? '...' : clients.length}</h3>
           </motion.div>
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px]"
           >
              <p className="text-xs text-white/30 font-bold uppercase tracking-widest mb-1">Active This Month</p>
              <h3 className="text-3xl font-black">{clients.length > 0 ? Math.ceil(clients.length * 0.4) : 0}</h3>
           </motion.div>
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 bg-white/[0.02] border border-white/5 rounded-[32px]"
           >
              <p className="text-xs text-white/30 font-bold uppercase tracking-widest mb-1">New This Week</p>
              <h3 className="text-3xl font-black">{clients.length > 0 ? Math.ceil(clients.length * 0.1) : 0}</h3>
           </motion.div>
        </div>

        {/* Clients List */}
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="animate-spin text-white/20" size={32} />
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center bg-white/[0.01] border border-dashed border-white/10 rounded-[40px] p-10 text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
              <Users size={32} className="text-white/20" />
            </div>
            <h3 className="text-xl font-bold mb-2">No clients found</h3>
            <p className="text-white/40 max-w-xs mx-auto mb-6">
              {searchQuery ? `No clients matching "${searchQuery}"` : "You haven't added any clients yet. Start by adding your first one!"}
            </p>
            {!searchQuery && (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all"
              >
                Add Your First Client
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group p-6 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-[32px] transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-xl font-black border border-white/5 relative">
                    {client.name.charAt(0)}
                    {client.status === 'pending' && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-black flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg border",
                      client.status === 'active' 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    )}>
                      {client.status}
                    </span>
                    <button className="p-2 text-white/20 hover:text-white transition-colors">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-1 group-hover:text-blue-400 transition-colors">{client.name}</h4>
                <div className="space-y-3 mt-4">
                  <div className="flex items-center gap-3 text-sm text-white/40">
                    <Mail size={14} />
                    <span className="truncate">{client.email}</span>
                  </div>
                  {client.company && (
                    <div className="flex items-center gap-3 text-sm text-white/40">
                      <Building size={14} />
                      <span className="truncate">{client.company}</span>
                    </div>
                  )}
                  {client.phone && (
                    <div className="flex items-center gap-3 text-sm text-white/40">
                      <Phone size={14} />
                      <span className="truncate">{client.phone}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    Added {new Date(client.createdAt).toLocaleDateString()}
                  </span>
                  <button className="text-[10px] font-black uppercase tracking-wider text-blue-500 hover:text-blue-400">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-[#0F0F0F] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Add New Client</h3>
                  <p className="text-sm text-white/40">Enter the details of your new client.</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Full Name</label>
                    <input 
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Email Address</label>
                    <input 
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                    <input 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Company</label>
                    <input 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Acme Inc."
                      className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] ml-1">Address</label>
                  <textarea 
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Business St, City, Country"
                    rows={3}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 bg-white/[0.03] border border-white/5 rounded-2xl cursor-pointer hover:bg-white/[0.05] transition-all"
                  onClick={() => setSendInvite(!sendInvite)}
                >
                  <div className={cn(
                    "w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all",
                    sendInvite ? "bg-blue-500 border-blue-500" : "border-white/10"
                  )}>
                    {sendInvite && <CheckCircle size={14} className="text-white" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold">Send Agreement & Bill Receipt</p>
                    <p className="text-[10px] text-white/30 font-medium uppercase tracking-widest">Via Email (Requires Client Approval)</p>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[20px] font-bold text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 py-4 bg-white text-black hover:bg-neutral-200 rounded-[20px] font-black text-sm transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Save Client'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
