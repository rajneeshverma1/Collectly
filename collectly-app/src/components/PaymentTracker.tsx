'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  CheckCircle, 
  TrendingUp, 
  RefreshCw, 
  Building, 
  ArrowUpRight, 
  Loader2, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency } from '@/lib/utils';
import axios from 'axios';

interface Transaction {
  id: string;
  invoiceId: string;
  amount: number;
  paymentMethod: 'credit_card' | 'bank_transfer' | 'paypal' | 'cash' | 'other';
  transactionId: string;
  paidAt: string;
  notes?: string;
  Invoice: {
    invoiceNumber: string;
    clientName: string;
    clientEmail: string;
    status: string;
  } | null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export function PaymentTracker() {
  const { getToken } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async (isManual = false) => {
    try {
      if (isManual) setSyncing(true);
      else setLoading(true);
      setError(null);
      
      const token = await getToken();
      const response = await axios.get(`${API_URL}/payments/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setTransactions(response.data.data);
      }
    } catch (err: any) {
      console.error('Failed to fetch transactions:', err);
      setError('Unable to fetch captured transactions.');
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  }, [getToken]);

  useEffect(() => {
    fetchTransactions();

    // Auto-poll captured gateway checkouts every 15 seconds to ensure real-time updates
    const interval = setInterval(() => {
      fetchTransactions();
    }, 15000);

    return () => clearInterval(interval);
  }, [fetchTransactions]);

  const totalCaptured = transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55 }}
      className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] relative overflow-hidden backdrop-blur-3xl"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-emerald-500/5 blur-[50px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-32 h-32 bg-indigo-500/5 blur-[50px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h4 className="text-xl font-bold flex items-center gap-2">
            Gateway Payments Tracker 
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </h4>
          <p className="text-xs text-white/30 font-bold uppercase tracking-widest mt-1">Live Payment Gateway Logs</p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest hidden md:inline-flex items-center gap-1">
            <Clock size={10} /> Auto-sync active
          </span>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => fetchTransactions(true)}
            disabled={syncing}
            className="p-3 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl transition-all text-white/70 hover:text-white flex items-center justify-center disabled:opacity-50"
            title="Force refresh transaction history"
          >
            <RefreshCw size={14} className={syncing ? "animate-spin" : ""} />
          </motion.button>
        </div>
      </div>

      {loading ? (
        <div className="h-48 flex items-center justify-center">
          <Loader2 className="animate-spin text-white/20" size={24} />
        </div>
      ) : error ? (
        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-3xl text-center text-red-400 text-xs font-semibold flex items-center justify-center gap-2">
          <AlertCircle size={14} />
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Summary Metric Strip */}
          <div className="p-6 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-emerald-500/10 rounded-3xl flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-wider">Total Gateway Revenue</p>
                <h3 className="text-2xl font-black mt-0.5 text-emerald-400">{formatCurrency(totalCaptured)}</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full">
                {transactions.length} Clear Captures
              </span>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3.5 max-h-[320px] overflow-y-auto pr-1.5 custom-scrollbar">
            {transactions.length === 0 ? (
              <div className="py-12 border border-dashed border-white/5 rounded-3xl text-center">
                <CreditCard size={28} className="mx-auto text-white/10 mb-3" />
                <p className="text-white/30 text-xs font-bold uppercase tracking-wider">No dynamic payments processed yet</p>
                <p className="text-[11px] text-white/20 mt-1">Stripe Checkout and Razorpay events appear here automatically.</p>
              </div>
            ) : (
              <AnimatePresence>
                {transactions.map((tx, index) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-white/10 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                        tx.paymentMethod === 'credit_card' 
                          ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' 
                          : 'bg-teal-500/10 border-teal-500/20 text-teal-400'
                      }`}>
                        {tx.paymentMethod === 'credit_card' ? <CreditCard size={16} /> : <Building size={16} />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors">
                            {tx.Invoice ? tx.Invoice.clientName : 'Valued Client'}
                          </h5>
                          <span className="text-[10px] text-white/30 font-medium">
                            #{tx.Invoice ? tx.Invoice.invoiceNumber : 'N/A'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`text-[9px] font-black uppercase tracking-wider ${
                            tx.paymentMethod === 'credit_card' ? 'text-indigo-400' : 'text-teal-400'
                          }`}>
                            {tx.paymentMethod === 'credit_card' ? 'Stripe Checkout' : 'Razorpay Secure'}
                          </span>
                          <span className="text-white/20 text-[9px]">•</span>
                          <span className="text-[10px] text-white/30 font-medium">
                            {new Date(tx.paidAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right flex items-center gap-4">
                      <div>
                        <p className="font-black text-sm text-white">{formatCurrency(tx.amount)}</p>
                        <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest flex items-center gap-0.5 justify-end">
                          <CheckCircle size={8} className="text-emerald-500" /> Captured
                        </p>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={14} className="text-white/30" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

        </div>
      )}
    </motion.div>
  );
}
