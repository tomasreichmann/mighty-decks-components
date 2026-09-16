# React renderer

`index.tsx` currently owns lookup, text fitting, SVG/card rendering, compositions,
wrappers, and public exports. Reuse those pieces before adding another renderer; if a
new concern expands the entry point, review responsibility boundaries first. Preserve
CSS isolation, asset-base behavior, accessible labels, and independent layout/density.
Keep public exports stable if implementation files later move.

React code may consume catalog/contracts and browser APIs, never Node APIs, Playwright,
Vite, CLI, or scripts.
