# Agent Instructions

React Remotion presets repository. 125+ reusable video components, animations, and templates organized by category.

## Available Presets

| Category | Count | Description |
|---|---|---|
| `backgrounds` | 31 | Gradient blobs, fog, bokeh, geometric patterns, neon pulses, starfields, wireframes |
| `titles` | 32 | Bold, minimal, stacked, glitch, framed, underlined text layouts with animation engine |
| `texts` | 22 | Typewriter, wave, glitch, blur-reveal, cascade, word-swap, sequential reveals |
| `list-points` | 12 | Pill tags, bullet focus, kinetic morph, sticky notes, 3D cylinder, gradient carousel |
| `data-visualizations` | 30 | Bar charts, donuts, radar, area charts, scatter plots, gauges, activity rings, tables |

**Total: 127 presets** across 5 categories, each with Zod-prop schemas and playground compositions.

## Commands

- Install: `npm i`
- Preview (Remotion Studio): `npm run dev`
- Bundle: `npm run build`
- Render: `npx remotion render`
- Upgrade Remotion: `npm run upgrade`
- Lint + typecheck: `npm run lint` (runs `eslint src && tsc`)
- Fix lint + typecheck: `npm run lint:fix` (runs `eslint src --fix && tsc`)
- Format: `npm run format` (prettier --write .)

## Architecture

- Entry: `src/index.ts` → `registerRoot(RemotionRoot)`
- Compositions defined in `src/Root.tsx` using `<Folder name="...">` and `<Composition>` with `defaultProps`
- Preset components live in `src/shared/presets/<category>/`
- Each preset must have:
  1. Component file (e.g., `DarkGradientBackground.tsx`) with exported Props interface
  2. Barrel export in `src/shared/presets/<category>/index.ts`
  3. Playground composition in `src/shared/presets/<category>/compositions/`
  4. Registration in `src/Root.tsx`
  5. Entry in `src/shared/presets/<category>/CATALOG.md`
- Zod schemas for each preset live in `src/shared/presets/<category>/schemas/`
- Shared constants: `src/shared/constatns/fps.ts` (note the folder spelling) — `FPS = 60`
- Shared hooks: `src/shared/hooks/` — `useAnton`, `useInter`, `useMontserrat`, `useOswald` (Google Fonts loading)
- Shared components: `src/shared/components/` — `GrainOverlay`, `VignetteOverlay`

## Toolchain & Config

- **Remotion 4.0.451**, **React 19**, **Tailwind CSS v4**, **Zod 4.3.6**
- `tsconfig.json`: `jsx: "react-jsx"`, `noUnusedLocals: true`, path alias `@/*` → `./src/*`. `remotion.config.ts` is excluded from TS.
- `remotion.config.ts`: Sets `videoImageFormat: "jpeg"`, `overwriteOutput: true`. Webpack override enables Tailwind v4 (`@remotion/tailwind-v4`) and sets alias `@/` → `src/`.
- Tailwind config is in `src/index.css` (v4 CSS-based config). ESLint Tailwind plugin points to this file.
- **No test suite** in this repo. Verification is `npm run lint` + visual preview in Remotion Studio.

## Code Style (Enforced)

ESLint uses `@remotion/eslint-config-flat` plus plugins for Tailwind, perfectionist, security, promise, and unused-imports. Key enforced rules agents often miss:

- **Alphabetical ordering is mandatory** via `perfectionist/sort-exports`, `sort-interfaces`, `sort-objects`, `sort-union-types`, `sort-variable-declarations`, `sort-switch-case`.
- **JSX props must be sorted alphabetically** (`react/jsx-sort-props`).
- **No unused imports** (`unused-imports/no-unused-imports: error`).
- **Function names must NOT start with `handle`** (`no-restricted-syntax`). Use descriptive action verbs instead (e.g., `downloadPayslip`).
- `@typescript-eslint/no-explicit-any` is warn; `no-unsafe-assignment` is off.

## Design Philosophy

Every preset must be **stunning by default** — professional, cinematic, elegant, astonishing, a pleasure to the eye. Think Netflix title sequence, Apple keynote, AAA game trailer. If it looks "fine," it's not done.

## Creating New Presets

A detailed local skill governs preset creation. See `.opencode/skills/create-preset/SKILL.md` (or `.claude/skills/create-preset/SKILL.md`). When asked to create a preset, animation, background, or text effect, load that skill and follow its 5-step workflow (intake → expand → design → build → verify). It covers prop interface design, frame-driven animation rules (no CSS keyframes), color theory, typography, and exact file placement.

When a user provides a video/GIF reference, the skill analyzes its animation choreography (entry, exit, event-triggered actions) with frame-level precision and reproduces it as a parameterized preset.

## Remotion Best Practices

A local skill also covers Remotion best practices: `.agents/skills/remotion-best-practices/SKILL.md` with rules for timing, sequences, fonts, audio, captions, etc. Consult it for Remotion-specific guidance.
