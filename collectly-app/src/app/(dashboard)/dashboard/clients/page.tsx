'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Mail, 
  Building, 
  Phone, 
  MapPin, 
  Loader2, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { DashboardHeader } from '@/components/DashboardHeader';
import Link from 'next/link';
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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export default function ClientsPage() {
  const { user, getToken } = useAuth();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add Client Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    address: ''
  });
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const fetchClients = useCallback(async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await axios.get(`${API_URL}/clients`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status === 'success') {
        setClients(response.data.data.clients || []);
      }
    } catch (err) {
      console.error('Failed to fetch clients:', err);
    } finally {
      setLoading(false);
    }
  }, [getToken]);

  useEffect(() => {
    if (user) {
      fetchClients();
    }
  }, [user, fetchClients]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setToast({ message: 'Name and email are mandatory properties.', type: 'error' });
      return;
    }

    try {
      setSubmitting(true);
      const token = await getToken();
      const response = await axios.post(`${API_URL}/clients`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setToast({ message: 'Client onboarded successfully!', type: 'success' });
        setFormData({ name: '', email: '', phone: '', company: '', address: '' });
        setModalOpen(false);
        fetchClients();
      }
    } catch (err: any) {
      console.error('Failed to add client:', err);
      setToast({ 
        message: err.response?.data?.message || 'Error occurred during client onboarding.', 
        type: 'error' 
      });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 4000);
    }
  };

  if (!user) return null;

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (c.company && c.company.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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

      <div className="p-8 lg:p-10 flex-grow relative z-10">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-2 text-white">Clients</h2>
            <p className="text-white/40 text-base font-medium">
              Manage your global client workspaces, contact metadata, outstanding dues, and active email reminders in one premium workspace.
            </p>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModalOpen(true)}
            className="bg-white text-black px-6 py-3 rounded-[16px] font-black text-xs hover:bg-neutral-200 transition-all flex items-center gap-2 shadow-[0_20px_40px_rgba(255,255,255,0.05)] self-start sm:self-auto"
          >
            <Plus size={16} strokeWidth={3} />
            <span>Add New Client</span>
          </motion.button>
        </div>

        {/* Search controls */}
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
          <input 
            type="text" 
            placeholder="Search by client name, email, or company..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white/5 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white/10 w-full transition-all"
          />
        </div>

        {/* Clients Grid */}
        {loading ? (
          <div className="py-24 text-center text-white/30">
            <Loader2 className="animate-spin mx-auto text-white/10 mb-4" size={32} />
            <p className="font-bold text-sm">Syncing Client Workspaces...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="py-20 text-center border border-dashed border-white/5 rounded-[32px] max-w-xl mx-auto">
            <Users className="mx-auto text-white/10 mb-4" size={48} />
            <h4 className="text-white font-bold text-lg mb-2">No Clients Registered</h4>
            <p className="text-white/30 text-sm max-w-md mx-auto mb-6">
              Establish client profiles to automatically sync and catalog invoices, transactions, and reminders under single profiles.
            </p>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
            >
              Add Your First Client
            </button>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredClients.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="p-6 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-white/20 rounded-[24px] relative overflow-hidden group shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={cn(
                      "inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 border",
                      client.status === 'active' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                    )}>
                      {client.status}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                      {client.name}
                    </h3>
                    {client.company && (
                      <p className="text-xs text-white/40 font-semibold flex items-center gap-1.5 mt-1">
                        <Building size={12} /> {client.company}
                      </p>
                    )}
                  </div>
                  
                  <Link 
                    href={`/dashboard/clients/${client.id}`}
                    className="w-10 h-10 rounded-xl bg-white/5 group-hover:bg-white/10 border border-white/5 flex items-center justify-center text-white/30 group-hover:text-white transition-all"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                <div className="space-y-2 border-t border-white/5 pt-4 text-xs font-semibold text-white/50">
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-white/20" />
                    <span>{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-white/20" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-white/20" />
                      <span className="truncate max-w-[220px]">{client.address}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Add Client Interactive Modal */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-900 border border-white/10 rounded-[32px] p-8 w-full max-w-lg relative z-10 shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 blur-[50px] rounded-full pointer-events-none" />
              
              <h3 className="text-2xl font-black tracking-tight text-white mb-1">Add New Client</h3>
              <p className="text-xs text-white/40 font-semibold mb-6">Onboard a client to sync automatic reminders and payments.</p>

              <form onSubmit={handleAddClient} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">Client Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rachel Green"
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/10 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">Client Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. rachel@green.com"
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/10 transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/10 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Green Design Group"
                      className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-1.5">Billing Address</label>
                  <textarea 
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 456 Broadway, New York, NY"
                    className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white/10 transition-all resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs rounded-xl border border-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="px-5 py-2.5 bg-white text-black font-black text-xs rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-1.5 shadow-md"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={12} />
                        Adding Client...
                      </>
                    ) : (
                      'Onboard Client'
                    )}
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
