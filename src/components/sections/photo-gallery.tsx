'use client';

import React from 'react';
import Image from 'next/image';

const PhotoGallery = () => {
  const images = [
    "/photo-gallery/1.jpg",
    "/photo-gallery/2.jpg",
    "/photo-gallery/3.jpg",
    "/photo-gallery/4.jpg",
    "/photo-gallery/5.jpg",
    "/photo-gallery/6.jpg",
    "/photo-gallery/7.jpg",
    "/photo-gallery/8.jpg",
    "/photo-gallery/9.jpg",
  ];

  return (
    <section id="gallery" className="py-24 bg-[#020617] overflow-hidden">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-display mb-4 uppercase tracking-tighter italic">
            Photo <span className="text-blue-500">Gallery</span>
          </h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </div>
        
        {/* Horizontal Scroll Wrapper */}
        <div 
          className="flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory custom-gallery-scrollbar"
        >
          {images.map((src, index) => (
            <div
              key={index}
              className="relative group shrink-0 w-[280px] sm:w-[350px] md:w-[400px] overflow-hidden rounded-[32px]
              aspect-[4/5] border border-white/10 snap-start transition-all duration-500 hover:border-blue-500/50"
            >
              <Image 
                src={src}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-80"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t
                from-[#020617] via-transparent to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity
                duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]"
              >
                <span className="text-blue-400 font-mono text-[10px] tracking-[0.3em] mb-1">ARCHIVE_UNIT_{index + 1}</span>
                <p className="text-white font-black text-xl uppercase italic tracking-tighter">
                  AAVISHKAR Moments
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="flex justify-center mt-4 md:hidden">
            <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.3em] animate-pulse">
                ← Swipe to explore →
            </p>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;