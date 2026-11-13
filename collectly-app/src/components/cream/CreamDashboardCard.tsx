'use client';

import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Users, 
  Repeat, 
  TrendingUp, 
  Layers, 
  Settings, 
  Search, 
  Plus, 
  Send, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles,
  PanelLeftClose,
  ChevronRight,
  Folder,
  ArrowRight
} from 'lucide-react';

export default function CreamDashboardCard() {
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const prompts = [
    {
      q: "Can I send an automated reminder for Acme Corp?",
      a: "Yes! Acme Corp has Invoice #1048 ($4,750.00) due in 3 days. Your 3-day proximity policy is active, and an automated friendly email reminder is scheduled for tomorrow at 9:00 AM EST."
    },
    {
      q: "Why is $2,040 overdue from last month?",
      a: "The $2,040 overdue balance belongs to Linear Labs (Invoice #1039, 14 days overdue). Two automated escalation emails have been sent with 100% deliverability. Would you like to dispatch a WhatsApp SMS or pause service?"
    },
    {
      q: "When will my $18,400 Stripe payout settle?",
      a: "Your batch of 4 client payments totaled $18,400.00. Stripe Connect has initiated payout #po_10928, estimated to arrive in your designated Chase business checking account tomorrow by 5:00 PM."
    },
    {
      q: "How is our Q2 collection rate tracking?",
      a: "Outstanding performance! You are at 92.4% on-time payment collection rate this quarter, up +18.6% from Q1 after enabling Collectly's automated 3-day reminder policies."
    }
  ];

  const handlePromptClick = (item: { q: string; a: string }) => {
    setActivePrompt(item.q);
    setQuery(item.q);
    setIsTyping(true);
    setAiResponse(null);
    setTimeout(() => {
      setIsTyping(false);
      setAiResponse(item.a);
    }, 450);
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsTyping(true);
    setAiResponse(null);
    setTimeout(() => {
      setIsTyping(false);
      setAiResponse(`Analyzed Collectly ledger for "${query}": Outstanding receivables are healthy at $148,726.43 with 92% collection target reached. 0 payment failures reported across Stripe & Razorpay.`);
    }, 500);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-[#FAF6F0] border border-[#E7DFD4] shadow-[0_25px_70px_-15px_rgba(50,30,10,0.22)] overflow-hidden font-sans text-left">
      
      {/* Top subtle border sheen */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      <div className="flex flex-col md:flex-row min-h-[640px]">
        
        {/* =========================================================================
            LEFT SIDEBAR (Matches Treasury sidebar in cream styling)
           ========================================================================= */}
        <aside className="w-full md:w-60 bg-[#F4EDE3] border-b md:border-b-0 md:border-r border-[#E5DDD0] p-4 flex flex-col justify-between shrink-0">
          
          <div className="space-y-5">
            {/* Logo row */}
            <div className="flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center">
                  <img
                    src="/images/logo.png"
                    alt="Collectly Logo"
                    className="size-5 sm:size-6 object-contain"
                  />
                </div>
                <span className="font-semibold text-sm tracking-tight text-[#241D17]">
                  Collectly
                </span>
              </div>
              <button 
                type="button" 
                className="text-[#8C7D70] hover:text-[#241D17] transition-colors p-1 rounded-md"
                title="Sidebar toggle"
              >
                <PanelLeftClose className="size-4" />
              </button>
            </div>

            {/* Search Pill */}
            <div className="relative">
              <div className="flex items-center justify-between bg-white/90 border border-[#E0D7CA] rounded-xl px-3 py-1.5 text-xs text-[#8C7D70] shadow-sm">
                <div className="flex items-center gap-2">
                  <Search className="size-3.5 text-[#A09386]" />
                  <span className="text-[#8C7D70] font-normal">Search</span>
                </div>
                <kbd className="font-mono text-[10px] bg-[#EBE4D8] text-[#695D52] px-1.5 py-0.5 rounded">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Main Navigation Menu */}
            <nav className="space-y-0.5">
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white text-[#241D17] shadow-sm font-medium text-xs">
                <Home className="size-4 text-[#C86524]" />
                <span>Home</span>
              </div>
              
              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#6E6155] hover:text-[#241D17] hover:bg-black/[0.03] transition-colors font-normal text-xs cursor-pointer">
                <FileText className="size-4 text-[#8C7D70]" />
                <span>Invoices</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#6E6155] hover:text-[#241D17] hover:bg-black/[0.03] transition-colors font-normal text-xs cursor-pointer">
                <Users className="size-4 text-[#8C7D70]" />
                <span>Clients</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#6E6155] hover:text-[#241D17] hover:bg-black/[0.03] transition-colors font-normal text-xs cursor-pointer">
                <Repeat className="size-4 text-[#8C7D70]" />
                <span>Recurring</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#6E6155] hover:text-[#241D17] hover:bg-black/[0.03] transition-colors font-normal text-xs cursor-pointer">
                <TrendingUp className="size-4 text-[#8C7D70]" />
                <span>Cashflow</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#6E6155] hover:text-[#241D17] hover:bg-black/[0.03] transition-colors font-normal text-xs cursor-pointer">
                <Layers className="size-4 text-[#8C7D70]" />
                <span>Integrations</span>
              </div>

              <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-[#6E6155] hover:text-[#241D17] hover:bg-black/[0.03] transition-colors font-normal text-xs cursor-pointer">
                <Settings className="size-4 text-[#8C7D70]" />
                <span>Settings</span>
              </div>
            </nav>

            {/* Pinned Section */}
            <div className="pt-2">
              <div className="px-3 text-[10px] font-semibold text-[#96877A] uppercase tracking-wider mb-1.5">
                Pinned
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-[#524538] hover:bg-black/[0.03] cursor-pointer">
                  <div className="size-3.5 rounded bg-[#E4D7C8] flex items-center justify-center text-[9px] font-bold text-[#84684E]">
                    A
                  </div>
                  <span className="truncate">Acme Corp Retainer</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-xs text-[#524538] hover:bg-black/[0.03] cursor-pointer">
                  <div className="size-3.5 rounded bg-[#E8D1BE] flex items-center justify-center text-[9px] font-bold text-[#A85820]">
                    D
                  </div>
                  <span className="truncate">Design Studio Q3</span>
                </div>
              </div>
            </div>

            {/* Recent Section */}
            <div className="pt-2">
              <div className="flex items-center justify-between px-3 text-[10px] font-semibold text-[#96877A] uppercase tracking-wider mb-1.5">
                <span>Recent</span>
                <div className="flex items-center gap-1.5 text-[#96877A]">
                  <Search className="size-3 cursor-pointer hover:text-[#241D17]" />
                  <Plus className="size-3 cursor-pointer hover:text-[#241D17]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 px-3 py-1 text-xs text-[#6E6155] hover:text-[#241D17] cursor-pointer">
                  <CheckCircle2 className="size-3 text-emerald-600 shrink-0" />
                  <span className="truncate">Paid: Acme Corp $4.7k</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 text-xs text-[#6E6155] hover:text-[#241D17] cursor-pointer">
                  <Clock className="size-3 text-amber-600 shrink-0" />
                  <span className="truncate">Reminder sent to Alex</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 text-xs text-[#6E6155] hover:text-[#241D17] cursor-pointer">
                  <ArrowUpRight className="size-3 text-[#C86524] shrink-0" />
                  <span className="truncate">Stripe Payout: $18.4k</span>
                </div>
              </div>
            </div>

          </div>

          {/* User profile bottom item */}
          <div className="pt-4 border-t border-[#E5DDD0] flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-full bg-[#D48956] text-white flex items-center justify-center text-xs font-semibold">
                P
              </div>
              <div>
                <div className="text-xs font-medium text-[#241D17]">Penny Lane</div>
                <div className="text-[10px] text-[#8C7D70]">Freelancer Pro</div>
              </div>
            </div>
          </div>

        </aside>

        {/* =========================================================================
            MAIN DASHBOARD AREA (Matches Treasury cards in cream styling)
           ========================================================================= */}
        <main className="flex-1 bg-[#FAF6F0] p-5 sm:p-7 flex flex-col justify-between space-y-5">
          
          {/* Header Row: Date & Greeting */}
          <div>
            <div className="text-[11px] font-semibold tracking-wider uppercase text-[#8C7D70]">
              Tuesday, Mar 24
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1F1914] mt-0.5">
              Good afternoon, Penny
            </h2>
          </div>

          {/* Top 2 Metric Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1: Total Collected & Net Receivables */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7DFD4] shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="text-xs font-medium text-[#8C7D70]">
                  Net Receivables
                </div>
                <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1F1914] mt-1">
                  $148,726.43
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs font-medium text-emerald-600">
                  <span>▲ $5,254.15 (3.6%)</span>
                  <span className="text-[#8C7D70] font-normal">Past Month</span>
                </div>
              </div>

              {/* Vector line chart */}
              <div className="mt-4 h-16 w-full relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#16A34A" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#16A34A" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Fill area */}
                  <path
                    d="M0,52 Q40,48 70,35 T140,24 T200,6 L200,60 L0,60 Z"
                    fill="url(#chartGradient)"
                  />
                  {/* Stroke line */}
                  <path
                    d="M0,52 Q40,48 70,35 T140,24 T200,6"
                    fill="none"
                    stroke="#16A34A"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  {/* Glow dot at the end */}
                  <circle cx="200" cy="6" r="3.5" fill="#16A34A" />
                </svg>
              </div>
            </div>

            {/* Card 2: Collection Target & Progress Bars */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#E7DFD4] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-full bg-[#F3ECE2] flex items-center justify-center text-[10px]">
                    🎯
                  </div>
                  <span className="text-xs font-medium text-[#1F1914]">Road to Riches</span>
                </div>
                <span className="text-[11px] font-medium text-[#8C7D70] bg-[#FAF6F0] px-2 py-0.5 rounded-full border border-[#E7DFD4]">
                  7d left
                </span>
              </div>

              {/* 3 Progress Bars */}
              <div className="space-y-2.5 mt-3">
                {/* Income / Collected */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#65594E] font-medium">Income</span>
                    <span className="font-semibold text-[#1F1914]">$8,437 <span className="text-[#8C7D70] font-normal">/ $9,000</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F3ECE2] rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '93%' }} />
                  </div>
                </div>

                {/* Expenses / Invoices Pending */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#65594E] font-medium">Expenses</span>
                    <span className="font-semibold text-[#1F1914]">$5,118 <span className="text-[#8C7D70] font-normal">/ $6,000</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F3ECE2] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2A241E] rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>

                {/* Savings / Buffer */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#65594E] font-medium">Savings</span>
                    <span className="font-semibold text-[#1F1914]">$2,040 <span className="text-[#8C7D70] font-normal">/ $3,000</span></span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F3ECE2] rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: '68%' }} />
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Bottom 2 Mini Cards: Recent & Upcoming */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Recent Invoices / Transactions */}
            <div className="bg-white rounded-2xl p-4 border border-[#E7DFD4] shadow-sm">
              <div className="text-[11px] font-semibold text-[#8C7D70] uppercase tracking-wider mb-2.5">
                Recent
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-[10px] font-bold">
                      W
                    </div>
                    <span className="text-[#1F1914] font-medium">Whole Foods</span>
                  </div>
                  <span className="font-semibold text-[#1F1914]">$72.30</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-[10px] font-bold">
                      U
                    </div>
                    <span className="text-[#1F1914] font-medium">Uniqlo</span>
                  </div>
                  <span className="font-semibold text-[#1F1914]">$48.00</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-[10px] font-bold">
                      M
                    </div>
                    <span className="text-[#1F1914] font-medium">Monorail Espresso</span>
                  </div>
                  <span className="font-semibold text-[#1F1914]">$5.40</span>
                </div>
              </div>
            </div>

            {/* Upcoming Reminders */}
            <div className="bg-white rounded-2xl p-4 border border-[#E7DFD4] shadow-sm">
              <div className="text-[11px] font-semibold text-[#8C7D70] uppercase tracking-wider mb-2.5">
                Upcoming
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[10px] font-bold">
                      S
                    </div>
                    <div>
                      <span className="text-[#1F1914] font-medium block">Spotify</span>
                      <span className="text-[10px] text-[#8C7D70]">Tomorrow</span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#1F1914]">$12.99</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="size-5 rounded-full bg-[#1F1914] text-white flex items-center justify-center text-[10px] font-bold">
                      P
                    </div>
                    <div>
                      <span className="text-[#1F1914] font-medium block">Peloton</span>
                      <span className="text-[10px] text-[#8C7D70]">In 5 days</span>
                    </div>
                  </div>
                  <span className="font-semibold text-[#1F1914]">$44.00</span>
                </div>
              </div>
            </div>

          </div>

          {/* Suggested Prompts (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
            {prompts.map((item, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handlePromptClick(item)}
                className={`text-left p-2 rounded-xl border transition-all flex items-start gap-2 ${
                  activePrompt === item.q
                    ? 'bg-white border-[#C86524] text-[#C86524] shadow-sm'
                    : 'bg-white/60 hover:bg-white border-[#E7DFD4] text-[#65594E] hover:text-[#1F1914]'
                }`}
              >
                <span className="text-[#C86524] text-sm leading-none shrink-0">✦</span>
                <span className="truncate">{item.q}</span>
              </button>
            ))}
          </div>

          {/* AI Response Box (if active) */}
          {(isTyping || aiResponse) && (
            <div className="bg-white border border-[#E7DFD4] rounded-2xl p-3.5 shadow-sm text-xs text-[#2A241E] animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-medium text-[#C86524] mb-1">
                <Sparkles className="size-3.5" />
                <span>Collectly Intelligence</span>
              </div>
              {isTyping ? (
                <div className="flex items-center gap-1.5 text-[#8C7D70]">
                  <span className="size-1.5 rounded-full bg-[#C86524] animate-bounce" />
                  <span className="size-1.5 rounded-full bg-[#C86524] animate-bounce [animation-delay:0.15s]" />
                  <span className="size-1.5 rounded-full bg-[#C86524] animate-bounce [animation-delay:0.3s]" />
                  <span className="ml-1 text-[11px]">Analyzing invoices and ledger...</span>
                </div>
              ) : (
                <p className="leading-relaxed text-[#4A3F35]">{aiResponse}</p>
              )}
            </div>
          )}

          {/* Natural Language Input Bar */}
          <form onSubmit={handleAskSubmit} className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask about your finances..."
              className="w-full bg-white border border-[#E0D7CA] rounded-2xl pl-4 pr-11 py-3 text-xs sm:text-sm text-[#1F1914] placeholder-[#A09386] focus:outline-none focus:ring-2 focus:ring-[#C86524]/20 focus:border-[#C86524] shadow-sm transition-all"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 size-7 rounded-full bg-[#EFE8DD] hover:bg-[#C86524] text-[#6E6155] hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm"
              title="Submit query"
            >
              <Plus className="size-4" />
            </button>
          </form>

        </main>

      </div>

    </div>
  );
}

