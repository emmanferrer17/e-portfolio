import React from 'react';
import { Award } from 'lucide-react';

/**
 * ScoreBadge
 * Tag component displaying performance scores, evaluation marks, or ratings.
 */
export default function ScoreBadge({
  score,
  maxScore,
  label = 'Score',
  category,
  variant = 'maroon',
  className = '',
}) {
  const isMaroon = variant === 'maroon';

  return (
    <div
      className={`inline-flex items-center gap-2.5 rounded-lg border px-3.5 py-1.5 shadow-xs transition-all bg-white font-sans ${
        isMaroon
          ? 'border-[#7A1C24]/30 text-[#7A1C24]'
          : 'border-[#0F3D3A]/30 text-[#0F3D3A]'
      } ${className}`}
    >
      {/* Emblem */}
      <div
        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
          isMaroon ? 'bg-[#7A1C24]/10 text-[#7A1C24]' : 'bg-[#0F3D3A]/10 text-[#0F3D3A]'
        }`}
      >
        <Award className="w-3.5 h-3.5" />
      </div>

      {/* Label and category */}
      <div className="flex flex-col text-left">
        {category && (
          <span className="text-[10px] uppercase tracking-wider text-[#0F3D3A] font-semibold leading-none">
            {category}
          </span>
        )}
        <span className="text-xs font-bold uppercase tracking-wide text-[#0F3D3A] leading-tight">
          {label}
        </span>
      </div>

      {/* Score display */}
      <div className="flex items-baseline font-mono ml-1 pl-2 border-l border-[#E4DBD0]">
        <span
          className={`text-base font-extrabold ${
            isMaroon ? 'text-[#7A1C24]' : 'text-[#0F3D3A]'
          }`}
        >
          {score}
        </span>
        {maxScore !== undefined && maxScore !== null && (
          <span className="text-xs font-semibold text-[#0F3D3A]/70 ml-0.5">
            /{maxScore}
          </span>
        )}
      </div>
    </div>
  );
}
