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
    <div className="min-h-screen bg-[#fafafa] text-white flex items-center justify-center p-6">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white/[0.02] border border-white/10 rounded-[40px] p-10 text-center relative z-10"
      >
        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-8">
          <FileText size={40} className="text-white/40" />
        </div>

        {status === 'loading' && (
          <>
            <h2 className="text-3xl font-bold mb-4">Business Agreement</h2>
            <p className="text-white/40 mb-10 leading-relaxed">
              You have been invited to join a professional network. By clicking the button below, you agree to the terms and will be added as a client.
            </p>
            <button 
              onClick={handleApprove}
              className="w-full py-4 bg-white text-black hover:bg-neutral-200 rounded-[20px] font-black text-sm transition-all flex items-center justify-center gap-2 group"
            >
              I Agree & Accept <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </>
        )}

        {status === 'success' && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="text-emerald-500" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">All Set!</h2>
            <p className="text-emerald-400/80 font-medium mb-6">{message}</p>
            <p className="text-white/40 text-sm">
              You can now close this window. Your information has been securely updated.
            </p>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="text-red-500" size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Oops!</h2>
            <p className="text-red-400/80 font-medium mb-6">{message}</p>
            <button 
              onClick={() => setStatus('loading')}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-sm font-bold transition-all"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
