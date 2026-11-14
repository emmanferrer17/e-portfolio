import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, FileText, Search, ShieldAlert, Sparkles, Filter } from 'lucide-react';
import PlaceholderChip from '../components/PlaceholderChip';

// Step 2: Import all JSON files from src/data via import.meta.glob
const jsonModules = import.meta.glob('/src/data/*.json', { eager: true });

// Friendly Section Titles matching course checklist
const SECTION_NAMES = {
  'home.json': 'Section I: Home Page (home.json)',
  'introduction.json': 'Section II: Introduction (introduction.json)',
  'about.json': 'Section III: About the Pre-Service Teacher (about.json)',
  'learning-environment.json': 'Section IV: Learning Environment (learning-environment.json)',
  'curriculum.json': 'Section V: Curriculum and Planning (curriculum.json)',
  'professional-development.json': 'Section VI: Professional Development (professional-development.json)',
  'microteaching.json': 'Section VII: Microteaching (microteaching.json)',
  'cbar.json': 'Section VIII: Action Research - CBAR (cbar.json)',
  'philosophy.json': 'Section IX: Teaching Philosophy (philosophy.json)',
  'appendices.json': 'Section X: Appendices (appendices.json)',
};

/**
 * Step 3: Recursive scanner that walks through every JSON string value
 * and extracts text matching bracketed patterns like /\[.*?\]/g
 */
function scanForPlaceholders(data) {
  const matches = [];
  const regex = /\[.*?\]/g;

  function walk(val, currentPath = '') {
    if (typeof val === 'string') {
      const found = val.match(regex);
      if (found) {
        found.forEach((placeholder) => {
          matches.push({
            placeholder,
            field: currentPath,
            preview: val.length > 100 ? `${val.slice(0, 90)}...` : val,
          });
        });
      }
    } else if (Array.isArray(val)) {
      val.forEach((item, index) => {
        walk(item, currentPath ? `${currentPath}[${index}]` : `[${index}]`);
      });
    } else if (val !== null && typeof val === 'object') {
      Object.entries(val).forEach(([k, v]) => {
        const nextPath = currentPath ? `${currentPath}.${k}` : k;
        walk(v, nextPath);
      });
    }
  }

  walk(data);
  return matches;
}

export default function Completeness() {
  const [searchTerm, setSearchTerm] = useState('');

  // Step 4: Group findings by section / file name
  const sectionsData = useMemo(() => {
    return Object.entries(jsonModules).map(([filePath, module]) => {
      // Extract file name (e.g. "home.json")
      const fileName = filePath.split('/').pop() || filePath;
      const data = module.default || module;
      const placeholders = scanForPlaceholders(data);

      return {
        filePath,
        fileName,
        displayName: SECTION_NAMES[fileName] || fileName,
        placeholders,
        count: placeholders.length,
      };
    });
  }, []);

  // Total count of remaining placeholders
  const totalCount = useMemo(() => {
    return sectionsData.reduce((acc, curr) => acc + curr.count, 0);
  }, [sectionsData]);

  // Filtered view by search term
  const filteredSections = useMemo(() => {
    if (!searchTerm.trim()) return sectionsData;

    return sectionsData.map((sec) => ({
      ...sec,
      placeholders: sec.placeholders.filter(
        (p) =>
          p.placeholder.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.field.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sec.displayName.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }));
  }, [sectionsData, searchTerm]);

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10 space-y-8 font-sans text-dark-teal">
      {/* Header Dashboard Banner */}
      <header className="rounded-2xl border-2 border-amber-300 bg-amber-50/80 p-6 md:p-8 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 pb-3">
          <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-red-700 bg-amber-100 px-3 py-1 rounded-md border border-red-300">
            <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span>Hidden Audit Tool (/completeness)</span>
          </div>
          <span className="text-xs font-mono text-dark-teal/70 font-semibold">
            Section 8 & Section 10 Checklist
          </span>
        </div>

        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-dark-teal tracking-tight">
            Content Completeness & Placeholder Audit
          </h1>
          <p className="mt-1 text-sm text-dark-teal/80 leading-relaxed max-w-3xl">
            Live scanner reading all JSON files in <code className="bg-white/80 px-1.5 py-0.5 rounded font-mono text-xs">src/data</code> for unresolved bracketed text (<code className="bg-white/80 px-1.5 py-0.5 rounded font-mono text-xs">\[.*?\]</code>).
          </p>
        </div>

        {/* Total Count Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white border border-amber-300 shadow-2xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-dark-teal/60 block">
              Remaining Placeholders
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className={`text-3xl font-extrabold font-mono ${totalCount === 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {totalCount}
              </span>
              <span className="text-xs text-dark-teal/60">unresolved items</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-300 shadow-2xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-dark-teal/60 block">
              Audited Files
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-dark-teal font-mono">
                {sectionsData.length}
              </span>
              <span className="text-xs text-dark-teal/60">JSON data models</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-amber-300 shadow-2xs">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-dark-teal/60 block">
              Submission Target
            </span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-3xl font-extrabold text-emerald-700 font-mono">
                0
              </span>
              <span className="text-xs text-emerald-700 font-semibold">100% Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Step 4: Green Success Message if Count is 0 */}
      {totalCount === 0 ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-center space-y-3 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-emerald-800">
            All Content Complete!
          </h2>
          <p className="text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
            Congratulations! All 0 unresolved bracketed placeholders remain across all data files. The portfolio is 100% verified and ready for evaluation submission.
          </p>
        </div>
      ) : (
        <>
          {/* Search Filter Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-dark-teal/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search placeholder or JSON field name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-dark-teal/15 rounded-xl text-xs text-dark-teal placeholder:text-dark-teal/40 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dark-teal"
            />
          </div>

          {/* Grouped Checklist by Section/File */}
          <div className="space-y-6">
            {filteredSections.map((sec) => (
              <div
                key={sec.fileName}
                className="rounded-2xl border border-dark-teal/15 bg-white/90 p-6 shadow-sm space-y-4"
              >
                {/* Section Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dark-teal/10 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-dark-teal/10 text-dark-teal flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-dark-teal leading-tight">
                        {sec.displayName}
                      </h2>
                      <span className="text-xs text-dark-teal/60 font-mono">
                        src/data/{sec.fileName}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-mono font-bold px-2.5 py-1 rounded border ${
                      sec.placeholders.length > 0
                        ? 'bg-amber-100 text-red-800 border-amber-300'
                        : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                    }`}
                  >
                    {sec.placeholders.length} {sec.placeholders.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* List of Placeholders */}
                {sec.placeholders.length > 0 ? (
                  <div className="divide-y divide-dark-teal/10">
                    {sec.placeholders.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <PlaceholderChip label={item.placeholder} />
                            <span className="font-mono text-[11px] text-dark-teal/60 bg-dark-teal/5 px-2 py-0.5 rounded">
                              {item.field}
                            </span>
                          </div>
                          {item.preview && (
                            <p className="text-dark-teal/75 text-[11px] line-clamp-2 pl-1 font-sans">
                              Context: <span className="italic font-serif">"{item.preview}"</span>
                            </p>
                          )}
                        </div>

                        <span className="text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 shrink-0 self-start md:self-center">
                          Unresolved
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>No unresolved placeholders in this file.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
