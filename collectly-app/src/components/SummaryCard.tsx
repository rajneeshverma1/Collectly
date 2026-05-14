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
  type: 'outstanding' | 'overdue' | 'due' | 'collected' | 'clients';
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
  clients: {
    icon: Users,
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    label: 'Total Clients',
  },
};

export function SummaryCard({ title, amount, count, trend, type, index, isLoading }: SummaryCardProps) {
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
        className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-white/5" />
          <div className="w-20 h-6 rounded-full bg-white/5" />
        </div>
        <div className="w-32 h-10 rounded-xl bg-white/5 mb-3" />
        <div className="w-24 h-4 rounded-lg bg-white/5" />
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
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "relative group p-6 rounded-[32px] overflow-hidden transition-all duration-500",
        "bg-gradient-to-br from-white/[0.05] to-white/[0.01]",
        "border border-white/10 hover:border-white/20",
        "shadow-[0_8px_48px_rgba(0,0,0,0.4)] hover:shadow-[0_24px_64px_rgba(0,0,0,0.5)]"
      )}
    >
      {/* Decorative Background Element */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 blur-[64px] opacity-20 transition-opacity duration-500 group-hover:opacity-40",
        config.bgColor.replace('/10', '/40')
      )} />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
          config.bgColor,
          "border border-white/5"
        )}>
          <Icon size={24} className={config.color} />
        </div>
        
        {trend !== undefined ? (
          <div className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-tight backdrop-blur-md border border-white/5",
            trend >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
          )}>
            {trend >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {Math.abs(trend).toFixed(1)}%
          </div>
        ) : (
          <span className={cn(
            "text-[11px] font-bold px-3 py-1.5 rounded-full backdrop-blur-md border border-white/5",
            config.bgColor,
            config.color
          )}>
            {count} {count === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {/* Amount & Label */}
      <div className="relative z-10">
        <p className="text-xs font-bold text-white/30 uppercase tracking-[0.2em] mb-2">
          {title}
        </p>
        <div className="flex items-baseline gap-2">
          <h3 className="text-3xl font-bold tracking-tight text-white">
            {type === 'clients' ? count : formatCurrency(amount)}
          </h3>
          {trend !== undefined && (
            <span className="text-[10px] font-medium text-white/20">
              +{count} this month
            </span>
          )}
        </div>
      </div>

      {/* Progress Bar (Visual decorative element) */}
      <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          className={cn("h-full opacity-50", config.color.replace('text-', 'bg-'))} 
        />
      </div>
    </motion.div>
  );
}
