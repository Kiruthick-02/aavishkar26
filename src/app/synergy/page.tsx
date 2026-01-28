'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { BookOpen, Users, Lightbulb, Zap, GraduationCap, Microscope, Sparkles, Brain } from 'lucide-react';

export default function SynergyPage() {
  
  const importancePoints = [
    {
      title: "Culture of Learning",
      desc: "Fostering a culture of scientific curiosity and collaboration within the Chemical Engineering community.",
      icon: Brain,
      color: "text-blue-400"
    },
    {
      title: "Research Showcase",
      desc: "A dedicated platform for students and faculty to highlight research ideas and technological breakthroughs.",
      icon: Microscope,
      color: "text-[#EAB308]"
    },
    {
      title: "Knowledge Sharing",
      desc: "Encouraging critical thinking and keeping readers updated on emerging trends beyond the classroom.",
      icon: Lightbulb,
      color: "text-cyan-400"
    },
    {
      title: "Professional Identity",
      desc: "Bridging theory with real-world applications to enhance the department's academic and professional identity.",
      icon: GraduationCap,
      color: "text-[#ea580c]"
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#EAB308]/10 rounded-full blur-[160px]" />
      </div>

      <div className="mx-auto max-w-7xl relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-32"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAB308]/10 border border-[#EAB308]/20 text-[10px] font-mono font-bold text-[#EAB308] tracking-[0.4em] uppercase mb-6">
             <Zap className="w-3 h-3 fill-[#EAB308]" /> Flagship_Journal_Protocol
          </div>
          <h1 className="text-5xl md:text-8xl font-black font-display text-white mb-6 tracking-tighter uppercase italic leading-none">
            SYN<span className="text-[#EAB308]">ERGY</span>
          </h1>
          <p className="text-slate-400 font-sans text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed italic">
            "Bridges academic excellence with real-world relevance. Curated with passion and precision."
          </p>
        </motion.div>

        {/* Content Section from PDF */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-40">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-bold font-display text-white uppercase tracking-tight">The Vision of <span className="text-[#EAB308]">Synergy</span></h2>
              <div className="h-1 w-20 bg-[#EAB308] rounded-full" />
            </div>
            <p className="text-lg text-slate-300 leading-relaxed font-sans">
              Synergy is the flagship journal of the Chemical Engineering Department, Coimbatore Institute of Technology. 
              It serves as a vibrant platform that brings together innovation, insight, and inspiration. 
              Featuring recent advancements, thought-provoking articles, and student contributions, Synergy 
              reflects the department’s spirit of curiosity and excellence.
            </p>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md italic text-[#EAB308] border-l-4 border-l-[#EAB308]">
              "A proud showcase of the best ideas, breakthroughs, and creative minds in chemical engineering."
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-[#EAB308]/20 blur-[80px] rounded-full group-hover:bg-[#EAB308]/30 transition-all" />
            <div className="relative rounded-[40px] border border-white/10 bg-white/5 p-4 overflow-hidden shadow-2xl">
               <div className="relative h-[400px] w-full rounded-[30px] overflow-hidden">
                  <Image 
                    src="/images/synergy-2025.jpg" 
                    alt="Synergy Launch" 
                    fill 
                    className="object-cover group-hover:scale-105 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
               </div>
            </div>
          </motion.div>
        </div>

        {/* Importance Grid */}
        <div className="mb-40">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold font-display text-white uppercase italic">Core <span className="text-[#EAB308]">Objectives</span></h2>
              <p className="text-slate-500 font-mono text-xs tracking-widest uppercase">The Importance of Synergy</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {importancePoints.map((point, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-8 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-[#EAB308]/50 transition-all group"
                >
                  <point.icon className={`w-12 h-12 mb-6 ${point.color} group-hover:scale-110 transition-transform`} />
                  <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-tight">{point.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{point.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Launch Timeline Archive */}
        <div className="space-y-16">
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black font-display text-white uppercase tracking-tighter italic whitespace-nowrap">Legacy <span className="text-[#EAB308]">Archive</span></h2>
            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* 2024 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black font-display text-white/10 tracking-tighter">2024</span>
                <div className="h-1 w-12 bg-blue-500 rounded-full" />
              </div>
              <div className="relative h-[350px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-xl group">
                <Image src="/images/synergy-2024.jpg" alt="Synergy 2024" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div className="absolute inset-0 bg-blue-600/10 group-hover:opacity-0 transition-opacity" />
              </div>
            </motion.div>

            {/* 2025 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <span className="text-5xl font-black font-display text-[#EAB308]/10 tracking-tighter">2025</span>
                <div className="h-1 w-12 bg-[#EAB308] rounded-full" />
              </div>
              <div className="relative h-[350px] w-full rounded-3xl overflow-hidden border border-[#EAB308]/20 shadow-xl group">
                <Image src="/images/synergy-2025.jpg" alt="Synergy 2025" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#EAB308]/5 group-hover:opacity-0 transition-opacity" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
    </div>
  );
}