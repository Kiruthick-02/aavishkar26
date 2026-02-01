'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { motion } from 'framer-motion';

export default function LoginForm() {
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md p-8 bg-white/[0.03] border border-white/10 rounded-[32px]"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          AAVISHKAR&apos;26 LOGIN
        </h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full rounded-xl bg-white/5 px-5 py-4 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded-xl bg-white/5 px-5 py-4 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-center text-xs text-red-400">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-700 py-4 rounded-xl text-white font-bold"
          >
            {loading ? 'AUTHENTICATING…' : 'LOGIN'}
          </button>
        </form>
        <p className="mt-6 text-xs text-center text-slate-400">
          DON&apos;T HAVE AN ACCOUNT?{' '}
          <Link href="/signup" className="text-yellow-400 font-bold">SIGN UP</Link>
        </p>
      </motion.div>
    </div>
  );
}
