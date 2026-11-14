import React from 'react';
import { Award, Image as ImageIcon, ExternalLink, Building2 } from 'lucide-react';
import SmartText from './SmartText';

/**
 * CertificateGallery
 * Groups professional development certificates under organization headings in a responsive grid.
 * Prepared for live image assets or high-visibility placeholder chips.
 *
 * @param {Object} props
 * @param {string} [props.title] - Gallery main title
 * @param {string} [props.description] - Descriptive summary
 * @param {Array} props.organizations - Grouped certificate data
 * @param {string} [props.className] - Additional wrapper styling classes
 */
export default function CertificateGallery({
  title,
  description,
  organizations = [],
  className = '',
}) {
  if (!organizations || organizations.length === 0) return null;

  return (
    <section className={`space-y-8 font-sans ${className}`}>
      {/* Header */}
      {(title || description) && (
        <div className="border-b border-dark-teal/15 pb-4">
          {title && (
            <div className="flex items-center space-x-2 text-dark-teal">
              <Award className="w-6 h-6 text-maroon" />
              <h2 className="text-2xl font-bold text-dark-teal tracking-tight">{title}</h2>
            </div>
          )}
          {description && (
            <p className="text-sm text-dark-teal/70 mt-1 max-w-3xl leading-relaxed">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Organizations Stack */}
      <div className="space-y-8">
        {organizations.map((org, orgIdx) => (
          <div
            key={org.id || orgIdx}
            className="rounded-2xl border border-dark-teal/15 bg-white/80 p-6 md:p-7 shadow-sm space-y-5"
          >
            {/* Organization Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-dark-teal/10 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-lg bg-dark-teal/10 text-dark-teal flex items-center justify-center">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-teal leading-tight">{org.name}</h3>
                  {org.organizerNote && (
                    <div className="text-xs text-dark-teal/70 mt-0.5">
                      <SmartText text={org.organizerNote} />
                    </div>
                  )}
                </div>
              </div>

              {org.category && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-dark-teal/10 text-dark-teal">
                  {org.category}
                </span>
              )}
            </div>

            {/* Certificates Grid for this Organization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {org.certificates.map((cert, certIdx) => (
                <div
                  key={certIdx}
                  className="group rounded-xl border border-dark-teal/15 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-maroon/40 transition-all flex flex-col justify-between"
                >
                  {/* Certificate Image Frame / Ready Placeholder */}
                  <div className="w-full aspect-[4/3] bg-dark-teal/5 flex flex-col items-center justify-center p-4 text-center border-b border-dark-teal/10 relative overflow-hidden">
                    {cert.imageSrc ? (
                      <img
                        src={cert.imageSrc}
                        alt={cert.title || 'Certificate'}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    ) : (
                      <div className="space-y-2 flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 border border-dark-teal/15 flex items-center justify-center text-maroon shadow-sm group-hover:scale-110 transition-transform">
                          <ImageIcon className="w-6 h-6" />
                        </div>
                        <div className="px-2">
                          <SmartText text={cert.placeholder || '[Certificate file]'} />
                        </div>
                        <span className="text-[10px] text-dark-teal/60 font-mono">
                          Ready for scanned upload
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Certificate Metadata Card Footer */}
                  <div className="p-4 space-y-1">
                    <h4 className="text-xs md:text-sm font-bold text-dark-teal group-hover:text-maroon transition-colors line-clamp-2">
                      {cert.title}
                    </h4>
                    {cert.date && (
                      <p className="text-[11px] text-dark-teal/60 font-mono">{cert.date}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

