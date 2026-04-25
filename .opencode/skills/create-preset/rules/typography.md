# Typography for Video

Type hierarchy, sizing, and readability in motion graphics.

## Safe Zones

**Action safe:** 5% margin from all edges. All content stays inside.
**Title safe:** 10% margin from all edges. Text stays inside.

For 1280x720:
- Action safe: 64px margin
- Title safe: 128px margin

Never place text closer than 48px from edge. Ever.

## Type Scale for Video

Video viewing distance is greater than desktop. Text must be larger.

**Reference scale (1280x720, viewed at 2-3 meters):**

| Element | Size (px) | Weight | Use |
|---------|-----------|--------|-----|
| Hero title | 72-96 | Bold (700) | Main title, intro |
| Section title | 48-64 | Semibold (600) | Chapter headers |
| Body text | 32-40 | Regular (400) | Explanations, bullets |
| Caption / meta | 24-28 | Regular (400) | Names, dates, sources |
| Fine print | 18-20 | Regular (400) | Disclaimers, rarely used |

**Scaling for other resolutions:**
- 1920x1080 (1080p): multiply by 1.5
- 1080x1920 (vertical): same px sizes, narrower line lengths
- 1080x1080 (square): same px sizes, centered

## Line Height

Video needs tighter line height than web. Motion demands compact blocks.

- Headlines: 1.1 - 1.2
- Body text: 1.3 - 1.4
- Captions: 1.2 - 1.3

## Letter Spacing

- Headlines: slight positive tracking (`0.02em` to `0.05em`)
- Body text: normal (`0`) or slight negative (`-0.01em`) for density
- All-caps: generous tracking (`0.1em` to `0.15em`)

## Font Selection

**Categories and recommendations:**

| Mood | Style | Examples |
|------|-------|----------|
| Corporate | Sans-serif, geometric | Inter, Helvetica, Roboto |
| Tech | Monospace or modern sans | JetBrains Mono, SF Mono, Inter |
| Luxury | Serif, high contrast | Playfair Display, Cormorant Garamond |
| Playful | Rounded, informal | Nunito, Quicksand, Comic Neue |
| Editorial | Serif, readable | Merriweather, Source Serif Pro |
| Brutalist | Bold, blocky | Space Grotesk, Bebas Neue |

**Rules:**
- Max 2 fonts per composition (1 for headlines, 1 for body)
- Never mix two serifs or two similar sans-serifs
- Monospace for code, data, timestamps only

## Text Animation Readability

Moving text is harder to read than static text.

**Rules:**
- Minimum 15 frames hold after animation completes before next action
- Don't animate body text character-by-character (too hard to read)
- Word-by-word or line-by-line is acceptable for short phrases
- Ensure text is fully static during voiceover narration of that text
- Use motion to draw attention, then stop motion for reading

## Contrast Requirements

See `color-theory.md` for full contrast rules.

Quick video typography rule:
- Text shadow or subtle glow behind all text on complex backgrounds
- `textShadow: "0 2px 8px rgba(0,0,0,0.6)"` for light text on variable bg
- `textShadow: "0 1px 3px rgba(255,255,255,0.3)"` for dark text on light bg

## Text Container Rules

**Max line length:**
- Headlines: 2 lines max, 12 words per line max
- Body: 3-4 lines max per screen, 8-10 words per line
- Lists: 3-5 items visible at once

**Alignment:**
- Titles: center or left-aligned (never right-aligned for main title)
- Body: left-aligned (easiest to read in motion)
- Captions: center or left, consistent within composition

## Drop Shadows and Outlines

When text overlays video or animated backgrounds:

```tsx
// Subtle shadow for readability
const textStyle: React.CSSProperties = {
  textShadow: "0 2px 12px rgba(0, 0, 0, 0.7)",
};

// Stronger shadow for busy backgrounds
const textStyleStrong: React.CSSProperties = {
  textShadow: "0 2px 4px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.4)",
};
```

Avoid outlines (`-webkit-text-stroke`) — look cheap in video. Use shadow layers instead.

## Number and Data Display

- Large numbers: 96px+ for emphasis
- Currency/percentages: same size as surrounding text, symbol smaller
- Counters: monospaced font to prevent jitter during animation
- Data labels: 24-28px, 60% opacity of primary color
