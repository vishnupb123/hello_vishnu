# Vishnu PB · Portfolio

Personal portfolio: a minimal single-page site built around one morphing particle system.

- **Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lenis, three.js with React Three Fiber
- **3D:** one GPU particle field (`src/scene/`) that morphs as you scroll: the name → a lattice sphere → a StationOS sort line → a Continuum voice ribbon → orbiting protocol rings (research) → a starfield → a portal ring. Shapes are generated in `shapes.ts` and animated and blended in the vertex shader in `ParticleField.tsx`. Each `[data-chapter]` section drives the morph.
- **Content:** all copy, projects, experience and skills live in `src/data/content.ts`
- **Motion:** Framer Motion reveals, Lenis smooth scroll, a custom cursor, and an instrument-style frame (chapter readout, Dublin clock)
- **Accessibility:** respects `prefers-reduced-motion` (no smooth scroll, near-still particles), and the copy works without WebGL

## Develop

```bash
npm install
npm run dev
npm run build   # type-check + production build to dist/
```

## Deploy

`netlify.toml` builds with `npm run build` and publishes `dist/`. Old routes (`/about`, `/projects`, …) fall back to the SPA and scroll to the matching section.
