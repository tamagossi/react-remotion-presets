# Preset Structure

Mandatory file layout for every preset. Follow exactly.

## Directory Layout

```
src/shared/presets/
├── [category]/
│   ├── [PresetName].tsx          # Main component
│   ├── index.ts                  # Barrel export
│   ├── schemas/
│   │   ├── [PresetName]Schema.ts # Zod schema
│   │   └── index.ts              # Schema barrel export
│   └── compositions/
│       └── [PresetName]Composition.tsx   # Demo composition
```

## Category Names

Use kebab-case category folders matching what exists:

- `backgrounds`
- `texts`
- `data-visualizations`
- `list`
- `lower-thirds`
- `misc`
- `icons` (shared SVG assets, not presets)

If new category needed, create folder + update `src/Root.tsx` with new `<Folder>`, update `categories.md`, update `AGENTS.md`/`CLAUDE.md`, and update `preset-catalog` skill.

## File Templates

### 1. Component: `[PresetName].tsx`

```tsx
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export type [PresetName]Props = {
  // All configurable values as props
  // Never hardcode colors, timing, sizes
  // Use descriptive defaults
  children?: React.ReactNode;
};

export const [PresetName]: React.FC<[PresetName]Props> = ({
  // Destructure with defaults
  children,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps, durationInFrames } = useVideoConfig();

  // Animation logic here
  // Use interpolate, spring, Easing
  // Frame-driven only

  return (
    <AbsoluteFill>
      {/* Component structure */}
      {children}
    </AbsoluteFill>
  );
};
```

**Rules:**

- Export both component and Props type
- Props interface: every visual parameter exposed
- Defaults in destructuring, not inside logic
- Use `useVideoConfig` for dimensions, duration, fps
- Use `useCurrentFrame` for all animation state
- Accept `children?: React.ReactNode` for composability
- Style with inline styles or CSS modules (project convention)

### 2. Zod Schema: `[PresetName]Schema.ts`

Every preset must have a corresponding Zod schema for runtime prop validation:

```tsx
import { z } from "zod";

export const [PresetName]Schema = z.object({
  // Match all props from the component's Props interface
  // Use z.coerce for number/string coercion from CLI
  // Use .default() for optional props with defaults
  // Use .describe() for human-readable prop descriptions
  propName: z.number().default(42).describe("Description of this prop"),
});

export type [PresetName]SchemaType = z.infer<typeof [PresetName]Schema>;
```

**Rules:**

- Schema field names must match prop names exactly
- Every prop in the component gets a corresponding schema field
- Use `z.coerce.number()` for numeric props (CLI passes strings)
- Use `.default()` matching the component's destructured default
- Export both the schema and its inferred type
- Add to `schemas/index.ts` barrel export

### 3. Barrel Exports

**Category `index.ts`:**

```ts
export { [PresetName], type [PresetName]Props } from "./[PresetName]";
```

**Schema `index.ts`:**

```ts
export { [PresetName]Schema, type [PresetName]SchemaType } from "./[PresetName]Schema";
```

Add to existing exports. Never break existing imports.

### 4. Playground: `[PresetName]Composition.tsx`

```tsx
import React from "react";
import { [PresetName], type [PresetName]Props } from "../[category]";

export const [PresetName]Composition: React.FC<[PresetName]Props> = (props) => {
  return (
    <[PresetName] {...props}>
      {/* Demo content showing preset in context */}
      <div style={{ /* center content */ }}>
        Demo Content
      </div>
    </[PresetName]>
  );
};
```

**Rules:**

- Forward all props via spread
- Include realistic demo content (lorem ipsum or generic text)
- Show preset at its best — good colors, readable text
- Keep demo simple, not distracting

### 5. Root.tsx Registration

Add inside appropriate `<Folder>` or create new Folder:

```tsx
import { [PresetName]Composition } from "./shared/presets/[category]/compositions/[PresetName]Composition";
import { [PresetName]Schema } from "./shared/presets/[category]/schemas/[PresetName]Schema";

// Inside return:
<Folder name="[category]">
  <Composition
    id="[PresetName]"
    component={[PresetName]Composition}
    durationInFrames={5 * FPS}
    fps={FPS}
    width={1280}
    height={720}
    defaultProps={
      {
        // All props with sensible defaults
        // satisfies [PresetName]Props
      }
    }
    schema={[PresetName]Schema}
  />
</Folder>
```

**Rules:**

- Include `schema` prop pointing to the Zod schema
- Duration: 3-10 seconds for most presets (3 * FPS to 10 * FPS)
- Background presets: 20 * FPS for full animation cycle
- fps import: `import { FPS } from "./shared/constatns/fps"`
- id: PascalCase matching component name

### 6. Preset Catalog Update

Add entry to `.opencode/skills/preset-catalog/SKILL.md`. Follow schema in `rules/catalog-update.md`.

## Naming Conventions

- Component: PascalCase, descriptive. `DarkGradientBackground`, `TypewriterText`, `ShadowingScene`
- Props type: `[ComponentName]Props`
- Schema: `[ComponentName]Schema`
- Schema type: `[ComponentName]SchemaType`
- Playground: `[ComponentName]Composition`
- File names match component names exactly

## Props Design Rules

1. **Expose everything visual.** Colors, sizes, timing, easing, opacity, blur, count.
2. **Sensible defaults.** Component works out of the box with zero props.
3. **Logical groupings.** Related props near each other in interface.
4. **Type safety.** No `any`. Use specific types: `[number, number, number, number]` for easing, literal unions where applicable.
5. **Children support.** Always include `children?: React.ReactNode` unless component is strictly decorative with no content area.

## Anti-Patterns (Forbidden)

- Hardcoded values inside component logic
- CSS `@keyframes` or `animation` properties
- `setState` inside render loop for animation
- `requestAnimationFrame` — use Remotion hooks
- Ignoring `useVideoConfig` dimensions
- Missing Props type export
- Missing Zod schema file
- Forgetting to update preset-catalog
- Forgetting to register in Root.tsx
