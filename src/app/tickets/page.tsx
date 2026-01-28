'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Crown, Zap, QrCode, Loader2, CheckCircle2, AlertCircle, ShieldCheck, MousePointer2, X, Info, ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Firebase Imports
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

// --- DATA STRUCTURE ---
const ALL_EVENTS = [
  { id: 'paper', name: 'Paper Presentation', isTech: true, isFlagship: true },
  { id: 'poster', name: 'Poster Presentation', isTech: true, isFlagship: true },
  { id: 'treasure', name: 'Treasure Hunt', isTech: false, isFlagship: true },
  { id: 'reverse', name: 'Reverse Engineering', isTech: true, isFlagship: false },
  { id: 'quiz', name: 'Technical Quiz', isTech: true, isFlagship: false },
  { id: 'thesis', name: 'Thesis to Technology', isTech: true, isFlagship: false },
  { id: 'cup', name: 'Cup Match Challenge', isTech: false, isFlagship: false },
  { id: 'spin', name: 'Spin with Paper', isTech: false, isFlagship: false },
  { id: 'build', name: 'Build It and Balance It', isTech: false, isFlagship: false },
  { id: 'sing', name: 'Sing It Out', isTech: false, isFlagship: false },
];

const REDIRECT_MAP: any = {
  'other-gold': { url: 'https://docs.google.com/forms/d/e/1FAIpQLSenQyQKHsctkzwQAezLZjVXLsKriC-YIqLxAMSMBaVGevV46A/viewform' },
  'other-silver': { url: 'https://docs.google.com/forms/d/e/1FAIpQLSdwvP7_X-JZp1kuAbMTLYXPPISqTs96knSK_B_5bxt5JiMVmA/viewform' },
  'other-bronze': { url: 'https://docs.google.com/forms/d/e/1FAIpQLSdYJ71SEBWnaJbvMm6NnR5u50P1ulG-KweNngG6yQQh0u_eZA/viewform' },
  'cit-gold': { url: 'https://docs.google.com/forms/d/e/1FAIpQLSeglevxsqxmjuRzGllHVxthny5R6j1mZyy27rGW402Bo4cbQw/viewform' },
  'cit-silver': { url: 'https://docs.google.com/forms/d/e/1FAIpQLSeglevxsqxmjuRzGllHVxthny5R6j1mZyy27rGW402Bo4cbQw/viewform' },
  'cit-bronze': { url: 'https://docs.google.com/forms/d/e/1FAIpQLSeglevxsqxmjuRzGllHVxthny5R6j1mZyy27rGW402Bo4cbQw/viewform' },
};

export default function TicketsPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [studentType, setStudentType] = useState<'cit' | 'other' | null>(null);
  const [tier, setTier] = useState<'gold' | 'silver' | 'bronze' | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Auth & Profile Fetching
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // LOGIC: Limits
  const maxFlagship = 1; 
  const maxRegular = tier === 'bronze' ? 1 : tier === 'silver' ? 2 : 20;
  const currentFlagships = selectedEvents.filter(id => ALL_EVENTS.find(e => e.id === id)?.isFlagship).length;
  const currentRegulars = selectedEvents.filter(id => ALL_EVENTS.find(e => e.id === id && !e.isFlagship)).length;

  const isLimitReached = (isFlagship: boolean) => {
    if (tier === 'gold') return false;
    return isFlagship ? currentFlagships >= maxFlagship : currentRegulars >= maxRegular;
  };

  const handleEventToggle = (id: string, isFlagship: boolean) => {
    if (selectedEvents.includes(id)) {
      setSelectedEvents(prev => prev.filter(e => e !== id));
    } else if (!isLimitReached(isFlagship)) {
      setSelectedEvents(prev => [...prev, id]);
    }
  };

  // STEP 1: OPEN POPUP ONLY
  const handleInitialAuthorize = () => {
    const formUrl = REDIRECT_MAP[`${studentType}-${tier}`].url;
    const width = 600;
    const height = 800;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    
    window.open(formUrl, 'PaymentPortal', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`);
    setIsModalOpen(true);
  };

  // STEP 2: THE FINAL SYNC (CALLED BY MODAL BUTTON)
  const handleFinalCompletionSync = async () => {
    if (!auth.currentUser || !profile) return;
    setIsProcessing(true);

    try {
      const selectionNames = selectedEvents.map(id => ALL_EVENTS.find(e => e.id === id)?.name);

      // 1. Sync to Google Sheets (Only now!)
      await fetch('/api/google-sheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetSheet: 'Sheet2',
          custom_id: profile.custom_id || auth.currentUser.uid.slice(0, 8),
          full_name: `${profile.first_name} ${profile.last_name}`,
          college_name: profile.college_name,
          phone: profile.phone,
          tier: tier,
          events: selectionNames.join(', '),
          timestamp: new Date().toLocaleString()
        }),
      });

      // 2. Sync to Firebase Profile
      const userRef = doc(db, 'profiles', auth.currentUser.uid);
      await setDoc(userRef, {
        ticket_tier: tier,
        registered_events: selectionNames,
        student_type: studentType,
      }, { merge: true });

      // 3. Success! Close Modal and Go to Profile
      setIsModalOpen(false);
      router.push('/users');

    } catch (e) {
      alert("Verification Sync Failed. Please try clicking the button again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center font-mono text-[#ea580c]"><Loader2 className="animate-spin mr-3" /> INITIALIZING...</div>;

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-4 text-white font-sans overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        
        {/* CHECK IF ALREADY REGISTERED */}
        {profile?.registered_events?.length > 0 ? (
          <div className="text-center py-20">
             <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                <CheckCircle2 size={48} className="text-green-500" />
             </div>
             <h1 className="text-4xl font-black uppercase mb-4 italic">Protocol <span className="text-[#ea580c]">Active</span></h1>
             <p className="text-slate-400 mb-10 max-w-md mx-auto">You have already registered for events. Your access pass is active in your Identity Core.</p>
             <button onClick={() => router.push('/users')} className="px-10 py-4 bg-[#ea580c] rounded-full font-bold text-xs tracking-widest flex items-center gap-2 mx-auto">
               VIEW IDENTITY CORE <ArrowRight size={16} />
             </button>
          </div>
        ) : (
          <>
            <header className="text-center mb-16">
              <h1 className="text-6xl font-black tracking-tighter mb-4 italic uppercase">Access <span className="text-[#ea580c]">Portal</span></h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-400 tracking-[0.3em] uppercase">
                <ShieldCheck size={12} className="text-[#ea580c]" /> Flagship Event Participation is Compulsory
              </div>
            </header>

            {/* IDENTIFICATION */}
            <section className="mb-12">
              <h3 className="text-slate-500 font-mono text-[10px] mb-4 uppercase tracking-[0.3em]">01 Identification</h3>
              <div className="grid grid-cols-2 gap-4">
                {['cit', 'other'].map(type => (
                  <button key={type} onClick={() => {setStudentType(type as any); setTier(null); setSelectedEvents([]);}} className={`p-6 rounded-[28px] border-2 transition-all ${studentType === type ? 'border-[#ea580c] bg-[#ea580c]/10' : 'border-white/5 bg-white/[0.02]'}`}>
                    <p className="font-black uppercase tracking-widest text-[10px]">{type === 'cit' ? 'CIT Entity' : 'External Entity'}</p>
                  </button>
                ))}
              </div>
            </section>

            {/* CATEGORY */}
            {studentType && (
              <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
                <h3 className="text-slate-500 font-mono text-[10px] mb-4 uppercase tracking-[0.3em]">02 Select Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'bronze', icon: Star, name: 'Bronze', price: '₹353' },
                    { id: 'silver', icon: Crown, name: 'Silver', price: '₹589' },
                    { id: 'gold', icon: Zap, name: 'Gold', price: '₹825' },
                  ].map(t => (
                    <button key={t.id} onClick={() => {setTier(t.id as any); setSelectedEvents([]);}} className={`p-8 rounded-[36px] border-2 transition-all flex flex-col items-center gap-4 ${tier === t.id ? 'border-[#ea580c] bg-[#ea580c]/10' : 'border-white/5 bg-white/[0.02]'}`}>
                      <t.icon size={36} className={tier === t.id ? 'text-[#ea580c]' : 'text-slate-700'} />
                      <div className="text-center">
                        <span className="font-black uppercase tracking-[0.3em] text-[11px] block">{t.name}</span>
                        <span className="text-[10px] font-mono text-slate-500 mt-1 block">{t.price} (Incl. GST)</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* CONFIGURATION */}
            {tier && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <div className="bg-[#0b1021]/80 backdrop-blur-3xl border border-white/5 rounded-[48px] p-8 md:p-14 shadow-2xl relative">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 pb-12 border-b border-white/5">
                    <div>
                      <h2 className="text-3xl font-black uppercase italic leading-none mb-2">Configure Events</h2>
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Protocol: {tier} Selection</p>
                    </div>
                    {tier !== 'gold' && (
                      <div className="flex gap-4">
                        <div className="px-4 py-2 rounded-xl bg-white/5 border text-xs font-black text-cyan-400 border-white/10">Flagship: {currentFlagships}/1</div>
                        <div className="px-4 py-2 rounded-xl bg-white/5 border text-xs font-black text-[#ea580c] border-white/10">Regular: {currentRegulars}/{maxRegular}</div>
                      </div>
                    )}
                  </div>

                  {/* EVENT GRID */}
                  <div className="space-y-12">
                    <div>
                        <h4 className="text-[10px] font-mono text-[#ea580c] uppercase tracking-[0.5em] mb-6 flex items-center gap-3"><Star size={14} /> Compulsory Flagships</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {ALL_EVENTS.filter(e => e.isFlagship).map(f => {
                                const isSelected = selectedEvents.includes(f.id);
                                const isFaded = !isSelected && isLimitReached(true);
                                return (
                                    <button key={f.id} onClick={() => handleEventToggle(f.id, true)} className={`p-6 rounded-3xl border-2 text-left transition-all ${isSelected ? 'border-[#ea580c] bg-[#ea580c]/10' : 'border-white/5 bg-black/40'} ${isFaded ? 'opacity-20 grayscale' : 'opacity-100'}`}>
                                        <span className="text-[11px] font-black uppercase text-white block mb-1">{f.name}</span>
                                        {isSelected && <CheckCircle2 size={18} className="text-[#ea580c]" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-6 flex items-center gap-3"><MousePointer2 size={14} /> Additional Selections</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ALL_EVENTS.filter(e => !e.isFlagship).map(e => {
                                const isSelected = selectedEvents.includes(e.id);
                                const isFaded = !isSelected && isLimitReached(false);
                                return (
                                    <button key={e.id} onClick={() => handleEventToggle(e.id, false)} className={`p-6 rounded-2xl border-2 text-left flex justify-between items-center transition-all ${isSelected ? 'border-[#ea580c] bg-[#ea580c]/10' : 'border-white/5 bg-black/40'} ${isFaded ? 'opacity-20 grayscale' : 'opacity-100'}`}>
                                        <span className="text-[12px] font-bold text-white">{e.name}</span>
                                        {isSelected && <CheckCircle2 size={18} className="text-[#ea580c]" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  {currentFlagships === 0 && (
                    <p className="text-center text-amber-500 text-[10px] font-mono mb-8 animate-pulse uppercase tracking-widest"><AlertCircle size={14} className="inline mr-2" /> Participation in 1 Flagship Event is Compulsory</p>
                  )}
                  <button 
                    disabled={selectedEvents.length === 0 || currentFlagships === 0}
                    onClick={handleInitialAuthorize}
                    className="w-full py-7 rounded-[32px] bg-[#ea580c] font-black uppercase tracking-[0.4em] text-xs shadow-2xl hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20"
                  >
                    Deploy Authorized Access
                  </button>
                </div>
              </motion.section>
            )}
          </>
        )}

        {/* MODAL: THE FINAL VERIFICATION STEP */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-2xl bg-white rounded-[40px] p-10 text-center text-black">
                <div className="w-20 h-20 rounded-full bg-[#ea580c]/10 flex items-center justify-center mx-auto mb-6">
                   <Zap size={32} className="text-[#ea580c] fill-[#ea580c]" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Sync <span className="text-[#ea580c]">In Progress</span></h3>
                <p className="text-sm font-medium text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">A separate payment window has been opened. Complete the form and upload your screenshot there first.</p>

                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-left mb-8">
                   <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2"><Info size={14} /> Mission Briefing</h4>
                   <ul className="text-[11px] font-bold text-slate-700 space-y-2 uppercase leading-tight">
                      <li>• DO NOT close this site yet.</li>
                      <li>• Upload your payment screenshot in the popup form.</li>
                      <li>• Once the form says "Submitted", click the button below.</li>
                   </ul>
                </div>

                <button 
                  disabled={isProcessing}
                  onClick={handleFinalCompletionSync}
                  className="w-full py-6 bg-black text-white rounded-full font-black text-[10px] tracking-[0.3em] hover:bg-[#ea580c] transition-all uppercase shadow-xl"
                >
                  {isProcessing ? <Loader2 className="animate-spin mx-auto" /> : "I Have Completed Registration"}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}