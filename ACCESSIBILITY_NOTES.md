# Accessibility Notes

This prototype was built with WCAG 2.2 AA in mind:

- Semantic landmarks are present on every page: `header`, `nav`, `main`, `section`, and `footer`.
- A skip-to-content link is the first focusable control.
- Each page has one `h1`, followed by logical `h2` and `h3` headings.
- Navigation uses native links and a native `details` / `summary` mobile menu so keyboard and screen-reader users receive open and closed state behavior from the browser.
- Interactive controls have visible focus styles and minimum mobile-friendly tap target sizing.
- Text and background colors were chosen for accessible contrast across the warm Montana palette.
- Placeholder image treatments use `role="img"` with meaningful accessible labels.
- The contact form includes visible labels, required fields, helper/error text, autocomplete hints, and keyboard-accessible controls.
- Map placeholders include the full meeting address as text so the location is available without an embedded map.
- Motion is minimal, and `prefers-reduced-motion` disables smooth scrolling and transition timing.

Manual testing still needed before launch:

- Run screen-reader checks with VoiceOver, NVDA, or JAWS.
- Verify keyboard navigation order in Safari, Chrome, and Firefox.
- Test pages at 200% browser zoom and common mobile widths.
- Confirm final production colors after real images are inserted.
- Validate final form error handling once a real backend endpoint is connected.
