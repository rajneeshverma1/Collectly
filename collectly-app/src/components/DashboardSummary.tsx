'use client';

import React, { useEffect, useState } from 'react';
import { SummaryCard } from './SummaryCard';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1';

interface SummaryData {
  totalOutstanding: {
    amount: number;
    count: number;
    label: string;
  };
  overdue: {
    amount: number;
    count: number;
    label: string;
  };
  dueThisWeek: {
    amount: number;
    count: number;
    label: string;
  };
  collectedThisMonth: {
    amount: number;
    count: number;
    label: string;
    trend: number;
  };
  totalClients?: {
    count: number;
    label: string;
    newestClient?: string;
  };
}

export function DashboardSummary() {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getToken } = useAuth();

  const fetchSummary = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = await getToken();
      const response = await fetch(`${API_URL}/dashboard/summary`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      if (data.status === 'success') {
        setSummary(data.data.summary);
      } else {
        setError(data.message || 'Failed to load dashboard data');
      }
    } catch (err: any) {
      console.error('Failed to fetch dashboard summary:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-transparent rounded-3xl">
        <div className="flex items-center gap-3 text-red-400">
          <AlertCircle size={20} />
          <span className="font-medium">{error}</span>
        </div>
        <button
          onClick={fetchSummary}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-colors"
        >
          <RefreshCw size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
      <SummaryCard
        title="Total Outstanding"
        amount={summary?.totalOutstanding.amount || 0}
        count={summary?.totalOutstanding.count || 0}
        type="outstanding"
        index={0}
        isLoading={loading}
      />
      <SummaryCard
        title="Overdue"
        amount={summary?.overdue.amount || 0}
        count={summary?.overdue.count || 0}
        type="overdue"
        index={1}
        isLoading={loading}
      />
      <SummaryCard
        title="Due This Week"
        amount={summary?.dueThisWeek.amount || 0}
        count={summary?.dueThisWeek.count || 0}
        type="due"
        index={2}
        isLoading={loading}
      />
      <SummaryCard
        title="Collected This Month"
        amount={summary?.collectedThisMonth.amount || 0}
        count={summary?.collectedThisMonth.count || 0}
        trend={summary?.collectedThisMonth.trend}
        type="collected"
        index={3}
        isLoading={loading}
      />
      <SummaryCard
        title="Total Clients"
        amount={0}
        count={summary?.totalClients?.count || 0}
        newestItem={summary?.totalClients?.newestClient}
        type="clients"
        index={4}
        isLoading={loading}
      />
    </div>
  );
}
