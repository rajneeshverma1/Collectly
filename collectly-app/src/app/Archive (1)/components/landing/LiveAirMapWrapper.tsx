"use client";

import dynamic from 'next/dynamic';

const LiveAirMap = dynamic(() => import('./LiveAirMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl bg-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto mb-4"></div>
        <p className="text-slate-600 font-medium">Loading Map...</p>
      </div>
    </div>
  ),
});

export default LiveAirMap;
