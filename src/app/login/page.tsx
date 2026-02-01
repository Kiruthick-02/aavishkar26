'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      const path = redirect && redirect.startsWith('/') && !redirect.startsWith('//') ? redirect : '/';
      router.push(path);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-4">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/5 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md p-8 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[32px] shadow-2xl"
      >
        {/* HUD Brackets */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-600 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-600 rounded-br-2xl" />

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-display tracking-tight text-white mb-2 uppercase">AAVISHKAR'26 LOGIN</h2>
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.3em] text-blue-400">
            <span className="w-1.5 h-3 bg-blue-500 inline-block animate-pulse"></span>
            SECURE ACCESS PORTAL
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase ml-1">Email ID</label>
            <input
              type="email"
              required
              placeholder="user@example.com"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase ml-1">Password</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-xs font-mono text-red-400 bg-red-400/10 p-3 rounded-lg border border-red-400/20"
            >
              [ERROR]: {error.toUpperCase()}
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full group relative overflow-hidden rounded-xl bg-blue-700 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(29,78,216,0.3)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            <span className="relative z-10">{loading ? 'AUTHENTICATING...' : 'LOGIN'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            DON'T HAVE AN ACCOUNT?{' '}
            <Link href="/signup" className="text-gold-500 hover:text-blue-400 font-bold transition-all" style={{ color: '#EAB308' }}>
              SIGN UP HERE
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
}
