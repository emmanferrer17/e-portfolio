/**
 * assetPath
 * Resolves public asset and PDF paths cleanly against Vite's import.meta.env.BASE_URL.
 * Strips leading duplicate slashes so paths like '/assets/school-photo.jpg'
 * resolve correctly on both root deployments (localhost) and subpath deployments (GitHub Pages).
 *
 * @param {string} path - Relative or absolute-style public asset path
 * @returns {string} Fully resolved path
 */
export function assetPath(path) {
  if (!path || typeof path !== 'string') return '';
  
  // Return untouched if external or data/blob URI
  if (/^(?:https?:|\/\/|data:|blob:)/i.test(path)) {
    return path;
  }

  const base = import.meta.env.BASE_URL || '/';
  const cleanPath = path.replace(/^\/+/, '');
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;

  return `${normalizedBase}${cleanPath}`;
}

export default assetPath;

