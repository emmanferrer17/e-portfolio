import React from 'react';
import { AlertTriangle } from 'lucide-react';

/**
 * PlaceholderChip
 * High-visibility warning chip indicating an unresolved placeholder, missing artifact, or pending verified data.
 *
 * @param {Object} props
 * @param {string} props.label - Notice or placeholder text (e.g. "PENDING APPROVAL", "UNRESOLVED SCORE")
 * @param {string} [props.field] - Specific field or data path name (e.g. "taskSheet.score")
 * @param {string} [props.hint] - Optional context or instruction tooltip
 * @param {string} [props.className] - Additional styling classes
 */
export default function PlaceholderChip({
  label,
  field,
  hint,
  className = '',
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-yellow-300 border-2 border-red-600 text-red-700 shadow-sm font-mono text-xs font-bold tracking-tight select-none ${className}`}
      title={hint || (field ? `Unresolved field: ${field}` : undefined)}
    >
      <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 stroke-[2.5]" />
      <span>{label}</span>
      {field && (
        <span className="text-[10px] text-red-900/80 font-normal border-l border-red-400 pl-1.5 ml-0.5">
          {field}
        </span>
      )}
    </span>
  );
}

