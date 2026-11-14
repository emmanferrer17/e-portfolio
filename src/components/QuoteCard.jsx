import React from 'react';
import { Quote } from 'lucide-react';

/**
 * QuoteCard
 * Renders mentor feedback, educational quotes, or observer statements.
 */
export default function QuoteCard({
  quote,
  author,
  role,
  context,
  date,
  className = '',
}) {
  return (
    <figure
      className={`relative rounded-xl border border-[#E4DBD0] bg-white p-6 md:p-7 shadow-xs overflow-hidden font-sans ${className}`}
    >
      {/* Decorative quote emblem */}
      <div className="absolute -top-2 -right-2 text-[#0F3D3A]/10 pointer-events-none">
        <Quote className="w-24 h-24 rotate-12" />
      </div>

      <div className="relative z-10 flex flex-col justify-between h-full space-y-4">
        {/* Quote body */}
        <blockquote className="italic text-[#0F3D3A] text-base md:text-lg leading-relaxed font-serif">
          "{quote}"
        </blockquote>

        {/* Attribution */}
        {(author || role || context || date) && (
          <figcaption className="pt-3 border-t border-[#E4DBD0] flex items-center justify-between text-xs">
            <div>
              {author && <p className="font-bold text-[#0F3D3A] text-sm">{author}</p>}
              {role && <p className="text-[#1E1B18] font-medium">{role}</p>}
            </div>
            {(context || date) && (
              <div className="text-right text-xs text-[#1E1B18]">
                {context && <p className="font-bold text-[#7A1C24]">{context}</p>}
                {date && <p className="font-semibold text-[#0F3D3A]">{date}</p>}
              </div>
            )}
          </figcaption>
        )}
      </div>
    </figure>
  );
}
