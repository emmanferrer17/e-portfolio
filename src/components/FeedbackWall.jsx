import React from 'react';
import { MessageSquareQuote, Pin, TrendingUp, CheckCircle2 } from 'lucide-react';
import SmartText from './SmartText';

/**
 * FeedbackWall
 * Renders Cooperating Teacher observations as a masonry grid of digital sticky notes.
 *
 * @param {Object} props
 * @param {Array} props.notes - List of feedback items { id, label, type, comment }
 * @param {string} [props.title] - Section heading
 * @param {string} [props.subtitle] - Descriptive summary
 * @param {string} [props.className] - Additional styling classes
 */
export default function FeedbackWall({
  notes = [],
  title,
  subtitle,
  className = '',
}) {
  if (!notes || notes.length === 0) return null;

  // Background color palette for realistic sticky notes
  const noteColors = [
    'bg-[#FFFDE7] border-amber-200/80', // Soft Pastel Yellow
    'bg-[#F0FDF4] border-emerald-200/80', // Soft Pale Mint
    'bg-[#FEF2F2] border-rose-200/80', // Soft Pale Rose
    'bg-[#F0F9FF] border-sky-200/80', // Soft Pale Sky
    'bg-[#FAF5FF] border-purple-200/80', // Soft Pale Lavender
    'bg-[#FFF7ED] border-orange-200/80', // Soft Pale Peach
  ];

  return (
    <section className={`space-y-6 font-sans ${className}`}>
      {/* Header */}
      {(title || subtitle) && (
        <div className="border-b border-dark-teal/15 pb-4">
          {title && (
            <div className="flex items-center space-x-2 text-dark-teal">
              <MessageSquareQuote className="w-6 h-6 text-maroon" />
              <h2 className="text-2xl font-bold text-dark-teal tracking-tight">{title}</h2>
            </div>
          )}
          {subtitle && (
            <p className="text-sm text-dark-teal/70 mt-1 max-w-3xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Sticky Notes Masonry Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => {
          const isImprovement = note.type === 'improvement';
          const colorClass = noteColors[index % noteColors.length];

          return (
            <div
              key={note.id || index}
              className={`relative rounded-xl border p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between min-h-[190px] ${colorClass}`}
            >
              {/* Decorative Sticky Tape / Pin Effect */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/70 backdrop-blur-sm border border-black/5 rounded-sm shadow-2xs rotate-1" />

              <div className="space-y-3 pt-2">
                {/* Note Label & Badge */}
                <div className="flex items-start justify-between gap-2 border-b border-dark-teal/10 pb-2">
                  <span className="text-xs font-semibold text-dark-teal/80 leading-snug font-sans">
                    {note.label}
                  </span>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded shrink-0 ${
                      isImprovement
                        ? 'bg-maroon/10 text-maroon'
                        : 'bg-dark-teal/10 text-dark-teal'
                    }`}
                  >
                    {isImprovement ? 'To Improve' : 'Strength'}
                  </span>
                </div>

                {/* Comment Body */}
                <div className="text-xs md:text-sm text-dark-teal/90 leading-relaxed font-sans pt-1">
                  <SmartText text={note.comment} />
                </div>
              </div>

              {/* Note Footer */}
              <div className="pt-3 border-t border-dark-teal/10 flex items-center justify-between text-[11px] text-dark-teal/60">
                <div className="flex items-center space-x-1 font-medium">
                  {isImprovement ? (
                    <TrendingUp className="w-3.5 h-3.5 text-maroon" />
                  ) : (
                    <CheckCircle2 className="w-3.5 h-3.5 text-dark-teal" />
                  )}
                  <span>Cooperating Teacher Note</span>
                </div>
                <span className="font-mono text-[10px]">TS Form</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

