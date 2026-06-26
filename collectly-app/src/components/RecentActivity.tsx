'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Building, ArrowUpRight, Loader2, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface RecentClient {
  id: string;
  name: string;
  email: string;
  company?: string;
  status: string;
  createdAt: string;
}

export function RecentActivity() {
  const { getToken } = useAuth();
  const [recentClients, setRecentClients] = useState<RecentClient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActivity = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1'}/dashboard/activity`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.status === 'success') {
        setRecentClients(data.data.recentClients || []);
      }
    } catch (err) {
      console.error('Failed to fetch activity:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  if (loading) {
    return (
      <div className="h-64 flex items-center justify-center bg-white/[0.02] border border-white/5 rounded-[40px]">
        <Loader2 className="animate-spin text-gray-900/20" size={32} />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="p-8 bg-white/[0.02] border border-white/5 rounded-[40px] relative overflow-hidden"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h4 className="text-xl font-bold mb-1">Recent Clients</h4>
          <p className="text-xs text-gray-900/30 font-bold uppercase tracking-widest">Newly Onboarded</p>
        </div>
        <Link 
          href="/dashboard/clients"
          className="flex items-center gap-2 text-xs font-bold text-gray-900/40 hover:text-gray-900 transition-colors"
        >
          View All <ArrowUpRight size={14} />
        </Link>
      </div>

      <div className="space-y-4">
        {recentClients.length === 0 ? (
          <div className="py-10 text-center">
            <User size={32} className="mx-auto text-gray-900/10 mb-3" />
            <p className="text-gray-900/30 text-sm">No clients added yet.</p>
          </div>
        ) : (
          recentClients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/[0.03] backdrop-blur-md border border-white/5 rounded-2xl hover:bg-white/[0.08] hover:border-white/10 transition-all group shadow-sm hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-sm font-black border border-white/5">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h5 className="font-bold text-sm group-hover:text-blue-400 transition-colors">{client.name}</h5>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-gray-900/30">{client.email}</span>
                    <div className="w-1 h-1 rounded-full bg-white/10" />
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded bg-white/5",
                      client.status === 'active' ? "text-emerald-400" : "text-amber-400"
                    )}>
                      {client.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-bold text-gray-900/20 uppercase tracking-widest">Added</p>
                <p className="text-[11px] font-medium text-gray-900/60">{new Date(client.createdAt).toLocaleDateString()}</p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
