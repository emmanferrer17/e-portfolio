import React from 'react';
import { Briefcase, CheckCircle2 } from 'lucide-react';

/**
 * RoleCard
 * Displays a pre-service teaching role, responsibility area, or practicum assignment.
 */
export default function RoleCard({
  title,
  role,
  period,
  description,
  responsibilities = [],
  tag,
  className = '',
}) {
  return (
    <div
      className={`rounded-xl border border-[#E4DBD0] bg-white p-6 shadow-xs flex flex-col justify-between font-sans ${className}`}
    >
      <div className="space-y-4">
        {/* Header with tag and period */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1.5 text-[#7A1C24] font-semibold">
            <Briefcase className="w-4 h-4" />
            {tag && (
              <span className="px-2 py-0.5 rounded bg-[#FAF3EB] border border-[#E4DBD0] text-xs font-bold uppercase tracking-wider text-[#7A1C24]">
                {tag}
              </span>
            )}
          </div>
          {period && (
            <span className="text-xs font-mono font-bold text-[#0F3D3A] bg-[#FAF3EB] border border-[#E4DBD0] px-2.5 py-0.5 rounded">
              {period}
            </span>
          )}
        </div>

        {/* Title and role */}
        <div>
          <h3 className="text-xl font-bold text-[#0F3D3A]">{title}</h3>
          {role && <p className="text-sm font-bold text-[#7A1C24] mt-0.5">{role}</p>}
        </div>

        {/* Description */}
        {description && (
          <p className="text-base text-[#1E1B18] leading-relaxed">{description}</p>
        )}

        {/* Responsibilities list */}
        {responsibilities && responsibilities.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-[#E4DBD0]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0F3D3A] block">
              Key Responsibilities &amp; Actions
            </span>
            <ul className="space-y-2">
              {responsibilities.map((resp, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-base text-[#1E1B18] leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#7A1C24] mt-1 shrink-0" />
                  <span>{resp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
