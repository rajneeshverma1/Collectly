"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

const HIDDEN_ON = ['/auth', '/dashboard', '/onboarding'];

export const MaintenanceBar = () => {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="sticky top-0 z-[60] w-full h-9 bg-black/40 backdrop-blur-lg flex items-center justify-center px-4">
      <p className="text-white/40 text-[11px] font-normal text-center tracking-wider uppercase">
        website under maintenance — for any queries contact me on wwrajneesh807@gmail.com
      </p>
    </div>
  );
};
