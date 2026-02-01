'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Calendar, Users, Ticket, CheckCircle2, MessageCircle, Loader2, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { REGISTRATIONS_OPEN } from '@/lib/registration-config';
import { Clock } from 'lucide-react';

const WORKSHOP_GFORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdwvP7_X-JZp1kuAbMTLYXPPISqTs96knSK_B_5bxt5JiMVmA/viewform';

const WORKSHOP_NON_TECH_NAMES = [
  'Triangle Rush', 'Flip and Catch', 'Colour Confusion', 'Typing Sprint',
  'Drip Drop Fill', 'Snap It', 'Flash and Pen', 'Hoop Hop Showdown',
];

export default function WorkshopPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [studentType, setStudentType] = useState<'cit' | 'other' | null>(null);
  const [registrationType, setRegistrationType] = useState<'workshop_only' | 'workshop_plus_nontech' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const docRef = doc(db, 'profiles', firebaseUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfile(docSnap.data());
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const fee = studentType === 'cit' ? 349 : studentType === 'other' ? 412 : null;
  const alreadyRegistered = user && profile?.workshop_registration != null;
  const canRegister = studentType && registrationType && !alreadyRegistered;

  const handleOpenRegistration = () => {
    if (!user) {
      router.push('/login?redirect=/workshop');
      return;
    }
    const width = 600;
    const height = 800;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(WORKSHOP_GFORM_URL, 'WorkshopForm', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`);
    setIsModalOpen(true);
  };

  const handleFinalCompletionSync = async () => {
    if (!auth.currentUser || !profile || !studentType || !registrationType) return;
    setIsProcessing(true);
    try {
      const fullName = `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'N/A';
      await fetch('/api/google-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetSheet: 'Workshop',
          custom_id: profile.custom_id || auth.currentUser.uid.slice(0, 8),
          full_name: fullName,
          college_name: profile.college_name || 'N/A',
          phone: profile.phone || 'N/A',
          student_type: studentType,
          registration_type: registrationType === 'workshop_only' ? 'Workshop only' : 'Workshop + 8 non-tech events',
          fee: fee != null ? `₹${fee}` : 'N/A',
          timestamp: new Date().toLocaleString(),
        }),
      });
      const userRef = doc(db, 'profiles', auth.currentUser.uid);
      await setDoc(userRef, {
        workshop_registration: {
          student_type: studentType,
          registration_type: registrationType,
          fee,
          registered_at: new Date().toISOString(),
        },
      }, { merge: true });
      setProfile((prev: any) => ({
        ...prev,
        workshop_registration: { student_type: studentType, registration_type: registrationType, fee },
      }));
      setIsModalOpen(false);
      router.push('/users');
    } catch (e) {
      alert('Sync failed. Try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#EAB308]" size={48} />
      </div>
    );
  }

  const showAlreadyRegistered = user && alreadyRegistered;
  const showRegisterSection = !showAlreadyRegistered;

  return (
    <div className="min-h-screen bg-[#020617] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EAB308]/10 rounded-full blur-[160px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono font-bold text-blue-400 tracking-[0.4em] uppercase mb-6">
            <Zap className="w-3 h-3 fill-blue-400" /> WORKSHOP_PROTOCOL
          </div>
          <h1 className="text-5xl md:text-8xl font-bold font-display text-white mb-6 tracking-tighter uppercase">
            WORK<span className="text-[#EAB308]">SHOP</span>
          </h1>
          <p className="text-slate-400 font-sans text-base md:text-xl max-w-3xl mx-auto font-medium">
            One-day workshop with 8 non-technical events in parallel. Separate or combined registration.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-12 mb-20"
        >
          <div className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="w-8 h-8 text-[#EAB308]" />
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-tight">
                Event Details
              </h2>
            </div>
            <p className="text-slate-300 font-sans text-base md:text-lg leading-relaxed mb-6">
              The event will be conducted on <span className="text-[#EAB308] font-semibold">13th February</span> as a one-day workshop. Along with the workshop, 8 non-technical events will be conducted in parallel.
            </p>
            <ul className="space-y-3 text-slate-400 font-sans">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
                <span>One-day workshop on 13th February</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
                <span>8 non-technical events run in parallel</span>
              </li>
            </ul>
          </div>

          <div className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-blue-500/20 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-8 h-8 text-blue-400" />
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-tight">
                Panel Discussion
              </h2>
            </div>
            <p className="text-slate-300 font-sans text-base md:text-lg leading-relaxed">
              A panel discussion will be held at the end of the first day for all participants—whether you register for the workshop only or for the workshop plus all 8 non-technical events.
            </p>
          </div>

          <div className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-[#EAB308]" />
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-tight">
                Registration Options
              </h2>
            </div>
            <p className="text-slate-300 font-sans text-base md:text-lg leading-relaxed mb-6">
              There will be separate registration for the workshop. Additionally, a combined registration is available that includes the workshop along with all 8 non-technical events.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Option 1</p>
                <p className="text-white font-semibold">Workshop only</p>
                <p className="text-slate-400 text-sm mt-1">Register for the one-day workshop.</p>
              </div>
              <div className="p-6 rounded-2xl border border-[#EAB308]/30 bg-[#EAB308]/5">
                <p className="text-[10px] font-mono font-bold text-[#EAB308] uppercase tracking-widest mb-2">Option 2</p>
                <p className="text-white font-semibold">Workshop + 8 non-tech events</p>
                <p className="text-slate-400 text-sm mt-1">Combined registration for workshop and all 8 non-technical events.</p>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-[#EAB308]/20 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Ticket className="w-8 h-8 text-[#EAB308]" />
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-tight">
                Registration Fee
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">CIT students</p>
                <p className="text-2xl font-black font-display text-[#EAB308]">₹349</p>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Other institutions</p>
                <p className="text-2xl font-black font-display text-[#EAB308]">₹412</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm font-mono uppercase tracking-wider mt-4">
              Applies to both workshop-only and workshop + non-tech registration.
            </p>
          </div>

          {showAlreadyRegistered ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 rounded-[32px] bg-green-500/10 border border-green-500/20 backdrop-blur-xl text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold font-display text-white uppercase tracking-tight mb-2">
                Already Registered
              </h2>
              <p className="text-slate-400 font-sans mb-6">
                You have registered for the workshop. View your profile for details.
              </p>
              <button
                onClick={() => router.push('/users')}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#EAB308] text-[#020617] font-bold text-sm tracking-widest uppercase hover:bg-[#facc15] transition-colors"
              >
                View Profile <ArrowRight size={18} />
              </button>
            </motion.div>
          ) : !REGISTRATIONS_OPEN ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-[#EAB308]/20 backdrop-blur-xl text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#EAB308]/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-[#EAB308]" />
              </div>
              <h2 className="text-2xl font-bold font-display text-white uppercase tracking-tight mb-2">
                Coming Soon
              </h2>
              <p className="text-slate-400 font-sans mb-6">
                Registrations are temporarily closed. Check back soon.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-white/10 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-[#EAB308]" />
                <h2 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-tight">
                  Register
                </h2>
              </div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">01 Identification</p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {(['cit', 'other'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setStudentType(type)}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${studentType === type ? 'border-[#EAB308] bg-[#EAB308]/10' : 'border-white/10 bg-white/3 hover:border-white/20'}`}
                  >
                    <p className="font-bold uppercase tracking-widest text-[10px] text-white">
                      {type === 'cit' ? 'CIT Student' : 'Other Institution'}
                    </p>
                    <p className="text-slate-500 text-xs mt-1">{type === 'cit' ? '₹349' : '₹412'}</p>
                  </button>
                ))}
              </div>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em] mb-4">02 Registration type</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={() => setRegistrationType('workshop_only')}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${registrationType === 'workshop_only' ? 'border-[#EAB308] bg-[#EAB308]/10' : 'border-white/10 bg-white/3 hover:border-white/20'}`}
                >
                  <p className="font-bold text-white">Workshop only</p>
                  <p className="text-slate-500 text-sm mt-1">One-day workshop on 13th February</p>
                </button>
                <button
                  onClick={() => setRegistrationType('workshop_plus_nontech')}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${registrationType === 'workshop_plus_nontech' ? 'border-[#EAB308] bg-[#EAB308]/10' : 'border-white/10 bg-white/3 hover:border-white/20'}`}
                >
                  <p className="font-bold text-white">Workshop + 8 non-tech events</p>
                  <p className="text-slate-500 text-sm mt-1">{WORKSHOP_NON_TECH_NAMES.join(', ')}</p>
                </button>
              </div>
              <AnimatePresence mode="wait">
                {canRegister && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="pt-4 border-t border-white/10"
                  >
                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wider mb-4">
                      Fee: <span className="text-[#EAB308] font-bold">₹{fee}</span>
                    </p>
                    <button
                      onClick={handleOpenRegistration}
                      className="w-full py-5 rounded-2xl bg-[#EAB308] text-[#020617] font-bold text-sm tracking-widest uppercase hover:bg-[#facc15] transition-all flex items-center justify-center gap-2"
                    >
                      Proceed to registration
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[64px] p-12 text-center text-black shadow-3xl"
              >
                <div className="w-24 h-24 rounded-full bg-[#EAB308]/10 flex items-center justify-center mx-auto mb-10">
                  <Zap size={40} className="text-[#EAB308] fill-[#EAB308]" />
                </div>
                <h3 className="text-4xl font-black uppercase mb-4 italic leading-none">
                  Complete <span className="text-[#EAB308]">registration</span>
                </h3>
                <div className="p-8 bg-[#f8f9fc] rounded-[40px] border border-slate-100 text-left mb-10">
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                    <Info size={16} /> Instructions
                  </h4>
                  <ul className="text-[11px] font-black text-slate-700 space-y-3 uppercase leading-tight">
                    <li>• Do not close this page.</li>
                    <li>• Complete the registration form in the popup window.</li>
                    <li>• Click below only after you have submitted the form.</li>
                  </ul>
                </div>
                <button
                  disabled={isProcessing}
                  onClick={handleFinalCompletionSync}
                  className="w-full py-7 bg-black text-white rounded-full font-black text-[10px] tracking-[0.4em] hover:bg-[#EAB308] hover:text-[#020617] transition-all uppercase shadow-2xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'I have completed registration'
                  )}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
