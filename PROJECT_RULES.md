# Project Rules & Architecture Guidelines

## Overview
This document establishes strict project rules, design tokens, and architectural patterns for the Field Study 2 (FS 2) E-Portfolio. The project is implemented as a static React/Vite/Tailwind CSS web application designed with the aesthetic and structure of high-end interactive documentation.

---

## 1. Design Tokens & Color Palette

The visual identity is defined by the following palette:

- **Warm Beige:** `#F5DABF` (backgrounds, soft card containers, warm accents)
- **Dark Teal:** `#0F3D3A` (primary text, deep surfaces, sidebar accents, brand framing)
- **Maroon:** `#6C151E` (accents, calls to action, highlights, interactive focal points)

---

## 2. Privacy & Compliance Rules

Strict adherence to learner privacy and personal data protection is mandatory:

1. **No Learner Names:** Strictly no learner names anywhere across the codebase, copy, or media metadata.
2. **Face Anonymization:** All faces appearing in uploaded photos or media assets must be blurred or obscured prior to deployment.
3. **Search Engine Blocking:**
   - Include a `<meta name="robots" content="noindex, nofollow" />` tag in `index.html`.
   - Provide a `robots.txt` blocking all web crawlers (`User-agent: *\nDisallow: /`).
4. **Personal Contact Redaction:** No personal phone numbers or home addresses may be published anywhere on the site.

---

## 3. Copy & Content Authenticity

- **Approved Copy Rule:** All text marked **APPROVED COPY** in the spec must be used word for word. Do not paraphrase or invent scores, dates, or feedback.
- Every artifact, assessment rating, and mentor reflection must match verified source records exactly.

---

## 4. Architecture & Data Decoupling

- **Data-Driven Architecture:** All content (text, scores, image paths) must live in JSON data files in `src/data`. Components must render dynamically from these files.
- **No Hardcoded Content:** UI components in `src/components` must act purely as presentation layers that consume structured data models from `src/data`.

---

## 5. Layout & Navigation Hierarchy

- **Interactive Documentation Layout:** Use the "Interactive Documentation" layout: a fixed left-hand sidebar for navigation, and a main content area.
- **Task Sheets Split-View:** For Task Sheets, use a split-view where the PDF viewer takes up the left 60% of the screen and reflections sit in a sticky column on the right.

