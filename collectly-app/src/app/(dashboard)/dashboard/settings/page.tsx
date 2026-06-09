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
    reminderBeforeDueDays: 3,
    reminderOnDueDate: true,
    reminderAfterDueDays: 3,
    automatedRemindersEnabled: true,
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
        setCredentials({
          stripePublishableKey: data.stripePublishableKey,
          stripeConnected: data.stripeConnected,
          razorpayKeyId: data.razorpayKeyId,
          razorpayConnected: data.razorpayConnected,
        });
        setForm({
          stripePublishableKey: data.stripePublishableKey || '',
          stripeSecretKey: '',
          razorpayKeyId: data.razorpayKeyId || '',
          razorpayKeySecret: '',
          reminderBeforeDueDays: data.reminderBeforeDueDays ?? 3,
          reminderOnDueDate: data.reminderOnDueDate ?? true,
          reminderAfterDueDays: data.reminderAfterDueDays ?? 3,
          automatedRemindersEnabled: data.automatedRemindersEnabled ?? true,
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

      const body: any = {
        reminderBeforeDueDays: parseInt(form.reminderBeforeDueDays.toString(), 10),
        reminderOnDueDate: !!form.reminderOnDueDate,
        reminderAfterDueDays: parseInt(form.reminderAfterDueDays.toString(), 10),
        automatedRemindersEnabled: !!form.automatedRemindersEnabled,
      };
      if (form.stripePublishableKey) body.stripePublishableKey = form.stripePublishableKey;
      if (form.stripeSecretKey) body.stripeSecretKey = form.stripeSecretKey;
      if (form.razorpayKeyId) body.razorpayKeyId = form.razorpayKeyId;
      if (form.razorpayKeySecret) body.razorpayKeySecret = form.razorpayKeySecret;

      const response = await axios.post(`${API_URL}/payments/credentials`, body, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.status === 'success') {
        setSuccessMsg('Payment gateway and reminder settings updated successfully.');
        fetchCredentials();
      }
    } catch (err: any) {
      console.error('Failed to save settings:', err);
      setErrorMsg(err.response?.data?.message || 'Failed to update settings. Please check your inputs.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f6] text-zinc-850 p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <Link href="/dashboard" className="flex items-center gap-2 text-zinc-405 hover:text-zinc-700 transition-colors mb-4 group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-widest">Back to Dashboard</span>
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Payment Settings</h1>
          <p className="text-zinc-500 mt-2 font-medium">Connect your Stripe and Razorpay credentials to accept instant invoice payments.</p>
        </div>

        {loading ? (
          <div className="h-64 flex items-center justify-center bg-white border border-zinc-200 rounded-[40px] shadow-sm">
            <Loader2 className="animate-spin text-zinc-400" size={32} />
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-8">
            
            {/* Status alerts */}
            {successMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-3xl flex items-center gap-3 text-sm font-semibold"
              >
                <CheckCircle2 size={18} />
                {successMsg}
              </motion.div>
            )}

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 bg-rose-50 border border-rose-100 text-rose-700 rounded-3xl flex items-center gap-3 text-sm font-semibold"
              >
                <AlertTriangle size={18} />
                {errorMsg}
              </motion.div>
            )}

            {/* General Info Card */}
            <div className="p-8 bg-white border border-zinc-200 rounded-[32px] flex gap-4 items-start relative overflow-hidden shadow-sm">
              <Shield className="text-zinc-400 shrink-0 mt-1" size={24} />
              <div>
                <h4 className="text-base font-bold mb-1 flex items-center gap-2 text-zinc-900">Secure Vault Encryption <Lock size={12} className="text-zinc-400" /></h4>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                  Your payment credentials are encrypted in-transit and at-rest. They are exclusively used by backend secure servers to establish connection tunnels and receive payment checkout events via webhooks.
                </p>
              </div>
            </div>

            {/* Gateway Onboardings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Stripe Connect Card */}
              <div className="p-8 bg-white border border-zinc-200 rounded-[40px] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900">Stripe Connect</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border rounded-full ${
                      credentials.stripeConnected 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' 
                        : 'bg-zinc-50 text-zinc-400 border-zinc-200'
                    }`}>
                      {credentials.stripeConnected ? 'CONNECTED' : 'DISCONNECTED'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Publishable Key</label>
                      <input 
                        type="text" 
                        placeholder={credentials.stripePublishableKey || "pk_test_..."}
                        value={form.stripePublishableKey}
                        onChange={(e) => setForm(prev => ({ ...prev, stripePublishableKey: e.target.value }))}
                        className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Secret Key</label>
                      <div className="relative">
                        <input 
                          type={showStripeSecret ? "text" : "password"} 
                          placeholder="••••••••••••••••••••••••"
                          value={form.stripeSecretKey}
                          onChange={(e) => setForm(prev => ({ ...prev, stripeSecretKey: e.target.value }))}
                          className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800 pr-12"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowStripeSecret(!showStripeSecret)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                        >
                          {showStripeSecret ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Razorpay Connect Card */}
              <div className="p-8 bg-white border border-zinc-200 rounded-[40px] flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-bold tracking-tight text-zinc-900">Razorpay Connect</h3>
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 border rounded-full ${
                      credentials.razorpayConnected 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/50' 
                        : 'bg-zinc-50 text-zinc-400 border-zinc-200'
                    }`}>
                      {credentials.razorpayConnected ? 'CONNECTED' : 'DISCONNECTED'}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Key ID</label>
                      <input 
                        type="text" 
                        placeholder={credentials.razorpayKeyId || "rzp_test_..."}
                        value={form.razorpayKeyId}
                        onChange={(e) => setForm(prev => ({ ...prev, razorpayKeyId: e.target.value }))}
                        className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Key Secret</label>
                      <div className="relative">
                        <input 
                          type={showRazorpaySecret ? "text" : "password"} 
                          placeholder="••••••••••••••••••••••••"
                          value={form.razorpayKeySecret}
                          onChange={(e) => setForm(prev => ({ ...prev, razorpayKeySecret: e.target.value }))}
                          className="w-full bg-white border border-zinc-250 rounded-2xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-950/5 focus:border-zinc-400 transition-all placeholder:text-zinc-350 text-zinc-800 pr-12"
                        />
                        <button 
                          type="button" 
                          onClick={() => setShowRazorpaySecret(!showRazorpaySecret)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                        >
                          {showRazorpaySecret ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Automated Reminder Settings Card */}
            <div className="p-8 bg-white border border-zinc-200 rounded-[40px] relative overflow-hidden shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-zinc-100">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-zinc-900 mb-1">Automated Reminders Policy</h3>
                  <p className="text-xs text-zinc-450 font-medium">Configure rules to automatically remind clients of upcoming or overdue invoices.</p>
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer self-start md:self-auto bg-zinc-50 border border-zinc-150 px-5 py-3 rounded-2xl hover:bg-zinc-100 transition-colors">
                  <input 
                    type="checkbox"
                    checked={form.automatedRemindersEnabled}
                    onChange={(e) => setForm(prev => ({ ...prev, automatedRemindersEnabled: e.target.checked }))}
                    className="w-4 h-4 rounded border-zinc-300 bg-white text-zinc-900 focus:ring-0 cursor-pointer"
                  />
                  <span className="text-xs font-black uppercase tracking-wider text-zinc-700">Enable Automated Schedule</span>
                </label>
              </div>

              {form.automatedRemindersEnabled ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Before Due Date Rule */}
                  <div className="p-6 bg-white border border-zinc-150 rounded-3xl flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/50 mb-3 inline-block">
                        Rule 1: Upcoming Reminders
                      </span>
                      <p className="text-xs text-zinc-450 font-medium leading-relaxed mb-4">
                        Send an automated email notification before the invoice becomes due.
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-4 border-t border-zinc-100">
                      <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">Days Before Due Date</label>
                      <input 
                        type="number" 
                        min="0"
                        max="30"
                        value={form.reminderBeforeDueDays}
                        onChange={(e) => setForm(prev => ({ ...prev, reminderBeforeDueDays: parseInt(e.target.value, 10) || 0 }))}
                        className="w-full bg-white border border-zinc-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900/5 transition-all text-zinc-800 font-bold"
                      />
                      <span className="text-[10px] text-zinc-400 font-bold block mt-1">Set to 0 to disable this check.</span>
                    </div>
                  </div>

                  {/* On Due Date Rule */}
                  <div className="p-6 bg-white border border-zinc-150 rounded-3xl flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50 mb-3 inline-block">
                        Rule 2: On Due Date
                      </span>
                      <p className="text-xs text-zinc-450 font-medium leading-relaxed mb-4">
                        Send a reminder notification on the exact morning of the invoice due date.
                      </p>
                    </div>
                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-4">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Active Schedule</span>
                        <span className="text-[10px] text-zinc-400 font-bold mt-1">Send email on due day</span>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox"
                          checked={form.reminderOnDueDate}
                          onChange={(e) => setForm(prev => ({ ...prev, reminderOnDueDate: e.target.checked }))}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-zinc-100 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>
                  </div>

                  {/* Overdue Rule */}
                  <div className="p-6 bg-white border border-zinc-150 rounded-3xl flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-widest text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200/50 mb-3 inline-block">
                        Rule 3: Overdue Warnings
                      </span>
                      <p className="text-xs text-zinc-450 font-medium leading-relaxed mb-4">
                        Send an urgent automated overdue notification after the due date has elapsed.
                      </p>
                    </div>
                    <div className="space-y-1.5 pt-4 border-t border-zinc-100">
                      <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest block">Days After Due Date</label>
                      <input 
                        type="number" 
                        min="0"
                        max="30"
                        value={form.reminderAfterDueDays}
                        onChange={(e) => setForm(prev => ({ ...prev, reminderAfterDueDays: parseInt(e.target.value, 10) || 0 }))}
                        className="w-full bg-white border border-zinc-200 rounded-2xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-900/5 transition-all text-zinc-800 font-bold"
                      />
                      <span className="text-[10px] text-zinc-400 font-bold block mt-1">Set to 0 to disable overdue check.</span>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-12 text-center border border-dashed border-zinc-200 rounded-3xl bg-zinc-50 text-zinc-400">
                  <p className="font-semibold text-xs uppercase tracking-widest">Automated schedule scanning is currently suspended.</p>
                  <p className="text-[10px] mt-1 text-zinc-400">Invoices will not receive automated reminders. Manual dispatches are still fully functional.</p>
                </div>
              )}
            </div>

            {/* Save Buttons */}
            <div className="pt-6 space-y-3 border-t border-zinc-200">
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                disabled={saving}
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-50 py-4 rounded-2xl text-xs font-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={14} />
                    <span>Saving Settings...</span>
                  </>
                ) : 'Save Gateway Settings'}
              </motion.button>
              <Link 
                href="/dashboard"
                className="w-full bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 text-zinc-700 py-4 rounded-2xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer"
              >
                Back to Dashboard
              </Link>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}
