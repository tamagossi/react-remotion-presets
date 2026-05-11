# Presentation Design Principles

Evidence-based multimedia learning principles for designing effective video presentations. Based on Richard Mayer's Multimedia Learning, Stephen Kosslyn's Clear and to the Point, and UCSD Multimedia Services best practices.

## Core Cognitive Principles

### 1. Redundancy Principle

**"People learn better from graphics and narration than from graphics, narration, and printed text."**

When the same information appears as both spoken words and on-screen text, the visual channel overloads and the learner wastes effort comparing what they hear to what they read.

**Rule for presets:** If a voiceover is playing, don't display the exact same words on screen. Use images or keywords instead.

```tsx
// DON'T: Voiceover says "Revenue grew 47% this quarter"
// AND screen shows text "Revenue grew 47% this quarter"

// DO: Voiceover says "Revenue grew 47% this quarter"
// AND screen shows animated chart with "47%" highlighted
```

### 2. Temporal Contiguity Principle

**"Students learn better when corresponding words and pictures are presented simultaneously."**

Visuals must appear at the same moment they're mentioned. Not before. Not after.

**Rule for presets:** Animate objects to appear only when the voiceover reaches them. Don't pre-reveal all content on a scene.

```tsx
// Progressive reveal pattern
const wordEntries = scriptWords.map((word, i) => ({
  frame: wordStartFrames[i],      // When voiceover says this word
  duration: wordDurations[i],      // How long it stays primary
}));

// Each bullet/stats appears at its voiceover timestamp
const bulletOpacity = interpolate(
  frame,
  [bulletStartFrame, bulletStartFrame + 15],
  [0, 1],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
);
```

### 3. Signaling Principle

**"People learn better when cues that highlight the organization of essential material are added."**

Visual cues guide attention to what matters right now.

**Techniques for presets:**
- Highlight the currently-active bullet (color change, scale pop)
- Dim previous bullets (opacity 25-40%)
- Use arrows, circles, or glow to point at chart data
- Animated underline or accent bar that moves to current item
- Color-coding: warm colors for emphasis, cool for background

```tsx
// Current item highlighted, previous items dimmed
const isItemActive = currentIndex === index;
const isItemPast = currentIndex > index;

const opacity = isItemActive ? 1 : isItemPast ? 0.3 : 0;
const scale = isItemActive ? 1.05 : 1;
const accentBarWidth = isItemActive ? "100%" : "0%";
```

### 4. Coherence Principle

**"People learn better when extraneous material is excluded."**

Every element that doesn't directly support the learning objective is noise.

**Anti-patterns to avoid:**
- Decorative images that don't support the message
- Background animations during key information delivery
- Gratuitous effects (glitch, particles) during educational content
- Competing visual elements (two things moving at once)
- Sound effects unrelated to content

### 5. Modality Principle

**"People learn better from animation and narration than from animation and on-screen text."**

The visual channel should carry images, the verbal channel should carry words. Don't make eyes read while ears listen.

**Rule for presets:** When voiceover is active, visuals should be:
- Icons, charts, diagrams, images (visual channel)
- Keywords only (2-4 words max, supporting not duplicating)

## The Rule of Four

Humans can reliably retain 4 concepts in working memory. Each concept can "chunk" up to 4 sub-elements.

### Application to Preset Design

```
Max per scene:
  - 4 bullet points
  - Each bullet: ≤ 4 key concepts (count nouns + verbs)
  - 4 data points visible at once
  - 4 icons or cards in a grid
  - 4 scenes before a summary/review break
```

```tsx
// Good: "Use four bullets per slide" = 3 units (use, bullets, slide)
// Bad: "Implement a comprehensive strategy for quarterly growth optimization" = 7 units

// Counter design:
const maxVisibleItems = 4;
const visibleItems = allItems.slice(currentGroup * maxVisibleItems, (currentGroup + 1) * maxVisibleItems);
```

### Chunking Strategy

Group related items so they encode as one unit:
- Pre/post grouping: "before/after" = 2 words, 1 chunk
- Compare/contrast: "A vs B" = 1 chunk
- Hierarchy: "main point → sub point" = 1 chunk
- Process: "step 1 of 4" = 1 chunk (number chunked with step)

## Image-Over-Text Principle

Images encode differently in the brain than words — they require less cognitive effort to process and are retained better in long-term memory.

### When to Use Images Instead of Text

| Content Type | Use Image | Use Text | Use Both |
|---|---|---|---|
| Abstract concept | Diagram, icon | Word label | Image + label OK |
| Process/flow | Flowchart, animation | Step numbers | Image with numbered overlay |
| Data comparison | Chart | Source/caption | Chart + legend |
| Emotion/mood | Photo, illustration | — | Image only |
| Definitions | — | Full text | Icon + text |
| Instructions | Screenshot, demo | Brief caption | Image with short text |

### Image Quality Rules

- Use highest resolution available; never scale above 100% original size
- Downscaling always safe, upscaling causes visible pixelation
- Royalty-free sources: Pixabay, Unsplash, Pexels
- Always add alt text for accessibility when distributing slides
- Avoid copyrighted images unless permissions obtained

## Progressive Reveal Pattern

### Appear Only When Mentioned

```tsx
// Each element has its own entry frame based on voiceover timing
const elements = [
  { content: "Revenue up 47%", appearFrame: 0 },
  { content: "Costs down 12%", appearFrame: 120 },
  { content: "New markets: 3", appearFrame: 240 },
  { content: "Team growth: 2x", appearFrame: 360 },
];

elements.map((el, i) => {
  const opacity = interpolate(
    frame,
    [el.appearFrame, el.appearFrame + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <div style={{ opacity }}>{el.content}</div>;
});
```

### Dim After Discussed

```tsx
// Past items fade to 25% opacity, keeping visual context
const isPast = frame > el.appearFrame + el.duration;
const isCurrent = frame >= el.appearFrame && frame <= el.appearFrame + el.duration;

const opacity = isCurrent ? 1 : isPast ? 0.25 : 0;
const accentColor = isCurrent ? highlightColor : dimmedColor;
```

### Attention Drawing

For complex visuals (charts, diagrams), add explicit attention cues:

```tsx
// Pulsing circle around emphasized data point
const pulseScale = spring({
  frame: frame - emphasisStartFrame,
  fps,
  config: { damping: 8, mass: 0.5 },
});

<circle
  cx={dataPointX}
  cy={dataPointY}
  r={12 * pulseScale}
  fill="none"
  stroke={accentColor}
  strokeWidth={2}
  opacity={1 - pulseScale * 0.3}
/>
```

## Accessibility Requirements

### Alt Text
Every image in distributed presentations must have descriptive alt text. Screen readers rely on it.

```
Good alt text: "Bar chart showing revenue growth from $2M to $4.7M over 2020-2024"
Bad alt text: "Chart" or "Image of chart"
```

### Contrast Ratios
- Normal text (video): minimum 7:1 contrast ratio against background
- Large text (32px+): minimum 4.5:1
- Never: light gray on white, dark gray on black, yellow on white

### Colorblind Safety
- Never rely on color alone to convey information
- Safe color pairs: blue+orange, blue+yellow, purple+yellow
- Avoid: red+green, green+brown, blue+purple
- Add patterns/icons alongside color coding

### Reduced Motion
```tsx
// Respect user preference when available
const prefersReducedMotion = /* media query equivalent for Remotion */;
const animationDuration = prefersReducedMotion ? 1 : defaultDuration;
```

## Applying Principles to Preset Props

Every presentation-focused preset should expose:

```tsx
export type PresentationPresetProps = {
  /** Voiceover script timing map */
  scriptTimings?: Record<string, { duration: number; start: number }>;
  /** Whether to dim past items (signaling) */
  dimPastItems?: boolean;
  /** Past item opacity when dimmed */
  dimmedOpacity?: number;
  /** Whether to use images instead of text where possible */
  preferImages?: boolean;
  /** Max visible items at once (rule of 4) */
  maxVisibleItems?: number;
  /** Hold frames between scene changes */
  sceneHoldFrames?: number;
};
```
