import React, { useState } from 'react';
import { Mail, GraduationCap, Award, Users, Wrench, Palette, BookOpen, Sparkles, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import SmartText from '../components/SmartText';
import DocumentViewer from '../components/DocumentViewer';
import aboutData from '../data/about.json';

export default function About() {
  const { checklistItem, title, journeyNote, cv, profileCard } = aboutData;
  const [showCvPdf, setShowCvPdf] = useState(false);

  // Helper to ensure skills array format
  const formatSkills = (skills) => {
    if (Array.isArray(skills)) return skills;
    if (typeof skills === 'string') {
      return skills.split(';').map((s) => s.trim()).filter(Boolean);
    }
    return [];
  };

  const teachingSkillsList = formatSkills(profileCard.teachingSkills);
  const technicalSkillsList = formatSkills(profileCard.technicalSkills);
  const creativeSkillsList = formatSkills(profileCard.creativeSkills);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 font-sans">
      {/* Section Header with Journey Note */}
      <SectionHeader
        numeral={checklistItem}
        title={title}
        subtitle="Professional credentials, academic background, and competencies of the pre-service educator."
        tags={['Curriculum Vitae', 'Teacher Profile', 'Competency Mapping']}
        journeyNote={journeyNote}
      />

      {/* Part 1: Traditional Curriculum Vitae */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="border-b border-[#E4DBD0] pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24]">
              Document Part 1
            </span>
            <h2 className="text-xl font-bold text-[#0F3D3A] tracking-tight">Curriculum Vitae</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowCvPdf(!showCvPdf)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#7A1C24] text-white text-xs font-semibold hover:bg-[#7A1C24]/90 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showCvPdf ? 'Hide Actual CV' : 'View Actual CV (PDF)'}</span>
              {showCvPdf ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0]">
              Traditional CV
            </span>
          </div>
        </div>

        {/* Collapsible Inline CV DocumentViewer */}
        {showCvPdf && (
          <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-3 transition-all duration-300">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#0F3D3A]">
                Official Curriculum Vitae PDF Artifact
              </span>
              <span className="text-xs text-[#7A1C24] font-semibold font-mono">/pdfs/cv.pdf</span>
            </div>
            <div className="h-[650px] rounded-lg overflow-hidden border border-[#E4DBD0] bg-white">
              <DocumentViewer
                url={cv.cvPdfUrl || '/pdfs/cv.pdf'}
                title="Emmanuel P. Ferrer - Curriculum Vitae"
                height="650px"
              />
            </div>
          </div>
        )}

        {/* Identity & Contact Header */}
        <div className="p-6 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-[#0F3D3A]">{cv.name}</h3>
            <p className="text-base text-[#1E1B18] mt-0.5 font-medium">
              Pre-Service Teacher &amp; ICT Computer Programming Specialist
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs font-mono bg-white px-3 py-2 rounded-lg border border-[#E4DBD0] text-[#0F3D3A]">
            <Mail className="w-4 h-4 text-[#7A1C24]" />
            <a href={`mailto:${cv.contact}`} className="hover:text-[#7A1C24] underline font-medium">
              {cv.contact}
            </a>
          </div>
        </div>

        {/* Education History */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[#0F3D3A] font-bold text-lg">
            <GraduationCap className="w-5 h-5 text-[#7A1C24]" />
            <h3 className="text-lg font-bold text-[#0F3D3A]">Education</h3>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] leading-relaxed text-base text-[#1E1B18]">
            <SmartText text={cv.education} />
          </div>
        </div>

        {/* Seminars and Trainings */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[#0F3D3A] font-bold text-lg">
            <Award className="w-5 h-5 text-[#7A1C24]" />
            <h3 className="text-lg font-bold text-[#0F3D3A]">Seminars and Trainings</h3>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] leading-relaxed text-base text-[#1E1B18]">
            <SmartText text={cv.seminarsAndTrainings} />
          </div>
        </div>

        {/* Leadership */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-[#0F3D3A] font-bold text-lg">
            <Users className="w-5 h-5 text-[#7A1C24]" />
            <h3 className="text-lg font-bold text-[#0F3D3A]">Leadership</h3>
          </div>

          <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] leading-relaxed text-base text-[#1E1B18]">
            <SmartText text={cv.leadership} />
          </div>
        </div>
      </section>

      {/* Part 2: Teacher Profile Card */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
        <div className="border-b border-[#E4DBD0] pb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24]">
              Document Part 2
            </span>
            <h2 className="text-xl font-bold text-[#0F3D3A] tracking-tight">Teacher Profile Card</h2>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0]">
            Competencies &amp; Skills
          </span>
        </div>

        {/* Core Strengths */}
        <div className="p-5 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-1">
          <div className="flex items-center space-x-2 text-[#7A1C24] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Core Strengths</span>
          </div>
          <p className="text-xl font-bold text-[#0F3D3A]">
            <SmartText text={profileCard.strengths} />
          </p>
        </div>

        {/* Skills Grid - Clean Vertical Bullet Lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Teaching Skills */}
          <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] shadow-xs space-y-3 flex flex-col">
            <div className="flex items-center space-x-2 text-[#0F3D3A] border-b border-[#E4DBD0] pb-2">
              <BookOpen className="w-4 h-4 text-[#7A1C24] shrink-0" />
              <h3 className="text-sm font-bold text-[#7A1C24]">Teaching Skills</h3>
            </div>
            <ul className="space-y-2 flex-1 text-sm text-[#1E1B18] leading-relaxed">
              {teachingSkillsList.map((skill, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C24] mt-2 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Skills */}
          <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] shadow-xs space-y-3 flex flex-col">
            <div className="flex items-center space-x-2 text-[#0F3D3A] border-b border-[#E4DBD0] pb-2">
              <Wrench className="w-4 h-4 text-[#7A1C24] shrink-0" />
              <h3 className="text-sm font-bold text-[#7A1C24]">Technical Skills</h3>
            </div>
            <ul className="space-y-2 flex-1 text-sm text-[#1E1B18] leading-relaxed">
              {technicalSkillsList.map((skill, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C24] mt-2 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Creative Skills */}
          <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] shadow-xs space-y-3 flex flex-col">
            <div className="flex items-center space-x-2 text-[#0F3D3A] border-b border-[#E4DBD0] pb-2">
              <Palette className="w-4 h-4 text-[#7A1C24] shrink-0" />
              <h3 className="text-sm font-bold text-[#7A1C24]">Creative Skills</h3>
            </div>
            <ul className="space-y-2 flex-1 text-sm text-[#1E1B18] leading-relaxed">
              {creativeSkillsList.map((skill, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7A1C24] mt-2 shrink-0" />
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
