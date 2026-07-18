'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const FounderModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    
    window.addEventListener('open-founder-modal', handleOpen);
    return () => window.removeEventListener('open-founder-modal', handleOpen);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={closeModal}>
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex justify-center mb-6">
            <span className="text-2xl font-black tracking-tighter uppercase italic text-zinc-900">
              COLLECTLY
            </span>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
            Welcome to Collectly
          </h2>
          
          <p className="text-center text-gray-600 mb-8 text-sm leading-relaxed">
            Your account hasn't been set up with a company yet. Book a demo with our team and we'll get you started right away.
          </p>

          <div className="space-y-4">
            <div className="mb-4">
               <input 
                  type="email" 
                  placeholder="Enter your email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all text-sm text-gray-900 bg-gray-50 hover:bg-white"
               />
            </div>

            <button 
              onClick={() => {
                window.location.href = `mailto:rajneeshverma3536@gmail.com?subject=Demo Request&body=Hi, I would like to book a demo.${email ? ' My email is: ' + email : ''}`;
              }}
              className="w-full bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 rounded-xl transition-all"
            >
              Book a Demo
            </button>
            
            <a 
              href="mailto:rajneeshverma3536@gmail.com"
              className="w-full block text-center border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl transition-all"
            >
              Contact Support
            </a>
          </div>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-500">
              Or email us at <a href="mailto:rajneeshverma3536@gmail.com" className="text-[#6366f1] hover:underline">rajneeshverma3536@gmail.com</a>
            </p>
            
            <button 
              onClick={closeModal}
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
            >
              Sign out and try a different account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
