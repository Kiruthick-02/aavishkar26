'use client';

import { motion } from 'framer-motion';
import { 
  Zap, Sparkles, GraduationCap, Users, Heart, ShieldCheck, 
  Globe, Wallet, Building2, Briefcase, CheckCircle2,
  Phone, Mail, Instagram, Target, Leaf
} from 'lucide-react';

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-[#020617] py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* ================= BACKGROUND DECORATION ================= */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/20 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-[#ea580c]/10 rounded-full blur-[80px] md:blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* ================= HEADER SECTION ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ea580c]/10 border border-[#ea580c]/20 text-[10px] font-mono font-bold text-[#ea580c] tracking-[0.4em] uppercase mb-6">
             <Zap className="w-3 h-3 fill-[#ea580c]" /> Benefactor_Protocol
          </div>
          <h1 className="text-4xl md:text-8xl font-black font-display text-white mb-6 tracking-tighter uppercase italic leading-none">
            OUR <span className="text-[#ea580c]">SUPPORTERS</span>
          </h1>
          <div className="flex items-center justify-center gap-3 text-[10px] font-mono tracking-[0.4em] text-cyan-400 uppercase font-bold">
            <Sparkles className="w-4 h-4" />
            Empowering Technical Excellence
          </div>
        </motion.div>

        {/* ================= SPONSOR 1: CIT ALUMNI ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] md:rounded-[48px] bg-white/[0.02] border border-white/10 p-6 md:p-16 backdrop-blur-3xl overflow-hidden shadow-2xl mb-20 md:mb-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Left: Image */}
            <div className="lg:col-span-5 relative group order-1">
              <div className="relative overflow-hidden rounded-[30px] md:rounded-[40px] aspect-[4/5] border border-white/10 shadow-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2670&auto=format&fit=crop" 
                  alt="CIT Campus"
                  className="h-full w-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
                   <p className="text-[9px] font-mono text-cyan-400 uppercase mb-1 tracking-widest text-center md:text-left">Legacy Provider</p>
                   <p className="text-white font-bold text-base md:text-lg text-center md:text-left">CIT Chemical Engineering Alumni</p>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 order-2">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase italic tracking-tighter">
                  CIT Alumni – <span className="text-[#ea580c]">The Pillars</span>
                </h2>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Strong Pillar of Guidance & Inspiration</p>
              </div>
              <p className="text-slate-400 font-sans text-sm md:text-base leading-relaxed">
                Contributing towards the growth and success of Aavishkar’26. Empowering students through innovative events, technical competitions, and professional excellence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {["Industry & Research Support", "Commitment to Talent"].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10">
                    <ShieldCheck size={18} className="text-[#ea580c]" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= SPONSOR 2: PRAGNA CONSULTANTS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] md:rounded-[48px] bg-white/[0.02] border border-white/10 p-6 md:p-16 backdrop-blur-3xl overflow-hidden shadow-2xl mb-20 md:mb-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            <div className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <Target className="text-[#ea580c]" size={28} />
                  <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase italic tracking-tighter">
                    Pragna <span className="text-[#ea580c]">Consultants</span>
                  </h2>
                </div>
                <p className="text-xs font-mono text-[#ea580c] uppercase tracking-[0.3em] text-center lg:text-left">Leading to Wisdom</p>
              </div>
              <p className="text-slate-400 font-sans text-sm md:text-base leading-relaxed text-center lg:text-left">
                Pragna Consultants Private Limited is a multidisciplinary consulting firm delivering integrated solutions in Risk Management, Project HSE Studies, Environmental Services, Business Excellence, and ESG & sustainability advisory, supported through its Centre for Sustainable Business Excellence. The company offers comprehensive services including ESG and sustainability reporting, regulatory and statutory compliance, environmental and social impact assessments, safety audits, HAZID, HAZOP, QRA, emergency response planning, and risk-based studies across the entire project lifecycle. It offers world-class training solutions for Six Sigma GB/BB certification and consulting solutions for breakthrough improvements, thereby promoting best practices in governance, operational efficiency, and sustainability integration, enabling organizations to strengthen compliance, mitigate risks, enhance stakeholder confidence, and achieve long-term sustainable and responsible growth.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {["Risk & HSE", "ESG & Sustainability", "Business Excellence", "Six Sigma Training"].map((text, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10">
                    <Leaf size={18} className="text-[#ea580c]" />
                    <span className="text-[10px] font-bold text-white uppercase tracking-widest">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative group order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[30px] md:rounded-[40px] aspect-[1/1] md:aspect-[4/5] border border-white/10 shadow-3xl bg-white flex items-center justify-center p-8 md:p-12">
                <img
                  src="/images/pragna-consultants-logo.png"
                  alt="Pragna Consultants - Leading to Wisdom"
                  className="max-w-[90%] max-h-[80%] object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= SPONSOR 3: TAMIL OVERSEAS (MOBILE FIX) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[32px] md:rounded-[48px] bg-white/[0.02] border border-[#ea580c]/20 p-6 md:p-16 backdrop-blur-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Content Side */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-1">
              <div className="space-y-4">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                  <Globe className="text-[#ea580c]" size={28} />
                  <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase italic tracking-tighter">
                    Tamil <span className="text-[#ea580c]">Overseas</span>
                  </h2>
                </div>
                <p className="text-xs font-mono text-[#ea580c] uppercase tracking-[0.3em] text-center lg:text-left">Global Education Consultancy</p>
              </div>

              <p className="text-slate-400 font-sans text-sm md:text-base leading-relaxed text-center lg:text-left">
                Tamil Overseas Educational Consultancy is a trusted UK-focused study abroad consultancy dedicated to guiding students to study, work, and settle in the United Kingdom. With 1,000+ successful student journeys in the past five years, direct tie-ups with 30+ leading UK universities, and 7 branches across Tamil Nadu, London, and Dubai, we deliver reliable, transparent, and result-driven services. From free counselling and university admissions to visa processing, financial guidance, accommodation, part-time job support, and post-study settlement, they provide complete end-to-end support in both India and the UK, ensuring every student experiences a smooth, affordable, and stress-free UK education journey.
              </p>

              <div className="hidden md:grid grid-cols-3 gap-4">
                {[{ icon: Wallet, label: "Loans" }, { icon: Building2, label: "Housing" }, { icon: Briefcase, label: "Jobs" }].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#ea580c]/5 border border-[#ea580c]/10 text-center flex flex-col items-center gap-2">
                    <item.icon size={20} className="text-[#ea580c]" />
                    <span className="text-[10px] font-bold text-white uppercase">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4 bg-white/5 p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/5">
                <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2 flex items-center justify-center lg:justify-start gap-2">
                   <ShieldCheck size={14} className="text-[#ea580c]" /> Support Matrix
                </h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-[10px] md:text-[11px] font-bold text-slate-300 uppercase">
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#ea580c]"/> VISA Processing</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#ea580c]"/> Scholarship Guidance</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#ea580c]"/> Post-Study PR Support</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#ea580c]"/> University Admissions</li>
                </ul>
              </div>
            </div>

            {/* Visual Side & Contact (Improved for Mobile) */}
            <div className="lg:col-span-5 relative group order-1 lg:order-2">
              <div className="relative overflow-hidden rounded-[30px] md:rounded-[40px] aspect-[1/1] md:aspect-[4/5] border border-[#ea580c]/20 shadow-3xl bg-white flex items-center justify-center p-6 md:p-12">
                <img 
                  src="/images/tamil-overseas-logo.png" 
                  alt="Tamil Overseas Logo"
                  className="max-w-[80%] max-h-[60%] object-contain"
                />
                
                {/* Contact Overlay - Now optimized for touch and visibility */}
                <div className="absolute bottom-4 left-4 right-4 p-4 md:p-6 rounded-[24px] md:rounded-[32px] bg-[#ea580c] border border-white/20 shadow-2xl">
                   <div className="space-y-2 md:space-y-3">
                     <div className="flex items-center gap-3">
                        <Phone size={14} className="text-white shrink-0" />
                        <p className="text-white font-black text-[10px] md:text-xs">+91 93618 70904 | +44 74055 45086</p>
                     </div>
                     <div className="flex items-center gap-3 overflow-hidden">
                        <Mail size={14} className="text-white shrink-0" />
                        <p className="text-white/90 font-mono text-[9px] md:text-[10px] truncate">info@tamiloverseas.com</p>
                     </div>
                     <div className="flex items-center gap-3">
                        <Instagram size={14} className="text-white shrink-0" />
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
          className="mt-20 md:mt-40 text-center pb-20"
        >
          <div className="max-w-2xl mx-auto space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl font-display font-black text-white uppercase italic tracking-widest">
              Legacy of <span className="text-[#ea580c]">Excellence</span>
            </h3>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-slate-500 font-mono text-[9px] md:text-xs uppercase tracking-[0.4em]">
              AAVISHKAR'26 · Chemical Engineering Dept
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}