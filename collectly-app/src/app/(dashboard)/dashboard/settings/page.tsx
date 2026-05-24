'use client';

/** Payment Credentials Settings Page */
import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft,
  Shield,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Lock,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import axios from 'axios';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

export default function SettingsPage() {
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Connection status & Masked keys
  const [credentials, setCredentials] = useState({
    stripePublishableKey: '',
    stripeConnected: false,
    razorpayKeyId: '',
    razorpayConnected: false,
  });

  // Inputs
  const [form, setForm] = useState({
    stripePublishableKey: '',
    stripeSecretKey: '',
    razorpayKeyId: '',
    razorpayKeySecret: '',
  });

  // Eye toggles for secret keys
  const [showStripeSecret, setShowStripeSecret] = useState(false);
  const [showRazorpaySecret, setShowRazorpaySecret] = useState(false);

  const fetchCredentials = async () => {
    try {
      setLoading(true);
      setErrorMsg(null);
      const token = await getToken();
      const response = await axios.get(`${API_URL}/payments/credentials`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.status === 'success') {
        const data = response.data.data;
        setCredentials(data);
        setForm({
          stripePublishableKey: data.stripePublishableKey || '',
          stripeSecretKey: '',
          razorpayKeyId: data.razorpayKeyId || '',
          razorpayKeySecret: '',
        });
      }
    } catch (err: any) {
      console.error('Failed to load gateway credentials:', err);
      setErrorMsg('Failed to load current credentials settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCredentials();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSuccessMsg(null);
      setErrorMsg(null);
      const token = await getToken();

      const body: any = {};
      if (form.stripePublishableKey) body.stripePublishableKey = form.stripePublishableKey;
      if (form.stripeSecretKey) body.stripeSecretKey = form.stripeSecretKey;
      if (form.razorpayKeyId) body.razorpayKeyId = form.razorpayKeyId;
      if (form.razorpayKeySecret) body.razorpayKeySecret = form.razorpayKeySecret;

      const response = await axios.post(`${API_URL}/payments/credentials`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setSuccessMsg('Payment gateway configuration securely updated.');
        fetchCredentials();
      }
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      setErrorMsg('Failed to update credentials. Please verify your inputs.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/dashboard" className="flex items-center gap-2 text-white/40 hover:text-white transition-colors mb-4 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-black tracking-tight">Payment Settings</h1>
          <p className="text-white/40 mt-2 font-medium">Connect your Stripe and Razorpay credentials to accept instant invoice payments.</p>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-[40px]">
            <Loader2 className="animate-spin text-white/20" size={32} />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            
            {/* Status alerts */}
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-3xl flex items-center gap-3 text-sm font-semibold"
              >
                <CheckCircle2 size={18} />
                {successMsg}
              </motion.div>
            )}

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-3xl flex items-center gap-3 text-sm font-semibold"
              >
                <AlertTriangle size={18} />
                {errorMsg}
              </motion.div>
            )}

            {/* General Info Card */}
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[32px] flex gap-4 items-start relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-white/5 blur-3xl rounded-full" />
              <Shield className="text-white/40 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-base font-bold mb-1 flex items-center gap-2">Secure Vault Encryption <Lock size={12} className="text-white/30" /></h4>
                <p className="text-sm text-white/40 font-medium leading-relaxed">
                  Your payment credentials are encrypted in-transit and at-rest. They are exclusively used by backend secure servers to establish connection tunnels and receive payment checkout events via webhooks.
                </p>
              </div>
            </div>

            {/* Gateway Onboardings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Stripe Connect Card */}
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight">Stripe Connect</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border rounded-full ${
                      credentials.stripeConnected 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {credentials.stripeConnected ? 'CONNECTED' : 'DISCONNECTED'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Publishable Key</label>
                      <input 
                        type="text" 
                        placeholder={credentials.stripePublishableKey || "pk_test_..."}
                        value={form.stripePublishableKey}
                        onChange={(e) => setForm(prev => ({ ...prev, stripePublishableKey: e.target.value }))}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Secret Key</label>
                      <div className="relative">
                        <input 
                          type={showStripeSecret ? "text" : "password"} 
                          placeholder="••••••••••••••••••••••••"
                          value={form.stripeSecretKey}
                          onChange={(e) => setForm(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/20 pr-12"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowStripeSecret(!showStripeSecret)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                        >
                          {showStripeSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Razorpay Connect Card */}
              <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight">Razorpay Connect</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border rounded-full ${
                      credentials.razorpayConnected 
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                        : 'bg-white/5 text-white/40 border-white/10'
                    }`}>
                      {credentials.razorpayConnected ? 'CONNECTED' : 'DISCONNECTED'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Key ID</label>
                      <input 
                        type="text" 
                        placeholder={credentials.razorpayKeyId || "rzp_test_..."}
                        value={form.razorpayKeyId}
                        onChange={(e) => setForm(prev => ({ ...prev, razorpayKeyId: e.target.value }))}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/20"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-white/40 uppercase tracking-widest">Key Secret</label>
                      <div className="relative">
                        <input 
                          type={showRazorpaySecret ? "text" : "password"} 
                          placeholder="••••••••••••••••••••••••"
                          value={form.razorpayKeySecret}
                          onChange={(e) => setForm(prev => ({ ...prev, razorpayKeySecret: e.target.value }))}
                          className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-white/10 transition-all placeholder:text-white/20 pr-12"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"
                        >
                          {showRazorpaySecret ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="pt-6 flex items-center justify-end gap-4 border-t border-white/5">
              <Link 
                href="/dashboard"
                className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-xs font-bold transition-all"
              >
                Back
              </Link>
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={saving}
                className="bg-white text-black hover:bg-neutral-200 disabled:opacity-50 px-10 py-4 rounded-2xl text-xs font-black transition-all flex items-center gap-2 shadow-[0_20px_40px_rgba(255,255,255,0.1)]"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    Saving...
                  </>
                ) : 'Save Gateway Settings'}
              </motion.button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
