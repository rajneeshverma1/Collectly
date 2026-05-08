'use client';

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, signup } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const result = isLogin
        ? await login({ email: formData.email, password: formData.password })
        : await signup(formData);
      if (!result.success) setError(result.message);
    } catch {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-[360px]">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-white mb-1">
            {isLogin ? 'Welcome back!' : 'Create account'}
          </h1>
          <p className="text-gray-500 text-sm">
            {isLogin ? 'Please enter your details' : 'Start automating your billing today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {!isLogin && (
            <div className="space-y-1">
              <label className="text-white font-semibold text-xs" htmlFor="name">Full Name</label>
              <input
                id="name" type="text" placeholder="John Doe" value={formData.name}
                onChange={handleChange} required={!isLogin}
                className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 transition-colors text-sm"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-white font-semibold text-xs" htmlFor="email">Email</label>
            <input
              id="email" type="email" placeholder="anna@gmail.com" value={formData.email}
              onChange={handleChange} required autoComplete="off"
              className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-3 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 transition-colors text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-white font-semibold text-xs" htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••"
                value={formData.password} onChange={handleChange} required
                className="w-full bg-transparent border border-white/20 rounded-lg py-2.5 px-3 pr-10 text-white placeholder:text-gray-600 focus:outline-none focus:border-white/40 transition-colors text-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {isLogin && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-3.5 h-3.5 rounded border border-white/20 bg-transparent accent-white cursor-pointer" />
                <span className="text-gray-400 text-xs">Remember for 30 days</span>
              </label>
              <Link href="#" className="text-white font-bold text-xs hover:text-gray-300 transition-colors">
                Forgot password?
              </Link>
            </div>
          )}

          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          <button type="submit" disabled={isLoading}
            className="w-full bg-white text-black font-bold py-2.5 rounded-lg text-sm hover:bg-gray-100 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-1">
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isLogin ? 'Log in' : 'Create Account'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => { window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/users/auth/google`; }}
          className="w-full mt-3 bg-transparent border border-white/20 text-white font-medium py-2.5 rounded-lg text-sm hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Mail size={16} />
          Log in with Google
        </button>

        <p className="text-center text-gray-500 text-xs mt-6">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-white font-bold hover:text-gray-300 transition-colors">
            {isLogin ? 'Sign Up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
}
