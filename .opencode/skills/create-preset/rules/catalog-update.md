# Catalog Update

How to read, append, and maintain `CATALOG.md` files per preset category.

## Catalog Location

One catalog per category folder:

- `src/shared/presets/backgrounds/CATALOG.md`
- `src/shared/presets/text-animations/CATALOG.md`
- etc.

## Reading Existing Catalog

Before adding new preset:

1. Read existing `CATALOG.md`
2. Note existing presets, their metadata, suggestedOverrides patterns
3. Ensure new preset name doesn't conflict
4. Match formatting style

## Entry Schema

Append new preset entry with this exact structure:

````markdown
### [PresetName]

**ID**: `[PresetName]`
**Export**: `src/shared/presets/[category]`

**Description**
[1-2 sentence visual description. What does it look like? What does it do?]

**Visual Characteristics**

- Style: [abstract/geometric/organic/typographic/etc]
- Motion: [continuous/discrete/staggered/etc]
- Texture: [none/grain/blur/particles/etc]
- Depth: [flat/layered/parallax/etc]

**Metadata**

```json
{
  "mood": ["calm", "energetic", "dramatic", "playful", "mysterious"],
  "theme": ["tech", "corporate", "nightlife", "education", "storytelling"],
  "energy": "low|medium|high",
  "colorTemp": "warm|cool|neutral|vibrant",
  "formality": "casual|professional|luxury",
  "complexity": "low|medium|high",
  "readability": "high|medium|low"
}
```
````

**Default Props**

```json
{
  // All props with default values
}
```

**Suggested Prop Overrides by Context**

| Context        | Override Rationale               | Props             |
| -------------- | -------------------------------- | ----------------- |
| `context-name` | Why these props fit this context | `{ prop: value }` |

**When to Use**

- [bullet points]

**When NOT to Use**

- [bullet points]

**Composition Example**

```tsx
import { [PresetName] } from "./shared/presets/[category]";

<[PresetName] prop={value}>
  <Content />
</[PresetName]>
```

````

## Context Naming Convention

Use kebab-case for context keys in suggestedOverrides table:
- `corporate-professional`
- `tech-futuristic`
- `playful-creative`
- `nightlife-dramatic`
- `educational-neutral`
- `emotional-warm`
- `luxury-premium`
- `energetic-sporty`
- `calm-wellness`

Add new contexts as needed. Be descriptive.

## Quick Selection Table

Maintain table at top of catalog. Add row for new preset:

```markdown
| Script Tone | Mood | Energy | Color Temp | Formality | Recommended Preset |
|-------------|------|--------|------------|-----------|-------------------|
| [tone] | [mood] | [energy] | [temp] | [formality] | `[PresetName]` (override notes) |
````

If multiple presets fit same cell, list both with context: `[PresetName]` for corporate, `[PresetName2]` for playful.

## Update Algorithm

When creating new preset:

```
1. Read src/shared/presets/[category]/CATALOG.md
2. If file doesn't exist, create with header + quick selection table template
3. Append new preset entry at end of ## Presets section
4. Add row to quick selection table
5. If new category, create category folder + catalog + update categories.md
6. Sort quick selection table by formality (casual → professional → luxury) if helpful
```

## Example Complete Entry

See existing `src/shared/presets/backgrounds/CATALOG.md` for `DarkGradientBackground` as reference.

## Catalog Maintenance

- Update `When to Use` / `When NOT to Use` as presets evolve
- Add new `suggestedOverrides` contexts when new use cases discovered
- If preset props change, sync `Default Props` JSON block
- Remove deprecated presets (move to ## Deprecated section, don't delete history)

## Catalog Header Template

For new category catalogs:

```markdown
# [Category] Catalog

AI selection guide for `src/shared/presets/[category]/`.

## Quick Selection Guide

| Script Tone | Mood | Energy | Color Temp | Formality | Recommended Preset |
| ----------- | ---- | ------ | ---------- | --------- | ------------------ |

## How to Use This Catalog

When generating a video composition:

1. **Analyze the script**: Extract mood, theme, energy level, target audience, formality.
2. **Match dimensions**: Use table above or scan preset metadata.
3. **Select preset**: Pick best match. If unsure, suggest top 2 with tradeoffs.
4. **Apply prop overrides**: Use `suggestedOverrides` for matched context.
5. **Compose**: Integrate preset into composition.

## Presets

## Future Presets (Planned)

## Selection Algorithm for AI Agents

Given: `script`, `theme`, `tone`
```

1. Extract features from script
2. Score each preset: mood*overlap * 0.4 + energy*match * 0.2 + color*match * 0.2 + formality*match * 0.2
3. Pick top 2-3
4. Apply suggestedOverrides[context]
5. Generate code

```

**Rule**: Always suggest top 2-3 with brief rationale. Never auto-pick without alternatives unless user asks.
```
