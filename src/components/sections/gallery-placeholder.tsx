import React from 'react';

const GalleryPlaceholder: React.FC = () => {
  return (
    <section 
      className="relative w-full h-[600px] flex flex-col items-center justify-center overflow-hidden bg-[#020617]"
      aria-label="Gallery Initialization"
    >
      {/* Background Decorative Element */}
      <h2 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        font-display text-[8rem] md:text-[12rem] font-black tracking-[0.2em]
        text-white/5 select-none pointer-events-none blur-[2px] uppercase"
      >
        ARCHIVE
      </h2>

      {/* Central Loading Animation */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">

          {/* Outer dashed rotating ring */}
          <div
            className="absolute inset-0 rounded-full border border-blue-400/20 animate-[spin_15s_linear_infinite]"
            style={{ borderStyle: 'dashed' }}
          />

          {/* Middle ring */}
          <div className="absolute inset-4 rounded-full border border-[#d4af37]/20" />

          {/* Inner glowing ring */}
          <div className="absolute inset-8 rounded-full border-2 border-blue-500/30
            shadow-[0_0_30px_rgba(29,78,216,0.3)] animate-pulse" />

          {/* Central planet orb */}
          <div className="relative w-12 h-12 md:w-16 md:h-16 rounded-full
            bg-gradient-to-br from-blue-400 to-blue-800
            shadow-[0_0_50px_rgba(29,78,216,0.6)]
            border border-white/10"
          >
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2
              bg-white/20 rounded-full blur-sm" />
          </div>

          {/* Orbital rings */}
          <div className="absolute w-[120%] h-[120%] rounded-full border border-blue-400/10 rotate-45 scale-90" />
          <div className="absolute w-[140%] h-[140%] rounded-full border border-blue-400/5 -rotate-12" />
        </div>

        {/* Status */}
        <div className="mt-12 flex flex-col items-center gap-2">
          <p className="font-mono text-sm md:text-base tracking-[0.4em]
            text-[#d4af37]/80 uppercase">
            Syncing Visual Database
            <span className="animate-pulse">...</span>
          </p>

          {/* Progress dots */}
          <div className="flex gap-2 mt-2">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-[bounce_1s_infinite_0ms]" />
            <span className="w-2 h-2 rounded-full bg-[#d4af37]/60 animate-[bounce_1s_infinite_200ms]" />
            <span className="w-2 h-2 rounded-full bg-[#d4af37]/30 animate-[bounce_1s_infinite_400ms]" />
          </div>
        </div>
      </div>

      {/* HUD Corners */}
      <div className="absolute top-12 left-12 w-24 h-24 border-t border-l border-[#d4af37]/20 opacity-40" />
      <div className="absolute bottom-12 right-12 w-24 h-24 border-b border-r border-[#d4af37]/20 opacity-40" />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-40
        bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%),
        linear-gradient(90deg,rgba(0,0,255,0.04),rgba(255,255,255,0.01),rgba(0,0,255,0.04))]
        bg-[length:100%_4px,3px_100%]"
      />
    </section>
  );
};

export default GalleryPlaceholder;
