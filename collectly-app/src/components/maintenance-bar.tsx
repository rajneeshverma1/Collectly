"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

const HIDDEN_ON = ['/auth', '/dashboard', '/onboarding'];

export const MaintenanceBar = () => {
  const pathname = usePathname();
  if (HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;

  return (
    <div className="sticky top-0 z-50 w-full h-9 bg-black flex items-center justify-center px-4">
      <p className="text-white text-sm font-normal text-center">
        website under maintenance — for any queries contact me on{" "}
        <span className="text-gray-300">wwrajneesh807@gmail.com</span>
      </p>
    </div>
  );
};
