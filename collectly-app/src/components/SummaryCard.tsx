'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, DollarSign, AlertCircle, Calendar, CheckCircle } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  amount: number;
  count: number;
  trend?: number;
  type: 'outstanding' | 'overdue' | 'due' | 'collected';
  index: number;
  isLoading?: boolean;
}

const cardConfig = {
  outstanding: {
    icon: DollarSign,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    label: 'Outstanding',
  },
  overdue: {
    icon: AlertCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/20',
    label: 'Overdue',
  },
  due: {
    icon: Calendar,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    label: 'Due This Week',
  },
  collected: {
    icon: CheckCircle,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    label: 'Collected',
  },
};

export function SummaryCard({ title, amount, count, trend, type, index, isLoading }: SummaryCardProps) {
  const config = cardConfig[type];
  const Icon = config.icon;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="p-6 bg-[#111] border border-white/5 rounded-3xl animate-pulse"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-white/5" />
          <div className="w-16 h-6 rounded-lg bg-white/5" />
        </div>
        <div className="w-32 h-8 rounded-lg bg-white/5 mb-2" />
        <div className="w-24 h-4 rounded-lg bg-white/5" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "p-6 bg-[#111] border rounded-3xl transition-all duration-300 group hover:scale-[1.02]",
        "border-white/5 hover:border-white/10",
        type === 'overdue' && "hover:border-red-500/30",
        type === 'outstanding' && "hover:border-blue-500/30",
        type === 'due' && "hover:border-amber-500/30",
        type === 'collected' && "hover:border-emerald-500/30"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-colors",
          config.bgColor
        )}>
          <Icon size={20} className={config.color} />
        </div>
        
        {trend !== undefined && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-bold",
            trend >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
          )}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        )}
      </div>

      {/* Amount */}
      <h3 className="text-2xl font-bold tracking-tight text-white mb-1">
        {formatCurrency(amount)}
      </h3>

      {/* Label & Count */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold text-white/30 uppercase tracking-widest group-hover:text-white/50 transition-colors">
          {title}
        </p>
        <span className={cn(
          "text-xs font-medium px-2 py-0.5 rounded-full",
          config.bgColor,
          config.color
        )}>
          {count} {count === 1 ? 'invoice' : 'invoices'}
        </span>
      </div>
    </motion.div>
  );
}
