import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FileText, Sparkles, MessageSquare, Image as ImageIcon, ChevronRight } from 'lucide-react';
import DocumentViewer from './DocumentViewer';
import SmartText from './SmartText';
import assetPath from '../utils/assetPath';

const TAB_SHORT_TITLES = {
  ts2: 'DLL',
  ts3: 'Competencies',
  ts4: 'Management',
  ts5: 'Lesson Log',
  ts6: 'Lesson Plans',
  ts7: 'Assessment',
};

/**
 * TaskSheetSection
 * Architectural Studio Folder-Tab Layout for Task Sheets TS2 to TS7.
 * - Responsive Non-Scrolling Tab Grid (TS2–TS7)
 * - Two-column Summary Card (Opener + Reflection on Left, CT Feedback on Right)
 * - Full-width Document Stage (h-[78vh] DocumentViewer)
 * - TS6 Instructional Materials Gallery (Fish-Hook & Peso-Bills)
 */
export default function TaskSheetSection({ taskSheet, journeyNote, allTaskSheets = [] }) {
  if (!taskSheet) return null;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      {/* Folder Tabs Navigation Bar (Responsive Grid, Zero Scrollbars) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2 select-none overflow-visible">
        {allTaskSheets.map((ts) => {
          const isActive = ts.id.toLowerCase() === taskSheet.id.toLowerCase();
          const shortTitle = TAB_SHORT_TITLES[ts.id.toLowerCase()] || ts.title.split(' ')[0];
          return (
            <NavLink
              key={ts.id}
              to={`/curriculum/${ts.id}`}
              preventScrollReset
              className={`px-3 py-2.5 rounded-xl text-xs font-mono transition-all flex items-center justify-center space-x-1.5 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] ${
                isActive
                  ? 'bg-white border-2 border-[#7A1C24] text-[#7A1C24] font-bold shadow-xs'
                  : 'bg-white/80 border border-[#E4DBD0] text-[#0F3D3A] hover:bg-white hover:border-[#0F3D3A] hover:text-[#0F3D3A] font-medium'
              }`}
            >
              <span className="font-bold text-xs">{ts.num}</span>
              <span className="text-[11px] font-sans font-medium text-[#1E1B18]/80 truncate hidden sm:inline">
                {shortTitle}
              </span>
            </NavLink>
          );
        })}
      </div>

      {/* Two-Column Summary Card (Left: Opener & Reflection; Right: Cooperating Teacher Feedback) */}
      <section className="bg-white border border-[#E4DBD0] rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 shadow-xs">
        {/* Left Column: Context Opener & Pre-Service Teacher Reflection */}
        <div className="space-y-5">
          {/* Opener */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A] block">
              Task Sheet Context &amp; Purpose
            </span>
            <div className="text-base text-[#1E1B18] leading-relaxed font-sans">
              <SmartText text={taskSheet.opener} />
            </div>
          </div>

          {/* Reflection */}
          <div className="pt-4 border-t border-[#E4DBD0] space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
              <Sparkles className="w-4 h-4 text-[#7A1C24]" />
              <span>Teacher Reflection</span>
            </div>
            <div className="text-base text-[#1E1B18] leading-relaxed font-sans">
              <SmartText text={taskSheet.reflection} />
            </div>
          </div>
        </div>

        {/* Right Column: Cooperating Teacher Feedback & Section Accent */}
        <div className="space-y-5 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
              <MessageSquare className="w-4 h-4 text-[#7A1C24]" />
              <span>Cooperating Teacher's Feedback</span>
            </div>
            <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] text-base text-[#1E1B18] leading-relaxed">
              <SmartText text={taskSheet.ctFeedback} />
            </div>
          </div>

          {/* Section Journey Note Accent */}
          {journeyNote && (
            <div className="p-4 rounded-xl border-l-4 border-[#7A1C24] bg-white border border-[#E4DBD0] space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7A1C24] block">
                Curriculum Journey Note
              </span>
              <p className="italic text-xs text-[#1E1B18] leading-relaxed">
                "{journeyNote}"
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Full-Width Document Stage (h-[78vh] DocumentViewer) */}
      <section className="rounded-xl border border-[#E4DBD0] bg-white overflow-hidden shadow-xs flex flex-col">
        {/* Stage Header Bar */}
        <div className="px-4 py-2.5 bg-[#FAF3EB] border-b border-[#E4DBD0] flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-[#7A1C24]" />
            <span className="font-bold text-[#0F3D3A]">
              Verified Deliverable: {taskSheet.num} — {taskSheet.fullTitle || taskSheet.title}
            </span>
          </div>
          <span className="inline-flex items-center gap-1 font-semibold text-[#0F3D3A] bg-white border border-[#E4DBD0] px-2.5 py-0.5 rounded-full text-[11px]">
            Verified Document
          </span>
        </div>

        {/* Viewer Viewport */}
        <div className="h-[78vh] min-h-[78vh] w-full bg-white">
          <DocumentViewer
            url={taskSheet.pdfUrl}
            title={`${taskSheet.num} - ${taskSheet.title}`}
            height="100%"
            className="border-0 rounded-none h-full w-full min-h-[78vh]"
          />
        </div>
      </section>

      {/* TS6 Specific Instructional Materials Gallery */}
      {taskSheet.instructionalMaterials && (
        <section className="p-6 md:p-8 rounded-2xl bg-white border border-[#E4DBD0] shadow-xs space-y-6">
          <div className="flex items-center space-x-3 pb-4 border-b border-[#E4DBD0]">
            <div className="w-8 h-8 rounded-lg bg-[#0F3D3A] text-white flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0F3D3A]">
                {taskSheet.instructionalMaterials.heading}
              </h3>
              <p className="text-xs text-[#1E1B18] leading-relaxed">
                {taskSheet.instructionalMaterials.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {taskSheet.instructionalMaterials.galleries.map((gallery) => (
              <div
                key={gallery.id}
                className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0F3D3A]">{gallery.title}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#7A1C24] font-bold border border-[#E4DBD0]">
                      Artifact Slot
                    </span>
                  </div>
                  <p className="text-xs text-[#1E1B18] leading-relaxed">
                    {gallery.description}
                  </p>
                </div>

                <div className="pt-2">
                  {gallery.placeholder && gallery.placeholder.startsWith('/') ? (
                    <div className="rounded-xl overflow-hidden border border-[#E4DBD0] aspect-[16/9] bg-white flex items-center justify-center">
                      <img
                        src={assetPath(gallery.placeholder)}
                        alt={gallery.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          const fallback = e.currentTarget.parentElement?.querySelector('.img-fallback');
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                      <div className="img-fallback hidden p-4 text-center space-y-1">
                        <ImageIcon className="w-6 h-6 mx-auto text-[#7A1C24]" />
                        <p className="text-xs font-bold text-[#0F3D3A]">{gallery.title}</p>
                        <p className="text-[10px] text-[#1E1B18] font-mono">{gallery.placeholder}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-white rounded-lg border border-[#E4DBD0] text-xs text-[#1E1B18]">
                      <SmartText text={gallery.placeholder} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
