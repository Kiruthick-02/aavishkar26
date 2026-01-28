import React from "react";
import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#020617] flex items-center justify-center pt-20"
      aria-label="Hero Section"
    >
      {/* ================= BACKGROUND ORB ================= */}
      {/* Centered perfectly behind the text on all screens */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="group relative h-[300px] w-[300px] md:h-[600px] md:w-[600px] transition-all duration-700">
          
          {/* ===== DIFFUSED OUTER GLOW ===== */}
          <div className="absolute -inset-8 md:-inset-12 rounded-full bg-cyan-400/20 blur-2xl md:blur-3xl animate-orb-rotate animate-orb-pulse" />

          {/* ===== ELECTRIC ARC RING ===== */}
          <div className="absolute -inset-4 md:-inset-6 rounded-full animate-spin-slow">
            <span className="electric-arc arc-1 opacity-50 md:opacity-100" />
            <span className="electric-arc arc-2 opacity-50 md:opacity-100" />
          </div>

          {/* ===== SOFT RING EDGE ===== */}
          <div className="absolute -inset-2 md:-inset-4 rounded-full border border-cyan-300/30 shadow-[0_0_30px_rgba(34,211,238,0.2)]" />

          {/* ===== MAIN SPHERE ===== */}
          <div className="absolute inset-0 overflow-hidden rounded-full bg-[#1e40af]/80 shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.8),inset_10px_10px_30px_rgba(34,211,238,0.3)]">
            <div className="absolute left-1/4 top-1/4 h-8 w-8 rounded-full bg-cyan-400/10 blur-md animate-float" />
            <div className="absolute bottom-1/4 right-1/3 h-20 w-20 rounded-full bg-black/20 blur-xl animate-float" />
          </div>
        </div>
      </div>

      {/* ================= TOP HUD (Adjusted for mobile spacing) ================= */}
      <div className="pointer-events-none absolute top-24 md:top-10 left-1/2 z-20 w-full -translate-x-1/2 text-center">
        <h2 className="text-[10px] font-bold tracking-[0.4em] text-cyan-400/80 uppercase drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">
          #DARETOBEDIFFERENT
        </h2>
      </div>

      <div className="pointer-events-none absolute top-32 md:top-24 left-1/2 z-20 -translate-x-1/2">
        <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md">
          <span className="text-sm md:text-xl font-bold tracking-[0.2em] text-white opacity-90 uppercase">
            AAVISHKAR'26
          </span>
        </div>
      </div>

      {/* ================= MAIN CONTENT (Fixed Font Sizes) ================= */}
      <div className="relative z-30 flex flex-col items-center justify-center px-6 text-center max-w-5xl">
        <div className="space-y-[-10px] md:space-y-[-30px]">
          <h1 className="select-none font-display text-[3rem] xs:text-[3.6rem] md:text-[7.5rem] font-black leading-none tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-blue-400 animate-orb-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
  AAVISHKAR
</h1>

<h1 className="select-none font-display text-[3rem] xs:text-[3.6rem] md:text-[7.5rem] font-black leading-none tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-blue-400 animate-orb-pulse drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
  2026
</h1>

        </div>

        <div className="mt-8 mb-12 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <div className="h-px w-8 md:w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <h2 className="text-sm md:text-2xl font-medium tracking-[0.1em] text-slate-200 uppercase font-mono italic">
              The Ultimate Tech Odyssey
            </h2>
            <div className="h-px w-8 md:w-20 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          </div>
        </div>

        {/* ================= CTA BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          
          <Link
            href="/tickets"
            className="group relative flex items-center justify-center rounded-full border border-[#ea580c]/50 bg-[#ea580c] px-8 py-4 text-sm md:text-lg font-black text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] transition-all hover:scale-105 active:scale-95 w-full sm:w-auto"
          >
            <Ticket className="mr-2 h-5 w-5 animate-pulse" />
            GET TICKETS
          </Link>

          <Link
            href="/events"
            className="group relative flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm md:text-lg font-bold text-white backdrop-blur-xl transition-all hover:bg-white/10 w-full sm:w-auto"
          >
            EXPLORE EVENTS
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
          </Link>
          
        </div>
      </div>

      {/* ================= HUD OVERLAY ================= */}
      <div className="pointer-events-none absolute inset-0 z-10 opacity-20">
        <div className="h-full w-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>

      {/* ================= BOTTOM VIGNETTE ================= */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-32 md:h-64 bg-gradient-to-t from-[#020617] to-transparent" />
    </section>
  );
};

export default HeroSection;