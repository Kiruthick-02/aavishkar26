import React from 'react';
import Image from 'next/image';

const SponsorMarquee = () => {
  // Provided asset: logo of the event
  const sponsorLogo = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5cb9fc4f-6bef-4623-93a4-7e129d421775-anokha-amrita-edu/assets/images/images_28.png";

  // Creating an array of 6 unique items to repeat for the infinite scroll
  // The design instructions ask for logos rendered in grayscale.
  const sponsors = [
    { id: 1, name: "Sponsor 1", src: sponsorLogo },
    { id: 2, name: "Sponsor 2", src: sponsorLogo },
    { id: 3, name: "Sponsor 3", src: sponsorLogo },
    { id: 4, name: "Sponsor 4", src: sponsorLogo },
    { id: 5, name: "Sponsor 5", src: sponsorLogo },
    { id: 6, name: "Sponsor 6", src: sponsorLogo },
  ];

  return (
    <section 
      className="relative w-full overflow-hidden backdrop-blur-xl bg-white/5 py-4 border-y border-white/10" 
      aria-label="Sponsor Marquee"
    >
      <div className="relative">
        {/* Left Fading Edge */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"
          style={{ opacity: 0.8 }}
        ></div>
        
        {/* Right Fading Edge */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"
          style={{ opacity: 0.8 }}
        ></div>

        {/* Marquee Container */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex animate-marquee gap-12 md:gap-16 items-center py-2 h-16 md:h-24">
            {/* First Set of Logos */}
            {[...sponsors, ...sponsors].map((sponsor, idx) => (
              <div 
                key={`${sponsor.id}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center w-32 md:w-40 h-full px-4"
              >
                <div className="relative w-full h-[30px] md:h-[50px] transition-all duration-300 filter grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0">
                  <Image
                    alt={sponsor.name}
                    src={sponsor.src}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 120px, 160px"
                    priority={idx < 6}
                  />
                </div>
              </div>
            ))}
            {/* Second Set of Logos for Seamless Loop */}
            {[...sponsors, ...sponsors].map((sponsor, idx) => (
              <div 
                key={`loop-${sponsor.id}-${idx}`}
                className="flex-shrink-0 flex items-center justify-center w-32 md:w-40 h-full px-4"
              >
                <div className="relative w-full h-[30px] md:h-[50px] transition-all duration-300 filter grayscale contrast-125 opacity-70 hover:opacity-100 hover:grayscale-0">
                  <Image
                    alt={sponsor.name}
                    src={sponsor.src}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 120px, 160px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          width: max-content;
        }
        /* Pause on hover if desired, but typically marquees keep moving for sponsors */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SponsorMarquee;