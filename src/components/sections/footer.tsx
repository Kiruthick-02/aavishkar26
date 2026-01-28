import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, ArrowUpRight, ArrowRight } from 'lucide-react';

/**
 * Footer Component
 * 
 * Features:
 * - Architectural illustration of Amrita University campus campus
 * - Bright cyan-blue "REACH OUT TO US!" heading
 * - Gold hover states for social icons
 * - White text for links
 * - Dark background theme
 */

const Footer = () => {
  const campusIllustration = "/images/logo-gold.png";

  return (
    <footer className="relative bg-black text-white overflow-hidden pt-12 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-12">
          
          {/* Left Side: Campus Illustration */}
          <div className="relative w-full lg:w-1/2 flex justify-start items-end">
            <div className="relative w-full aspect-[2/1] max-w-[600px]">
              <Image 
                src={campusIllustration} 
                alt="Amrita University Architectural Illustration" 
                fill
                className="object-contain object-left-bottom opacity-90"
                priority
              />
            </div>
          </div>

          {/* Right Side: Contact and Links */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-12 pb-4">
            
            {/* Reach Out Section */}
            <div className="space-y-4">
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-[#22d3ee]">
                REACH OUT TO US!
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-sans">
                Feel free to reach out to us if you have any queries
              </p>
              <a 
                href="mailto:anokhapr@cb.amrita.edu" 
                className="group flex items-center gap-2 text-white hover:text-[#22d3ee] transition-colors duration-300 text-lg md:text-xl font-medium"
              >
                ssivamuthu2006@gmail.com <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Grid for Address, Socials, Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-white/10">
              
              {/* Address */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#22d3ee]">OUR ADDRESS</h3>
                <div className="text-sm leading-relaxed text-slate-300 space-y-1">
                  <p className="flex items-center gap-1 font-medium text-white">
                    Coimbatore Institute of Technology <MapPin className="w-3 h-3 text-[#22d3ee]" />
                  </p>
                  <p>Avinashi Road</p>
                  <p>Civil Aerodome</p>
                  <p>Coimbatore - 641 112</p>
                  <p>Tamilnadu, India</p>
                </div>
              </div>

              {/* Follow Us */}
              <div className="space-y-4">
                <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#22d3ee]">FOLLOW US</h3>
                <div className="flex items-center gap-4">
                  
                  
                  <a href="https://www.instagram.com/aavishkar_2026?igsh=dndnZmJhcTRmb2px" className="text-slate-400 hover:text-[#d4af37] transition-colors duration-300 transform hover:scale-110">
                    <Instagram className="w-5 h-5" />
                  </a>
                  
                </div>
                <a 
                  href="https://www.cit.edu.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold tracking-widest text-slate-400 hover:text-white transition-colors uppercase pt-2"
                >
                  CIT.EDU <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>

              {/* Quick Links */}
              <div className="space-y-3">
                <a href="/" className="block text-sm font-medium text-white hover:text-[#22d3ee] transition-colors tracking-wide uppercase">HOME</a>
                <a href="/team" className="block text-sm font-medium text-white hover:text-[#22d3ee] transition-colors tracking-wide uppercase"></a>
                <a href="/terms" className="block text-sm font-medium text-white hover:text-[#22d3ee] transition-colors tracking-wide uppercase"></a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-widest">
            <p>© 2026 AAVISHKAR. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6">
              <span>CORE DEV TEAM</span>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;