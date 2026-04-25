# Color Theory

Palette selection and application for video presets.

## Mood-to-Color Mapping

| Mood                  | Temperature   | Suggested Palette Direction                      |
| --------------------- | ------------- | ------------------------------------------------ |
| Corporate / Trust     | Cool          | Navy, slate, steel blue, muted teal              |
| Tech / Futuristic     | Cool          | Cyan, electric blue, deep purple, black          |
| Playful / Creative    | Vibrant       | Magenta, electric blue, bright coral, lime       |
| Nightlife / Dramatic  | High contrast | Deep red, electric blue, neon pink, black        |
| Educational / Neutral | Neutral       | Soft gray, muted blue, sage green, cream         |
| Emotional / Warm      | Warm          | Maroon, dusty rose, warm taupe, soft gold        |
| Luxury / Premium      | Cool-warm     | Deep plum, champagne gold, charcoal, ivory       |
| Energetic / Sporty    | Warm-vibrant  | Orange, bright red, yellow, black                |
| Calm / Wellness       | Cool-soft     | Soft blue, mint, lavender, pale gray             |
| Horror / Thriller     | Cool-dark     | Deep black, blood red, sickly green, dark purple |

## Contrast for Readability

Video requires higher contrast than web. Viewers process at speed.

**Minimum ratios (WCAG 2.1 AA for large text):**

- Normal text on background: 4.5:1
- Large text (18px+ bold, 24px+ normal): 3:1
- **Video recommendation:** Aim for 7:1 always. TVs and compression reduce perceived contrast.

**Quick checks:**

- White (#fff) on dark blue (#0f1b2e): ratio ~14:1 ✅
- Yellow (#ffd700) on black (#000): ratio ~12:1 ✅
- Light gray (#ccc) on white (#fff): ratio ~1.6:1 ❌ never use

## Palette Structures

### Monochromatic

Single hue, varying saturation/lightness.

- **Feel:** Sophisticated, cohesive, calm
- **Use:** Corporate, minimal, premium
- **Example:** Navy `#0a192f` → `#112240` → `#233554`

### Analogous

Adjacent hues on color wheel.

- **Feel:** Harmonious, natural, gentle
- **Use:** Nature, wellness, storytelling
- **Example:** Teal `#0d7377` → Blue `#14919b` → Green `#32e0c4`

### Complementary

Opposite hues on color wheel.

- **Feel:** Dynamic, energetic, high contrast
- **Use:** Sports, calls-to-action, playful
- **Example:** Blue `#3a86ff` ↔ Orange `#ff006e`

### Triadic

Three hues evenly spaced on wheel.

- **Feel:** Balanced, vibrant, playful
- **Use:** Creative, youth, entertainment
- **Example:** Magenta `#ff006e`, Blue `#8338ec`, Cyan `#3a86ff`

### Split-Complementary

Base hue + two adjacent to its complement.

- **Feel:** High contrast but less jarring than pure complementary
- **Use:** Modern UI, tech, dynamic content

## Background vs Foreground Color Rules

**Dark backgrounds (default for most presets):**

- Base: `#060d18` to `#1a1a2e` range
- Blobs/overlays: 20-50% opacity so they don't compete with text
- Text: white `#ffffff` or near-white `#f0f0f0`
- Accent: one vibrant color for emphasis (CTAs, highlights)

**Light backgrounds (use sparingly):**

- Base: `#f5f5f5` to `#ffffff`
- Text: `#1a1a1a` to `#333333`
- Shadows/drop-shadows needed for depth
- More prone to banding in video compression

## Colorblind Safety

~8% of male viewers have some color vision deficiency.

**Rules:**

- Never rely on color alone to convey information
- Use luminance contrast, not just hue contrast
- Test with deuteranopia simulation (green-blind, most common)
- Safe pairs: blue + orange, blue + yellow, purple + yellow
- Avoid: red + green, green + brown, blue + purple

## Video Compression Considerations

H.264/AV1 compression affects color:

- **Flat colors band:** Add subtle noise/grain to gradients (0.02-0.05 opacity)
- **Highly saturated colors bleed:** Keep accent saturation below 85% unless intentional
- **Fine color differences lost:** Ensure minimum 10% lightness difference between adjacent colors
- **Black crush:** Avoid pure `#000000` — use `#060606` or `#0a0a0a` to preserve shadow detail

## Suggested Default Palettes by Context

Store these in preset `defaultProps` or suggest in `CATALOG.md`:

```json
{
  "corporate": ["#0f1b2e", "#1e3a5f", "#2d5a8a"],
  "tech": ["#0a192f", "#112240", "#64ffda"],
  "playful": ["#ff006e", "#8338ec", "#3a86ff"],
  "luxury": ["#2d142c", "#5e2a4a", "#d4af37"],
  "warm": ["#2d142c", "#5e2a4a", "#8e4a6b"],
  "neutral": ["#1a1a2e", "#16213e", "#0f3460"]
}
```

## Applying Color in Presets

**For backgrounds:**

- Base color: 80-90% of frame
- Accent blobs/overlays: 10-20% of frame, low opacity
- Text area: ensure 7:1 contrast against base + overlay combined

**For text animations:**

- Default text color: white or near-white on dark bg
- Highlight color: accent from palette
- Secondary text: 60-70% opacity of primary

**For charts:**

- Use full palette for data series
- Reserve one color (often red or orange) for emphasis/alert
- Ensure adjacent series have sufficient luminance difference
