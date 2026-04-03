"use client";

import dynamic from 'next/dynamic';

const DashboardMockup = dynamic(() => import('./DashboardMockup'), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[1300px] bg-[#FDFBF9] rounded-t-[32px] shadow-2xl border border-white/60 overflow-hidden flex items-center justify-center h-[600px]">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading Dashboard...</p>
      </div>
    </div>
  ),
});

export default DashboardMockup;
