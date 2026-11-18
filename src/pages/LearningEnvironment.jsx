import React, { useState, useEffect } from 'react';
import { School, BookOpen, Clock, Building2, ChevronLeft, ChevronRight, Image as ImageIcon, Camera } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import assetPath from '../utils/assetPath';
import { buildDynamicSlides } from '../utils/carouselAssets';
import leData from '../data/learning-environment.json';

export default function LearningEnvironment() {
  const { checklistItem, title, journeyNote, vision, mission, history, groundsImages = [], facilitiesDescription } = leData;

  // Dynamically built slides from public/assets matching school-grounds-* with JSON fallback
  const fallbackGrounds = groundsImages.length > 0 ? groundsImages : [
    '/assets/school-grounds-1.jpg',
    '/assets/school-grounds-2.jpg',
    '/assets/school-grounds-3.jpg',
    '/assets/school-grounds-4.jpg',
  ];

  const slides = buildDynamicSlides(
    'school-grounds',
    fallbackGrounds,
    'Campus & Learning Environment Photo'
  );

  const totalSlides = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState(new Set());

  // Clamped safe index ensuring out-of-bounds or NaN is impossible
  const safeIndex = totalSlides > 0 ? ((currentIndex % totalSlides) + totalSlides) % totalSlides : 0;
  const currentSlide = slides[safeIndex] || { src: '', title: `Facility View ${safeIndex + 1}` };

  const handlePrev = () => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => ((prev - 1) % totalSlides + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    if (totalSlides === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handleImageError = (idx) => {
    setFailedIndices((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const handleImageLoad = (idx) => {
    setFailedIndices((prev) => {
      if (!prev.has(idx)) return prev;
      const next = new Set(prev);
      next.delete(idx);
      return next;
    });
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
          <span className="px-3 py-1 rounded-full bg-[#FAF3EB] border border-[#E4DBD0] text-[#0F3D3A] text-xs font-mono font-bold">
            Photo {safeIndex + 1} of {totalSlides}
          </span>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full rounded-xl overflow-hidden border border-[#E4DBD0] bg-[#FAF3EB]">
          {/* Slide Viewport */}
          {!failedIndices.has(safeIndex) ? (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-center bg-black/5">
              <img
                src={assetPath(currentSlide.src)}
                alt={currentSlide.title}
                className="w-full h-full object-cover transition-all duration-300"
                onError={() => handleImageError(safeIndex)}
                onLoad={() => handleImageLoad(safeIndex)}
              />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-sans">
                {currentSlide.title}
              </div>
            </div>
          ) : (
            <div className="bg-[#FAF3EB] border border-dashed border-[#E4DBD0] rounded-xl h-72 md:h-96 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E4DBD0] flex items-center justify-center text-[#7A1C24] shadow-xs">
                <Camera className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-md">
                <p className="text-sm font-bold text-[#0F3D3A]">
                  {currentSlide.title}
                </p>
                <p className="text-xs text-[#1E1B18]/70">
                  Documentation photo pending upload
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E4DBD0] text-[#0F3D3A] text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Photo {safeIndex + 1} of {totalSlides}
              </span>
            </div>
          )}

          {/* Prev/Next Controls - Always available when totalSlides > 1 */}
          {totalSlides > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F3D3A]/80 text-white hover:bg-[#7A1C24] flex items-center justify-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F3D3A]/80 text-white hover:bg-[#7A1C24] flex items-center justify-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots Indicator - Always available when totalSlides > 1 */}
          {totalSlides > 1 && (
            <div className="p-3 bg-white border-t border-[#E4DBD0] flex items-center justify-center space-x-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    safeIndex === idx
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
