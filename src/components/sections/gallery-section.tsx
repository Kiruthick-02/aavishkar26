'use client';

import React, { useEffect, useState } from 'react';
import GalleryPlaceholder from './gallery-placeholder';
import PhotoGallery from './photo-gallery';

const GallerySection: React.FC = () => {
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const syncTimer = setTimeout(() => {
      setIsSynced(true);
    }, 3000); // ⏳ Sync duration (adjust if needed)

    return () => clearTimeout(syncTimer);
  }, []);

  return (
    <section className="relative w-full bg-[#020617]">
      {/* ===== PLACEHOLDER (LOADING STATE) ===== */}
      <div
        className={`transition-opacity duration-700 ease-in-out ${
          isSynced
            ? 'opacity-0 pointer-events-none absolute inset-0'
            : 'opacity-100'
        }`}
      >
        <GalleryPlaceholder />
      </div>

      {/* ===== REAL GALLERY (AFTER SYNC) ===== */}
      <div
        className={`transition-opacity duration-1000 ease-in-out ${
          isSynced
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <PhotoGallery />
      </div>
    </section>
  );
};

export default GallerySection;
