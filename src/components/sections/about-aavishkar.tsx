import React from 'react';
import Image from 'next/image';

const AboutAavishkar = () => {
  // Assets for corners and mascot
  const mascotImg = "/images/images.jpg"; // Original mascot
  
  // Note: The prompt asks to update mascot orange elements to blue and gold. 
  // Since we use the provided image asset, we'll apply a CSS filter to shift hues if needed, 
  // or focus on the requested background gradient shifts to blue.
  
  return (
    <section 
      id="about-section" 
      className="relative w-full overflow-hidden min-h-screen bg-[#020617] flex items-center" 
      aria-label="About Anokha Section"
    >
      {/* Background Gradients shifted to Dark Blues as requested */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]" />
      
      {/* Visual background layers from original structure */}
      <div className="absolute inset-0 z-10 opacity-20 pointer-events-none">
        <Image 
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5cb9fc4f-6bef-4623-93a4-7e129d421775-anokha-amrita-edu/assets/images/images_12.png" 
          alt="Background" 
          fill 
          className="object-cover"
          priority
        />
      </div>
      
      <div className="absolute inset-0 z-20 pointer-events-none opacity-30">
        <Image 
          src="/images/CIT_Main_Building.jpg" 
          alt="Foreground" 
          fill 
          className="object-cover"
        />
        {/* Transitioning through dark blues instead of black as requested */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0f172a]/40 to-[#020617]" />
      </div>

      <div className="container relative z-30 px-6 py-20 md:py-32">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Mascot Section */}
          <div className="z-50 order-2 md:order-1 flex justify-center md:justify-start -mb-16 md:-mb-40">
            <div className="relative w-full max-w-[500px] md:max-w-none group">
              <Image 
                src={mascotImg} 
                alt="Mascot" 
                width={700} 
                height={700} 
                className="w-full h-auto drop-shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-transform duration-700 hover:scale-105"
                style={{ 
                  // CSS filter to push towards blue/gold as requested
                  // A slight hue rotate and brightness/contrast shift
                  filter: 'hue-rotate(180deg) brightness(1.1) saturate(1.2)' 
                }}
              />
              {/* Blue Glow behind mascot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 blur-[120px] rounded-full -z-10 animate-pulse-orbital" />
            </div>
          </div>

          {/* Glassmorphism Text Box */}
          <div className="order-1 md:order-2">
            <div className="about_anokha relative max-w-2xl text-left p-8 md:p-14 backdrop-blur-2xl bg-white/5 border border-white/10 rounded-[2.5rem] shadow-2xl glass-morphism overflow-hidden group">
              {/* Decorative Corner Elements (Simulated as they are typical of sci-fi UI clones) */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-400/50 rounded-tl-3xl translate-x-4 translate-y-4" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-400/50 rounded-tr-3xl -translate-x-4 translate-y-4" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-400/50 rounded-bl-3xl translate-x-4 -translate-y-4" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-400/50 rounded-br-3xl -translate-x-4 -translate-y-4" />

              {/* Header */}
              <div className="mb-8">
                <span className="text-hud mb-2 block font-mono text-cyan-400">DATA_CORE: </span>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white font-display">
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-gold-metallic">aavishkar</span>
                </h2>
                <div className="h-1 w-20 bg-gradient-to-r from-blue-500 to-transparent mt-4 rounded-full" />
              </div>

              {/* Content body */}
              <p className="text-base md:text-xl text-slate-300 leading-relaxed font-sans font-light">
                Coimbatore institute of technology hosts Aavishkar, a lively tech extravaganza! 
                This dynamic 2-day event brings together students, professionals, and tech enthusiasts 
                from across the nation for exciting competitions, workshops, and interactive sessions 
                covering engineering, robotics, AI, and sustainable technologies.
              </p>
              
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-1 bg-blue-500/50" />
                  <div className="w-4 h-1 bg-cyan-400/50" />
                  <div className="w-2 h-1 bg-white/50" />
                </div>
                <span className="text-[10px] font-mono text-blue-400/60 uppercase tracking-widest">
                  aavishkarverse.sys // initialization active
                </span>
              </div>

              {/* Inner subtle glow that follows the cursor (static in CSS for clone) */}
              <div className="absolute -inset-px bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      {/* Background Bottom Mask */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020617] to-transparent z-30 pointer-events-none" />
    </section>
  );
};

export default AboutAavishkar;