'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext<any>(null);
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

const api = axios.create({ baseURL: API_URL, withCredentials: true });

// Attach stored token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('collectly_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const saveSession = (u: any, token?: string) => {
    setUser(u);
    localStorage.setItem('collectly_user', JSON.stringify(u));
    if (token) localStorage.setItem('collectly_token', token);
  };

  const clearSession = () => {
    setUser(null);
    localStorage.removeItem('collectly_user');
    localStorage.removeItem('collectly_token');
  };

  // On mount: restore from localStorage instantly, then verify with backend
  useEffect(() => {
    const cached = localStorage.getItem('collectly_user');
    if (cached) {
      try { setUser(JSON.parse(cached)); } catch {}
    }

    const verify = async () => {
      try {
        const res = await api.get('/users/me');
        const u = res.data.data.user;
        setUser(u);
        localStorage.setItem('collectly_user', JSON.stringify(u));
      } catch {
        // Token invalid/expired — clear everything
        clearSession();
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  const signup = async (userData: any) => {
    try {
      const res = await api.post('/users/signup', userData);
      saveSession(res.data.data.user, res.data.token);
      router.push('/dashboard');
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Signup failed' };
    }
  };

  const login = async (userData: any) => {
    try {
      const res = await api.post('/users/login', userData);
      saveSession(res.data.data.user, res.data.token);
      router.push('/dashboard');
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Login failed' };
    }
  };

  const createOrg = async (orgData: any) => {
    try {
      const res = await api.post('/users/create-organization', orgData);
      const updated = { ...user, organizationId: res.data.data.organization.id };
      saveSession(updated);
      router.push('/dashboard');
      return { success: true };
    } catch (err: any) {
      return { success: false, message: err.response?.data?.message || 'Organization creation failed' };
    }
  };

  const logout = async () => {
    try { await api.get('/users/logout'); } catch {}
    clearSession();
    router.push('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout, createOrg }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
