import React from 'react';
import { CheckCircle2, RotateCcw, Sparkles } from 'lucide-react';
import SmartText from './SmartText';

/**
 * KeepRedoPanel
 * Two-column reflective panel visually distinguishing practices to retain ("What I'd keep")
 * from instructional adjustments to refine ("What I'd redo").
 */
export default function KeepRedoPanel({
  keepTitle = "What I'd keep",
  keepText,
  redoTitle = "What I'd redo",
  redoText,
  className = '',
}) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 font-sans ${className}`}>
      {/* "What I'd Keep" Column */}
      <div className="rounded-xl border border-[#E4DBD0] bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#E4DBD0] pb-3">
            <div className="flex items-center space-x-2 text-[#0F3D3A]">
              <div className="w-8 h-8 rounded-lg bg-[#0F3D3A] text-white flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[#0F3D3A] tracking-tight">
                {keepTitle}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF3EB] text-[#0F3D3A] border border-[#E4DBD0]">
              Strength
            </span>
          </div>

          <div className="text-base text-[#1E1B18] leading-relaxed">
            <SmartText text={keepText} />
          </div>
        </div>

        <div className="pt-2 flex items-center text-xs font-semibold text-[#0F3D3A]">
          <Sparkles className="w-4 h-4 mr-1 text-[#7A1C24]" />
          <span>Student-centered engagement sustained</span>
        </div>
      </div>

      {/* "What I'd Redo" Column */}
      <div className="rounded-xl border border-[#E4DBD0] bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-[#E4DBD0] pb-3">
            <div className="flex items-center space-x-2 text-[#7A1C24]">
              <div className="w-8 h-8 rounded-lg bg-[#7A1C24] text-white flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <h3 className="text-lg font-bold text-[#7A1C24] tracking-tight">
                {redoTitle}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FAF3EB] text-[#7A1C24] border border-[#E4DBD0]">
              Adjustment
            </span>
          </div>

          <div className="text-base text-[#1E1B18] leading-relaxed">
            <SmartText text={redoText} />
          </div>
        </div>

        <div className="pt-2 flex items-center text-xs font-semibold text-[#7A1C24]">
          <RotateCcw className="w-4 h-4 mr-1 text-[#7A1C24]" />
          <span>Timing rehearsal targeted for next teaching cycle</span>
        </div>
      </div>
    </div>
  );
}
