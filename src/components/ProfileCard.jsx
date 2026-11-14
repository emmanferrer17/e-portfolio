import React from 'react';
import { User, GraduationCap, School, BookOpen } from 'lucide-react';

/**
 * ProfileCard
 * High-end profile component for teacher credentials, biographical summaries, and placement context.
 *
 * @param {Object} props
 * @param {string} props.name - Teacher name or profile title
 * @param {string} [props.role] - Professional or academic role
 * @param {string} [props.institution] - Sponsoring University or College
 * @param {string} [props.cooperatingSchool] - Placement/Cooperating School
 * @param {string} [props.specialization] - Major or field of specialization
 * @param {string} [props.avatarUrl] - URL to profile photo (blurred faces required per privacy rules)
 * @param {string} [props.bio] - Short biographical narrative or intro
 * @param {{ label: string, value: string }[]} [props.details] - Key-value metadata pairs
 * @param {string} [props.className] - Additional styling classes
 */
export default function ProfileCard({
  name,
  role,
  institution,
  cooperatingSchool,
  specialization,
  avatarUrl,
  bio,
  details = [],
  className = '',
}) {
  return (
    <div
      className={`rounded-2xl border border-dark-teal/15 bg-white/80 p-6 md:p-8 shadow-sm flex flex-col md:flex-row gap-6 md:gap-8 items-start ${className}`}
    >
      {/* Avatar / Monogram */}
      <div className="shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name || 'Profile photo'}
            className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover border-2 border-dark-teal/20 shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl bg-dark-teal/10 border-2 border-dark-teal/20 flex items-center justify-center text-dark-teal shadow-inner">
            <User className="w-12 h-12 stroke-[1.5]" />
          </div>
        )}
      </div>

      {/* Main Details */}
      <div className="flex-1 space-y-4 w-full">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {role && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-maroon/10 text-maroon">
                {role}
              </span>
            )}
            {specialization && (
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-dark-teal/10 text-dark-teal">
                {specialization}
              </span>
            )}
          </div>

          <h2 className="text-2xl font-bold text-dark-teal tracking-tight">{name}</h2>

          {(institution || cooperatingSchool) && (
            <div className="mt-2 space-y-1 text-xs text-dark-teal/75">
              {institution && (
                <div className="flex items-center space-x-1.5">
                  <GraduationCap className="w-4 h-4 text-dark-teal/60" />
                  <span>{institution}</span>
                </div>
              )}
              {cooperatingSchool && (
                <div className="flex items-center space-x-1.5">
                  <School className="w-4 h-4 text-maroon/80" />
                  <span className="font-medium text-dark-teal">{cooperatingSchool}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bio */}
        {bio && (
          <p className="text-sm text-dark-teal/80 leading-relaxed border-t border-dark-teal/10 pt-3">
            {bio}
          </p>
        )}

        {/* Additional Metadata Grid */}
        {details && details.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-dark-teal/10">
            {details.map((item, idx) => (
              <div key={idx} className="bg-warm-beige/30 p-2.5 rounded-lg border border-dark-teal/10">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-dark-teal/60">
                  {item.label}
                </span>
                <span className="block text-xs font-semibold text-dark-teal mt-0.5">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

