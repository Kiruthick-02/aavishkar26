import React from 'react';
import Image from 'next/image';

const AboutCit = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#020617]">
      {/* HUD Visor Background Wrapper */}
      <div className="relative w-full h-[600px] md:h-screen flex items-center justify-center bg-cover bg-center" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop')" }}>
        
        {/* Decorative HUD Scanline Overlay - Subtle gradient mimicry */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-transparent to-blue-900/60 pointer-events-none"></div>
        
        {/* Corner HUD Brackets */}
        <div className="absolute top-10 left-10 w-24 md:w-48 h-24 md:h-48 border-t-2 border-l-2 border-[#d4af37]/40 opacity-50 rounded-tl-3xl"></div>
        <div className="absolute top-10 right-10 w-24 md:w-48 h-24 md:h-48 border-t-2 border-r-2 border-[#d4af37]/40 opacity-50 rounded-tr-3xl"></div>
        <div className="absolute bottom-10 left-10 w-24 md:w-48 h-24 md:h-48 border-b-2 border-l-2 border-[#d4af37]/40 opacity-50 rounded-bl-3xl"></div>
        <div className="absolute bottom-10 right-10 w-24 md:w-48 h-24 md:h-48 border-b-2 border-r-2 border-[#d4af37]/40 opacity-50 rounded-br-3xl"></div>

        {/* System Status Indicators (Desktop Only) */}
        <div className="absolute hidden lg:block top-32 left-[18%] text-[#d4af37] font-mono z-30">
          <div className="border border-[#d4af37]/40 px-3 py-1 bg-blue-950/60 backdrop-blur-md rounded-lg">
            <div className="text-[10px] opacity-70 tracking-widest leading-none">SECTOR</div>
            <div className="text-[12px] mt-1 font-bold leading-none uppercase tracking-widest">Innovation Hub</div>
          </div>
        </div>

        <div className="absolute hidden lg:block top-32 right-[18%] text-[#d4af37] font-mono z-30">
          <div className="border border-[#d4af37]/40 px-3 py-1 bg-blue-950/60 backdrop-blur-md rounded-lg">
            <div className="text-[10px] opacity-70 tracking-widest leading-none">STATUS</div>
            <div className="text-[12px] mt-1 font-bold leading-none">ONLINE</div>
          </div>
        </div>

        {/* Central HUD Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-6 md:px-20 py-12">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#d4af37] to-white font-display tracking-tight mb-4 uppercase drop-shadow-[0_10px_30px_rgba(212,175,55,0.3)]">
              ABOUT CIT
            </h2>
            <div className="flex items-center justify-center gap-2 text-[10px] md:text-sm text-blue-300 font-mono tracking-[0.4em] uppercase">
              <span className="w-2 h-4 bg-[#d4af37] inline-block animate-pulse"></span>
              INSTITUTIONAL DATA ACCESS GRANTED
            </div>
          </div>

          {/* Main Info Block */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 max-w-7xl w-full">
            
            {/* Campus Image Inset */}
            <div className="relative w-full md:w-[450px] h-[280px] rounded-3xl overflow-hidden border border-[#d4af37]/30 flex-shrink-0 group shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay z-10"></div>
              <Image 
                src="/images/citcampus.jpg"
                alt="CIT Campus"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 450px"
              />
              {/* Image Scanning Effect */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#d4af37]/80 shadow-[0_0_15px_#d4af37] animate-scanline z-20"></div>
            </div>

            {/* Description Text */}
            <div className="relative text-blue-50 text-base md:text-lg leading-relaxed font-sans text-center md:text-left max-w-3xl px-4">
              <p className="drop-shadow-sm font-medium opacity-90">
                Coimbatore Institute of Technology (CIT) is a premier institution dedicated to excellence in technical education and research. Since its inception, CIT has been at the forefront of innovation, nurturing thousands of engineers and technocrats who lead global industries today. With state-of-the-art laboratories, a vibrant academic culture, and a legacy of quality, CIT remains a beacon of progress in the engineering landscape. AAVISHKAR is our way of celebrating this spirit, bringing together the brightest minds to invent, disrupt, and redefine the future.
              </p>
            </div>
          </div>

          {/* Bottom decorative element */}
          <div className="mt-12 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default AboutCit;