import React, { useState, useEffect } from 'react';
import { FileText, ExternalLink, AlertCircle, RotateCcw } from 'lucide-react';
import assetPath from '../utils/assetPath';

/**
 * Extracts a clean, normalized filename from a given path or title.
 * Ensures the returned name ends in '.pdf'.
 */
function getTargetFilename(pathStr, fallbackTitle) {
  if (pathStr && typeof pathStr === 'string' && pathStr.trim().length > 0) {
    const clean = pathStr.split('?')[0].split('#')[0];
    const segment = clean.split('/').filter(Boolean).pop() || '';
    const sanitized = segment.replace(/[\[\]]/g, '').trim();
    if (sanitized) {
      return sanitized.toLowerCase().endsWith('.pdf') ? sanitized : `${sanitized}.pdf`;
    }
  }
  if (fallbackTitle && typeof fallbackTitle === 'string' && fallbackTitle.trim().length > 0) {
    const slug = fallbackTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    if (slug) return `${slug}.pdf`;
  }
  return 'document.pdf';
}

/**
 * DocumentViewer
 * Native PDF embed component built using <object> with iframe fallbacks.
 * Uses assetPath to ensure reliable resolution on localhost and GitHub Pages.
 *
 * Verifies file availability via HEAD/GET request to prevent Vite dev server
 * from serving index.html (text/html) and recursively mirroring the SPA.
 */
export default function DocumentViewer({
  url,
  pdfUrl,
  title = 'PDF Document Viewer',
  height = '100%',
  fallbackText = 'Unable to render inline PDF preview in this browser.',
  fallbackButtonText = 'Open PDF Document',
  className = '',
}) {
  const targetUrl = pdfUrl || url;
  const resolvedUrl = assetPath(targetUrl);
  const expectedFilename = getTargetFilename(targetUrl, title);

  const [fileStatus, setFileStatus] = useState('checking'); // 'checking' | 'ready' | 'missing'

  useEffect(() => {
    // If no URL or placeholder brackets, treat as missing immediately
    if (
      !targetUrl ||
      typeof targetUrl !== 'string' ||
      !targetUrl.trim() ||
      targetUrl.includes('[') ||
      targetUrl.includes(']')
    ) {
      setFileStatus('missing');
      return;
    }

    let isMounted = true;
    setFileStatus('checking');

    const checkFile = async () => {
      try {
        // Run lightweight HEAD request
        let res = await fetch(resolvedUrl, { method: 'HEAD' });

        // Fallback to GET with Range request if HEAD is method not allowed (405)
        if (res.status === 405) {
          const controller = new AbortController();
          res = await fetch(resolvedUrl, {
            method: 'GET',
            signal: controller.signal,
            headers: { Range: 'bytes=0-0' },
          });
          controller.abort();
        }

        if (!isMounted) return;

        const contentType = (res.headers.get('content-type') || '').toLowerCase();

        // Check response.ok AND verify content-type is pdf and NOT text/html
        const isPdf =
          res.ok &&
          !contentType.includes('text/html') &&
          (contentType.includes('application/pdf') ||
            contentType.includes('application/octet-stream') ||
            !contentType);

        if (isPdf) {
          setFileStatus('ready');
        } else {
          setFileStatus('missing');
        }
      } catch (err) {
        if (!isMounted) return;
        setFileStatus('missing');
      }
    };

    checkFile();

    return () => {
      isMounted = false;
    };
  }, [resolvedUrl, targetUrl]);

  // 1. Status: Checking availability
  if (fileStatus === 'checking') {
    return (
      <div
        className={`relative w-full h-full min-h-[78vh] bg-white border border-[#E4DBD0] rounded-xl flex flex-col items-center justify-center p-8 text-center font-sans ${className}`}
        style={height !== '100%' ? { height } : undefined}
      >
        <div className="w-10 h-10 rounded-full border-2 border-[#E4DBD0] border-t-[#7A1C24] animate-spin mb-3" />
        <p className="text-sm font-semibold text-[#0F3D3A]">Verifying Document Availability...</p>
        <p className="text-xs text-[#1E1B18] mt-0.5">{title}</p>
      </div>
    );
  }

  // 2. Status: File missing or returning HTML (prevents mirroring website)
  if (fileStatus === 'missing') {
    return (
      <div
        className={`relative w-full h-full min-h-[78vh] bg-[#FAF3EB] border-2 border-dashed border-[#E4DBD0] rounded-xl flex flex-col items-center justify-center p-8 text-center font-sans shadow-xs ${className}`}
        style={height !== '100%' ? { height } : undefined}
      >
        <div className="w-14 h-14 rounded-2xl bg-white border border-[#E4DBD0] flex items-center justify-center text-[#7A1C24] mb-4 shadow-xs">
          <FileText className="w-7 h-7" />
        </div>

        <div className="max-w-md space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>PDF Pending</span>
          </div>

          <h3 className="text-lg font-bold text-[#0F3D3A] tracking-tight">
            {title ? `${title}` : 'PDF Document Pending'}
          </h3>

          <p className="text-sm text-[#1E1B18] leading-relaxed">
            This document deliverable is pending official upload and will be displayed here once verified.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0F3D3A] text-white text-xs font-semibold hover:bg-[#7A1C24] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7A1C24] cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reload Page</span>
        </button>
      </div>
    );
  }

  // 3. Status: Ready (render actual inline PDF viewer)
  return (
    <div
      className={`relative w-full h-full min-h-[78vh] overflow-hidden bg-white rounded-xl border border-[#E4DBD0] flex flex-col font-sans ${className}`}
      style={height !== '100%' ? { height } : undefined}
    >
      {/* Top micro-bar with title and direct link */}
      <div className="px-4 py-2 bg-[#FAF3EB] border-b border-[#E4DBD0] flex items-center justify-between text-xs text-[#0F3D3A] shrink-0">
        <div className="flex items-center space-x-2 font-semibold truncate pr-2">
          <FileText className="w-4 h-4 text-[#7A1C24] shrink-0" />
          <span className="truncate">{title}</span>
        </div>
        <a
          href={resolvedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 font-semibold text-[#7A1C24] hover:text-[#0F3D3A] transition-colors shrink-0 text-xs px-2.5 py-1 rounded-md hover:bg-white border border-transparent hover:border-[#E4DBD0]"
        >
          <span>Open Fullscreen</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Embed Object with iframe */}
      <div className="flex-1 w-full h-full min-h-0 relative">
        <object
          data={resolvedUrl}
          type="application/pdf"
          aria-label={title}
          className="w-full h-full border-0 block"
          width="100%"
          height="100%"
        >
          <iframe
            src={resolvedUrl}
            title={title}
            className="w-full h-full border-0 block"
            width="100%"
            height="100%"
          >
            <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-white">
              <FileText className="w-12 h-12 text-[#7A1C24]/60 mb-3" />
              <p className="text-base font-bold text-[#0F3D3A]">{title}</p>
              <p className="text-xs text-[#1E1B18] mt-1 max-w-sm leading-relaxed">
                {fallbackText}
              </p>
              <a
                href={resolvedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 bg-[#7A1C24] text-white rounded-lg text-xs font-bold hover:bg-[#7A1C24]/90 shadow-xs transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0F3D3A]"
              >
                <span>{fallbackButtonText}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </iframe>
        </object>
      </div>
    </div>
  );
}
