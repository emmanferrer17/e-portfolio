import React, { useState, useEffect } from 'react';
import { Search, Users, BookOpen, FileText, ChevronLeft, ChevronRight, Image as ImageIcon, Award, Sparkles, Camera } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import DocumentViewer from '../components/DocumentViewer';
import SmartText from '../components/SmartText';
import assetPath from '../utils/assetPath';
import cbarData from '../data/cbar.json';

export default function Cbar() {
  const {
    checklistItem,
    title,
    journeyNote,
    groupmates,
    researchTitle,
    panelScores,
    howOurResearchBegan,
    theStudyInPlainLanguage,
    deliverables = [],
    carouselImages = [],
  } = cbarData;

  const [activeDeliverableId, setActiveDeliverableId] = useState(deliverables[0]?.id || 'ts1-data-bank');
  const activeDeliverable = deliverables.find((d) => d.id === activeDeliverableId) || deliverables[0];

  // Full configured list of carousel slides (never filtered out to prevent 0-length crash)
  const cbarSlides = (carouselImages && carouselImages.length > 0 ? carouselImages : [
    '/assets/cbar-doc-1.jpg',
    '/assets/cbar-doc-2.jpg',
    '/assets/cbar-doc-3.jpg',
    '/assets/cbar-doc-4.jpg',
  ]).map((src, idx) => ({
    src,
    title: `Action Research Documentation — Artifact ${idx + 1}`,
  }));

  const totalCbarSlides = cbarSlides.length;
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [failedCarouselIndices, setFailedCarouselIndices] = useState(new Set());

  // Clamped safe index ensuring out-of-bounds or NaN is impossible
  const safeCarouselIndex = totalCbarSlides > 0 ? ((carouselIndex % totalCbarSlides) + totalCbarSlides) % totalCbarSlides : 0;
  const currentCbarSlide = cbarSlides[safeCarouselIndex] || { src: '', title: `Research Artifact ${safeCarouselIndex + 1}` };

  const handlePrev = () => {
    if (totalCbarSlides === 0) return;
    setCarouselIndex((prev) => ((prev - 1) % totalCbarSlides + totalCbarSlides) % totalCbarSlides);
  };

  const handleNext = () => {
    if (totalCbarSlides === 0) return;
    setCarouselIndex((prev) => (prev + 1) % totalCbarSlides);
  };

  const handleImageError = (idx) => {
    setFailedCarouselIndices((prev) => {
      const next = new Set(prev);
      next.add(idx);
      return next;
    });
  };

  const handleImageLoad = (idx) => {
    setFailedCarouselIndices((prev) => {
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
        subtitle="Inquiry-based practitioner research targeting instructional challenges identified during practicum."
        tags={['Action Research', 'Classroom Inquiry', 'TS1 & TS8 Proposal', 'Collaborative Study']}
        journeyNote={journeyNote}
      />

      {/* Research Proposal Title & Proponents Team */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E4DBD0]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#0F3D3A] text-white flex items-center justify-center shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
                Action Research Proponents
              </span>
              <h3 className="text-base font-bold text-[#0F3D3A]">
                Collaborative Inquiry Team
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#0F3D3A] font-semibold">Co-researchers:</span>
            {groupmates.map((name) => (
              <span
                key={name}
                className="px-3 py-1 rounded-full bg-[#FAF3EB] border border-[#E4DBD0] text-[#7A1C24] text-xs font-bold"
              >
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Approved Proposal Title Banner */}
        {researchTitle && (
          <div className="p-5 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Approved Research Proposal Title</span>
              </span>
              {panelScores && (
                <span className="text-xs font-mono font-bold text-[#0F3D3A] bg-white px-3 py-1 rounded border border-[#E4DBD0]">
                  {panelScores}
                </span>
              )}
            </div>
            <p className="text-lg md:text-xl font-bold text-[#0F3D3A] leading-snug">
              "{researchTitle}"
            </p>
          </div>
        )}

        {/* 2-Column Research Narrative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* How Our Research Began */}
          <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] space-y-2 shadow-xs">
            <div className="flex items-center space-x-2 text-[#0F3D3A] font-bold text-sm">
              <Search className="w-4 h-4 text-[#7A1C24]" />
              <h4 className="font-bold text-[#0F3D3A]">{howOurResearchBegan.heading}</h4>
            </div>
            <p className="text-base text-[#1E1B18] leading-relaxed">
              <SmartText text={howOurResearchBegan.text.replace(/^How our research began\.\s*/, '')} />
            </p>
          </div>

          {/* The Study in Plain Language */}
          <div className="p-5 rounded-xl bg-[#FAF3EB] border-l-4 border-[#7A1C24] border-y border-r border-[#E4DBD0] space-y-2 shadow-xs">
            <div className="flex items-center space-x-2 text-[#7A1C24] font-bold text-sm">
              <BookOpen className="w-4 h-4 text-[#7A1C24]" />
              <h4 className="font-bold text-[#7A1C24]">{theStudyInPlainLanguage.heading}</h4>
            </div>
            <p className="text-base text-[#1E1B18] leading-relaxed">
              <SmartText text={theStudyInPlainLanguage.text.replace(/^The study in plain language\.\s*/, '')} />
            </p>
          </div>
        </div>
      </section>

      {/* Folder-Tab Document Stage for Deliverables 1, 2, 3 */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between border-b border-[#E4DBD0] pb-2">
          <div>
            <h2 className="text-xl font-bold text-[#0F3D3A]">
              Research Deliverables &amp; Verified Manuscripts
            </h2>
            <p className="text-base text-[#1E1B18] mt-0.5">
              Select a folder tab below to view verified proposal documents and defense rubric scores.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A] hidden sm:inline">
            3 Document Artifacts
          </span>
        </div>

        {/* Folder Tabs Navigation */}
        <div className="flex items-end gap-1.5 border-b border-[#E4DBD0] pt-2 overflow-x-auto select-none">
          {deliverables.map((item) => {
            const isActive = activeDeliverableId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveDeliverableId(item.id)}
                className={`px-4 py-2.5 rounded-t-xl text-xs font-mono font-bold transition-all shrink-0 flex items-center space-x-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] ${
                  isActive
                    ? 'bg-white border-t-2 border-t-[#7A1C24] border-x border-[#E4DBD0] text-[#7A1C24] -mb-[1px] z-10 shadow-xs'
                    : 'bg-[#FAF3EB] text-[#0F3D3A] border-t border-x border-transparent hover:border-[#E4DBD0] hover:bg-white/80'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>

        {/* Document Viewer Stage */}
        {activeDeliverable && (
          <div className="rounded-xl border border-[#E4DBD0] bg-white overflow-hidden shadow-xs flex flex-col">
            <div className="px-4 py-2.5 bg-[#FAF3EB] border-b border-[#E4DBD0] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div>
                <span className="font-bold text-[#0F3D3A]">{activeDeliverable.title}: </span>
                <span className="text-[#1E1B18]">{activeDeliverable.description}</span>
              </div>
              <span className="inline-flex items-center gap-1 font-semibold text-[#0F3D3A] bg-white border border-[#E4DBD0] px-2.5 py-0.5 rounded-full text-[11px]">
                Verified Deliverable
              </span>
            </div>

            <div className="h-[78vh] min-h-[620px] w-full bg-white">
              <DocumentViewer
                url={activeDeliverable.pdfUrl}
                title={activeDeliverable.title}
                height="100%"
                className="border-0 rounded-none h-full w-full"
              />
            </div>
          </div>
        )}
      </section>

      {/* Deliverable 4: Research Documentation 4-Photo Carousel */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E4DBD0]">
          <div>
            <h3 className="text-base font-bold text-[#0F3D3A] flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-[#7A1C24]" />
              <span>4. Action Research Documentation Carousel</span>
            </h3>
            <p className="text-xs text-[#1E1B18] mt-0.5">
              Classroom observation artifacts, proponent meetings, and behavioral data collection sessions.
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#FAF3EB] border border-[#E4DBD0] text-[#0F3D3A] text-xs font-mono font-bold">
            Photo {safeCarouselIndex + 1} of {totalCbarSlides}
          </span>
        </div>

        <div className="relative w-full rounded-xl overflow-hidden border border-[#E4DBD0] bg-[#FAF3EB]">
          {/* Slide Viewport */}
          {!failedCarouselIndices.has(safeCarouselIndex) ? (
            <div className="relative w-full aspect-[16/9] md:aspect-[21/9] flex items-center justify-center bg-black/5">
              <img
                src={assetPath(currentCbarSlide.src)}
                alt={currentCbarSlide.title}
                className="w-full h-full object-cover transition-all duration-300"
                onError={() => handleImageError(safeCarouselIndex)}
                onLoad={() => handleImageLoad(safeCarouselIndex)}
              />

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-sans">
                {currentCbarSlide.title}
              </div>
            </div>
          ) : (
            <div className="bg-[#FAF3EB] border border-dashed border-[#E4DBD0] rounded-xl h-72 md:h-96 flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-white border border-[#E4DBD0] flex items-center justify-center text-[#7A1C24] shadow-xs">
                <Camera className="w-6 h-6" />
              </div>
              <div className="space-y-1 max-w-md">
                <p className="text-sm font-bold text-[#0F3D3A]">
                  {currentCbarSlide.title}
                </p>
                <p className="text-xs text-[#1E1B18]/70">
                  Documentation photo pending upload
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E4DBD0] text-[#0F3D3A] text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Photo {safeCarouselIndex + 1} of {totalCbarSlides}
              </span>
            </div>
          )}

          {/* Prev/Next Controls - Always available when totalCbarSlides > 1 */}
          {totalCbarSlides > 1 && (
            <>
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Documentation Photo"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F3D3A]/80 text-white hover:bg-[#7A1C24] flex items-center justify-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer z-10"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Documentation Photo"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F3D3A]/80 text-white hover:bg-[#7A1C24] flex items-center justify-center shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white cursor-pointer z-10"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Dots Indicator - Always available when totalCbarSlides > 1 */}
          {totalCbarSlides > 1 && (
            <div className="p-3 bg-white border-t border-[#E4DBD0] flex items-center justify-center space-x-2">
              {cbarSlides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCarouselIndex(idx)}
                  aria-label={`Go to documentation photo ${idx + 1}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    safeCarouselIndex === idx
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
