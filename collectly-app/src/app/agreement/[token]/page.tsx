'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader2, FileText, ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function AgreementPage() {
  const { token } = useParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  const handleApprove = async () => {
    try {
      setStatus('loading');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1'}/clients/approve/${token}`);
      const data = await response.json();
      
      if (data.status === 'success') {
        setStatus('success');
        setMessage(data.message);
      } else {
        setStatus('error');
        setMessage(data.message);
      }
    } catch (err) {
      setStatus('error');
      setMessage('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f3f6] text-zinc-800 flex items-center justify-center p-6">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white border border-zinc-200/80 rounded-[40px] p-10 text-center relative z-10 shadow-lg"
      >
        <div className="w-20 h-20 rounded-3xl bg-zinc-50 border border-zinc-150 flex items-center justify-center mx-auto mb-8 text-zinc-400">
          <FileText size={40} />
        </div>

        {status === 'loading' && (
          <>
            <h2 className="text-3xl font-black mb-4 text-zinc-900 tracking-tight">Business Agreement</h2>
            <p className="text-zinc-500 mb-10 leading-relaxed text-sm font-medium">
              You have been invited to join a professional network. By clicking the button below, you agree to the terms and will be added as a client.
            </p>
            <button 
              onClick={handleApprove}
              className="w-full py-4 bg-zinc-900 text-white hover:bg-zinc-800 rounded-[20px] font-black text-sm transition-all flex items-center justify-center gap-2 group cursor-pointer shadow-sm"
            >
              <span>I Agree & Accept</span> <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        )}

        {status === 'success' && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-6 text-emerald-600">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-3xl font-black mb-4 text-zinc-900 tracking-tight">All Set!</h2>
            <p className="text-emerald-700 font-semibold mb-6">{message}</p>
            <p className="text-zinc-500 text-sm font-medium">
              You can now close this window. Your information has been securely updated.
            </p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto mb-6 text-rose-600">
              <AlertCircle size={32} />
            </div>
            <h2 className="text-3xl font-black mb-4 text-zinc-900 tracking-tight">Oops!</h2>
            <p className="text-rose-700 font-semibold mb-6">{message}</p>
            <button 
              onClick={() => setStatus('loading')}
              className="w-full py-4 bg-zinc-900 text-white hover:bg-zinc-800 rounded-[20px] font-black text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
