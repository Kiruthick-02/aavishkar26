'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Calendar, Ticket, CheckCircle2, Loader2, ArrowRight, ShieldCheck, Info, X, User } from 'lucide-react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { WORKSHOP_REGISTRATIONS_OPEN } from '@/lib/registration-config';
import { Clock } from 'lucide-react';

const CIT_WORKSHOP_GFORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSeZxfo-1NT0-AEgPqXjRa_QA2WRroqUrFJrJ7XzawW7oSegqw/viewform?usp=publish-editor';
const OTHER_WORKSHOP_GFORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSfK5W3Iea_vRRqGl7Yz6tp8bEN2HpmkmvEahuH04Jd5kDLzxg/viewform?usp=header';

const WORKSHOP_NON_TECH_NAMES = [
  'Triangle Rush', 'Flip and Catch', 'Colour Confusion', 'Typing Sprint',
  'Drip Drop Fill', 'Snap It', 'Flash and Pen', 'Hoop Hop Showdown',
];

const SCHEDULE = [
  { time: '09:30 a.m.', label: 'Inauguration' },
  { time: '10:00 a.m. – 12:30 p.m.', label: 'Workshop 1: Deep Learning for System Identification' },
  { time: '01:30 p.m. – 05:30 p.m.', label: 'Workshop 2: Soft Sensor Development in Process Industries' },
];

const WORKSHOP_1 = {
  title: 'Deep NARX Models for Nonlinear System Identification of Process Systems',
  date: '13.02.2026',
  time: '10:00 a.m. – 12:30 p.m.',
  description: 'Nonlinear system identification (NLSI) plays a crucial role in modeling, prediction, and control of complex process systems where first-principles modeling is difficult or impractical. Among data-driven approaches, autoregressive models with exogenous inputs (NARX) provide a structured and interpretable framework aligned with dynamical systems theory. Recent advances in deep learning have significantly enhanced classical NARX models, giving rise to Deep NARX architectures. This workshop offers a practice-oriented introduction to Deep NARX models, emphasizing their application to process and dynamical systems. It bridges classical system identification with modern deep neural networks, demonstrating how structured NARX formulations achieve high predictive accuracy while maintaining interpretability. Participants will gain insights into model structure selection, training, validation, and deployment for real-world process systems.',
  outline: [
    { title: 'Nonlinear System Identification and NARX Foundations', duration: '40 min' },
    { title: 'Deep Neural Networks for Dynamical Modeling', duration: '40 min' },
    { title: 'Deep NARX Architectures and Training', duration: '50 min' },
    { title: 'Case Study: Deep NARX for Process Systems', duration: '40 min' },
    { title: 'Discussion, Pitfalls, and Q&A', duration: '10 min' },
  ],
  speaker: {
    name: 'Dr. Prem Jagadeesan',
    photo: '/images/speakers/prem-jagadeesan.png',
    summary: 'Assistant Professor, School of Artificial Intelligence, Amrita Vishwa Vidyapeetham, Coimbatore. Research at the intersection of systems theory, machine learning, and networked intelligence. Previously Postdoctoral Research Associate at Purdue University (USA). Ph.D. from IIT Madras. Coordinator of EINS; Scientific Advisor at Hikigai Inc. (USA).',
    fullBio: 'Dr. Prem Jagadeesan is an Assistant Professor in the School of Artificial Intelligence at Amrita Vishwa Vidyapeetham, Coimbatore, where he is actively engaged in teaching and advancing fundamental and applied research in artificial intelligence, dynamical systems, and networked intelligence. His work lies at the intersection of systems theory, machine learning, and complex networks, with a strong emphasis on understanding intelligence as an emergent property of interacting systems. He previously served as a Postdoctoral Research Associate at Purdue University (USA), where his research focused on data-driven modeling, network systems, and machine-learning applications in pharmaceutical manufacturing and industrial processes. Dr. Jagadeesan completed his doctoral research at Indian Institute of Technology Madras, specializing in Systems Theory and Identification, and was associated with the Robert Bosch Centre for Data Science and Artificial Intelligence (RBCDSAI) and the Initiative for Biological Systems Engineering. At Amrita, he also serves as the Coordinator of EINS (Emergent Intelligence in Networked Systems). He acts as a Scientific Advisor at Hikigai Inc. (USA). Earlier he gained industry exposure at IBM and SmartMegh Solutions. With expertise spanning machine learning, dynamical systems, network theory, and statistical modeling, he is committed to advancing theoretical rigor alongside impactful AI applications in complex engineered, biological, and cyber-physical systems.',
  },
};

const WORKSHOP_2 = {
  title: 'Soft Sensor Development in Process Industries by Data-Driven Modeling',
  date: '13.02.2026',
  time: '1:30 p.m. – 5:30 p.m.',
  description: 'This session focuses on data-driven modeling techniques for developing soft sensors in process industries. Participants will learn how plant data is used to predict product specifications, the importance of data quality and preprocessing, relevant process variables, and model validation techniques. Python-based examples will be used to illustrate key concepts. The workshop equips participants with the knowledge and confidence to design reliable soft sensors for industrial applications.',
  speaker: {
    name: 'Mr. R. Kumaraguruparan',
    photo: '/images/speakers/kumaraguruparan.png',
    summary: 'Assistant Manager at Chennai Petroleum Corporation Limited (CPCL). Over six years in refinery operations; expertise in process optimization, plant monitoring, and digital transformation. B.Tech Chemical Engineering from CIT (First Class with Distinction). Develops AI-based predictive models including soft sensors and anomaly detection.',
    fullBio: 'Kumaraguruparan Ravichandran is a Chemical Engineer currently serving as Assistant Manager at Chennai Petroleum Corporation Limited (CPCL), a subsidiary of Indian Oil Corporation Limited. With over six years of experience in refinery operations, he brings strong expertise in process engineering, plant performance optimization, and digital transformation in refining. He holds B.Tech in Chemical Engineering from Coimbatore Institute of Technology, graduating with First Class with Distinction. He was promoted to Assistant Manager in March 2024. He has developed excess O₂ soft sensor models, sulphur prediction models for DHT outlet products, and anomaly detection models for FCC wet gas compressor operations. Proficient in Aspen HYSYS, process simulation, and mathematical modeling, he is passionate about leveraging AI and data science to drive operational excellence and sustainable innovation in the refining and energy sector.',
  },
};

export default function WorkshopPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [studentType, setStudentType] = useState<'cit' | 'other' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [speakerBioOpen, setSpeakerBioOpen] = useState<null | 'prem' | 'kumaraguruparan'>(null);

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

  const fee = studentType === 'cit' ? 420 : studentType === 'other' ? 499 : null;
  const alreadyRegistered = user && profile?.workshop_registration != null;
  const canRegister = !!studentType && !alreadyRegistered;

  const handleOpenRegistration = () => {
    if (!user) {
      router.push('/login?redirect=/workshop');
      return;
    }
    const formUrl =
      studentType === 'cit' ? CIT_WORKSHOP_GFORM_URL : OTHER_WORKSHOP_GFORM_URL;
    const width = 600;
    const height = 800;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    window.open(formUrl, 'WorkshopForm', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`);
    setIsModalOpen(true);
  };

  const handleFinalCompletionSync = async () => {
    if (!auth.currentUser || !profile || !studentType) return;
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
              registration_type: 'Workshop only',
          fee: fee != null ? `₹${fee}` : 'N/A',
          timestamp: new Date().toLocaleString(),
        }),
      });
      const userRef = doc(db, 'profiles', auth.currentUser.uid);
      await setDoc(userRef, {
        workshop_registration: {
          student_type: studentType,
          registration_type: 'workshop_only',
          fee,
          registered_at: new Date().toISOString(),
        },
      }, { merge: true });
      setProfile((prev: any) => ({
        ...prev,
        workshop_registration: { student_type: studentType, registration_type: 'workshop_only', fee },
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
            One-day workshop on 13th February with 8 non-technical events running in parallel. Those 8 events are on-spot registration only.
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
              The event will be conducted on <span className="text-[#EAB308] font-semibold">13th February</span> as a one-day workshop. Along with the workshop, 8 non-technical events will be conducted in parallel on an on-spot registration basis.
            </p>
            <ul className="space-y-3 text-slate-400 font-sans">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
                <span>One-day workshop on 13th February</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#EAB308] shrink-0 mt-0.5" />
                <span>8 non-technical events run in parallel with on-spot registration only</span>
              </li>
            </ul>
            <p className="text-slate-400 font-sans text-sm mt-4">
              Parallel non-technical events: {WORKSHOP_NON_TECH_NAMES.join(', ')}.
            </p>
          </div>

          <div className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-[#EAB308]" />
              <h2 className="text-2xl md:text-3xl font-bold font-display text-white uppercase tracking-tight">
                Event Timeline – 13.02.2026
              </h2>
            </div>
            <ul className="space-y-3">
              {SCHEDULE.map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-300 font-sans">
                  <span className="font-mono text-[#EAB308] text-sm shrink-0 w-36">{item.time}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-blue-500/20 backdrop-blur-xl">
            <h2 className="text-xl md:text-2xl font-bold font-display text-white uppercase tracking-tight mb-2">
              Workshop 1
            </h2>
            <p className="text-[#EAB308] font-mono text-sm mb-6">{WORKSHOP_1.date} · {WORKSHOP_1.time}</p>
            <h3 className="text-lg font-semibold text-white mb-4">{WORKSHOP_1.title}</h3>
            <p className="text-slate-300 font-sans text-sm leading-relaxed mb-6">{WORKSHOP_1.description}</p>
            <div className="mb-6">
              <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">Outline (2.5 hours)</h4>
              <ul className="space-y-2">
                {WORKSHOP_1.outline.map((item, i) => (
                  <li key={i} className="flex justify-between text-slate-400 text-sm">
                    <span>{item.title}</span>
                    <span className="text-[#EAB308] font-mono text-xs">{item.duration}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-20 h-20 rounded-full bg-white/10 overflow-hidden shrink-0 relative flex items-center justify-center">
                <img src={WORKSHOP_1.speaker.photo} alt={WORKSHOP_1.speaker.name} className="w-full h-full object-cover absolute inset-0" onError={(e) => { e.currentTarget.style.opacity = '0'; const next = e.currentTarget.nextElementSibling as HTMLElement | null; if (next) { next.classList.remove('hidden'); next.classList.add('flex'); } }} />
                <div className="hidden absolute inset-0 items-center justify-center bg-[#EAB308]/20"><User className="w-8 h-8 text-[#EAB308]" /></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Resource Person</p>
                <button type="button" onClick={() => setSpeakerBioOpen('prem')} className="text-white font-bold text-lg hover:text-[#EAB308] transition-colors text-left">
                  {WORKSHOP_1.speaker.name}
                </button>
                <p className="text-slate-400 text-sm mt-2">{WORKSHOP_1.speaker.summary}</p>
                <button type="button" onClick={() => setSpeakerBioOpen('prem')} className="mt-3 text-[10px] font-mono font-bold text-[#EAB308] uppercase tracking-wider hover:underline">
                  View full profile
                </button>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-blue-500/20 backdrop-blur-xl">
            <h2 className="text-xl md:text-2xl font-bold font-display text-white uppercase tracking-tight mb-2">
              Workshop 2
            </h2>
            <p className="text-[#EAB308] font-mono text-sm mb-6">{WORKSHOP_2.date} · {WORKSHOP_2.time}</p>
            <h3 className="text-lg font-semibold text-white mb-4">{WORKSHOP_2.title}</h3>
            <p className="text-slate-300 font-sans text-sm leading-relaxed mb-6">{WORKSHOP_2.description}</p>
            <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col sm:flex-row gap-4 items-start">
              <div className="w-20 h-20 rounded-full bg-white/10 overflow-hidden shrink-0 relative flex items-center justify-center">
                <img src={WORKSHOP_2.speaker.photo} alt={WORKSHOP_2.speaker.name} className="w-full h-full object-cover absolute inset-0" onError={(e) => { e.currentTarget.style.opacity = '0'; const next = e.currentTarget.nextElementSibling as HTMLElement | null; if (next) { next.classList.remove('hidden'); next.classList.add('flex'); } }} />
                <div className="hidden absolute inset-0 items-center justify-center bg-[#EAB308]/20"><User className="w-8 h-8 text-[#EAB308]" /></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">Resource Person</p>
                <button type="button" onClick={() => setSpeakerBioOpen('kumaraguruparan')} className="text-white font-bold text-lg hover:text-[#EAB308] transition-colors text-left">
                  {WORKSHOP_2.speaker.name}
                </button>
                <p className="text-slate-400 text-sm mt-2">{WORKSHOP_2.speaker.summary}</p>
                <button type="button" onClick={() => setSpeakerBioOpen('kumaraguruparan')} className="mt-3 text-[10px] font-mono font-bold text-[#EAB308] uppercase tracking-wider hover:underline">
                  View full profile
                </button>
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
                <p className="text-2xl font-black font-display text-[#EAB308]">₹420 (No GST)</p>
              </div>
              <div className="p-6 rounded-2xl border border-white/10 bg-white/3">
                <p className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2">Other institutions</p>
                <p className="text-2xl font-black font-display text-[#EAB308]">₹499 (Incl. GST)</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm font-mono uppercase tracking-wider mt-4">
              Applies to workshop registration only.
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
          ) : !WORKSHOP_REGISTRATIONS_OPEN ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 rounded-[32px] bg-white/2 border border-[#EAB308]/20 backdrop-blur-xl text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[#EAB308]/10 flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-[#EAB308]" />
              </div>
              <h2 className="text-2xl font-bold font-display text-white uppercase tracking-tight mb-2">
                Closed
              </h2>
              <p className="text-slate-400 font-sans mb-6">
                Registrations are closed. On-spot registration is only available for events on February 13. There is no on-spot registration for events on February 14.
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
                    <p className="text-slate-500 text-xs mt-1">{type === 'cit' ? '₹420' : '₹499'}</p>
                  </button>
                ))}
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
          {speakerBioOpen && (() => {
            const speaker = speakerBioOpen === 'prem' ? WORKSHOP_1.speaker : WORKSHOP_2.speaker;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4"
                onClick={() => setSpeakerBioOpen(null)}
              >
                <motion.div
                  initial={{ scale: 0.95, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 20 }}
                  className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[32px] bg-[#020617] border border-white/10 p-8 shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button type="button" onClick={() => setSpeakerBioOpen(null)} className="absolute top-6 right-6 rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <X size={24} />
                  </button>
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-28 h-28 rounded-full bg-white/10 overflow-hidden shrink-0 relative flex items-center justify-center mb-4">
                      <img src={speaker.photo} alt={speaker.name} className="w-full h-full object-cover absolute inset-0" onError={(e) => { e.currentTarget.style.display = 'none'; const next = e.currentTarget.nextElementSibling as HTMLElement | null; if (next) { next.classList.remove('hidden'); next.classList.add('flex'); } }} />
                      <div className="hidden absolute inset-0 items-center justify-center bg-[#EAB308]/20"><User className="w-12 h-12 text-[#EAB308]" /></div>
                    </div>
                    <h3 className="text-2xl font-bold font-display text-white">{speaker.name}</h3>
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">Instructor biography</p>
                  </div>
                  <p className="text-slate-300 font-sans text-sm leading-relaxed text-left whitespace-pre-line">
                    {speaker.fullBio}
                  </p>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-200 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4"
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
