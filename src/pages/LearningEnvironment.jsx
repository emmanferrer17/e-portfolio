import React, { useState, useEffect } from 'react';
import { School, BookOpen, Clock, Building2, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import assetPath from '../utils/assetPath';
import leData from '../data/learning-environment.json';

export default function LearningEnvironment() {
  const { checklistItem, title, journeyNote, vision, mission, history, groundsImages = [], facilitiesDescription } = leData;

  // List of candidate images
  const defaultImages = groundsImages.length > 0 ? groundsImages : [
    '/assets/school-grounds-1.jpg',
    '/assets/school-grounds-2.jpg',
    '/assets/school-grounds-3.jpg',
    '/assets/school-grounds-4.jpg',
  ];

  // Track failed image URLs
  const [failedImages, setFailedImages] = useState(new Set());
  const [currentIndex, setCurrentIndex] = useState(0);

  // Available valid images filtered dynamically
  const validImages = defaultImages.filter((img) => !failedImages.has(img));

  const handleImageError = (imgUrl) => {
    setFailedImages((prev) => {
      const updated = new Set(prev);
      updated.add(imgUrl);
      return updated;
    });
  };

  // Keep currentIndex in bounds when images fail
  useEffect(() => {
    if (currentIndex >= validImages.length && validImages.length > 0) {
      setCurrentIndex(0);
    }
  }, [validImages.length, currentIndex]);

  const handlePrev = () => {
    if (validImages.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (validImages.length === 0) return;
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 font-sans">
      {/* Section Header with Journey Note */}
      <SectionHeader
        numeral={checklistItem}
        title={title}
        subtitle="School physical plant, institutional history, and educational atmosphere."
        tags={['Section IV', 'Campus Observation', 'Checklist IV']}
        journeyNote={journeyNote}
      />

      {/* Vision & Mission */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-[#E4DBD0]">
          <div className="w-10 h-10 rounded-xl bg-[#0F3D3A] text-white flex items-center justify-center shrink-0">
            <School className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F3D3A]">President Diosdado Macapagal High School</h2>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24] mt-0.5">Taguig City, Metro Manila</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Vision */}
          <div className="p-5 rounded-xl bg-[#FAF3EB] border-l-4 border-[#7A1C24] border-y border-r border-[#E4DBD0] shadow-xs space-y-2 flex flex-col justify-between">
            <div className="flex items-center space-x-2 text-[#7A1C24] text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>School Vision</span>
            </div>
            <p className="text-base text-[#1E1B18] leading-relaxed italic">
              "{vision}"
            </p>
          </div>

          {/* Mission */}
          <div className="p-5 rounded-xl bg-[#FAF3EB] border-l-4 border-[#0F3D3A] border-y border-r border-[#E4DBD0] shadow-xs space-y-2 flex flex-col justify-between">
            <div className="flex items-center space-x-2 text-[#0F3D3A] text-xs font-semibold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>School Mission</span>
            </div>
            <p className="text-base text-[#1E1B18] leading-relaxed italic">
              "{mission}"
            </p>
          </div>
        </div>

        {/* History */}
        <div className="space-y-2 pt-2 border-t border-[#E4DBD0]">
          <div className="flex items-center space-x-2 text-[#0F3D3A] text-xs font-semibold uppercase tracking-wider">
            <Clock className="w-4 h-4 text-[#7A1C24] shrink-0" />
            <span>Short History of the School</span>
          </div>
          <p className="text-base leading-relaxed text-[#1E1B18] bg-[#FAF3EB] p-5 rounded-xl border border-[#E4DBD0]">
            {history}
          </p>
        </div>
      </section>

      {/* Interactive Image Carousel: School Grounds & Physical Facilities */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4DBD0] pb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F3D3A] text-white flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#0F3D3A]">School Grounds and Physical Facilities</h2>
              <p className="text-xs text-[#1E1B18] mt-0.5">{facilitiesDescription}</p>
            </div>
          </div>
          {validImages.length > 0 && (
            <span className="px-3 py-1 rounded-full bg-[#FAF3EB] border border-[#E4DBD0] text-[#0F3D3A] text-xs font-mono font-bold">
              Photo {currentIndex + 1} of {validImages.length}
            </span>
          )}
        </div>

        {/* Carousel Container */}
        <div className="relative w-full rounded-xl overflow-hidden border border-[#E4DBD0] bg-[#FAF3EB]">
          {validImages.length > 0 ? (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-center bg-black/5">
              <img
                src={assetPath(validImages[currentIndex])}
                alt={`School Grounds Photo ${currentIndex + 1}`}
                className="w-full h-full object-cover transition-all duration-300"
                onError={() => handleImageError(validImages[currentIndex])}
              />

              {/* Prev/Next Controls */}
              {validImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous Photo"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F3D3A]/80 text-white hover:bg-[#7A1C24] flex items-center justify-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next Photo"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F3D3A]/80 text-white hover:bg-[#7A1C24] flex items-center justify-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-mono">
                Facility View: {validImages[currentIndex].split('/').pop()}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center space-y-2 flex flex-col items-center justify-center min-h-[260px]">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E4DBD0] flex items-center justify-center text-[#7A1C24] shadow-xs">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-[#0F3D3A]">
                School Grounds &amp; Facility Documentation
              </p>
              <p className="text-xs text-[#1E1B18] max-w-md">
                Looking for school-grounds-1.jpg through school-grounds-4.jpg in public/assets/.
              </p>
            </div>
          )}

          {/* Dots Indicator */}
          {validImages.length > 1 && (
            <div className="p-3 bg-white border-t border-[#E4DBD0] flex items-center justify-center space-x-2">
              {validImages.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx
                      ? 'bg-[#7A1C24] w-6'
                      : 'bg-[#0F3D3A]/20 hover:bg-[#0F3D3A]/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
