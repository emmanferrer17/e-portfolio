import React, { useState } from 'react';
import { Compass, Sparkles, FileText, ChevronDown, ChevronUp, X, ZoomIn } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import SmartText from '../components/SmartText';
import DocumentViewer from '../components/DocumentViewer';
import assetPath from '../utils/assetPath';
import philosophyData from '../data/philosophy.json';

export default function Philosophy() {
  const { checklistItem, title, journeyNote, manifesto, corePrinciples } = philosophyData;
  const [showTs11Pdf, setShowTs11Pdf] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const openFishHookModal = () => {
    setActiveModal({
      title: 'Fish-Hook Recitation Web Application',
      subtitle: 'Custom Instructional Technology Artifact',
      imageSrc: '/assets/fish-hook.jpg',
      description: 'An interactive, gamified software web application built in HTML/CSS/JavaScript where student avatars swim as fish and are hooked randomly for recitation questions.',
    });
  };

  const openPesoBillsModal = () => {
    setActiveModal({
      title: 'Custom Peso-Bill Gamified Reward System',
      subtitle: 'Behavior & Engagement Reinforcement Artifact',
      imageSrc: '/assets/peso-bills.jpg',
      description: 'Custom-designed and printed reward bills (10, 20, 50, 100, 500, 1,000) featuring motivational animal artwork and quotes, awarded based on the depth and quality of student answers.',
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-20 font-sans">
      {/* Centralized Editorial Header */}
      <div className="space-y-4">
        <SectionHeader
          numeral={checklistItem}
          title={title}
          subtitle="A personal manifesto on teaching, learning, alignment, and educator growth."
          tags={['Teaching Philosophy', 'TS11', 'Pedagogical Values', 'Practitioner Identity']}
          journeyNote={journeyNote}
        />
      </div>

      {/* Main Editorial Article Body */}
      <article className="bg-white border border-[#E4DBD0] rounded-2xl p-6 sm:p-10 md:p-12 shadow-xs space-y-8 font-sans">
        {/* Editorial Motif */}
        <div className="text-center space-y-2 border-b border-[#E4DBD0] pb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FAF3EB] text-[#7A1C24] border border-[#E4DBD0] mx-auto mb-1">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0F3D3A] tracking-tight">
            My Educational Creed
          </h2>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24]">
            Field Study 2 Experiential Insights
          </p>
        </div>

        {/* Paragraph 1: The Transition to Teaching */}
        <div className="space-y-4 text-base md:text-lg text-[#1E1B18] leading-relaxed md:leading-loose">
          <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#7A1C24] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
            I did not choose teaching. When I entered college, it was not on my list. I chose my program because it had Computer Programming in it. But somewhere between planning lessons,{' '}
            <button
              type="button"
              onClick={openFishHookModal}
              className="font-semibold text-[#0F3D3A] underline decoration-[#7A1C24] decoration-2 underline-offset-4 hover:text-[#7A1C24] transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>building a game for recitation</span>
              <ZoomIn className="w-3.5 h-3.5 inline shrink-0 text-[#7A1C24]" />
            </button>
            , and standing in front of five classes with no script, I began to understand why others do choose it. For me, the reason is simple: when you teach, you learn.
          </p>
        </div>

        {/* Standout Pull-Quote */}
        <div className="my-6 py-6 px-8 border-y-2 border-[#7A1C24]/20 bg-[#FAF3EB] rounded-xl text-center space-y-2">
          <p className="italic text-lg md:text-xl font-bold text-[#7A1C24] leading-snug">
            "For me, the reason is simple: when you teach, you learn. And that means you never stop learning."
          </p>
        </div>

        {/* Paragraph 2: Constructive Alignment and Purposeful Technology */}
        <div className="space-y-4 text-base md:text-lg text-[#1E1B18] leading-relaxed md:leading-loose">
          <p>
            I believe learners deserve lessons that are aligned from the objective to the assessment. A lesson that promises one thing and tests another is unfair to them. I believe learning should be active, so I try to put learners at the center, whether through a game, a discussion, or a{' '}
            <button
              type="button"
              onClick={openPesoBillsModal}
              className="font-semibold text-[#0F3D3A] underline decoration-[#7A1C24] decoration-2 underline-offset-4 hover:text-[#7A1C24] transition-colors cursor-pointer inline-flex items-center gap-1"
            >
              <span>reward they can earn</span>
              <ZoomIn className="w-3.5 h-3.5 inline shrink-0 text-[#7A1C24]" />
            </button>{' '}
            through the quality of their answers. And I believe technology is most useful when it serves the lesson. I use my programming skills to make my classroom more engaging, not to impress.
          </p>
        </div>

        {/* Paragraph 3: Humility, Reflection, and Lifelong Learning */}
        <div className="space-y-4 text-base md:text-lg text-[#1E1B18] leading-relaxed md:leading-loose border-t border-[#E4DBD0] pt-6">
          <p>
            <SmartText text={manifesto[2]} />
          </p>
        </div>

        {/* TS11 Actual PDF Document Toggle */}
        <div className="pt-6 border-t border-[#E4DBD0] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-[#0F3D3A]">Official Task Sheet 11 Artifact</h3>
              <p className="text-xs text-[#1E1B18]">Submitted Teaching Philosophy reflection manuscript.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowTs11Pdf(!showTs11Pdf)}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#7A1C24] text-white text-xs font-semibold hover:bg-[#7A1C24]/90 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] cursor-pointer shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>{showTs11Pdf ? 'Hide Actual TS11 PDF' : 'View Actual TS11 PDF'}</span>
              {showTs11Pdf ? <ChevronUp className="w-4 h-4 ml-0.5" /> : <ChevronDown className="w-4 h-4 ml-0.5" />}
            </button>
          </div>

          {/* Collapsible DocumentViewer */}
          {showTs11Pdf && (
            <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold uppercase tracking-wider text-[#0F3D3A]">
                  TS11: Teaching Philosophy Manuscript
                </span>
                <span className="inline-flex items-center gap-1 font-semibold text-[#0F3D3A] bg-white border border-[#E4DBD0] px-2.5 py-0.5 rounded-full text-[11px]">
                  Verified Manuscript
                </span>
              </div>
              <div className="h-[650px] rounded-lg overflow-hidden border border-[#E4DBD0] bg-white">
                <DocumentViewer
                  url="/pdfs/ts11-teaching-philosophy.pdf"
                  title="TS11 - Teaching Philosophy"
                  height="650px"
                />
              </div>
            </div>
          )}
        </div>
      </article>

      {/* Core Beliefs Summary Grid */}
      <section className="space-y-4 pt-2 font-sans">
        <div className="text-center">
          <h3 className="text-xl font-bold text-[#0F3D3A] tracking-tight">Core Beliefs</h3>
          <p className="text-base text-[#1E1B18] mt-0.5">Foundational beliefs guiding daily instructional decisions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {corePrinciples.map((principle, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E4DBD0] shadow-xs space-y-3 text-center flex flex-col justify-between"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] block">
                  Core Belief 0{idx + 1}
                </span>
                <h4 className="text-base font-bold text-[#0F3D3A]">{principle.heading}</h4>
              </div>
              <p className="text-sm text-[#1E1B18] italic leading-relaxed pt-3 border-t border-[#E4DBD0]">
                "{principle.quote}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Floating Image Modal Window */}
      {activeModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveModal(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#E4DBD0]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 md:p-5 bg-[#0F3D3A] text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#FAF3EB]/80 block">
                  {activeModal.subtitle}
                </span>
                <h3 className="!text-white font-bold text-lg md:text-xl">{activeModal.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white hover:text-[#FAF3EB] transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Image Body */}
            <div className="p-4 md:p-6 bg-[#FAF3EB] flex items-center justify-center overflow-auto max-h-[60vh]">
              <img
                src={assetPath(activeModal.imageSrc)}
                alt={activeModal.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-xs border border-[#E4DBD0]"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallback = e.currentTarget.parentElement?.querySelector('.modal-fallback');
                  if (fallback) fallback.classList.remove('hidden');
                }}
              />
              <div className="modal-fallback hidden p-8 text-center text-[#0F3D3A] space-y-1">
                <p className="font-bold">{activeModal.title}</p>
                <p className="text-xs text-[#1E1B18]/70">Artifact image pending upload</p>
              </div>
            </div>

            {/* Modal Description Footer */}
            <div className="p-4 md:p-5 bg-white border-t border-[#E4DBD0]">
              <p className="text-sm md:text-base text-[#1E1B18] leading-relaxed">
                {activeModal.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
