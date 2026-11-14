import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Menu, X, ArrowUpRight, Home, LayoutGrid, ArrowUp } from 'lucide-react';
import { VISIBLE_SECTIONS, getAdjacentSections } from './navigation';

// Section V Curriculum Task Sheets metadata for persistent header switcher
const CURRICULUM_TASK_SHEETS = [
  { id: 'ts2', num: 'TS2', shortTitle: 'DLL', path: '/curriculum/ts2' },
  { id: 'ts3', num: 'TS3', shortTitle: 'Competencies', path: '/curriculum/ts3' },
  { id: 'ts4', num: 'TS4', shortTitle: 'Management', path: '/curriculum/ts4' },
  { id: 'ts5', num: 'TS5', shortTitle: 'Lesson Log', path: '/curriculum/ts5' },
  { id: 'ts6', num: 'TS6', shortTitle: 'Lesson Plans', path: '/curriculum/ts6' },
  { id: 'ts7', num: 'TS7', shortTitle: 'Assessment', path: '/curriculum/ts7' },
];

export default function SidebarLayout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const prevPathRef = useRef(location.pathname);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  const currentSection =
    VISIBLE_SECTIONS.find((s) => s.path === currentPath) ||
    VISIBLE_SECTIONS.find((s) => s.path !== '/' && currentPath.startsWith(s.path));
  const baseSectionPath = currentSection ? currentSection.path : currentPath;
  const { prev, next } = getAdjacentSections(baseSectionPath);
  const isSubpage = currentPath !== '/';

  // Section V Curriculum route & active Task Sheet detection
  const isCurriculumRoute = currentPath.startsWith('/curriculum');
  const activeCurriculumTsId = isCurriculumRoute
    ? (currentPath.split('/')[2]?.toLowerCase() || 'ts2')
    : null;
  const taskSheetSegment = activeCurriculumTsId ? activeCurriculumTsId.toUpperCase() : null;

  // Track scroll progress and scroll positions for adaptive header & back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentY = window.scrollY;

      if (totalHeight > 0) {
        setScrollProgress((currentY / totalHeight) * 100);
      } else {
        setScrollProgress(0);
      }

      setIsScrolled(currentY > 50);
      setShowBackToTop(currentY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close drawer when path changes, and scroll to top unless navigating between curriculum task sheets
  useEffect(() => {
    setDrawerOpen(false);

    const wasInCurriculum = prevPathRef.current.startsWith('/curriculum');
    const isInCurriculum = location.pathname.startsWith('/curriculum');

    if (wasInCurriculum && isInCurriculum) {
      // Intra-curriculum navigation (e.g. TS2 to TS3): preserve vertical scroll position
    } else {
      // Inter-section transition: scroll cleanly to top
      window.scrollTo(0, 0);
    }

    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <div className="min-h-screen bg-[#FAF3EB] text-[#1E1B18] font-sans flex flex-col relative">
      {/* 3px Maroon Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-[#7A1C24] transition-all duration-75 ease-out z-50 pointer-events-none"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      {/* Adaptive Shrinking Sticky Top Header */}
      <header
        className={`sticky top-0 z-40 border-b border-[#E4DBD0] transition-all duration-300 shrink-0 flex flex-col justify-center ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-xs'
            : 'bg-[#FAF3EB]/95 backdrop-blur-md'
        }`}
      >
        {/* Main Header Bar */}
        <div
          className={`w-full flex items-center justify-between px-6 md:px-10 transition-all duration-300 ${
            isScrolled ? 'h-14 md:h-16' : 'h-20 md:h-24'
          }`}
        >
          {/* Left: Identity Lockup & Prominent Active Section Title */}
          <div className="flex items-center space-x-3 md:space-x-5 overflow-hidden">
            <Link
              to="/"
              className="flex items-center space-x-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] rounded-xl p-1"
            >
              {/* Animated Icon Container */}
              <div
                className={`rounded-xl bg-[#0F3D3A] text-white flex items-center justify-center shadow-xs group-hover:bg-[#7A1C24] transition-all duration-300 shrink-0 ${
                  isScrolled ? 'w-8 h-8 rounded-lg' : 'w-11 h-11 rounded-xl'
                }`}
              >
                <BookOpen className={`transition-all duration-300 ${isScrolled ? 'w-4 h-4' : 'w-5 h-5'}`} />
              </div>

              {/* Portfolio Title & Pre-Service Teacher Subtitle */}
              <div className="text-left hidden sm:block">
                <h1
                  className={`font-bold tracking-tight text-[#0F3D3A] leading-tight group-hover:text-[#7A1C24] transition-all duration-300 ${
                    isScrolled ? 'text-base md:text-lg' : 'text-xl md:text-2xl'
                  }`}
                >
                  Field Study 2 · E-Portfolio
                </h1>
                {!isScrolled && (
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#7A1C24] mt-0.5 transition-all duration-300">
                    Emmanuel P. Ferrer · PDMHS
                  </p>
                )}
              </div>
            </Link>

            {/* Prominent Active Section Title Separated by Vertical Hairline Divider */}
            {isSubpage && currentPath !== '/completeness' && currentSection && (
              <div className="flex items-center border-l-2 border-[#E4DBD0] pl-4 md:pl-5 py-1 min-w-0 transition-all duration-300">
                <div className="text-left truncate">
                  {!isScrolled && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#0F3D3A] block">
                      Active Section
                    </span>
                  )}
                  <h2
                    className={`font-bold tracking-tight text-[#7A1C24] leading-tight truncate transition-all duration-300 ${
                      isScrolled
                        ? 'text-sm sm:text-base md:text-lg'
                        : 'text-lg sm:text-xl md:text-2xl'
                    }`}
                  >
                    {taskSheetSegment ? (
                      <>
                        <span>{currentSection.numeral}. {currentSection.title}</span>
                        <span className="text-[#E4DBD0] mx-2">/</span>
                        <span className="font-mono text-[#0F3D3A]">{taskSheetSegment}</span>
                      </>
                    ) : (
                      `${currentSection.numeral}. ${currentSection.title}`
                    )}
                  </h2>
                </div>
              </div>
            )}
          </div>

          {/* Right: Persistent Overview & Sections (I–X) Buttons Side-by-Side */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* 1. Always-Visible Overview Button */}
            <Link
              to="/"
              className={`font-semibold border transition-all duration-300 flex items-center gap-2 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] ${
                isScrolled ? 'px-3 py-1.5 rounded-lg text-xs' : 'px-4 py-2.5 rounded-xl text-sm'
              } ${
                !isSubpage
                  ? 'bg-[#0F3D3A] text-white border-[#0F3D3A]'
                  : 'bg-white text-[#0F3D3A] border-[#E4DBD0] hover:border-[#7A1C24] hover:text-[#7A1C24]'
              }`}
              title="Return to Portfolio Overview & Table of Contents"
            >
              <LayoutGrid className={isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'} />
              <span className="hidden sm:inline">Overview</span>
            </Link>

            {/* 2. Persistent Sections (I–X) Drawer Trigger Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open Sections Directory"
              className={`font-semibold bg-white text-[#1E1B18] border border-[#E4DBD0] hover:border-[#0F3D3A] hover:text-[#0F3D3A] transition-all duration-300 flex items-center gap-2 shadow-xs cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] ${
                isScrolled ? 'px-3 py-1.5 rounded-lg text-xs' : 'px-4 py-2.5 rounded-xl text-sm'
              }`}
            >
              <Menu className={`text-[#7A1C24] ${isScrolled ? 'w-3.5 h-3.5' : 'w-4 h-4'}`} />
              <span>Sections (I–X)</span>
            </button>
          </div>
        </div>

        {/* Persistent Section V Task Sheet Switcher (TS2–TS7) */}
        {isCurriculumRoute && (
          <div
            className={`w-full border-t border-[#E4DBD0]/80 py-2 px-6 md:px-10 flex items-center justify-between gap-3 overflow-x-auto transition-colors shrink-0 ${
              isScrolled ? 'bg-white/95' : 'bg-[#FAF3EB]/90'
            }`}
          >
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F3D3A] shrink-0 hidden sm:inline">
                Jump to Task Sheet:
              </span>
              <span className="text-[11px] font-mono font-bold text-[#7A1C24] bg-white px-2 py-0.5 rounded border border-[#E4DBD0] shrink-0">
                Part V
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {CURRICULUM_TASK_SHEETS.map((ts) => {
                const isTsActive = activeCurriculumTsId === ts.id;
                return (
                  <Link
                    key={ts.id}
                    to={ts.path}
                    preventScrollReset
                    className={`font-mono text-xs shrink-0 transition-all ${
                      isTsActive
                        ? 'bg-[#7A1C24] text-white border border-[#7A1C24] font-bold px-3 py-1 rounded-lg shadow-2xs'
                        : 'bg-white text-[#0F3D3A] border border-[#E4DBD0] hover:border-[#7A1C24] hover:text-[#7A1C24] font-semibold px-3 py-1 rounded-lg'
                    }`}
                  >
                    <span>{ts.num}</span>
                    <span className="font-sans font-normal ml-1 hidden md:inline text-[11px]">
                      · {ts.shortTitle}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Enlarged Blurred Left & Right Adjacent Section Peeks (Desktop Viewports on Subpages) */}
      {isSubpage && currentPath !== '/completeness' && (
        <>
          {/* Left Margin Peek: Previous Section */}
          {prev && (
            <Link
              to={prev.path}
              className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-30 w-72 2xl:w-80 min-h-[240px] p-6 flex-col justify-between rounded-2xl bg-white/95 border border-[#E4DBD0] shadow-xs blur-[2px] opacity-65 scale-95 hover:blur-none hover:opacity-100 hover:scale-100 hover:border-[#7A1C24] hover:shadow-md transition-all duration-300 group cursor-pointer text-left"
              aria-label={`Go to previous section: ${prev.numeral}. ${prev.title}`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] flex items-center gap-1.5 mb-2">
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Section</span>
                </span>
                <h3 className="text-xl font-extrabold text-[#0F3D3A] group-hover:text-[#7A1C24] transition-colors leading-tight">
                  {prev.numeral}. {prev.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1B18] line-clamp-3 mt-2 font-normal">
                  {prev.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[#E4DBD0] flex items-center text-xs font-bold text-[#7A1C24]">
                <span>Jump to Section</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          )}

          {/* Right Margin Peek: Next Section */}
          {next && (
            <Link
              to={next.path}
              className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-30 w-72 2xl:w-80 min-h-[240px] p-6 flex-col justify-between rounded-2xl bg-white/95 border border-[#E4DBD0] shadow-xs blur-[2px] opacity-65 scale-95 hover:blur-none hover:opacity-100 hover:scale-100 hover:border-[#7A1C24] hover:shadow-md transition-all duration-300 group cursor-pointer text-right"
              aria-label={`Go to next section: ${next.numeral}. ${next.title}`}
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] flex items-center justify-end gap-1.5 mb-2">
                  <span>Next Section</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <h3 className="text-xl font-extrabold text-[#0F3D3A] group-hover:text-[#7A1C24] transition-colors leading-tight">
                  {next.numeral}. {next.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#1E1B18] line-clamp-3 mt-2 font-normal">
                  {next.description}
                </p>
              </div>
              <div className="pt-3 border-t border-[#E4DBD0] flex items-center justify-end text-xs font-bold text-[#7A1C24]">
                <span>Jump to Section</span>
                <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          )}
        </>
      )}

      {/* Minimal Floating "Scroll to Top" Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll back to top"
        title="Back to top"
        className={`fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-white border border-[#E4DBD0] text-[#0F3D3A] hover:border-[#7A1C24] hover:text-[#7A1C24] shadow-sm flex items-center justify-center transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A] ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-3 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Slide-Over Sections Drawer Backdrop */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 transition-opacity duration-300 ease-out"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Slide-Over Sections Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-80 sm:w-96 bg-white border-l border-[#E4DBD0] shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Portfolio Sections Directory"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#E4DBD0] flex items-center justify-between bg-[#FAF3EB]/50">
          <div>
            <div className="flex items-center space-x-2 text-[#7A1C24]">
              <BookOpen className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Field Study 2
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#0F3D3A]">Table of Contents</h2>
            <p className="text-xs text-[#1E1B18]/70">Complete 10-Section Navigation</p>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close sections directory"
            className="p-1.5 rounded-lg text-[#0F3D3A] hover:text-[#7A1C24] hover:bg-white border border-transparent hover:border-[#E4DBD0] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sections Scrollable List */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 font-sans">
          {VISIBLE_SECTIONS.map((section) => (
            <NavLink
              key={section.id}
              to={section.path}
              end={section.path === '/'}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                `group flex items-start p-3 rounded-xl border transition-all ${
                  isActive
                    ? 'bg-[#FAF3EB] border-[#7A1C24] text-[#7A1C24] font-bold shadow-xs'
                    : 'bg-white border-[#E4DBD0] hover:border-[#0F3D3A]/40 hover:bg-[#FAF3EB]/40 text-[#0F3D3A]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 mr-3 transition-colors ${
                      isActive
                        ? 'bg-[#7A1C24] text-white'
                        : 'bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0] group-hover:bg-[#0F3D3A] group-hover:text-white'
                    }`}
                  >
                    {section.numeral}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`text-sm leading-snug truncate ${isActive ? 'font-bold text-[#7A1C24]' : 'font-semibold text-[#0F3D3A] group-hover:text-[#7A1C24]'}`}>
                        {section.title}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
                    </div>
                    <p className="text-xs text-[#1E1B18]/70 line-clamp-1 mt-0.5 font-normal">
                      {section.description}
                    </p>
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-[#E4DBD0] bg-[#FAF3EB]/50 flex items-center justify-between text-xs">
          <Link
            to="/"
            onClick={() => setDrawerOpen(false)}
            className="flex items-center space-x-1.5 font-bold text-[#0F3D3A] hover:text-[#7A1C24] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Overview</span>
          </Link>
          <span className="font-mono text-[#7A1C24] font-semibold text-[11px]">
            AY 2026–2027
          </span>
        </div>
      </aside>

      {/* Main Viewport Content Area
          - On Overview ('/'): standard vertical container (Home provides max-w-6xl mx-auto px-6 md:px-10 py-10)
          - On Subpages: xl:px-80 2xl:px-96 so enlarged side peeks never overlap central content */}
      <main
        className={`flex-1 w-full mx-auto transition-all ${
          isSubpage && currentPath !== '/completeness'
            ? 'max-w-[1920px] px-4 sm:px-6 lg:px-8 xl:px-80 2xl:px-96 py-8 md:py-10'
            : 'w-full'
        }`}
      >
        <Outlet />

        {/* Subpage Bottom Next/Previous Pagination (Suppressed on Overview '/', Visible only on mobile/tablet below xl) */}
        {isSubpage && currentPath !== '/completeness' && (
          <div className="mt-16 pt-8 border-t border-[#E4DBD0] max-w-5xl mx-auto flex xl:hidden flex-col sm:flex-row items-center justify-between gap-4 font-sans">
            {prev ? (
              <Link
                to={prev.path}
                className="group flex flex-col p-4 rounded-xl border border-[#E4DBD0] bg-white hover:border-[#7A1C24] transition-all text-left w-full sm:w-1/2 max-w-sm shadow-xs"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A] flex items-center mb-1">
                  <ChevronLeft className="w-3.5 h-3.5 mr-1 group-hover:-translate-x-0.5 transition-transform text-[#7A1C24]" />
                  Previous Section
                </span>
                <span className="text-base font-bold text-[#0F3D3A] group-hover:text-[#7A1C24] transition-colors">
                  {prev.numeral}. {prev.title}
                </span>
              </Link>
            ) : (
              <div className="w-full sm:w-1/2 max-w-sm" />
            )}

            {next ? (
              <Link
                to={next.path}
                className="group flex flex-col p-4 rounded-xl border border-[#E4DBD0] bg-white hover:border-[#7A1C24] transition-all text-right w-full sm:w-1/2 max-w-sm shadow-xs ml-auto"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0F3D3A] flex items-center justify-end mb-1">
                  Next Section
                  <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 transition-transform text-[#7A1C24]" />
                </span>
                <span className="text-base font-bold text-[#0F3D3A] group-hover:text-[#7A1C24] transition-colors">
                  {next.numeral}. {next.title}
                </span>
              </Link>
            ) : (
              <div className="w-full sm:w-1/2 max-w-sm" />
            )}
          </div>
        )}
      </main>
    </div>
  );
}
