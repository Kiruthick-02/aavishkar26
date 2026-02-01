'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { User as UserIcon, Mail, School, Zap, Phone, ShieldCheck, ArrowRight, CheckCircle2, Calendar, Ticket } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, 'profiles', user.uid));
        if (docSnap.exists()) setProfile(docSnap.data());
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-[#ea580c]" /></div>;
  const workshopReg = profile?.workshop_registration;

  return (
    <div className="min-h-screen bg-[#020617] py-24 px-4 relative">
      <div className="mx-auto max-w-6xl relative z-10">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-black text-white mb-2">IDENTITY <span className="text-[#ea580c]">CORE</span></h1>
          <div className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase flex items-center justify-center gap-2">
            <ShieldCheck size={14} /> Neural Interface Active
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* PROFILE CARD */}
          <div className="lg:col-span-4">
            <div className="rounded-[32px] bg-white/[0.03] border border-white/10 p-10 backdrop-blur-3xl relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ea580c] to-orange-600 mx-auto mb-6 flex items-center justify-center shadow-2xl border-4 border-white/10">
                <UserIcon size={40} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold text-center text-white uppercase">{profile?.first_name} {profile?.last_name}</h2>
              <p className="text-center text-[10px] font-mono text-[#ea580c] mb-8">ID: {auth.currentUser?.uid.slice(0, 8).toUpperCase()}</p>
              
              <div className="space-y-4 border-t border-white/10 pt-8">
                <div className="flex items-center gap-4">
                  <Mail size={16} className="text-cyan-400" />
                  <span className="text-xs text-slate-300 truncate">{profile?.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <School size={16} className="text-[#ea580c]" />
                  <span className="text-xs text-slate-300">{profile?.college_name}</span>
                </div>
              </div>
            </div>
          </div>

          {/* EVENTS LIST */}
          <div className="lg:col-span-8 space-y-8">
            {workshopReg && (
              <div className="rounded-[32px] bg-white/[0.03] border border-[#EAB308]/20 p-8 backdrop-blur-3xl">
                <div className="flex items-center gap-3 mb-4 border-b border-white/10 pb-4">
                  <Ticket className="w-6 h-6 text-[#EAB308]" />
                  <h3 className="text-lg font-bold text-white uppercase tracking-tighter">Workshop Registration</h3>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <span className="px-4 py-2 rounded-xl bg-[#EAB308]/10 border border-[#EAB308]/20 text-[#EAB308] font-bold uppercase">
                    {workshopReg.registration_type === 'workshop_plus_nontech' ? 'Workshop + 8 non-tech events' : 'Workshop only'}
                  </span>
                  {workshopReg.fee != null && (
                    <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300">
                      ₹{workshopReg.fee} · {workshopReg.student_type === 'cit' ? 'CIT' : 'Other'}
                    </span>
                  )}
                  {workshopReg.registered_at && (
                    <span className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 text-xs flex items-center gap-2">
                      <Calendar size={14} /> {new Date(workshopReg.registered_at).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="rounded-[32px] bg-white/[0.03] border border-white/10 p-10 backdrop-blur-3xl min-h-[400px]">
              <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
                 <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Registered_Events</h3>
                 <div className="bg-[#ea580c]/10 border border-[#ea580c]/20 px-4 py-1 rounded-full text-[#ea580c] text-[10px] font-bold uppercase">{profile?.ticket_tier || 'No'} Pass</div>
              </div>

              {profile?.registered_events?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.registered_events.map((eventName: string, i: number) => (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }} key={i} className="p-6 rounded-2xl bg-white/[0.04] border border-white/5 flex justify-between items-center group hover:border-[#ea580c]/30">
                       <span className="text-xs font-bold text-white uppercase tracking-widest">{eventName}</span>
                       <CheckCircle2 size={16} className="text-[#ea580c]" />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                   <Zap size={48} className="mb-4 text-slate-500" />
                   <p className="text-xs font-mono uppercase tracking-widest">No Active Participation Protocols Detected</p>
                   <button onClick={() => router.push('/events')} className="mt-8 px-8 py-3 bg-[#ea580c] text-white rounded-full font-bold text-[10px] tracking-widest flex items-center gap-2">BROWSE ARENA <ArrowRight size={14} /></button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Loader2({ className }: { className?: string }) { return <div className={className}>...</div>; }