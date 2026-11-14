import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, School, BookOpen, MapPin, Award, Calendar, Sparkles } from 'lucide-react';
import homeData from '../data/home.json';
import assetPath from '../utils/assetPath';

export default function Home() {
  const { title, detailsBlock, welcome, tagline, schoolPhoto, contentsCards } = homeData;
  const [photoError, setPhotoError] = useState(false);

  // Bento span calculation matching the 12-column grid layout
  const getBentoSpan = (numeral) => {
    switch (numeral) {
      case 'V':
        return 'md:col-span-8';
      case 'VI':
        return 'md:col-span-4';
      case 'VII':
      case 'VIII':
      case 'IX':
      case 'X':
        return 'md:col-span-6';
      default: // II, III, IV
        return 'md:col-span-4';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 space-y-10 font-sans">
      {/* Top Section — Two-Column Editorial Hero */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pb-10 border-b border-[#E4DBD0]">
        {/* Left Column: Title, Metadata, Welcome (7 Cols) */}
        <div className="lg:col-span-7 bg-white border border-[#E4DBD0] rounded-xl p-6 md:p-8 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Tagline & Course Pill Strip */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FAF3EB] border border-[#E4DBD0] text-[#7A1C24] text-xs font-bold uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Field Study 2 (FS2)</span>
              </span>

              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#FAF3EB] border border-[#E4DBD0] text-[#0F3D3A] text-xs font-semibold">
                <Sparkles className="w-3 h-3 text-[#7A1C24]" />
                <span className="italic">"{tagline}"</span>
              </span>
            </div>

            {/* Main Portfolio Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#0F3D3A] tracking-tight leading-tight">
              {title}
            </h1>

            {/* Candidate & Placement Details Strip */}
            <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-[#0F3D3A]">
                  {detailsBlock.studentName}
                </span>
                <span className="text-xs font-mono font-bold text-[#7A1C24] bg-white px-2 py-0.5 rounded border border-[#E4DBD0]">
                  {detailsBlock.courseCode}
                </span>
              </div>
              <p className="text-xs text-[#1E1B18] leading-relaxed">
                {detailsBlock.program}
              </p>
              <div className="pt-2 border-t border-[#E4DBD0] flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-[#0F3D3A]">
                <span className="flex items-center gap-1 font-semibold">
                  <School className="w-3.5 h-3.5 text-[#7A1C24]" />
                  {detailsBlock.deploymentSchool}
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Calendar className="w-3.5 h-3.5 text-[#7A1C24]" />
                  {detailsBlock.schoolYearAndTerm}
                </span>
                <span className="flex items-center gap-1 font-semibold">
                  <Award className="w-3.5 h-3.5 text-[#7A1C24]" />
                  Mentor: {detailsBlock.subjectTeacherName}
                </span>
              </div>
            </div>
          </div>

          {/* Welcome Statement */}
          <div className="space-y-2 pt-2 border-t border-[#E4DBD0]">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
              Welcome Statement
            </h2>
            <p className="text-base leading-relaxed text-[#1E1B18]">
              {welcome}
            </p>
          </div>
        </div>

        {/* Right Column: Framed Campus Documentation (5 Cols) */}
        <div className="lg:col-span-5 bg-white border border-[#E4DBD0] rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E4DBD0]">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-lg bg-[#0F3D3A] text-white flex items-center justify-center">
                <School className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F3D3A] leading-tight">
                  Campus Placement
                </h3>
                <p className="text-[11px] text-[#7A1C24] font-semibold">Field Study Practicum Site</p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0]">
              Official Site
            </span>
          </div>

          {/* Framed Image */}
          <div className="relative w-full rounded-xl overflow-hidden border border-[#E4DBD0] bg-[#FAF3EB] aspect-[4/3] flex items-center justify-center">
            {!photoError ? (
              <img
                src={assetPath(schoolPhoto)}
                alt="President Diosdado Macapagal High School Campus Exterior"
                className="w-full h-full object-cover"
                onError={() => setPhotoError(true)}
              />
            ) : (
              <div className="p-6 text-center space-y-2 flex flex-col items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white border border-[#E4DBD0] flex items-center justify-center text-[#7A1C24]">
                  <School className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-[#0F3D3A]">Campus Signage &amp; Perimeter Gate</p>
                <p className="text-[11px] text-[#1E1B18] font-mono bg-white px-2 py-0.5 rounded border border-[#E4DBD0]">
                  {schoolPhoto}
                </p>
              </div>
            )}
          </div>

          {/* Campus Caption */}
          <div className="p-3.5 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] text-xs text-[#1E1B18] space-y-1">
            <div className="flex items-center space-x-1 font-bold text-[#0F3D3A]">
              <MapPin className="w-3.5 h-3.5 text-[#7A1C24]" />
              <span>President Diosdado Macapagal High School</span>
            </div>
            <p className="text-[11px] text-[#1E1B18] leading-relaxed">
              Official campus signage and perimeter gate located at General Santos Avenue, Upper Bicutan, Taguig City.
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Section — Table of Contents & Sections Directory Bento Grid */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-[#E4DBD0] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#0F3D3A]">
              Table of Contents &amp; Sections Directory
            </h2>
            <p className="text-base text-[#1E1B18] mt-0.5">
              Structured monograph sections containing verified field study deliverables and classroom records.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A] hidden sm:inline">
            {contentsCards.length} Required Sections
          </span>
        </div>

        {/* 12-Column Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {contentsCards.map((card) => {
            const spanClass = getBentoSpan(card.numeral);
            const isFeatured = card.numeral === 'V';

            return (
              <Link
                key={card.numeral}
                to={card.route}
                className={`${spanClass} group flex flex-col justify-between p-6 bg-white border border-[#E4DBD0] hover:border-[#7A1C24] rounded-xl shadow-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] ${
                  isFeatured ? 'bg-gradient-to-br from-white via-white to-[#FAF3EB]' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-[#FAF3EB] text-[#7A1C24] border border-[#E4DBD0] text-xs font-bold uppercase tracking-wider group-hover:bg-[#7A1C24] group-hover:text-white group-hover:border-[#7A1C24] transition-colors">
                      Section {card.numeral}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#0F3D3A]/40 group-hover:text-[#7A1C24] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#0F3D3A] group-hover:text-[#7A1C24] transition-colors">
                    {card.title}
                  </h3>

                  <p className="mt-2 text-base leading-relaxed text-[#1E1B18]">
                    {card.oneLinePreview}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E4DBD0] flex items-center justify-between text-xs font-semibold text-[#7A1C24]">
                  <span>Open Section Documentation</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
