import React, { useState } from 'react';
import { User, School, BookOpen, Clock, Calendar, Users, GraduationCap, Image as ImageIcon } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import SmartText from '../components/SmartText';
import introData from '../data/introduction.json';
import assetPath from '../utils/assetPath';

export default function Introduction() {
  const { checklistItem, title, deploymentProfile, firstDay, lastDay, closing } = introData;
  const [photoError, setPhotoError] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16 font-sans">
      {/* Section Header */}
      <SectionHeader
        numeral={checklistItem}
        title={title}
        subtitle="First-day and last-day story: reflecting on the transition from student to classroom educator."
        tags={['Narrative', 'Experiential Learning', 'Deployment Profile', 'Reflection']}
      />

      {/* Student Teacher Deployment Profile Card */}
      {deploymentProfile && (
        <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#E4DBD0] pb-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#0F3D3A] text-white flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0F3D3A] leading-tight">
                  Student Teacher Deployment Profile
                </h2>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24]">
                  Field Study 2 Placement Details
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#FAF3EB] border border-[#E4DBD0] text-[#0F3D3A] text-xs font-mono font-bold">
              Practicum Record
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            {/* Portrait Container */}
            <div className="md:col-span-4 flex flex-col items-center">
              <div className="w-full max-w-[220px] aspect-[4/5] rounded-xl border border-[#E4DBD0] bg-[#FAF3EB] overflow-hidden shadow-xs relative flex items-center justify-center">
                {!photoError ? (
                  <img
                    src={assetPath(deploymentProfile.photo)}
                    alt={deploymentProfile.name}
                    className="w-full h-full object-cover"
                    onError={() => setPhotoError(true)}
                  />
                ) : (
                  <div className="p-4 text-center space-y-2 flex flex-col items-center justify-center h-full">
                    <div className="w-10 h-10 rounded-full bg-white border border-[#E4DBD0] flex items-center justify-center text-[#7A1C24] shadow-xs">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-[#0F3D3A] leading-snug">
                      Pre-Service Educator Portrait
                    </p>
                    <span className="text-[11px] text-[#7A1C24] font-medium">
                      Portrait Pending Upload
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-2 text-xs font-semibold text-[#0F3D3A] text-center">
                Pre-Service Educator Portrait
              </p>
            </div>

            {/* Profile Information Details */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A] block">
                  Candidate Name
                </span>
                <h3 className="text-xl font-bold text-[#0F3D3A]">
                  {deploymentProfile.name}
                </h3>
                <p className="text-base text-[#1E1B18] mt-0.5 leading-relaxed font-medium">
                  {deploymentProfile.program}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-[#E4DBD0]">
                <div className="p-3.5 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
                    <School className="w-3.5 h-3.5 text-[#7A1C24] shrink-0" />
                    <span>Partner School</span>
                  </div>
                  <p className="text-sm font-bold text-[#0F3D3A] leading-snug">
                    {deploymentProfile.partnerSchool}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
                    <BookOpen className="w-3.5 h-3.5 text-[#7A1C24] shrink-0" />
                    <span>Subject &amp; Grade Level</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F3D3A] leading-snug">
                    {deploymentProfile.subjectAndGrade}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
                    <GraduationCap className="w-3.5 h-3.5 text-[#7A1C24] shrink-0" />
                    <span>Cooperating Teacher</span>
                  </div>
                  <p className="text-sm font-bold text-[#0F3D3A] leading-snug">
                    {deploymentProfile.cooperatingTeacher}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-1">
                  <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
                    <Clock className="w-3.5 h-3.5 text-[#7A1C24] shrink-0" />
                    <span>Official Duty Schedule</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F3D3A] leading-snug">
                    {deploymentProfile.schedule}
                  </p>
                </div>
              </div>

              {/* Classes Handled & Observed (5 Sections Total) */}
              <div className="p-4 rounded-xl bg-white border border-[#E4DBD0] space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
                  <Users className="w-3.5 h-3.5 text-[#7A1C24] shrink-0" />
                  <span>Classes Handled &amp; Observed (5 Sections Total)</span>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  {deploymentProfile.classes.map((cls, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-1 rounded-lg border border-[#E4DBD0] bg-[#FAF3EB] flex items-center space-x-1.5 text-xs font-medium"
                    >
                      <span className="font-bold text-[#0F3D3A]">{cls.name}</span>
                      <span className="text-[11px] text-[#7A1C24] font-semibold">({cls.role})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Narrative Articles */}
      <article className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-10 shadow-xs space-y-8 font-sans">
        {/* First Day Story */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F3D3A] tracking-tight">
            {firstDay.heading}
          </h2>
          <div className="text-base leading-relaxed text-[#1E1B18]">
            <SmartText text={firstDay.text.replace(/^My first day\.\s*/, '')} />
          </div>
        </section>

        {/* Divider */}
        <hr className="border-[#E4DBD0]" />

        {/* Last Day Story */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-[#0F3D3A] tracking-tight">
            {lastDay.heading}
          </h2>
          <div className="text-base leading-relaxed text-[#1E1B18]">
            <SmartText text={lastDay.text.replace(/^My last day\.\s*/, '')} />
          </div>
        </section>

        {/* Closing Paragraph */}
        <section className="bg-[#FAF3EB] border-l-4 border-[#7A1C24] p-5 rounded-r-xl border-y border-r border-[#E4DBD0]">
          <p className="text-base font-medium text-[#0F3D3A] leading-relaxed">
            <SmartText text={closing.text} />
          </p>
        </section>
      </article>
    </div>
  );
}
