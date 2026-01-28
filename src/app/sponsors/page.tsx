'use client';

import { motion } from 'framer-motion';
import { 
  Zap, Sparkles, GraduationCap, Users, Heart, ShieldCheck, 
  Globe, Wallet, Building2, Briefcase, CheckCircle2, ChevronRight,
  Phone, Mail, Instagram 
} from 'lucide-react';

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-[#020617] py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#ea580c]/10 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ================= HEADER SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/20 text-[10px] font-mono font-bold text-[#ea580c] tracking-[0.4em] uppercase mb-6">
             <Zap className="w-3 h-3 fill-[#ea580c]" /> Benefactor_Protocol
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-display text-white mb-6 tracking-tighter uppercase italic leading-none">
            OUR <span className="text-[#ea580c]">SUPPORTERS</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold">
            <Sparkles className="w-4 h-4" />
            Empowering the Next Generation of Engineers
          </div>
        </motion.div>

        {/* ================= SPONSOR 1: CIT ALUMNI ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] bg-white/[0.02] border border-white/10 p-8 md:p-16 backdrop-blur-3xl overflow-hidden shadow-2xl mb-32"
        >
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#ea580c]/40 rounded-tl-3xl" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#ea580c]/40 rounded-br-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 relative group">
              <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] border border-white/10 shadow-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2670&auto=format&fit=crop" 
                  alt="CIT Campus Legacy"
                  className="h-full w-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-8 left-8 right-8 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
                   <p className="text-[10px] font-mono text-cyan-400 uppercase mb-1 tracking-widest">Legacy Provider</p>
                   <p className="text-white font-bold text-lg">CIT Chemical Engineering Alumni</p>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#ea580c] flex items-center justify-center shadow-[0_0_40px_rgba(234,88,12,0.4)] border-4 border-[#020617] z-20">
                <GraduationCap size={40} className="text-white" />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase italic tracking-tighter">
                  CIT Alumni – <span className="text-[#ea580c]">The Pillars</span>
                </h2>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Strong Pillar of Guidance & Inspiration</p>
              </div>
              <div className="space-y-6 text-slate-400 font-sans text-base leading-relaxed">
                <p>Contribution towards the growth and success of Aavishkar’26. Empowering students through innovative events, technical competitions, and professional excellence.</p>
                <p className="border-l-4 border-[#ea580c] pl-6 italic text-white/90 bg-white/5 py-4 rounded-r-2xl">"Together, we build a stronger legacy of excellence in Chemical Engineering."</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["Industry & Research Support", "Commitment to Talent", "Innovative Workshops", "Professional Excellence"].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <ShieldCheck size={18} className="text-[#ea580c]" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= SPONSOR 2: TAMIL OVERSEAS (ORANGE THEME) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] bg-white/[0.02] border border-[#ea580c]/20 p-8 md:p-16 backdrop-blur-3xl overflow-hidden shadow-2xl mb-32"
        >
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-r-2 border-[#ea580c]/40 rounded-tr-3xl" />
          <div className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-[#ea580c]/40 rounded-bl-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Content Side */}
            <div className="lg:col-span-7 space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Globe className="text-[#ea580c]" size={32} />
                  <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase italic tracking-tighter">
                    Tamil <span className="text-[#ea580c]">Overseas</span>
                  </h2>
                </div>
                <p className="text-xs font-mono text-[#ea580c] uppercase tracking-[0.3em]">Education Consultancy | UK · Dubai · India</p>
              </div>

              <p className="text-slate-400 font-sans text-base leading-relaxed">
                A trusted global partner for education opportunities. Guiding your future beyond borders with 1000+ success stories and official tie-ups with 30+ world-class UK universities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { icon: Wallet, label: "Loan Assistance", color: "text-green-400" },
                  { icon: Building2, label: "UK Accommodation", color: "text-[#ea580c]" },
                  { icon: Briefcase, label: "Job References", color: "text-purple-400" },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#ea580c]/5 border border-[#ea580c]/10 text-center flex flex-col items-center gap-2">
                    <item.icon size={20} className={item.color} />
                    <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 bg-white/5 p-6 rounded-[32px] border border-white/5">
                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <ShieldCheck size={14} className="text-[#ea580c]" /> Professional Support Matrix
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6 text-[11px] font-bold text-slate-300 uppercase tracking-tight">
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#ea580c]"/> A-Z Application Guidance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#ea580c]"/> Scholarship up to £5,000</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#ea580c]"/> VISA Processing Assistance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#ea580c]"/> Post-Study VISA Renewal</li>
                </ul>
              </div>
            </div>

            {/* Visual Side & Contact Card */}
            <div className="lg:col-span-5 relative group order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] border border-[#ea580c]/20 shadow-3xl bg-white flex items-center justify-center p-8">
                
                {/* Logo Container */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <img 
                    src="/images/tamil-overseas-logo.png" 
                    alt="Tamil Overseas Logo"
                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-[#ea580c]/20 via-transparent to-transparent opacity-60 pointer-events-none" />
                
                {/* Floating Contact Card (Unified Orange) */}
                <div className="absolute bottom-4 left-4 right-4 p-6 rounded-[32px] bg-[#ea580c]/95 border border-white/20 backdrop-blur-xl shadow-2xl">
                   <p className="text-[9px] font-mono text-white/70 uppercase mb-4 tracking-[0.2em] border-b border-white/10 pb-2">Connect with Entity</p>
                   
                   <div className="space-y-3">
                     <div className="flex items-center gap-3">
                        <Phone size={14} className="text-white" />
                        <div className="flex flex-col">
                           <p className="text-white font-black text-[11px] tracking-tight">+91 93618 70904</p>
                           <p className="text-white font-black text-[11px] tracking-tight">+44 74055 45086</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <Mail size={14} className="text-white" />
                        <p className="text-white/90 font-mono text-[10px] break-all">info@tamiloverseas.com</p>
                     </div>
                     <div className="flex items-center gap-3">
                        <Globe size={14} className="text-white" />
                        <p className="text-white/90 font-mono text-[10px]">www.tamiloverseas.com</p>
                     </div>
                     <div className="flex items-center gap-3">
                        <Instagram size={14} className="text-white" />
                        <p className="text-white/90 font-mono text-[10px]">@tamiloverseas001</p>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= FOOTER CTA ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-40 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-widest">
              Building a stronger legacy of <span className="text-[#ea580c]">excellence</span>
            </h3>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em]">
              AAVISHKAR'26 · SYNERGY THROUGH PARTNERSHIP
            </p>
          </div>
        </motion.div>
      </div>

      {/* Static Overlay Scanlines */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
    </div>
  );
}