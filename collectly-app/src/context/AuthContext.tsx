'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoaded: isUserLoaded } = useUser();
  const { signOut, getToken, isLoaded: isAuthLoaded } = useClerkAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isUserLoaded && isAuthLoaded) {
      setLoading(false);
    }
  }, [isUserLoaded, isAuthLoaded]);

  const logout = async () => {
    await signOut();
    router.push('/');
  };

  // Keep these as placeholders for compatibility with existing code
  const signup = () => router.push('/sign-up');
  const login = () => router.push('/sign-in');
  const createOrg = async (orgData: any) => {
    try {
      const token = await getToken();
      const response = await fetch('http://localhost:5000/api/v1/users/create-org', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orgData)
      });

      const data = await response.json();
      if (data.status === 'success') {
        // Refresh the page to trigger the redirect logic in OnboardingPage or Layout
        window.location.href = '/dashboard';
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.error('Create organization error:', err);
      return { success: false, message: 'Network error' };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      logout, 
      signup, 
      login, 
      createOrg,
      getToken // Useful for backend calls
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
