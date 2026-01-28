'use client';

import { motion } from 'framer-motion';
import { Zap, Sparkles, GraduationCap, Users, Heart, ShieldCheck } from 'lucide-react';

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

        {/* ================= ALUMNI MAIN FEATURE ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] bg-white/[0.02] border border-white/10 p-8 md:p-16 backdrop-blur-3xl overflow-hidden shadow-2xl"
        >
          {/* HUD Decorative Brackets */}
          <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-[#ea580c]/40 rounded-tl-3xl" />
          <div className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-[#ea580c]/40 rounded-br-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Image / Visual Side */}
            <div className="lg:col-span-5 relative group">
              <div className="relative overflow-hidden rounded-[40px] aspect-[4/5] border border-white/10 shadow-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2670&auto=format&fit=crop" 
                  alt="CIT Campus Legacy"
                  className="h-full w-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-90" />
                
                {/* Floating Stats Overlay */}
                <div className="absolute bottom-8 left-8 right-8 space-y-4">
                  <div className="p-4 rounded-2xl bg-black/60 border border-white/10 backdrop-blur-md">
                     <p className="text-[10px] font-mono text-cyan-400 uppercase mb-1 tracking-widest">Legacy Provider</p>
                     <p className="text-white font-bold text-lg">CIT Chemical Engineering Alumni</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#ea580c] flex items-center justify-center shadow-[0_0_40px_rgba(234,88,12,0.4)] border-4 border-[#020617] z-20 animate-pulse">
                <GraduationCap size={40} className="text-white" />
              </div>
            </div>

            {/* Right: Content Side */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black font-display text-white uppercase italic tracking-tighter">
                  CIT Alumni – <span className="text-[#ea580c]">The Pillars</span>
                </h2>
                <p className="text-xs font-mono text-slate-500 uppercase tracking-[0.3em]">Supporting Aavishkar’26</p>
              </div>

              <div className="space-y-6 text-slate-400 font-sans text-base md:text-lg leading-relaxed">
                <p>
                  The alumni of the Chemical Engineering Department, Coimbatore Institute of Technology, have always been a strong pillar of guidance, inspiration, and support for the student community.
                </p>
                <p>
                  For Aavishkar’26, the alumni extend their wholehearted support by contributing towards the growth and success of this technical fest. This contribution empowers students to organize innovative events, technical competitions, and knowledge-sharing platforms.
                </p>
                <p className="border-l-4 border-[#ea580c] pl-6 italic text-white/90 bg-white/5 py-4 rounded-r-2xl">
                  "This fund-raising initiative not only strengthens the bond between alumni and students but also reflects the alumni’s commitment to nurturing talent and encouraging innovation."
                </p>
              </div>

              {/* Bullet Points */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {[
                  { icon: ShieldCheck, text: "Industry & Research Support" },
                  { icon: Users, text: "Strengthening Student Bonds" },
                  { icon: Heart, text: "Commitment to Talent" },
                  { icon: Zap, text: "Empowering Innovation" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10 group hover:border-[#ea580c]/50 transition-colors">
                    <item.icon size={18} className="text-[#ea580c]" />
                    <span className="text-xs font-bold text-white uppercase tracking-widest">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CALL TO ACTION ================= */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <div className="max-w-2xl mx-auto space-y-8">
            <h3 className="text-2xl font-display font-black text-white uppercase italic tracking-widest">
              Building a stronger legacy of <span className="text-[#ea580c]">excellence</span>
            </h3>
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <p className="text-slate-500 font-mono text-xs uppercase tracking-[0.4em]">
              Together, we shape the future of Chemical Engineering
            </p>
          </div>
        </motion.div>
      </div>

      {/* Static Overlay Scanlines */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
    </div>
  );
}