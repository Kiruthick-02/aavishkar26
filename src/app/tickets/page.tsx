'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Crown, Zap, Loader2, CheckCircle2, AlertCircle, ShieldCheck, MousePointer2, Info, ArrowRight, Lock, Calendar } from 'lucide-react';

import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { REGISTRATIONS_OPEN } from '@/lib/registration-config';
import { Clock } from 'lucide-react';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setProfile(docSnap.data());
        setLoading(false);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Tier Limits
  const limits = { 
    bronze: { tech: 2, nonTech: 2 }, 
    silver: { tech: 3, nonTech: 3 }, 
    gold: { tech: 5, nonTech: 5 } 
  };

  const techSelected = selectedEvents.filter(id => ALL_EVENTS.find(e => e.id === id)?.isTech);
  const nonTechSelected = selectedEvents.filter(id => ALL_EVENTS.find(e => e.id === id)?.isTech === false);
  const techFlagshipPicked = techSelected.filter(id => ALL_EVENTS.find(e => e.id === id)?.isFlagship);

  const handleTierSelection = (selectedTier: 'gold' | 'silver' | 'bronze') => {
    setTier(selectedTier);
    setSelectedEvents(['treasure']); // All tiers start with Treasure Hunt locked
  };

  const handleEventToggle = (id: string) => {
    if (id === 'treasure') return; // Locked for all tiers

    const event = ALL_EVENTS.find(e => e.id === id)!;
    const isSelected = selectedEvents.includes(id);

    if (isSelected) {
      setSelectedEvents(prev => prev.filter(eid => eid !== id));
    } else {
      // 1 Tech Flagship Rule (Only for Bronze and Silver)
      if (tier !== 'gold' && event.isTech && event.isFlagship && techFlagshipPicked.length >= 1) return;

      // Tech/Non-Tech Quota Rules
      if (event.isTech && techSelected.length < limits[tier!].tech) {
        setSelectedEvents(prev => [...prev, id]);
      } else if (!event.isTech && nonTechSelected.length < limits[tier!].nonTech) {
        setSelectedEvents(prev => [...prev, id]);
      }
    }
  };

  const isDeployReady = () => {
    if (!tier) return false;
    // Condition: All slots filled. For Bronze/Silver, also check for 1 Tech Flagship.
    const countsMatch = techSelected.length === limits[tier].tech && nonTechSelected.length === limits[tier].nonTech;
    const flagshipCheck = tier === 'gold' ? true : techFlagshipPicked.length === 1;
    
    return countsMatch && flagshipCheck;
  };

  const handleInitialAuthorize = () => {
    const formUrl = REDIRECT_MAP[`${studentType}-${tier}`].url;
    const width = 600, height = 800;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(formUrl, 'PaymentPortal', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`);
    setIsModalOpen(true);
  };

  const handleFinalCompletionSync = async () => {
    if (!auth.currentUser || !profile) return;
    setIsProcessing(true);
    try {
      const selectionNames = selectedEvents.map(id => ALL_EVENTS.find(e => e.id === id)?.name);
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
      const userRef = doc(db, 'profiles', auth.currentUser.uid);
      await setDoc(userRef, {
        ticket_tier: tier,
        registered_events: selectionNames,
        student_type: studentType,
      }, { merge: true });
      setIsModalOpen(false);
      router.push('/users');
    } catch (e) { alert("Sync Failed. Try again."); } finally { setIsProcessing(false); }
  };

  if (loading) return <div className="min-h-screen bg-[#020617] flex items-center justify-center"><Loader2 className="animate-spin text-[#ea580c]" /></div>;

  return (
    <div className="min-h-screen bg-[#020617] py-20 px-4 text-white font-sans overflow-x-hidden">
      <div className="max-w-5xl mx-auto">
        {profile?.registered_events?.length > 0 ? (
          <div className="text-center py-20">
             <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-8 border border-green-500/20">
                <CheckCircle2 size={48} className="text-green-500" />
             </div>
             <h1 className="text-4xl font-black uppercase mb-4 italic">Protocol <span className="text-[#ea580c]">Active</span></h1>
             <button onClick={() => router.push('/users')} className="px-10 py-4 bg-[#ea580c] rounded-full font-bold text-xs tracking-widest flex items-center gap-2 mx-auto uppercase">VIEW IDENTITY CORE <ArrowRight size={16} /></button>
          </div>
        ) : !REGISTRATIONS_OPEN ? (
          <div className="text-center py-32">
            <div className="w-24 h-24 rounded-full bg-[#ea580c]/10 flex items-center justify-center mx-auto mb-8 border border-[#ea580c]/20">
              <Clock size={48} className="text-[#ea580c]" />
            </div>
            <h1 className="text-4xl font-black uppercase mb-4 italic">Coming <span className="text-[#ea580c]">Soon</span></h1>
            <p className="text-slate-400 font-sans mb-8 max-w-md mx-auto">Registrations are temporarily closed. Check back later.</p>
          </div>
        ) : (
          <>
            <header className="text-center mb-16">
              <h1 className="text-6xl font-black tracking-tighter mb-4 italic uppercase">Access <span className="text-[#ea580c]">Portal</span></h1>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-slate-400 tracking-[0.3em] uppercase mb-6">
                <ShieldCheck size={12} className="text-[#ea580c]" /> Flagship Event Participation is Compulsory
              </div>
              <div className="space-y-2 text-slate-400 font-sans text-sm max-w-xl mx-auto">
                <p className="flex items-center justify-center gap-2"><Calendar size={14} className="text-[#ea580c]" /> Registration deadline: <span className="text-[#ea580c] font-semibold">Extended to 12.02.26</span></p>
                <p>Fees below are <span className="text-white font-medium">per head</span>. All 5 tech events will be held on the morning of <span className="text-[#ea580c] font-semibold">February 14th</span>.</p>
              </div>

              <div className="max-w-4xl mx-auto rounded-[32px] bg-white/[0.03] border border-white/10 p-6 md:p-8 backdrop-blur-3xl mt-10">
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono tracking-[0.4em] uppercase text-slate-400 mb-6">
                  <Clock className="w-4 h-4 text-[#ea580c]" /> FEST_SCHEDULE
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                    <p className="text-[11px] font-black uppercase tracking-widest text-[#ea580c] mb-4">13th February 2026</p>
                    <ul className="space-y-3 text-xs text-slate-300">
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">9:00 - 9:30</span>
                        <span className="font-semibold text-white">Registration</span>
                      </li>
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">9:30 - 10:00</span>
                        <span className="font-semibold text-white">Inauguration</span>
                      </li>
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">10:00 - 12:30</span>
                        <span className="font-semibold text-white">Workshop 1</span>
                      </li>
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">1:30 - 5:30</span>
                        <span className="font-semibold text-white">Workshop 2</span>
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
                    <p className="text-[11px] font-black uppercase tracking-widest text-cyan-400 mb-4">14th February 2026</p>
                    <ul className="space-y-3 text-xs text-slate-300">
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">9:00 - 9:30</span>
                        <span className="font-semibold text-white">Registration</span>
                      </li>
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">9:30 - 11:30</span>
                        <span className="font-semibold text-white">Paper and Poster Presentation</span>
                      </li>
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">10:30 - 11:30</span>
                        <span className="font-semibold text-white">Reverse Engineering</span>
                      </li>
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">11:50 - 12:40</span>
                        <span className="font-semibold text-white">Technical Quiz</span>
                      </li>
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">12:40 - 1:40</span>
                        <span className="font-semibold text-white">Thesis to Technology</span>
                      </li>
                      <li className="flex items-start justify-between gap-6">
                        <span className="font-mono text-slate-400 whitespace-nowrap">2:30 - 4:30</span>
                        <span className="font-semibold text-white">Valedictory and Certificate Distribution</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </header>

            {/* 01: IDENTIFICATION */}
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

            {/* 02: CATEGORY */}
            {studentType && (
              <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-12">
                <h3 className="text-slate-500 font-mono text-[10px] mb-4 uppercase tracking-[0.3em]">02 Select Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: "bronze", icon: Star, name: "Bronze", prices: { cit: "₹170 per head (No GST)", other: "₹199 per head (Incl. GST)" } },
                    { id: "silver", icon: Crown, name: "Silver", prices: { cit: "₹260 per head (No GST)", other: "₹299 per head (Incl. GST)" } },
                    { id: "gold", icon: Zap, name: "Gold", prices: { cit: "₹420 per head (No GST)", other: "₹499 per head (Incl. GST)" } },
                  ].map((t) => (
                    <button key={t.id} onClick={() => handleTierSelection(t.id as any)} className={`p-8 rounded-[36px] border-2 transition-all flex flex-col items-center gap-4 ${tier === t.id ? "border-[#ea580c] bg-[#ea580c]/10" : "border-white/5 bg-white/2"}`}>
                      <t.icon size={36} className={tier === t.id ? "text-[#ea580c]" : "text-slate-700"} />
                      <div className="text-center">
                        <span className="font-black uppercase tracking-[0.3em] text-[11px] block">{t.name}</span>
                        <div className="relative h-10 mt-1 overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.span key={`${studentType}-${t.id}`} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} className="absolute inset-0 text-[10px] font-mono text-slate-500 block">
                              {studentType === "cit" ? t.prices.cit : t.prices.other}
                            </motion.span>
                          </AnimatePresence>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 03: CONFIGURATION */}
            {tier && (
              <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                <div className="bg-[#0b1021]/80 backdrop-blur-3xl border border-white/5 rounded-[48px] p-8 md:p-14 shadow-2xl relative">
                  <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 pb-12 border-b border-white/5">
                    <div>
                      <h2 className="text-3xl font-black uppercase italic leading-none mb-2">Configure Events</h2>
                      <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Protocol: {tier} Selection</p>
                    </div>
                    <div className="flex gap-4">
                        <div className={`px-4 py-2 rounded-xl bg-white/5 border text-xs font-black border-white/10 ${techSelected.length === limits[tier].tech ? 'text-cyan-400' : 'text-slate-500'}`}>Tech: {techSelected.length}/{limits[tier].tech}</div>
                        <div className={`px-4 py-2 rounded-xl bg-white/5 border text-xs font-black border-white/10 ${nonTechSelected.length === limits[tier].nonTech ? 'text-[#ea580c]' : 'text-slate-500'}`}>Non-Tech: {nonTechSelected.length}/{limits[tier].nonTech}</div>
                    </div>
                  </div>

                  <div className="space-y-12">
                    {/* SECTION: COMPULSORY FLAGSHIPS */}
                    <div>
                        <h4 className="text-[10px] font-mono text-[#ea580c] uppercase tracking-[0.5em] mb-6 flex items-center gap-3"><Star size={14} /> Compulsory Flagships</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ALL_EVENTS.filter(e => e.isFlagship).map(f => {
                                const isSelected = selectedEvents.includes(f.id);
                                const isLocked = f.id === 'treasure';
                                // Fading logic based on Tech limit and Tech Flagship rule (Only for Bronze/Silver)
                                const isFaded = !isSelected && (
                                  (f.isTech && techSelected.length >= limits[tier].tech) ||
                                  (tier !== 'gold' && f.isTech && techFlagshipPicked.length >= 1)
                                );
                                
                                return (
                                    <button key={f.id} onClick={() => handleEventToggle(f.id)} disabled={isLocked} className={`relative p-8 rounded-3xl border-2 text-left transition-all ${isSelected ? 'border-[#ea580c] bg-[#ea580c]/10 shadow-[0_0_20px_rgba(234,88,12,0.1)]' : 'border-white/5 bg-black/40'} ${isFaded ? 'opacity-20 grayscale' : 'opacity-100'}`}>
                                        <span className="text-[13px] font-black uppercase text-white block mb-2">{f.name}</span>
                                        <span className="text-[9px] text-cyan-400 font-mono tracking-widest uppercase">{f.isTech ? 'Technical' : 'Non-Technical'}</span>
                                        {isLocked ? <Lock size={18} className="text-[#ea580c] absolute top-8 right-8" /> : isSelected && <CheckCircle2 size={18} className="text-[#ea580c] absolute top-8 right-8" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECTION: ADDITIONAL SELECTIONS */}
                    <div>
                        <h4 className="text-[10px] font-mono text-slate-600 uppercase tracking-[0.5em] mb-6 flex items-center gap-3"><MousePointer2 size={14} /> Additional Selections</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {ALL_EVENTS.filter(e => !e.isFlagship).map(e => {
                                const isSelected = selectedEvents.includes(e.id);
                                const isFaded = !isSelected && (
                                  (e.isTech && techSelected.length >= limits[tier].tech) ||
                                  (!e.isTech && nonTechSelected.length >= limits[tier].nonTech)
                                );

                                return (
                                    <button key={e.id} onClick={() => handleEventToggle(e.id)} className={`relative p-8 rounded-2xl border-2 text-left flex justify-between items-center transition-all ${isSelected ? 'border-[#ea580c] bg-[#ea580c]/10 shadow-[0_0_20px_rgba(234,88,12,0.1)]' : 'border-white/5 bg-black/40'} ${isFaded ? 'opacity-20 grayscale' : 'opacity-100'}`}>
                                        <div>
                                          <span className="text-[13px] font-bold text-white block mb-1">{e.name}</span>
                                          <span className={`text-[8px] font-mono tracking-widest uppercase ${e.isTech ? 'text-cyan-400' : 'text-amber-500'}`}>{e.isTech ? 'Technical' : 'Non-Technical'}</span>
                                        </div>
                                        {isSelected && <CheckCircle2 size={18} className="text-[#ea580c]" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col items-center">
                  {!isDeployReady() && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 mb-6 px-6 py-2 rounded-full bg-amber-500/5 border border-amber-500/10">
                      <AlertCircle size={14} className="text-amber-500" />
                      <span className="text-[10px] font-mono font-bold text-amber-500 uppercase tracking-[0.2em]">
                        {tier === 'gold' 
                          ? `Requirements: All 5 Tech + All 5 Non-Tech Events` 
                          : `Requirements: 1 Tech Flagship + ${limits[tier].tech} Tech + ${limits[tier].nonTech} Non-Tech`}
                      </span>
                    </motion.div>
                  )}

                  <button 
                    disabled={!isDeployReady()}
                    onClick={handleInitialAuthorize}
                    className="w-full py-7 rounded-[32px] bg-[#ea580c] font-black uppercase tracking-[0.4em] text-xs shadow-[0_20px_40px_rgba(234,88,12,0.3)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-10 disabled:grayscale"
                  >
                    Deploy Authorized Access
                  </button>
                </div>
              </motion.section>
            )}
          </>
        )}

        {/* MODAL: SYNC IN PROGRESS */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-2xl bg-white rounded-[64px] p-12 text-center text-black shadow-3xl">
                <div className="w-24 h-24 rounded-full bg-[#ea580c]/10 flex items-center justify-center mx-auto mb-10"><Zap size={40} className="text-[#ea580c] fill-[#ea580c]" /></div>
                <h3 className="text-4xl font-black uppercase mb-4 italic leading-none">SYNC <span className="text-[#ea580c]">IN PROGRESS</span></h3>
                <div className="p-8 bg-[#f8f9fc] rounded-[40px] border border-slate-100 text-left mb-10">
                   <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.3em] mb-4 flex items-center gap-2"><Info size={16} /> MISSION BRIEFING</h4>
                   <ul className="text-[11px] font-black text-slate-700 space-y-3 uppercase leading-tight">
                      <li>• DO NOT CLOSE THIS SITE.</li>
                      <li>• UPLOAD PAYMENT SCREENSHOT IN THE POPUP FORM.</li>
                      <li>• CLICK BELOW ONLY AFTER FORM SUBMISSION.</li>
                   </ul>
                </div>
                <button disabled={isProcessing} onClick={handleFinalCompletionSync} className="w-full py-7 bg-black text-white rounded-full font-black text-[10px] tracking-[0.4em] hover:bg-[#ea580c] transition-all uppercase shadow-2xl active:scale-95 disabled:opacity-50">
                  {isProcessing ? <Loader2 className="animate-spin mx-auto" /> : "I HAVE COMPLETED REGISTRATION"}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
