# Preset Structure

Mandatory file layout for every preset. Follow exactly.

## Directory Layout

```
src/shared/presets/
├── [category]/
│   ├── [PresetName].tsx          # Main component
│   ├── index.ts                  # Barrel export
│   ├── CATALOG.md                # Catalog of presets in this category
│   └── compositions/
│       └── [PresetName]Composition.tsx   # Demo composition
```

## Category Names

Use kebab-case category folders:
- `backgrounds`
- `text-animations`
- `transitions`
- `charts`
- `overlays`
- `lower-thirds`
- `code`
- `list-points`
- `video-masks`
- `scene-templates`

If new category needed, create folder + `CATALOG.md` + update `src/Root.tsx` with new `<Folder>`.

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

### 2. Barrel Export: `index.ts`

```ts
export { [PresetName], type [PresetName]Props } from "./[PresetName]";
```

Add to existing exports. Never break existing imports.

### 3. Playground: `[PresetName]Composition.tsx`

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

### 4. Root.tsx Registration

Add inside appropriate `<Folder>` or create new Folder:

```tsx
import { [PresetName]Composition } from "./shared/presets/[category]/compositions/[PresetName]Composition";
import { [PresetName]Props } from "./shared/presets/[category]";

// Inside return:
<Folder name="[category]">
  <Composition
    id="[PresetName]"
    component={[PresetName]Composition}
    durationInFrames={5 * FPS}
    fps={FPS}
    width={1280}
    height={720}
    defaultProps={{
      // All props with sensible defaults
      // satisfies [PresetName]Props
    } satisfies [PresetName]Props}
  />
</Folder>
```

**Rules:**
- Use `satisfies` for type safety
- Duration: 3-10 seconds for most presets (15 * FPS to 30 * FPS)
- Background presets: 20 * FPS for full animation cycle
- fps import: `import { FPS } from "./shared/constatns/fps"`
- id: PascalCase matching component name

### 5. CATALOG.md Update

Read existing catalog. Append entry following schema in `rules/catalog-update.md`.

## Naming Conventions

- Component: PascalCase, descriptive. `DarkGradientBackground`, `TypewriterText`, `SlideReveal`
- Props type: `[ComponentName]Props`
- Playground: `[ComponentName]Composition`
- File names match component names exactly

## Props Design Rules

1. **Expose everything visual.** Colors, sizes, timing, easing, opacity, blur, count.
2. **Sensible defaults.** Component works out of the box with zero props.
3. **Logical groupings.** Related props near each other in interface.
4. **Type safety.** No `any`. Use specific types: `[number, number, number, number]` for easing, literal unions where applicable.
5. **Children support.** Always include `children?: React.ReactNode` unless component is strictly decorative with no content area.

## Anti-Patterns (Forbidden)

- ❌ Hardcoded values inside component logic
- ❌ CSS `@keyframes` or `animation` properties
- ❌ `setState` inside render loop for animation
- ❌ `requestAnimationFrame` — use Remotion hooks
- ❌ Ignoring `useVideoConfig` dimensions
- ❌ Missing Props type export
- ❌ Forgetting to update CATALOG.md
- ❌ Forgetting to register in Root.tsx
