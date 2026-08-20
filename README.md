# Neha Mishra Portfolio

A hand-built, dependency-free portfolio site. Software engineering, painting,
stand-up comedy and a two-language reading habit, in one page.

## Design system

- **Token driven.** Every colour, space, radius, font and timing value comes from
  CSS custom properties on `:root`. Component styles never hardcode a value.
- **Dual theme.** A warm ivory light theme (default) and a near-black dark theme.
  The choice persists in `localStorage`; an inline `<script>` in `<head>` applies it
  before first paint so there is no flash of the wrong theme. `<meta name="theme-color">`
  follows the active theme.
- **One accent colour** with three derivatives (full, soft, line). Three text tiers,
  never a fourth. All text/background pairs meet WCAG AA.
- **Type.** Inter for everything, JetBrains Mono strictly for metadata: dates, tags,
  labels, stats, nav indices.
- **Fluid layout.** `clamp()` for spacing and type; explicit grid column counts at
  breakpoints so no row is left ragged. No horizontal scroll at any width from 320px up.
- **Progressive enhancement.** The page is fully readable with JavaScript disabled.
  Scroll reveals are gated on a `.js` class so nothing can be left invisible.
- **Motion.** One shared easing curve, subtle transforms, and everything switched off
  under `prefers-reduced-motion: reduce`.

## Tech stack

HTML5, CSS3, vanilla JavaScript. No framework, no build step, no bundler.
The only external request is Google Fonts. Icons are an inline SVG sprite.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Markup + inline SVG sprite + no-flash theme script |
| `styles.css` | Design tokens, components, responsive rules |
| `script.js` | Theme, nav, scroll-spy, reveals, role rotator, timeline, counters |
| `assets/` | Profile photo |

## Sections

Hero · About · Experience · Achievements · Reads · Art & Comedy · Projects · Connect

## Running locally

Any static server works:

```
npx --yes http-server . -p 5173 -c-1
```

Then open <http://localhost:5173>.

## License

© Neha Mishra. All rights reserved.
