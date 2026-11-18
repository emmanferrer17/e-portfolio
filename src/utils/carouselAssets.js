import { assetFiles } from 'virtual:asset-manifest';

/**
 * Normalizes a slide item into an object with src, title, and alt properties.
 */
function normalizeSlide(slide, idx, defaultLabel) {
  if (typeof slide === 'string') {
    return {
      src: slide,
      title: `${defaultLabel} ${idx + 1}`,
      alt: `${defaultLabel} Photo ${idx + 1}`,
    };
  }
  return {
    src: slide?.src || '',
    title: slide?.title || `${defaultLabel} ${idx + 1}`,
    alt: slide?.alt || `${defaultLabel} Photo ${idx + 1}`,
    caption: slide?.caption,
  };
}

/**
 * Builds a dynamic slide list from public/assets matching prefix-number.ext.
 *
 * @param {string} prefix - The filename prefix (e.g., 'cbar-doc', 'school-grounds', 'webinar')
 * @param {Array<string|object>} fallbackSlides - The fallback slides from JSON
 * @param {string} defaultLabel - Human-friendly label for auto-generated slide titles
 * @returns {Array<{ src: string, title: string, alt: string, caption?: string }>}
 */
export function buildDynamicSlides(prefix, fallbackSlides = [], defaultLabel = 'Documentation Photo') {
  const imageExtPattern = '\\.(jpg|jpeg|png|webp|gif)$';
  const regex = new RegExp(`^${prefix}-\\d+${imageExtPattern}`, 'i');

  // Find all asset files whose base filename matches prefix-digit.ext
  const matchedFiles = (assetFiles || []).filter((filePath) => {
    const baseName = filePath.split('/').pop() || filePath;
    return regex.test(baseName);
  });

  // Sort matching files using natural numeric order
  matchedFiles.sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );

  // If matching files exist in public/assets/, build dynamic array
  if (matchedFiles.length > 0) {
    return matchedFiles.map((filename, index) => {
      const cleanPath = filename.replace(/\\/g, '/');
      const src = `/assets/${cleanPath}`;
      const baseName = cleanPath.split('/').pop() || cleanPath;

      // Match against fallbackSlides by filename or by index
      const matchedFallback =
        fallbackSlides.find((item) => {
          const itemSrc = typeof item === 'string' ? item : item?.src;
          if (!itemSrc) return false;
          const itemBase = itemSrc.split('/').pop() || itemSrc;
          return itemBase.toLowerCase() === baseName.toLowerCase();
        }) || fallbackSlides[index];

      const title =
        (typeof matchedFallback === 'object' && matchedFallback?.title) ||
        `${defaultLabel} ${index + 1}`;

      const alt =
        (typeof matchedFallback === 'object' && matchedFallback?.alt) ||
        `${defaultLabel} Photo ${index + 1}`;

      const caption =
        typeof matchedFallback === 'object' && matchedFallback?.caption
          ? matchedFallback.caption
          : undefined;

      return {
        src,
        title,
        alt,
        caption,
      };
    });
  }

  // If zero matching files exist yet in public/assets/, return fallback slides from JSON
  return fallbackSlides.map((item, index) => normalizeSlide(item, index, defaultLabel));
}
