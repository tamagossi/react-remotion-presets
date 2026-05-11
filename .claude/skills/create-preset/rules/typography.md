# Typography for Video

Type hierarchy, sizing, readability, and UX typography principles for motion graphics.

## Typography UX Fundamentals

### Typeface vs Font
- **Typeface**: The family (Helvetica, Georgia). Shared style across all characters, numbers, symbols.
- **Font**: A specific weight within a typeface (Helvetica Bold, Georgia Italic).
- Use 2-3 fonts max per composition. One for headlines, one for body.

### Pairing Rules

**Create contrast.** Typefaces shouldn't be too similar — their nuances get lost.

| Headline | Body | Mood | Context |
|---|---|---|---|
| Serif | Sans-serif | Classic, authoritative | Editorial, legal, luxury |
| Sans-serif | Serif | Modern, clean | Tech, corporate, education |
| Sans-serif | Sans-serif (different weight) | Minimal, unified | SaaS, dashboards, design |
| Monospace | Sans-serif | Technical, precise | Code, engineering, data |
| Display/Decorative | Sans-serif | Expressive, branded | Intro cards, logos only |

**Never:**
- Mix two serifs or two similar sans-serifs
- Use display/decorative for body text
- Exceed 3 typefaces total in one composition

### Kerning, Leading, and Tracking

| Property | Definition | Video Guidance |
|---|---|---|
| **Kerning** | Space between individual letter pairs | Auto (font default) usually fine; manual only for display text |
| **Leading** | Line height (baseline to baseline) | Headlines: 1.1-1.2, Body: 1.3-1.4, Captions: 1.2-1.3 |
| **Tracking** | Uniform spacing across a word/line | Headlines: +0.02em to +0.05em, Body: 0 or -0.01em, All-caps: +0.1em to +0.15em |

### Line Length

For body text in English:
- Ideal: 40-60 characters per line (including spaces and punctuation)
- Max: 75 characters before readability drops
- If lines exceed 60 characters, increase line height
- Headlines: 2 lines max, 12 words per line
- Body: 3-4 lines per screen, 8-10 words per line

### Alignment

- Titles: center or left-aligned (never right-aligned for main title)
- Body text: left-aligned (easiest to read in motion)
- Captions: center or left, consistent within composition
- Never: fully justified in video — rivers of white space distract
- Align left vertical margin: logo, image, header, and body text share same starting x-axis

### Rags and Widows

- **Rag**: Uneven edge of non-justified text. Adjust text box width or tracking for clean rag.
- **Widow/Orphan/Dangly**: A lone word at the end of a paragraph or beginning of a column. Avoid — adjust text box.

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

## Font Selection

**Categories and recommendations:**

| Mood | Style | Examples |
|---|---|---|
| Corporate | Sans-serif, geometric | Inter, Helvetica, Roboto |
| Tech | Monospace or modern sans | JetBrains Mono, SF Mono, Inter |
| Luxury | Serif, high contrast | Playfair Display, Cormorant Garamond |
| Playful | Rounded, informal | Nunito, Quicksand, Comic Neue |
| Editorial | Serif, readable | Merriweather, Source Serif Pro |
| Brutalist | Bold, blocky | Space Grotesk, Bebas Neue |
| Engineering/Professional | Sans-serif, clean | Inter, Fira Sans, Roboto |
| Educational/Learning | Sans-serif, highly readable | Atkinson Hyperlegible, Inter, Noto Sans |
| British/RP/Luxury | Serif, refined | Garamond, Baskerville, Georgia |
| Casual conversational | Rounded sans or humanist | Nunito, Proxima Nova, Lato |

**Rules:**

- Max 2 fonts per composition (1 for headlines, 1 for body)
- Never mix two serifs or two similar sans-serifs
- Monospace for code, data, timestamps only
- Ensure font supports target language character set (Noto fonts for broadest coverage)
- Test with real content — "the quick brown fox jumps over the lazy dog"

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

**Video recommendation:** Aim for 7:1 contrast ratio always. TVs and compression reduce perceived contrast.

## Typography and Mood

Typography sets mood and tone — use it intentionally:

| Mood | Typeface Choice | Weight | Letter Spacing | Animation Style |
|---|---|---|---|---|
| Calm/serene | Serif or light sans | 300-400 | +0.02em | Slow fade, gentle slide |
| Confident/bold | Bold sans-serif | 700+ | -0.01em to 0 | Scale pop, snappy ease |
| Playful/youthful | Rounded sans | 500-600 | 0 | Bouncy spring, stagger |
| Professional/corporate | Clean sans-serif | 400-600 | 0 to +0.02em | Smooth ease, no overshoot |
| Luxury/premium | High-contrast serif | 300/700 combo | +0.05em | Slow, elegant reveal |
| Technical/precise | Monospace or geometric | 400-600 | 0 | Typewriter, methodical |
| Educational/clear | Highly legible sans | 400-600 | -0.01em | Staggered word reveal |
| Dramatic/cinematic | Serif or bold sans | 700-900 | +0.03em | Blur reveal, focus shift |

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

## Consistency Principles

- All similar elements share the same alignment, spacing, and scale
- Guides and measurements: use consistent margins (never eyeball)
- Left vertical margin alignment: logo, image, header, body text share same x-axis
- Type scales should follow a mathematical ratio (1.25, 1.333, or 1.5 multiplier)
