import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

/**
 * ImageLightbox
 * Minimal, title-free floating lightbox window displaying a photo at its actual/natural size
 * constrained cleanly to the viewport. Rendered via createPortal above all stacking contexts.
 *
 * @param {string|null} src - URL/path of the image to display (modal hidden if falsy)
 * @param {string} [alt] - Accessibility alt text for the image
 * @param {Function} onClose - Callback to close the lightbox
 */
export default function ImageLightbox({ src, alt = 'Enlarged documentation photo', onClose }) {
  useEffect(() => {
    if (!src) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [src, onClose]);

  if (!src || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox"
    >
      {/* Minimal Circular Close Button Fixed at Top-Right */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="fixed top-5 right-5 z-[110] w-10 h-10 rounded-full bg-white/95 text-[#1E1B18] hover:bg-white hover:text-[#7A1C24] shadow-lg flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24]"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Centered Image Container - Pure image with no titles, bars, or caption boxes */}
      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="max-w-[92vw] max-h-[88vh] w-auto h-auto object-contain rounded-xl shadow-2xl select-none"
        />
      </div>
    </div>,
    document.body
  );
}

