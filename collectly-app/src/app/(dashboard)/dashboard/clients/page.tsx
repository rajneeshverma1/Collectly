'use client';

/**
 * @file clients/page.tsx
 * @description Premium client deck directory displaying onboarded client profiles with modular modal form registers.
 */
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
  AlertCircle,
  X
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
    <div className="h-full overflow-y-auto custom-scrollbar flex flex-col pb-16 bg-[#f3f3f6]">
      {/* Toast Alert Portal */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed top-6 right-6 z-50 px-4 py-2 rounded-none border border-black transition-none font-bold text-sm",
              toast.type === 'success' ? "bg-white text-black" : "bg-black text-white"
            )}
          >
            {toast.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
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
            <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-2 text-zinc-900">Clients</h2>
            <p className="text-zinc-500 text-base font-medium">
              Manage your global client workspaces, contact metadata, outstanding dues, and active email reminders in one premium workspace.
            </p>
          </motion.div>
          
          <button 
            onClick={() => setModalOpen(true)}
            className="bg-black border border-black text-white px-4 py-2 rounded-none font-bold text-xs hover:bg-gray-800 transition-none flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <Plus size={16} strokeWidth={2} />
            <span>Add New Client</span>
          </button>
        </div>

        {/* Search controls */}
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-black" size={14} />
          <input 
            type="text" 
            placeholder="Search by client name, email, or company..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-white border border-black rounded-none pl-8 pr-4 py-2 text-sm text-black placeholder-gray-500 focus:outline-none w-full transition-none shadow-none"
          />
        </div>

        {/* Clients Grid */}
        {loading ? (
          <div className="py-24 text-center text-zinc-400">
            <Loader2 className="animate-spin mx-auto text-zinc-350 mb-4" size={32} />
            <p className="font-bold text-sm">Syncing Client Workspaces...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="py-12 text-center border border-black rounded-none max-w-xl mx-auto bg-white shadow-none">
            <Users className="mx-auto text-black mb-4" size={32} />
            <h4 className="text-black font-bold text-lg mb-2">No Clients Registered</h4>
            <p className="text-black text-sm max-w-md mx-auto mb-6">
              Establish client profiles to automatically sync and catalog invoices, transactions, and reminders under single profiles.
            </p>
            <button 
              onClick={() => setModalOpen(true)}
              className="bg-black border border-black text-white hover:bg-gray-800 font-bold text-xs px-4 py-2 rounded-none transition-none cursor-pointer shadow-none"
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
                className="p-4 bg-white border border-black rounded-none relative overflow-hidden shadow-none transition-none"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className={cn(
                      "inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border border-black mb-2",
                      client.status === 'active' ? "text-black bg-white" : "text-black bg-white"
                    )}>
                      {client.status}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors">
                      {client.name}
                    </h3>
                    {client.company && (
                      <p className="text-xs text-zinc-450 font-semibold flex items-center gap-1.5 mt-1">
                        <Building size={12} /> {client.company}
                      </p>
                    )}
                  </div>
                  
                  <Link 
                    className="w-8 h-8 rounded-none border border-black flex items-center justify-center text-black hover:bg-gray-200 transition-none"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>

                <div className="space-y-2 border-t border-zinc-100 pt-4 text-xs font-semibold text-zinc-500">
                  <div className="flex items-center gap-2">
                    <Mail size={12} className="text-zinc-400" />
                    <span>{client.email}</span>
                  </div>
                  {client.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-zinc-400" />
                      <span>{client.phone}</span>
                    </div>
                  )}
                  {client.address && (
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-zinc-400" />
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
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-black p-4 w-full max-w-lg relative z-10 shadow-none text-black"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-black tracking-tight text-zinc-900">Add New Client</h3>
                <button 
                  onClick={() => setModalOpen(false)}
                  className="p-1 border border-black bg-white hover:bg-gray-200 cursor-pointer text-black"
                >
                  <X size={16} />
                </button>
              </div>
              <p className="text-xs text-zinc-450 font-semibold mb-6">Onboard a client to sync automatic reminders and payments.</p>

              <form onSubmit={handleAddClient} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">Client Name *</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Rachel Green"
                    className="w-full bg-white border border-black rounded-none px-2 py-1 text-sm focus:outline-none placeholder:text-gray-500 text-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">Client Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. rachel@green.com"
                    className="w-full bg-white border border-black rounded-none px-2 py-1 text-sm focus:outline-none placeholder:text-gray-500 text-black"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">Phone Number</label>
                    <input 
                      type="text" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 019-2834"
                      className="w-full bg-white border border-black rounded-none px-2 py-1 text-sm focus:outline-none placeholder:text-gray-500 text-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Rachel Design"
                      className="w-full bg-white border border-black rounded-none px-2 py-1 text-sm focus:outline-none placeholder:text-gray-500 text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1.5">Billing Address</label>
                  <textarea 
                    name="address"
                    rows={2}
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 456 Broadway, New York, NY"
                    className="w-full bg-white border border-black rounded-none px-2 py-1 text-sm focus:outline-none placeholder:text-gray-500 text-black resize-none"
                  />
                </div>

                <div className="pt-6 space-y-3 border-t border-zinc-100">
                  <button 
                    type="submit"
                    disabled={submitting}
                    className="w-full py-2 bg-black border border-black text-white font-bold text-xs rounded-none hover:bg-gray-800 transition-none flex items-center justify-center gap-1.5 shadow-none cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="animate-spin" size={12} />
                        <span>Adding Client...</span>
                      </>
                    ) : (
                      'Onboard Client'
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="w-full py-2 bg-white border border-black hover:bg-gray-200 text-black font-bold text-xs rounded-none transition-none cursor-pointer flex items-center justify-center"
                  >
                    Cancel
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
