import React from 'react';
import Image from 'next/image';

const ExperienceAavishkar = () => {
  return (
    <section className="relative w-full py-20 px-4 md:px-12 bg-[#020617] overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
        <div className="relative w-48 h-48 md:w-56 md:h-56">
          {/* Blue/Gold Themed Astronaut Mascot Replacement - using section assets but tinting logic in mind */}
          <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-110">
            <Image
              src="/images/images1.jpg"
              alt="Anokha Mascot"
              className="object-contain filter brightness-110 saturate-150 grayscale-[0.2]"
              fill
              sizes="(max-width: 768px) 192px, 224px"
            />
            {/* Pulsing Glow Aura */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl -z-10 animate-pulse-orbital"></div>
          </div>
        </div>

        <div className="text-center md:text-left">
          <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white flex flex-wrap justify-center md:justify-start gap-x-4 items-baseline">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-cyan-400">aavishkar</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-sans text-sm md:text-lg tracking-wide">
            Discover the diverse facets of our tech extravaganza
          </p>
          
          {/* Carousel Indicators Replacement (Static) */}
          <div className="flex gap-2 justify-center md:justify-start mt-6">
            <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_#d4af37]"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
            <div className="w-3 h-3 rounded-full bg-slate-700"></div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6 items-stretch">
        
        {/* Events and Workshops Card */}
        <div className="lg:col-span-3 cyber-frame glass-morphism p-8 rounded-[24px] border-blue-400/30 group hover:border-accent transition-all duration-300">
          {/* HUD Accents (Top/Bottom Corners provided by globals.css cyber-frame) */}
          <h3 className="font-display text-2xl font-bold text-white mb-6">Events and Workshops</h3>
          <p className="font-sans text-sm leading-relaxed text-slate-300">
            Embark on a valuable journey with our diverse workshops and events. We offer a lively atmosphere that encourages continuous learning, shifting participants from passive observers to active explorers. Unite technical expertise with engaging experiences in our programming language events. Explore the captivating realms of coding and current market trends through activities like coding challenges and interactive games. This balanced blend ensures a well-rounded and fulfilling experience for everyone involved.
          </p>
        </div>

        {/* Dynamic Image Grid */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="relative w-full h-[300px] rounded-[24px] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
            <Image
              src="/images/citcampus.jpg"
              alt="Drone Event"
              className="object-cover"
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent pointer-events-none"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 flex-grow">
            <div className="relative h-full min-h-[180px] rounded-[24px] overflow-hidden border-2 border-blue-400/20 group hover:border-accent transition-colors duration-300">
              <Image
                src="/images/aavishkar24.png"
                alt="Workshop Session"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                fill
                sizes="(max-width: 1024px) 50vw, 200px"
              />
            </div>
            <div className="relative h-full min-h-[180px] rounded-[24px] overflow-hidden border-2 border-blue-400/20 group hover:border-accent transition-colors duration-300">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5cb9fc4f-6bef-4623-93a4-7e129d421775-anokha-amrita-edu/assets/images/7r8gQN5-25.jpg"
                alt="Tech Fair Discussion"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                fill
                sizes="(max-width: 1024px) 50vw, 200px"
              />
            </div>
          </div>
        </div>

        {/* Techfair Card */}
        <div className="lg:col-span-3 cyber-frame glass-morphism p-8 rounded-[24px] border-blue-400/30 group hover:border-accent transition-all duration-300">
          <h3 className="font-display text-2xl font-bold text-white mb-6">Techfair</h3>
          <p className="font-sans text-sm leading-relaxed text-slate-300">
            Tech Fair serves as a unifying platform, bringing students from various universities nationwide to showcase their creativity to industry experts. Recognized as a premier event for talent and innovation, this expansive fair provides a stage for diverse talents to shine. Beyond showcasing skills, Tech Fair stands as a clear testament to the collaboration between academia and industry, where students not only display technical skills but also gain valuable insights for their professional journey. It represents a unique blend of teamwork and creativity.
          </p>
        </div>

      </div>

      {/* Decorative HUD Details */}
      <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
        <div className="text-[10px] font-mono text-cyan-400 space-y-1">
          <div>DATA_COLLECTION_STATUS: ACTIVE</div>
          <div>COORDINATES: 11.0123 N, 76.9356 E</div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-cyan-400"></div>
            <div className="w-1 h-1 bg-cyan-400"></div>
            <div className="w-1 h-1 bg-cyan-400/30"></div>
            <div className="w-4 h-1 bg-accent/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceAavishkar;