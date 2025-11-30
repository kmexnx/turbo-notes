'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function SignupPage() {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      // We pass the username as the email prefix for simplicity, or just let backend handle it
      // The AuthContext signature might vary, assuming signup(email, name, password) based on previous turn
      const name = email.split('@')[0]; 
      await signup(email, name, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative">
       {/* Decorative Elements */}
       <div className="absolute bottom-0 left-10 opacity-50 hidden md:block">
         <span className="text-6xl">🌵</span>
      </div>
      <div className="absolute bottom-0 right-10 opacity-50 hidden md:block">
         <span className="text-6xl">🐈</span>
      </div>

      <div className="w-full max-w-md z-10">
        <h1 className="text-4xl font-bold text-center text-brand-text mb-8 font-serif">
          <Image
            src="/cat.svg"
            alt="TurboNotes cat"
            width={200}
            height={50}
            className="mx-auto mb-4"
          />
          Yay, New Friend!
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="group">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border border-brand-text/20 rounded-xl px-4 py-3 outline-none focus:border-brand-text transition-colors placeholder:text-gray-400"
              required
            />
          </div>

          <div className="relative group">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border border-brand-text/20 rounded-xl px-4 py-3 outline-none focus:border-brand-text transition-colors placeholder:text-gray-400 pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-text transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#EF9C66] hover:bg-[#E58B55] text-white font-medium py-3 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-2"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link 
            href="/login" 
            className="text-sm text-brand-text underline decoration-gray-300 underline-offset-4 transition-all"
          >
            We're already friends!
          </Link>
        </div>
      </div>
    </div>
  );
}