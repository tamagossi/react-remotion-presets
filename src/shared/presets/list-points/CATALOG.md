# List Points Catalog

AI selection guide for `src/shared/presets/list-points/`.

## Quick Selection Guide

| Script Tone        | Mood       | Energy | Color Temp | Formality    | Recommended Preset                            |
| ------------------ | ---------- | ------ | ---------- | ------------ | --------------------------------------------- |
| energetic-playful  | playful    | high   | warm       | casual       | `StickyNoteScatter` (bright notes, scattered) |
| professional-clean | calm       | medium | cool       | professional | `BulletFocusList` (minimal bullets, focus)    |
| corporate-bold     | dramatic   | high   | neutral    | professional | `BigTextStack` (large type, tight stack)      |
| tech-futuristic    | mysterious | medium | cool       | professional | `CylinderRolodexList` (3D rotation, cities)   |
| creative-dynamic   | energetic  | high   | vibrant    | casual       | `KineticTextMorph` (blur morph, gradients)    |
| modern-minimal     | calm       | medium | neutral    | professional | `PillTagList` (rounded tags, highlight slide) |
| cinematic-focus | dramatic | medium | neutral | luxury | `FocusStackList` (scale focus, depth) |
| energetic-playful | playful | high | vibrant | casual | `StarPointList` (numbered stars, accent) |
| corporate-bold | energetic | high | warm | professional | `PillBarList` (elastic pill bars) |
| tech-futuristic | dramatic | medium | cool | professional | `FocusHighlightList` (single-item focus, glow) |
| creative-dynamic | energetic | high | vibrant | casual | `GradientCarouselList` (gradient scroll) |
| luxury-premium | dramatic | low | warm | luxury | `GoldGradientStackList` (gold gradient focus) |

## How to Use This Catalog

When generating a video composition:

1. **Analyze the script**: Extract mood, theme, energy level, target audience, formality.
2. **Match dimensions**: Use table above or scan preset metadata.
3. **Select preset**: Pick best match. If unsure, suggest top 2 with tradeoffs.
4. **Apply prop overrides**: Use `suggestedOverrides` for matched context.
5. **Compose**: Integrate preset into composition.

## Presets

### PillTagList

**ID**: `PillTagList`
**Export**: `src/shared/presets/list-points`

**Description**
Rounded pill tags arranged vertically. One tag is filled with a highlight color while others remain outlined. The highlight slides between items over time, creating a selection indicator effect.

**Visual Characteristics**

- Style: geometric/minimal
- Motion: discrete/sliding highlight
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["calm", "playful"],
  "theme": ["tech", "corporate", "education"],
  "energy": "medium",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "borderColor": "#ffffff",
  "dimOpacity": 0.35,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "focusDuration": 45,
  "fontFamily": "Anton",
  "fontSize": 32,
  "fontWeight": 400,
  "highlightBgColor": "#ffffff",
  "highlightTextColor": "#000000",
  "holdDuration": 30,
  "itemGap": 12,
  "items": [
    "Marketing",
    "Data Analyses",
    "Design",
    "Financial Aid",
    "Internet Sale"
  ],
  "pillPaddingX": 28,
  "pillPaddingY": 12,
  "pillRadius": 32,
  "startFrame": 0,
  "textColor": "#ffffff",
  "textTransform": "none"
}
```

**Suggested Prop Overrides by Context**

| Context                  | Override Rationale           | Props                                                            |
| ------------------------ | ---------------------------- | ---------------------------------------------------------------- |
| `tech-futuristic`        | Cyan highlight on dark bg    | `{ highlightBgColor: "#06b6d4", borderColor: "#06b6d4" }`        |
| `playful-creative`       | Larger radius, bright colors | `{ pillRadius: 48, highlightBgColor: "#ec4899" }`                |
| `corporate-professional` | Subtle gray highlight        | `{ highlightBgColor: "#e2e8f0", highlightTextColor: "#1e293b" }` |

**When to Use**

- Category/tag selection visualization
- Skill or service highlighting
- Interactive-looking list without actual interactivity

**When NOT to Use**

- Long lists (more than 8 items)
- When all items need equal visual weight
- Serious/dramatic tone content

**Composition Example**

```tsx
import { PillTagList } from "./shared/presets/list-points";

<PillTagList
  items={["Design", "Development", "Marketing"]}
  highlightBgColor="#ec4899"
>
  <Content />
</PillTagList>;
```

### BulletFocusList

**ID**: `BulletFocusList`
**Export**: `src/shared/presets/list-points`

**Description**
Vertical list with dash bullet points. One item is fully bright while others are dimmed, creating a reading-focus effect. The focus transitions between items sequentially.

**Visual Characteristics**

- Style: typographic/minimal
- Motion: discrete/focus shift
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["calm", "mysterious"],
  "theme": ["corporate", "education", "storytelling"],
  "energy": "low",
  "colorTemp": "cool",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "bulletColor": "#ffffff",
  "bulletLength": 20,
  "bulletThickness": 2,
  "dimOpacity": 0.25,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "focusDuration": 40,
  "fontFamily": "Anton",
  "fontSize": 28,
  "fontWeight": 400,
  "holdDuration": 30,
  "itemGap": 16,
  "items": [
    "Urban Jungle Café",
    "Digital Nomad Studio",
    "Pop-Up Experience Store"
  ],
  "startFrame": 0,
  "textColor": "#ffffff",
  "textTransform": "none"
}
```

**Suggested Prop Overrides by Context**

| Context                  | Override Rationale              | Props                                                 |
| ------------------------ | ------------------------------- | ----------------------------------------------------- |
| `corporate-professional` | Subtle bullets, tighter spacing | `{ bulletLength: 12, itemGap: 12, dimOpacity: 0.15 }` |
| `educational-neutral`    | Larger text for readability     | `{ fontSize: 36, bulletThickness: 3 }`                |
| `nightlife-dramatic`     | Neon bullet accent              | `{ bulletColor: "#f472b6", dimOpacity: 0.1 }`         |

**When to Use**

- Feature lists with emphasis
- Reading/listening cue lists
- Minimal, elegant bullet presentations

**When NOT to Use**

- When all items need simultaneous focus
- Very short lists (less than 3 items)
- Highly colorful/energetic content

**Composition Example**

```tsx
import { BulletFocusList } from "./shared/presets/list-points";

<BulletFocusList
  items={["Feature One", "Feature Two", "Feature Three"]}
  focusDuration={50}
>
  <Content />
</BulletFocusList>;
```

### FocusStackList

**ID**: `FocusStackList`
**Export**: `src/shared/presets/list-points`

**Description**
Vertical text stack where the center item is large and fully bright, while surrounding items scale down and dim progressively. Creates a depth-of-field reading effect with the focus moving through the list.

**Visual Characteristics**

- Style: typographic
- Motion: staggered/scale focus
- Texture: none
- Depth: layered

**Metadata**

```json
{
  "mood": ["dramatic", "mysterious"],
  "theme": ["tech", "storytelling", "nightlife"],
  "energy": "medium",
  "colorTemp": "neutral",
  "formality": "luxury",
  "complexity": "medium",
  "readability": "medium"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "dimOpacity": 0.2,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "focusDuration": 50,
  "fontFamily": "Anton",
  "fontSize": 48,
  "fontWeight": 400,
  "holdDuration": 30,
  "itemGap": 8,
  "items": ["Designer", "Developer", "Analyser", "Engineer", "Animator"],
  "scaleStep": 0.15,
  "startFrame": 0,
  "textColor": "#ffffff",
  "textTransform": "none"
}
```

**Suggested Prop Overrides by Context**

| Context           | Override Rationale           | Props                                    |
| ----------------- | ---------------------------- | ---------------------------------------- |
| `luxury-premium`  | Dramatic scale difference    | `{ scaleStep: 0.25, fontSize: 64 }`      |
| `tech-futuristic` | Tight stack, fast focus      | `{ itemGap: 4, focusDuration: 30 }`      |
| `calm-wellness`   | Gentle dim, slow transitions | `{ dimOpacity: 0.4, focusDuration: 80 }` |

**When to Use**

- Role/skill highlighting
- Portfolio category showcases
- Cinematic title sequences

**When NOT to Use**

- When all text must be equally readable
- Long lists (more than 7 items)
- Small frame sizes

**Composition Example**

```tsx
import { FocusStackList } from "./shared/presets/list-points";

<FocusStackList
  items={["Creative", "Strategic", "Technical", "Leadership"]}
  scaleStep={0.2}
>
  <Content />
</FocusStackList>;
```

### BigTextStack

**ID**: `BigTextStack`
**Export**: `src/shared/presets/list-points`

**Description**
Very large bold text stacked tightly, scrolling upward continuously. Each line has a subtle horizontal drift animation, creating a living typographic wall. Names or short phrases work best.

**Visual Characteristics**

- Style: typographic/bold
- Motion: continuous/scroll
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["energetic", "dramatic"],
  "theme": ["corporate", "nightlife", "storytelling"],
  "energy": "high",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "medium"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "driftSpeed": 0.3,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 96,
  "fontWeight": 700,
  "holdDuration": 30,
  "itemGap": 0,
  "items": ["SELÇUK ONUR", "AHMAD OMAR", "ARON WILLIAM"],
  "lineHeight": 1,
  "scrollSpeed": 40,
  "startFrame": 0,
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**Suggested Prop Overrides by Context**

| Context                  | Override Rationale             | Props                                                 |
| ------------------------ | ------------------------------ | ----------------------------------------------------- |
| `corporate-professional` | Slower scroll, tighter spacing | `{ scrollSpeed: 20, lineHeight: 1.1 }`                |
| `nightlife-dramatic`     | Fast scroll, neon drift        | `{ scrollSpeed: 80, driftSpeed: 0.8 }`                |
| `luxury-premium`         | Elegant serif, slower          | `{ fontFamily: "Playfair Display", scrollSpeed: 15 }` |

**When to Use**

- Name credits/roll
- Bold statement lists
- Typography-forward sequences

**When NOT to Use**

- Long sentences or paragraphs
- When readability is critical
- Small text requirements

**Composition Example**

```tsx
import { BigTextStack } from "./shared/presets/list-points";

<BigTextStack items={["CREATIVE", "DIRECTOR", "DESIGNER"]} fontSize={120}>
  <Content />
</BigTextStack>;
```

### CylinderRolodexList

**ID**: `CylinderRolodexList`
**Export**: `src/shared/presets/list-points`

**Description**
Items arranged on a virtual 3D cylinder that rotates continuously. Items on the near side of the cylinder are large and bright; items on the far side are small and dim. Creates a rolodex or spinning wheel effect.

**Visual Characteristics**

- Style: geometric/3D
- Motion: continuous/rotation
- Texture: none
- Depth: layered/perspective

**Metadata**

```json
{
  "mood": ["mysterious", "playful"],
  "theme": ["tech", "nightlife", "storytelling"],
  "energy": "medium",
  "colorTemp": "cool",
  "formality": "professional",
  "complexity": "high",
  "readability": "medium"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "dimOpacity": 0.15,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 48,
  "fontWeight": 400,
  "holdDuration": 30,
  "itemGap": 60,
  "items": ["Tbilisi, Georgia", "Madrid, Spain", "Berlin, Germany"],
  "perspective": 800,
  "rotationSpeed": 30,
  "startFrame": 0,
  "textColor": "#ffffff",
  "textTransform": "none",
  "visibleCount": 5
}
```

**Suggested Prop Overrides by Context**

| Context            | Override Rationale              | Props                                                        |
| ------------------ | ------------------------------- | ------------------------------------------------------------ |
| `tech-futuristic`  | Fast rotation, deep perspective | `{ rotationSpeed: 60, perspective: 400 }`                    |
| `travel-lifestyle` | Locations as items, warm tones  | `{ textColor: "#fbbf24", items: ["Tokyo", "Paris", "NYC"] }` |
| `calm-wellness`    | Slow rotation, gentle dim       | `{ rotationSpeed: 10, dimOpacity: 0.3 }`                     |

**When to Use**

- Location/destination showcases
- 3D product rotations
- Creative portfolio presentations

**When NOT to Use**

- When all items must be readable at once
- Performance-constrained scenes
- Formal/corporate minimal content

**Composition Example**

```tsx
import { CylinderRolodexList } from "./shared/presets/list-points";

<CylinderRolodexList
  items={["Tokyo", "Paris", "London", "NYC"]}
  rotationSpeed={40}
>
  <Content />
</CylinderRolodexList>;
```

### StickyNoteScatter

**ID**: `StickyNoteScatter`
**Export**: `src/shared/presets/list-points`

**Description**
Yellow sticky notes scattered across the frame at random positions and rotations. Notes pop in with an overshoot bounce animation. Perfect for brainstorms, ideation, or playful content.

**Visual Characteristics**

- Style: organic/playful
- Motion: discrete/scatter bounce
- Texture: none
- Depth: flat/scattered

**Metadata**

```json
{
  "mood": ["playful", "energetic"],
  "theme": ["education", "storytelling", "creative"],
  "energy": "high",
  "colorTemp": "warm",
  "formality": "casual",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 24,
  "fontWeight": 400,
  "holdDuration": 30,
  "itemGap": 20,
  "items": ["MALDIVES", "DOHA", "MADRID", "BARCELONA"],
  "maxRotation": 15,
  "noteColor": "#fbbf24",
  "noteHeight": 80,
  "notePadding": 16,
  "noteWidth": 200,
  "scatterSeed": 42,
  "startFrame": 0,
  "textColor": "#000000",
  "textTransform": "uppercase"
}
```

**Suggested Prop Overrides by Context**

| Context               | Override Rationale            | Props                                                 |
| --------------------- | ----------------------------- | ----------------------------------------------------- |
| `playful-creative`    | Bright colors, wild rotations | `{ maxRotation: 30, noteColor: "#ec4899" }`           |
| `brainstorm-ideation` | More notes, smaller size      | `{ noteWidth: 140, noteHeight: 60, fontSize: 18 }`    |
| `retro-vintage`       | Cream paper, typewriter font  | `{ noteColor: "#fef3c7", fontFamily: "Courier New" }` |

**When to Use**

- Brainstorm/ideation sequences
- Travel destination highlights
- Playful brand content

**When NOT to Use**

- Serious corporate presentations
- When precise alignment matters
- Minimal/clean aesthetic content

**Composition Example**

```tsx
import { StickyNoteScatter } from "./shared/presets/list-points";

<StickyNoteScatter items={["Idea 1", "Idea 2", "Idea 3"]} maxRotation={20}>
  <Content />
</StickyNoteScatter>;
```

### KineticTextMorph

**ID**: `KineticTextMorph`
**Export**: `src/shared/presets/list-points`

**Description**
Static prefix text ("You are") with a list of words that morph below it. Active word is sharp and gradient-colored; previous/next words are blurred and dimmed. Creates a kinetic typography motion-blur effect.

**Visual Characteristics**

- Style: typographic/kinetic
- Motion: continuous/blur morph
- Texture: blur
- Depth: flat

**Metadata**

```json
{
  "mood": ["energetic", "playful"],
  "theme": ["tech", "creative", "storytelling"],
  "energy": "high",
  "colorTemp": "vibrant",
  "formality": "casual",
  "complexity": "high",
  "readability": "medium"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "dimOpacity": 0.15,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "gradientColors": ["#f472b6", "#a78bfa", "#06b6d4"],
  "holdDuration": 30,
  "itemGap": 8,
  "items": ["Impactful", "Dynamic", "Original", "Creative", "Bold"],
  "morphBlur": 8,
  "morphDuration": 30,
  "prefixText": "You are",
  "prefixTextColor": "#ffffff",
  "startFrame": 0,
  "textColor": "#ffffff",
  "textTransform": "none"
}
```

**Suggested Prop Overrides by Context**

| Context            | Override Rationale                | Props                                                                             |
| ------------------ | --------------------------------- | --------------------------------------------------------------------------------- |
| `tech-futuristic`  | Cyan/magenta gradient, fast morph | `{ gradientColors: ["#00f0ff", "#ff0080"], morphDuration: 15 }`                   |
| `playful-creative` | Rainbow gradients, big blur       | `{ gradientColors: ["#ef4444", "#fbbf24", "#22c55e", "#3b82f6"], morphBlur: 12 }` |
| `luxury-premium`   | Gold/rose gradient, slow elegance | `{ gradientColors: ["#fbbf24", "#f472b6"], morphDuration: 60 }`                   |

**When to Use**

- Brand attribute showcases
- Dynamic intro sequences
- Creative portfolio statements

**When NOT to Use**

- When all words must be readable simultaneously
- Corporate/formal presentations
- Small frame sizes where blur is muddy

**Composition Example**

```tsx
import { KineticTextMorph } from "./shared/presets/list-points";

<KineticTextMorph
  prefixText="We are"
  items={["Innovative", "Bold", "Creative"]}
  gradientColors={["#ec4899", "#8b5cf6"]}
>
  <Content />
</KineticTextMorph>;
```

## Future Presets (Planned)

- `ChecklistReveal` — animated checkmarks with strikethrough
- `NumberedSteps` — large step numbers with descriptions
- `HorizontalScrollList` — side-scrolling item carousel

## Selection Algorithm for AI Agents

Given: `script`, `theme`, `tone`

1. Extract features from script
2. Score each preset: mood_overlap _ 0.4 + energy_match _ 0.2 + color_match _ 0.2 + formality_match _ 0.2
3. Pick top 2-3
4. Apply suggestedOverrides[context]
5. Generate code
