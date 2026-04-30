# React Remotion Presets

A curated collection of **125+ production-ready Remotion video presets** — backgrounds, titles, text animations, data visualizations, and list-point reveals. Every preset is designed to be stunning by default.

## Available Presets

| Category | Count | Description |
|---|---|---|
| **Backgrounds** | 31 | Gradient blobs, atmospheric fog, bokeh lights, geometric grids, neon pulses, starfields, wireframes, and more |
| **Titles** | 32 | Bold, minimal, stacked, glitch, framed, underlined — full text layout system with shared animation engine |
| **Text Animations** | 22 | Typewriter, wave, glitch, blur-reveal, cascade, word-swap, zoom, sequential fades |
| **List Points** | 12 | Pill tags, bullet focus, kinetic morph, sticky notes, 3D cylinder rolodex, gradient carousels |
| **Data Visualizations** | 30 | Bar/line/area/radar charts, donuts, gauges, scatter plots, activity rings, data tables |

Each preset has typed Zod schemas for props and a dedicated playground composition for preview in Remotion Studio.

## Dependencies

- **[Remotion](https://remotion.dev) 4.0.451** — React-based video framework
- **React 19** — UI rendering
- **Tailwind CSS v4** — utility-first styling (CSS-based config)
- **Zod 4.3.6** — runtime prop validation and type inference
- **TypeScript 5.9** — strict mode with `noUnusedLocals`

## How to Run

```bash
# Install dependencies
npm i

# Start Remotion Studio (visual preview of all 125+ presets)
npm run dev

# Render a specific composition to video
npx remotion render <composition-id> out.mp4

# Bundle for server-side rendering
npm run build

# Lint and typecheck
npm run lint
```

## How to Contribute

New presets are created following a **5-step workflow** (intake → expand → design → build → verify). The full workflow is defined in `.opencode/skills/create-preset/SKILL.md`.

Each preset must include:
1. **Component file** — `src/shared/presets/<category>/MyPreset.tsx` with exported Props interface
2. **Barrel export** — add to `src/shared/presets/<category>/index.ts`
3. **Playground composition** — `src/shared/presets/<category>/compositions/MyPresetComposition.tsx`
4. **Root registration** — add `<Composition>` in `src/Root.tsx`
5. **Catalog entry** — add to `src/shared/presets/<category>/CATALOG.md`

**Design bar**: every preset must be professional, cinematic, and visually striking. If it looks "fine," it's not done.

## AI-Assisted Development

This repo includes agent instruction files for AI coding assistants:

- **`AGENTS.md`** / **`CLAUDE.md`** — Architecture overview, commands, code style rules, and preset creation guide
- **`.opencode/skills/`** — Preset creation skill with detailed motion-design and engineering workflow
- **`.claude/skills/`** — Claude-specific skill definitions
- **`.agents/skills/`** — Remotion best practices (timing, fonts, audio, captions)

Load the `create-preset` skill when asking an AI to create new presets, animations, or video components.

## License

This project is UNLICENSED (private). Remotion itself requires a [company license](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md) for some entities.
