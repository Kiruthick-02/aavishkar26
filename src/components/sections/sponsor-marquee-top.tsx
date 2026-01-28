import React from "react";
import Image from "next/image";

/**
 * SponsorMarqueeTop
 *
 * Transparent infinite marquee for logos only
 * - No background
 * - No edge fades
 * - Clean floating logos
 */

const SponsorMarqueeTop = () => {
  const sponsorLogo = "/images/logo.jpeg";

  const sponsors = [
    { id: 1, name: "Sponsor 1", src: sponsorLogo },
    { id: 2, name: "Sponsor 2", src: sponsorLogo },
    { id: 3, name: "Sponsor 3", src: sponsorLogo },
    { id: 4, name: "Sponsor 4", src: sponsorLogo },
    { id: 5, name: "Sponsor 5", src: sponsorLogo },
    { id: 6, name: "Sponsor 6", src: sponsorLogo },
    { id: 7, name: "Sponsor 7", src: sponsorLogo },
    { id: 8, name: "Sponsor 8", src: sponsorLogo },
  ];

  const marqueeItems = [...sponsors, ...sponsors];

  return (
    <section
      className="relative w-full overflow-hidden py-6"
      aria-label="Sponsor Logos"
    >
      <div className="flex animate-marquee gap-20 whitespace-nowrap items-center">
        {marqueeItems.map((sponsor, index) => (
          <div
            key={`${sponsor.id}-${index}`}
            className="flex h-16 w-40 flex-shrink-0 items-center justify-center md:h-20"
          >
            <Image
              src={sponsor.src}
              alt={sponsor.name}
              width={140}
              height={70}
              priority={index < 8}
              className="
                object-contain
                grayscale
                opacity-90
                transition-all
                duration-300
                hover:grayscale-0
                hover:opacity-100
              "
            />
          </div>
        ))}
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
          width: fit-content;
          animation: marquee 28s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SponsorMarqueeTop;
