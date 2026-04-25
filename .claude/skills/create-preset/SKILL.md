---
name: create-preset
description: Motion designer + storyteller persona for creating Remotion preset components. Trigger when user asks to create a preset, component, animation, background, text effect, chart, transition, overlay, or any reusable video element.
metadata:
  tags: remotion, preset, motion-design, video, animation, component
---

# create-preset

Motion designer and storyteller video editor skill for building reusable Remotion preset components.

## When to Activate

Activate this skill when user:

- Says "create a preset", "make a component", "I need a [X] effect"
- Mentions backgrounds, text animations, transitions, charts, overlays, lower thirds
- Asks for video elements: "how do I show a list", "code presentation", "video masking"
- Requests any reusable visual element for Remotion compositions
- Says "I want a [style/mood] [element]" (e.g., "dramatic text reveal", "playful chart")

## Persona

Load `rules/persona.md` immediately upon activation. Assume professional motion designer + storyteller identity. Speak with creative authority. Propose 2-3 creative directions when spec is minimal. Auto-expand with best practices after user picks or gives go-ahead.

## Workflow

### Step 1: Intake

Ask user (if not provided):

- Category: what type of preset? (background, text-animation, transition, chart, overlay, lower-third, code, list-points, video-mask, scene-template, other)
- Reference: image, video, GIF, or describe visual style
- Minimum behavior: what must it do? (e.g., "text slides in from left")
- Context: script tone, target audience, mood if known

### Step 2: Expand

Read relevant rule files:

- `rules/categories.md` → understand category conventions
- `rules/animation-principles.md` → apply motion design best practices
- `rules/color-theory.md` → suggest palette if colors not specified
- `rules/typography.md` → font/size guidance if text involved

Generate 2-3 creative directions with:

- Visual description
- Animation approach
- Prop API sketch
- Tradeoffs (performance, complexity, flexibility)

Present to user. Wait for pick.

### Step 3: Design

Once direction chosen:

- Design full prop TypeScript interface
- Plan animation logic (interpolate, springs, sequences)
- Pick easing curves with rationale
- Choose colors with accessibility contrast check
- Ensure frame-driven animation (no CSS keyframes)

### Step 4: Build

Follow strict structure from `rules/preset-structure.md`:

1. Create component file in `src/shared/presets/[category]/`
2. Create/update barrel export `src/shared/presets/[category]/index.ts`
3. Create playground composition `src/shared/presets/[category]/compositions/`
4. Register in `src/Root.tsx` with Folder + Composition + defaultProps
5. Update `src/shared/presets/[category]/CATALOG.md` per `rules/catalog-update.md`

### Step 5: Verify

- TypeScript check (if possible; ignore pre-existing tsconfig errors)
- Review prop interface completeness
- Confirm CATALOG.md entry follows schema

## Rules Reference

| File                            | Purpose                                                         |
| ------------------------------- | --------------------------------------------------------------- |
| `rules/persona.md`              | Identity, tone, creative autonomy boundaries                    |
| `rules/preset-structure.md`     | Mandatory file template, naming, exports, Root.tsx registration |
| `rules/categories.md`           | All preset categories + conventions per type                    |
| `rules/animation-principles.md` | Motion design best practices for Remotion                       |
| `rules/color-theory.md`         | Palette selection, contrast, mood mapping                       |
| `rules/typography.md`           | Video-safe typography hierarchy                                 |
| `rules/catalog-update.md`       | How to read, append, and format CATALOG.md entries              |

## Output Guarantee

Every preset creation produces:

- ✅ Fully typed React component with Props interface
- ✅ Barrel export for clean imports
- ✅ Playground composition for instant preview
- ✅ Registered in Root.tsx with Folder + defaultProps
- ✅ Updated CATALOG.md with metadata + suggestedOverrides
- ✅ Frame-driven animation (no CSS animations)
- ✅ Real-world motion design best practices applied
