'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/auth');
    } else if (!loading && user?.organizationId) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user || user.organizationId) return null;

  return <>{children}</>;
}
