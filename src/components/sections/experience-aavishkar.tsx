import React from 'react';
import Image from 'next/image';

const ExperienceAavishkar = () => {
  return (
    <section className="relative w-full py-20 px-4 md:px-12 bg-[#020617] overflow-hidden">
      
      {/* Simplified Section Header - Only Title */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight text-white uppercase italic">
          Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-cyan-400">aavishkar</span>
        </h2>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch">
        
        {/* Events and Workshops Card */}
        <div className="lg:col-span-3 cyber-frame glass-morphism p-8 rounded-[24px] border border-blue-400/30 group hover:border-blue-400 transition-all duration-300">
          <h3 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider text-blue-400">Events and Workshops</h3>
          <p className="font-sans text-sm leading-relaxed text-slate-300">
            Embark on a valuable journey with our diverse workshops and events. We offer a lively atmosphere that encourages continuous learning, shifting participants from passive observers to active explorers. Unite technical expertise with engaging experiences in our programming language events. Explore the captivating realms of coding and current market trends through activities like coding challenges and interactive games.
          </p>
        </div>

        {/* Dynamic Image Grid */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="relative w-full h-[300px] md:h-full rounded-[24px] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02] border border-white/10">
            <Image
              src="/images/citcampus.jpg"
              alt="Campus Event"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>

        {/* Techfair Card */}
        <div className="lg:col-span-3 cyber-frame glass-morphism p-8 rounded-[24px] border border-blue-400/30 group hover:border-blue-400 transition-all duration-300">
          <h3 className="font-display text-2xl font-bold text-white mb-6 uppercase tracking-wider text-blue-400">Techfair</h3>
          <p className="font-sans text-sm leading-relaxed text-slate-300">
            Tech Fair serves as a unifying platform, bringing students from various universities nationwide to showcase their creativity to industry experts. Recognized as a premier event for talent and innovation, this expansive fair provides a stage for diverse talents to shine. Beyond showcasing skills, Tech Fair stands as a clear testament to the collaboration between academia and industry.
          </p>
        </div>

      </div>

      {/* Decorative HUD Details */}
      <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
        <div className="text-[10px] font-mono text-cyan-400 space-y-1">
          <div>DATA_SYNC_STATUS: ACTIVE</div>
          <div>COORDINATES: 11.0123 N, 76.9356 E</div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-cyan-400"></div>
            <div className="w-1 h-1 bg-cyan-400"></div>
            <div className="w-1 h-1 bg-cyan-400/30"></div>
            <div className="w-4 h-1 bg-blue-500/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceAavishkar;