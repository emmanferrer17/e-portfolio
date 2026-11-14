import React, { useState } from 'react';
import { Presentation, Calendar, FileText, Image as ImageIcon, MessageSquare, CheckCircle2, ChevronRight, Award } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import ScoreBadge from '../components/ScoreBadge';
import KeepRedoPanel from '../components/KeepRedoPanel';
import DocumentViewer from '../components/DocumentViewer';
import SmartText from '../components/SmartText';
import assetPath from '../utils/assetPath';
import microteachingData from '../data/microteaching.json';

export default function Microteaching() {
  const {
    checklistItem,
    title,
    journeyNote,
    topic,
    gradeLevel,
    date,
    score,
    maxScore,
    scoreRating,
    keep,
    redo,
    evaluatorFeedback,
    deliverables = [],
  } = microteachingData;

  const pdfDeliverables = deliverables.filter((d) => d.type === 'pdf');
  const imageDeliverable = deliverables.find((d) => d.type === 'image');
  const [activePdfId, setActivePdfId] = useState(pdfDeliverables[0]?.id || 'ts12-full');

  const selectedPdf = pdfDeliverables.find((d) => d.id === activePdfId) || pdfDeliverables[0];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 font-sans">
      {/* Section Header with Journey Note */}
      <SectionHeader
        numeral={checklistItem}
        title={title}
        subtitle="Teaching demonstration evaluation, lesson execution analysis, and reflective practice."
        tags={['Demonstration Teaching', 'TS12 Evaluation', 'Keep & Redo Analysis']}
        journeyNote={journeyNote}
      />

      {/* Lesson Metadata & Score Banner */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#E4DBD0]">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#7A1C24]">
              <Presentation className="w-4 h-4" />
              <span>Teaching Demonstration Topic</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F3D3A] tracking-tight">
              {topic}
            </h2>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium">
              <span className="px-3 py-1 rounded-full bg-[#FAF3EB] border border-[#E4DBD0] text-[#0F3D3A] font-semibold">
                {gradeLevel}
              </span>
              <span className="flex items-center space-x-1.5 text-[#0F3D3A]">
                <Calendar className="w-3.5 h-3.5 text-[#7A1C24]" />
                <span className="font-semibold">Date:</span>
                <span className="text-[#1E1B18]">{date}</span>
              </span>
            </div>
          </div>

          {/* Practicum Score Badge */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0]">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#0F3D3A] block">
                Official Practicum Score
              </span>
              <div className="flex items-baseline space-x-1 font-mono">
                <span className="text-2xl font-extrabold text-[#0F3D3A]">{score}</span>
                <span className="text-sm font-semibold text-[#0F3D3A]/70">/ {maxScore}</span>
              </div>
              <span className="text-xs font-bold text-[#7A1C24] block font-sans">
                {scoreRating}
              </span>
            </div>

            <ScoreBadge
              score={score}
              maxScore={maxScore}
              label={scoreRating}
              category="Demonstration"
              variant="teal"
            />
          </div>
        </div>

        {/* Narrative Summary Strip */}
        <div className="text-base text-[#1E1B18] leading-relaxed">
          <p>
            Demonstration lesson on <span className="font-semibold text-[#0F3D3A]">{topic}</span> delivered to {gradeLevel} on {date}. Evaluated by faculty with official rating of <span className="font-bold text-[#0F3D3A]">{score} / {maxScore} ({scoreRating})</span>.
          </p>
        </div>
      </section>

      {/* Standalone Card: Evaluator's Written Feedback */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-4 font-sans">
        <div className="flex items-center space-x-2.5 border-b border-[#E4DBD0] pb-3">
          <div className="w-8 h-8 rounded-lg bg-[#FAF3EB] text-[#7A1C24] border border-[#E4DBD0] flex items-center justify-center">
            <MessageSquare className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[#0F3D3A]">Evaluator's Written Feedback</h2>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24]">Faculty Demonstration Assessment Remarks</p>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-[#FAF3EB] border-l-4 border-[#7A1C24] border-y border-r border-[#E4DBD0]">
          <p className="text-base leading-relaxed text-[#1E1B18] italic">
            "{evaluatorFeedback}"
          </p>
        </div>
      </section>

      {/* Two-Column Keep / Redo Panel */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#0F3D3A]">Reflective Analysis</h2>
          <p className="text-base text-[#1E1B18] mt-0.5">
            Critical comparison of pedagogical successes and instructional timing adjustments.
          </p>
        </div>

        <KeepRedoPanel
          keepTitle={keep.title}
          keepText={keep.text}
          redoTitle={redo.title}
          redoText={redo.text}
        />
      </section>

      {/* Demonstration Deliverables & Artifacts Section */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6 font-sans">
        <div className="border-b border-[#E4DBD0] pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-[#0F3D3A]">Demonstration Deliverables</h2>
            <p className="text-base text-[#1E1B18] mt-0.5">
              Official lesson compilation, lesson plan, slide presentation, and custom instructional technology.
            </p>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0]">
            4 Core Deliverables
          </span>
        </div>

        {/* Deliverable 1, 2, 3: Interactive Tabbed PDF Document Viewer */}
        <div className="space-y-4">
          <div className="flex items-end gap-1.5 border-b border-[#E4DBD0] pt-2 overflow-x-auto select-none">
            {pdfDeliverables.map((item) => {
              const isActive = activePdfId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActivePdfId(item.id)}
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

          {/* Active PDF Viewer Box */}
          {selectedPdf && (
            <div className="rounded-xl border border-[#E4DBD0] bg-white overflow-hidden shadow-xs flex flex-col">
              <div className="px-4 py-2.5 bg-[#FAF3EB] border-b border-[#E4DBD0] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="font-bold text-[#0F3D3A]">{selectedPdf.title}: </span>
                  <span className="text-[#1E1B18]">{selectedPdf.description}</span>
                </div>
                <span className="font-mono text-[#7A1C24] font-semibold shrink-0">{selectedPdf.url}</span>
              </div>
              <div className="h-[78vh] min-h-[620px] w-full bg-white">
                <DocumentViewer
                  url={selectedPdf.url}
                  title={selectedPdf.title}
                  height="100%"
                  className="border-0 rounded-none h-full w-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Deliverable 4: Fish-Hook Recitation Game Screenshot */}
        {imageDeliverable && (
          <div className="pt-6 border-t border-[#E4DBD0] space-y-4">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-5 h-5 text-[#7A1C24] shrink-0" />
              <div>
                <h3 className="text-base font-bold text-[#0F3D3A]">
                  {imageDeliverable.title}
                </h3>
                <p className="text-xs text-[#1E1B18] mt-0.5">
                  {imageDeliverable.description}
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#E4DBD0] bg-white overflow-hidden shadow-xs">
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-[#FAF3EB] flex items-center justify-center overflow-hidden">
                <img
                  src={assetPath(imageDeliverable.url)}
                  alt={imageDeliverable.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallback = e.currentTarget.parentElement?.querySelector('.fish-fallback');
                    if (fallback) fallback.classList.remove('hidden');
                  }}
                />
                <div className="fish-fallback hidden p-8 text-center text-[#0F3D3A] space-y-1">
                  <ImageIcon className="w-8 h-8 text-[#7A1C24] mx-auto mb-1" />
                  <p className="text-sm font-semibold">{imageDeliverable.title}</p>
                  <p className="text-xs text-[#1E1B18]">Asset loading from {imageDeliverable.url}</p>
                </div>
              </div>
              <div className="p-4 bg-white border-t border-[#E4DBD0] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#1E1B18]">
                <span>Gamified randomizer web app developed in HTML/CSS/JavaScript for high-engagement student recitation.</span>
                <span className="font-mono text-[#7A1C24] font-semibold">{imageDeliverable.url}</span>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
