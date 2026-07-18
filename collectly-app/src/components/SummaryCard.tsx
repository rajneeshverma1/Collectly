'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, Calendar, CheckCircle, Users } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  count: number;
  trend?: number;
  newestItem?: string;
  type: 'outstanding' | 'overdue' | 'due' | 'collected' | 'clients';
  index: number;
  isLoading?: boolean;
}

const cardConfig = {
  outstanding: {
    icon: DollarSign,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50/80',
    borderColor: 'border-blue-100',
    label: 'Outstanding',
  },
  overdue: {
    icon: AlertCircle,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50/80',
    borderColor: 'border-rose-100',
    label: 'Overdue',
  },
  due: {
    icon: Calendar,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50/80',
    borderColor: 'border-amber-100',
    label: 'Due This Week',
  },
  collected: {
    icon: CheckCircle,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50/80',
    borderColor: 'border-emerald-100',
    label: 'Collected',
  },
  clients: {
    icon: Users,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50/80',
    borderColor: 'border-indigo-100',
    label: 'Total Clients',
  },
};

export function SummaryCard({ title, amount, count, trend, newestItem, type, index, isLoading }: SummaryCardProps) {
  const config = cardConfig[type];
  const Icon = config.icon;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="p-4 bg-white border border-black animate-pulse">
        <div className="w-12 h-12 bg-gray-200 mb-4" />
        <div className="w-32 h-6 bg-gray-200 mb-2" />
        <div className="w-20 h-4 bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-white border border-black transition-none rounded-none shadow-none">
      <div className="flex items-center justify-between mb-4">
        <div className="w-8 h-8 flex items-center justify-center border border-black">
          <Icon size={16} className="text-black" />
        </div>
        
        {newestItem ? (
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 border border-black text-black">
            New: {newestItem}
          </span>
        ) : trend !== undefined ? (
          <div className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold border border-black text-black">
            {trend >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        ) : (
          <span className="inline-block text-[10px] font-bold px-2 py-0.5 border border-black text-black">
            {config.label}
          </span>
        )}
      </div>

      <div className="relative z-10">
        <h3 className="text-gray-500 text-xs font-bold mb-1 uppercase tracking-wider">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-black tracking-tight">
            {type === 'clients' ? count : formatCurrency(amount)}
          </span>
        </div>
        
        {type !== 'clients' && (
          <p className="text-xs text-gray-500 font-normal mt-2">
            from <span className="font-bold text-black">{count}</span> {count === 1 ? 'invoice' : 'invoices'}
          </p>
        )}
      </div>
    </div>
  );
}
