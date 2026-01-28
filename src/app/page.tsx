'use client';

import HeroSection from "@/components/sections/hero";
import SponsorMarqueeTop from "@/components/sections/sponsor-marquee-top";
import AboutAavishkar from "@/components/sections/about-aavishkar";
import AboutCit from "@/components/sections/about-cit";
import ExperienceAavishkar from "@/components/sections/experience-aavishkar";
import GallerySection from "@/components/sections/gallery-section";

export default function Home() {
  return (
    <div className="flex flex-col overflow-x-hidden bg-[#020617]">
      <HeroSection />
      <SponsorMarqueeTop />
      <AboutAavishkar />
      <AboutCit />
      <ExperienceAavishkar />

      {/* Gallery with Sync → Reveal Logic */}
      <GallerySection />
    </div>
  );
}
