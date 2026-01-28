'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    console.log("🚀 Starting registration...");

    try {
      // 1. Create Auth User
      console.log("1. Creating Auth User...");
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("✅ User created:", user.uid);

      if (user) {
        // 2. Generate Custom ID
        const uniqueSuffix = Date.now().toString().slice(-6);
        const customId = `AAV-${uniqueSuffix}`;
        console.log("2. Generated ID:", customId);

        const userData = {
          uid: user.uid,
          custom_id: customId,
          first_name: firstName,
          last_name: lastName,
          college_name: collegeName,
          phone: phone,
          email: email,
          ticket_tier: 'none',
          created_at: new Date().toISOString(),
        };

        // 3. Save to Firestore
        console.log("3. Saving to Firestore...");
        await setDoc(doc(db, 'profiles', user.uid), userData);
        console.log("✅ Saved to Firestore");

       // 4. Trigger Google Sheet Sync
        fetch('/api/google-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
        }).catch(err => console.error("Google Sheet sync failed:", err));

        // 5. Redirect
        console.log("5. Redirecting...");
        router.push('/users');
      }
    } catch (err: any) {
      console.error("❌ REGISTRATION ERROR:", err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email is already registered.');
      } else if (err.code === 'permission-denied') {
        setError('Database permission denied. Check Firestore Rules.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#020617] overflow-hidden px-4 py-20">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ea580c]/10 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg p-8 md:p-10 backdrop-blur-3xl bg-white/[0.03] border border-white/10 rounded-[32px] shadow-2xl"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold font-display tracking-tight text-white mb-2">IDENTITY CREATION</h2>
          <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.3em] text-[#ea580c]">
            <span className="w-1.5 h-3 bg-[#ea580c] inline-block animate-pulse"></span>
            SYSTEM REGISTRATION IN PROGRESS
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase ml-1">Given Name</label>
              <input
                type="text"
                required
                className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#ea580c] transition-all"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase ml-1">Family Name</label>
              <input
                type="text"
                required
                className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#ea580c] transition-all"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase ml-1">Phone Number</label>
            <input
              type="tel"
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#ea580c] transition-all"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase ml-1">Institute Affiliation</label>
            <input
              type="text"
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#ea580c] transition-all"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase ml-1">Email</label>
            <input
              type="email"
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#ea580c] transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-mono tracking-widest text-slate-400 uppercase ml-1">Password</label>
            <input
              type="password"
              required
              className="w-full rounded-xl bg-white/5 border border-white/10 px-5 py-3.5 text-white placeholder-white/20 focus:outline-none focus:ring-1 focus:ring-[#ea580c] transition-all"
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
            className="w-full group relative overflow-hidden rounded-xl bg-[#ea580c] py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 mt-4"
          >
            <span className="relative z-10">{loading ? 'REGISTERING...' : 'INITIALIZE ENTITY'}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-xs font-mono text-slate-400 tracking-wider">
            EXISTING IDENTITY?{' '}
            <Link href="/login" className="text-[#ea580c] hover:underline font-bold transition-all">
              RE-ESTABLISH ACCESS
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}