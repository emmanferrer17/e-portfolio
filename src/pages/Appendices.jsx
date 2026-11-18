import React from 'react';
import { Clock, FileText } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import DocumentViewer from '../components/DocumentViewer';
import SmartText from '../components/SmartText';
import appendicesData from '../data/appendices.json';

export default function Appendices() {
  const {
    checklistItem,
    title,
    journeyNote,
    weeklyMentoringForms,
    dailyTimeRecord,
  } = appendicesData;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 font-sans">
      {/* Section Header with Journey Note */}
      <SectionHeader
        numeral={checklistItem}
        title={title}
        subtitle="Supporting documentary evidence, mentoring feedback records, and official practicum time logs."
        tags={['Appendices', 'Mentoring Forms', 'Time Records', 'Course Deliverables']}
        journeyNote={journeyNote}
      />

      {/* 1. Compiled Weekly Mentoring Forms (WMF) */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="border-b border-[#E4DBD0] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F3D3A] text-white flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-[#0F3D3A] tracking-tight">
                {weeklyMentoringForms.title}
              </h2>
            </div>
            <p className="text-base text-[#1E1B18] mt-1">
              {weeklyMentoringForms.description}
            </p>
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0] shrink-0">
            Official WMF Compilation
          </span>
        </div>

        {/* Full-width WMF PDF DocumentViewer */}
        <div className="rounded-xl border border-[#E4DBD0] bg-white overflow-hidden shadow-xs flex flex-col">
          <div className="px-4 py-2 bg-[#FAF3EB] border-b border-[#E4DBD0] flex items-center justify-between text-xs">
            <span className="font-bold text-[#0F3D3A]">{weeklyMentoringForms.title}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#0F3D3A] bg-white border border-[#E4DBD0] px-2.5 py-0.5 rounded-full text-[11px]">
              Verified Document
            </span>
          </div>
          <div className="h-[78vh] min-h-[620px] w-full bg-white">
            <DocumentViewer
              url={weeklyMentoringForms.pdfUrl}
              title={weeklyMentoringForms.title}
              height="100%"
              className="border-0 rounded-none h-full w-full"
            />
          </div>
        </div>
      </section>

      {/* 2. Daily Time Record (DTR) */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="border-b border-[#E4DBD0] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F3D3A] text-white flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <h2 className="text-xl font-bold text-[#0F3D3A] tracking-tight">
                {dailyTimeRecord.title}
              </h2>
            </div>
            <p className="text-base text-[#1E1B18] mt-1">
              {dailyTimeRecord.description}
            </p>
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0] shrink-0">
            Official DTR Record
          </span>
        </div>

        {/* Full-width DTR PDF DocumentViewer */}
        <div className="rounded-xl border border-[#E4DBD0] bg-white overflow-hidden shadow-xs flex flex-col">
          <div className="px-4 py-2 bg-[#FAF3EB] border-b border-[#E4DBD0] flex items-center justify-between text-xs">
            <span className="font-bold text-[#0F3D3A]">{dailyTimeRecord.title}</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#0F3D3A] bg-white border border-[#E4DBD0] px-2.5 py-0.5 rounded-full text-[11px]">
              Verified Document
            </span>
          </div>
          <div className="h-[78vh] min-h-[620px] w-full bg-white">
            <DocumentViewer
              url={dailyTimeRecord.pdfUrl}
              title={dailyTimeRecord.title}
              height="100%"
              className="border-0 rounded-none h-full w-full"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
