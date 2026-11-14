import React from 'react';
import PlaceholderChip from './PlaceholderChip';

/**
 * SmartText
 * Automatically detects bracketed placeholders (e.g. "[School year and term]")
 * and renders them as highlighted PlaceholderChip components.
 *
 * @param {Object} props
 * @param {string} props.text - Text string potentially containing bracketed placeholders
 * @param {string} [props.className] - Additional wrapper styling classes
 */
export default function SmartText({ text, className = '' }) {
  if (!text || typeof text !== 'string') {
    return text || null;
  }

  // Regex splitting on square bracket blocks: "[something]"
  const parts = text.split(/(\[[^\]]+\])/g);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          return (
            <PlaceholderChip
              key={index}
              label={part}
              className="my-0.5 align-middle inline-flex"
            />
          );
        }
        return part;
      })}
    </span>
  );
}

