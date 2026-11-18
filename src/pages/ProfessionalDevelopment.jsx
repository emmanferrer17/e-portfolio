import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Lightbulb, Video, Calendar, User, FileText, ArrowRight, Award, ChevronDown, ChevronUp, ZoomIn, X, CheckCircle2 } from 'lucide-react';
import SectionHeader from '../components/SectionHeader';
import QuoteCard from '../components/QuoteCard';
import RoleCard from '../components/RoleCard';
import DocumentViewer from '../components/DocumentViewer';
import SmartText from '../components/SmartText';
import assetPath from '../utils/assetPath';
import { buildDynamicSlides } from '../utils/carouselAssets';
import pdData from '../data/professional-development.json';

export default function ProfessionalDevelopment() {
  const { checklistItem, title, journeyNote, overview, ts9, ts10, visualCertificates = [], attendanceCertificates = [] } = pdData;
  const fallbackWebinar = ts9.webinarImages || [];
  const webinarSlides = buildDynamicSlides(
    'webinar',
    fallbackWebinar,
    'Webinar & Training Documentation'
  );

  const [showTs9Pdf, setShowTs9Pdf] = useState(false);
  const [showTs10Pdf, setShowTs10Pdf] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16 font-sans">
      {/* Section Header with Journey Note */}
      <SectionHeader
        numeral={checklistItem}
        title={title}
        subtitle={overview}
        tags={['Webinar Learnings', 'Practicum Support', 'Certificates of Participation', 'TS9 & TS10']}
        journeyNote={journeyNote}
      />

      {/* Part 1: TS9 - Learnings from the Professional Webinar */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6 font-sans">
        <div className="border-b border-[#E4DBD0] pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24]">
              {ts9.num} Deliverable
            </span>
            <h2 className="text-xl font-bold text-[#0F3D3A] tracking-tight">{ts9.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowTs9Pdf(!showTs9Pdf)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#7A1C24] text-white text-xs font-semibold hover:bg-[#7A1C24]/90 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTs9Pdf ? 'Hide TS9 PDF' : 'View TS9 PDF'}</span>
              {showTs9Pdf ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0]">
              External Webinar
            </span>
          </div>
        </div>

        {/* Collapsible Inline TS9 DocumentViewer */}
        {showTs9Pdf && (
          <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#0F3D3A]">
                TS9: Webinar Reflection and Learnings Form
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#0F3D3A] bg-white border border-[#E4DBD0] px-2.5 py-0.5 rounded-full text-[11px]">
                Verified Form
              </span>
            </div>
            <div className="h-[650px] rounded-lg overflow-hidden border border-[#E4DBD0] bg-white">
              <DocumentViewer
                url={ts9.pdfUrl || '/pdfs/ts9-professional-development.pdf'}
                title="TS9 - Professional Webinar Learnings"
                height="650px"
              />
            </div>
          </div>
        )}

        {/* Webinar Details Context Strip */}
        <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#0F3D3A]">
          <div className="flex items-center space-x-2">
            <Video className="w-4 h-4 text-[#7A1C24] shrink-0" />
            <div>
              <span className="block text-[11px] uppercase font-bold text-[#7A1C24]">Topic</span>
              <span className="text-sm font-bold text-[#0F3D3A]">{ts9.webinarTitle}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-[#0F3D3A] shrink-0" />
            <div>
              <span className="block text-[11px] uppercase font-bold text-[#7A1C24]">Resource Speaker</span>
              <span className="text-sm font-semibold text-[#0F3D3A]">{ts9.speaker}</span>
              <span className="text-xs text-[#1E1B18] block font-medium">({ts9.organizer})</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-[#0F3D3A] shrink-0" />
            <div>
              <span className="block text-[11px] uppercase font-bold text-[#7A1C24]">Date &amp; Timeline</span>
              <span className="text-sm font-semibold text-[#0F3D3A]">{ts9.date}</span>
            </div>
          </div>
        </div>

        {/* Standout TS9 QuoteCard */}
        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A] block">
            Core Webinar Citation
          </span>
          <div className="border border-[#E4DBD0] rounded-2xl p-1 bg-[#FAF3EB] shadow-xs">
            <QuoteCard
              quote={ts9.quote}
              author={ts9.speaker}
              role={ts9.organizer}
              context={ts9.webinarTitle}
              date={ts9.date}
              className="bg-transparent border-0 shadow-none p-6 md:p-8"
            />
          </div>
        </div>

        {/* Reaction and Application */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-5 rounded-xl bg-white border border-[#E4DBD0] shadow-xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-[#7A1C24] font-bold text-sm">
                <Lightbulb className="w-4 h-4" />
                <span>My Reaction</span>
              </div>
              <div className="text-base text-[#1E1B18] leading-relaxed">
                <SmartText text={ts9.reaction} />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#FAF3EB] border-l-4 border-[#7A1C24] border-y border-r border-[#E4DBD0] shadow-xs space-y-2 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2 text-[#0F3D3A] font-bold text-sm">
                <BookOpen className="w-4 h-4 text-[#7A1C24]" />
                <span>Classroom Application</span>
              </div>
              <div className="text-base text-[#1E1B18] leading-relaxed">
                <SmartText text={ts9.applicationInClass} />
              </div>
            </div>
          </div>
        </div>

        {/* Top 3 Learnings List */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
            Top 3 Pedagogical Learnings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ts9.topLearnings.map((learning, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] shadow-xs flex items-start space-x-3"
              >
                <div className="w-6 h-6 rounded-full bg-[#7A1C24] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <div className="text-sm text-[#1E1B18] leading-relaxed">
                  <SmartText text={learning} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* British Council Webinar Image Carousel */}
        {webinarSlides.length > 0 && (
          <div className="space-y-3 pt-4 border-t border-[#E4DBD0]">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
                British Council Webinar Documentation Photos ({webinarSlides.length} Images)
              </h3>
              <span className="text-xs text-[#7A1C24] font-semibold">Scroll horizontally</span>
            </div>
            <div
              className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scroll-smooth"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {webinarSlides.map((slide, idx) => (
                <div
                  key={idx}
                  className="h-56 w-72 shrink-0 snap-start rounded-xl overflow-hidden border border-[#E4DBD0] shadow-xs bg-[#FAF3EB] relative group cursor-pointer"
                  onClick={() => setZoomImage({ src: assetPath(slide.src), title: slide.title || `British Council Webinar Photo ${idx + 1}` })}
                >
                  <img
                    src={assetPath(slide.src)}
                    alt={slide.title || `British Council Webinar — Photo ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.webinar-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="webinar-fallback hidden h-full w-full flex flex-col items-center justify-center p-4 text-center bg-[#FAF3EB]">
                    <Video className="w-8 h-8 text-[#7A1C24] mb-1" />
                    <p className="text-xs font-semibold text-[#0F3D3A]">{slide.title || `Photo ${idx + 1}`}</p>
                    <span className="text-[10px] text-[#7A1C24] font-medium">Pending Upload</span>
                  </div>
                  <div className="absolute inset-0 bg-[#0F3D3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Part 2: TS10 - School Activity Participation */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6 font-sans">
        <div className="border-b border-[#E4DBD0] pb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24]">
              {ts10.num} Deliverable
            </span>
            <h2 className="text-xl font-bold text-[#0F3D3A] tracking-tight">{ts10.title}</h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowTs10Pdf(!showTs10Pdf)}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#7A1C24] text-white text-xs font-semibold hover:bg-[#7A1C24]/90 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{showTs10Pdf ? 'Hide TS10 PDF' : 'View TS10 PDF'}</span>
              {showTs10Pdf ? <ChevronUp className="w-3.5 h-3.5 ml-0.5" /> : <ChevronDown className="w-3.5 h-3.5 ml-0.5" />}
            </button>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0]">
              School Assistance
            </span>
          </div>
        </div>

        {/* Collapsible Inline TS10 DocumentViewer */}
        {showTs10Pdf && (
          <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-wider text-[#0F3D3A]">
                TS10: School Activity Participation Verification Form
              </span>
              <span className="inline-flex items-center gap-1 font-semibold text-[#0F3D3A] bg-white border border-[#E4DBD0] px-2.5 py-0.5 rounded-full text-[11px]">
                Verified Form
              </span>
            </div>
            <div className="h-[650px] rounded-lg overflow-hidden border border-[#E4DBD0] bg-white">
              <DocumentViewer
                url={ts10.pdfUrl || '/pdfs/ts10-school-activity.pdf'}
                title="TS10 - School Activity Participation"
                height="650px"
              />
            </div>
          </div>
        )}

        {/* Assigned Roles & Activities */}
        <RoleCard
          title={ts10.heading}
          role={ts10.role}
          period={ts10.period}
          tag="TS10 Practicum Assistance"
          description="Active co-teaching, paperwork verification, and classroom management rendered on-site during Field Study 2 placement."
          responsibilities={ts10.activities}
          className="p-6 md:p-8 bg-white border-[#E4DBD0]"
        />

        {/* Mentoring Note & Appendices Link */}
        <div className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
          <div className="flex items-center space-x-2 text-[#0F3D3A] font-medium">
            <FileText className="w-4 h-4 text-[#7A1C24] shrink-0" />
            <span className="text-[#1E1B18]">{ts10.mentoringNote}</span>
          </div>
          <Link
            to="/appendices"
            className="inline-flex items-center space-x-1 font-bold text-[#7A1C24] hover:underline shrink-0"
          >
            <span>View Mentoring Forms in Appendices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Part 3: Compact 3-Column Certificate Gallery with Modal */}
      <section className="bg-white border border-[#E4DBD0] rounded-2xl p-6 md:p-8 shadow-xs space-y-6 font-sans">
        <div className="border-b border-[#E4DBD0] pb-4 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0F3D3A] text-white flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0F3D3A]">Certificates of Participation and Completion</h2>
              <p className="text-base text-[#1E1B18] mt-0.5">Professional training and pedagogical seminar credentials.</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0]">
            Verified Credentials
          </span>
        </div>

        {/* Visual Certificates: Compact 3-Column Uniform Height Grid */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
            Pedagogical &amp; Instructional Technology Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {visualCertificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setZoomImage({ src: assetPath(cert.imageSrc), title: cert.title, subtitle: cert.organization })}
                className="group rounded-xl border border-[#E4DBD0] bg-white overflow-hidden shadow-xs hover:border-[#7A1C24] transition-all cursor-pointer flex flex-col justify-between"
              >
                {/* Fixed aspect photo container */}
                <div className="relative w-full aspect-[4/3] bg-[#FAF3EB] flex items-center justify-center overflow-hidden border-b border-[#E4DBD0]">
                  <img
                    src={assetPath(cert.imageSrc)}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      const fallback = e.currentTarget.parentElement?.querySelector('.cert-fallback');
                      if (fallback) fallback.classList.remove('hidden');
                    }}
                  />
                  <div className="cert-fallback hidden p-4 text-center space-y-1">
                    <Award className="w-8 h-8 text-[#7A1C24] mx-auto" />
                    <p className="text-xs font-bold text-[#0F3D3A]">{cert.organization}</p>
                    <p className="text-[10px] text-[#1E1B18]">{cert.imageSrc}</p>
                  </div>
                  <div className="absolute inset-0 bg-[#0F3D3A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1C24] block">
                    {cert.organization}
                  </span>
                  <h4 className="text-sm font-bold text-[#0F3D3A] group-hover:text-[#7A1C24] transition-colors line-clamp-2">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-[#1E1B18] font-medium pt-0.5">
                    {cert.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Text-Based Attendance Badges */}
        <div className="pt-4 border-t border-[#E4DBD0] space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A]">
            Additional Seminars &amp; Community Training Attendance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {attendanceCertificates.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-[#FAF3EB] border border-[#E4DBD0] flex items-start space-x-3"
              >
                <div className="w-8 h-8 rounded-lg bg-white border border-[#E4DBD0] flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#7A1C24]" />
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C24]">
                      {item.organization}
                    </span>
                    <span className="text-[10px] bg-white border border-[#E4DBD0] text-[#0F3D3A] px-2 py-0.5 rounded font-mono font-semibold">
                      {item.type}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-[#0F3D3A] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#1E1B18] font-medium">
                    {item.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Click-to-Zoom Certificate Modal */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-[#E4DBD0]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-[#0F3D3A] text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold">{zoomImage.title}</h3>
                {zoomImage.subtitle && (
                  <p className="text-xs text-[#FAF3EB]/80">{zoomImage.subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => setZoomImage(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-white transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-1 p-4 bg-[#FAF3EB] flex items-center justify-center overflow-auto max-h-[75vh]">
              <img
                src={zoomImage.src}
                alt={zoomImage.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-xs border border-[#E4DBD0]"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
