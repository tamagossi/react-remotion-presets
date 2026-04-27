# Agent Instructions

React Remotion presets repository. Reusable video components, animations, and templates organized by category (`backgrounds`, `titles`, etc.).

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
- Shared constants: `src/shared/constatns/fps.ts` (note the folder spelling)
- Shared hooks: `src/shared/hooks/` (e.g., `useAnton` for Google Fonts loading)

## Toolchain & Config

- **Remotion 4.0.451**, **React 19**, **Tailwind CSS v4**
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

## Creating New Presets

A detailed local skill governs preset creation. See `.opencode/skills/create-preset/SKILL.md` (or `.claude/skills/create-preset/SKILL.md`). When asked to create a preset, animation, background, or text effect, load that skill and follow its 5-step workflow (intake → expand → design → build → verify). It covers prop interface design, frame-driven animation rules (no CSS keyframes), color theory, typography, and exact file placement.

## Remotion Best Practices

A local skill also covers Remotion best practices: `.agents/skills/remotion-best-practices/SKILL.md` with rules for timing, sequences, fonts, audio, captions, etc. Consult it for Remotion-specific guidance.
