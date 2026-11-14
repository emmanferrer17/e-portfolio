import React from 'react';

/**
 * SectionHeader
 * Displays standard section hierarchy, tags, and an italicized maroon Journey Note.
 * Styled for the Architectural Studio monograph layout.
 *
 * @param {Object} props
 * @param {string} [props.numeral] - Roman numeral (e.g. "II", "V")
 * @param {string} props.title - Title of the section
 * @param {string[]} [props.tags] - Array of keyword tags or badges
 * @param {string} [props.journeyNote] - Italicized reflective journey note styled in maroon
 * @param {string} [props.subtitle] - Optional descriptive subtitle
 * @param {string} [props.className] - Additional styling classes
 */
export default function SectionHeader({
  numeral,
  title,
  tags = [],
  journeyNote,
  subtitle,
  className = '',
}) {
  return (
    <header className={`space-y-4 border-b border-[#E4DBD0] pb-6 ${className}`}>
      {/* Eyebrow & Tags */}
      <div className="flex flex-wrap items-center gap-2">
        {numeral && (
          <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#0F3D3A] text-white text-xs font-bold uppercase tracking-wider shadow-xs">
            Section {numeral}
          </span>
        )}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FAF3EB] border border-[#E4DBD0] text-[#0F3D3A]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Title & Subtitle */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F3D3A] tracking-tight leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-base leading-relaxed text-[#1E1B18] max-w-3xl">
            {subtitle}
          </p>
        )}
      </div>

      {/* Journey Note - styled with 3px solid #7A1C24 left accent on clean white surface */}
      {journeyNote && (
        <div className="mt-4 rounded-r-xl border-l-4 border-[#7A1C24] border-y border-r border-[#E4DBD0] bg-white p-4 shadow-subtle">
          <p className="text-xs font-bold uppercase tracking-wider text-[#7A1C24] mb-1">
            Curriculum Journey Note
          </p>
          <p className="italic text-[#7A1C24] text-base leading-relaxed font-serif">
            "{journeyNote}"
          </p>
        </div>
      )}
    </header>
  );
}
