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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="p-6 bg-white border border-zinc-150 rounded-[32px] animate-pulse"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-zinc-100" />
          <div className="w-20 h-6 rounded-full bg-zinc-100" />
        </div>
        <div className="w-32 h-10 rounded-xl bg-zinc-100 mb-3" />
        <div className="w-24 h-4 rounded-lg bg-zinc-100" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "relative group p-6 rounded-[32px] overflow-hidden transition-all duration-300",
        "bg-white border border-zinc-200/80 hover:border-zinc-300",
        "shadow-sm hover:shadow-md"
      )}
    >
      {/* Decorative Background Element */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 blur-[64px] opacity-10 transition-opacity duration-300 group-hover:opacity-25",
        config.bgColor
      )} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 border",
          config.bgColor,
          config.borderColor
        )}>
          <Icon size={20} className={config.color} />
        </div>
        
        {newestItem ? (
          <span className={cn(
            "inline-block text-[10px] font-black px-3 py-1.5 rounded-full border truncate max-w-[130px] uppercase tracking-wider",
            config.bgColor,
            config.borderColor,
            config.color
          )}>
            New: {newestItem}
          </span>
        ) : trend !== undefined ? (
          <div className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border",
            trend >= 0 
              ? "bg-emerald-50 border-emerald-100 text-emerald-600" 
              : "bg-rose-50 border-rose-100 text-rose-600"
          )}>
            {trend >= 0 ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        ) : (
          <span className={cn(
            "text-[10px] font-black px-3 py-1.5 rounded-full border uppercase tracking-wider",
            config.bgColor,
            config.borderColor,
            config.color
          )}>
            {count} {count === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {/* Amount & Label */}
      <div className="relative z-10">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em] mb-2 group-hover:text-zinc-500 transition-colors">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-black tracking-tight text-zinc-900 transition-all">
            {type === 'clients' ? count : formatCurrency(amount)}
          </h3>
          {trend !== undefined && (
            <span className="text-[10px] font-bold text-zinc-400">
              +{count} this month
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar (Visual decorative element) */}
      <div className="mt-6 h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          className={cn("h-full opacity-70", config.color.replace('text-', 'bg-'))} 
        />
      </div>
    </motion.div>
  );
}
