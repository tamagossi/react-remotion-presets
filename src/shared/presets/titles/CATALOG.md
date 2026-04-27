# Titles Presets Catalog

AI selection guide for `src/shared/presets/titles/`.

## Font & Animation System

- **Font**: All presets use **Anton** (Google Fonts, single weight 400 — already reads as bold/condensed). Load via `useAnton()` from `src/shared/hooks/useAnton`. Bebas Neue is no longer used. Use `fontSize` for hierarchy, not `fontWeight`.
- **Entrance**: Slide-up + opacity fade + **chromatic aberration** (RGB channel split: cyan/magenta offset on X, yellow on Y) that converges to white over the first ~40% of `animationDuration`. Disable with `chromaticAberration={false}`. Tune intensity with `chromaticOffset` (default `14`).
- **Line accents**: Decorative horizontal bars rendered next to each line. Per-line via `accent` prop:
  - `"none"` (no bar), `"left"`, `"right"`, `"both"`. Pass an array to control each line individually, e.g. `accent={["none", "right"]}`.
  - Tunable: `accentLength` (default `96`), `accentThickness` (default `3`), `accentGap` (default `16`).
- **Background**: Title presets render text only on a transparent root. Pair with a film-grain or scratch background for the full reference look.

## Quick Selection Guide

| Script Tone | Mood | Energy | Color Temp | Formality | Recommended Preset |
|-------------|------|--------|------------|-----------|-------------------|
| Storyteller, explainer, YouTube intro | Bold, confident | Medium-High | Neutral | Professional | `LabelStackTitle` (label + big headline) |
| Cinematic title card, brand reveal | Dramatic, structured | Medium | Neutral | Professional-Luxury | `StackedCenterTitle` (3-line centered stack) |
| Motivational, impactful statement | Bold, assertive | High | Neutral | Professional | `BoldRightTitle` (2-line right-aligned) |
| Minimalist, editorial, fashion | Clean, refined | Low-Medium | Neutral | Luxury | `MinimalStyleTitle` (mixed weight 3-line) |
| Hero section, main title + subtitle | Clear, authoritative | Medium | Neutral | Professional | `HeroSubtitleTitle` (big headline + small subtitle) |
| Tech, modern, sleek presentation | Structured, precise | Medium | Cool | Professional | `StackedRightTitle` (3-line right stack) |
| Minimal intro, understated elegance | Subtle, calm | Low | Neutral | Luxury | `MinimalDuoTitle` (small label + big title) |
| Event promo, conference, webinar | Energetic, organized | Medium-High | Neutral | Professional | `StackedTrioCenterTitle` (3-line center stack) |
| Modern outro, call-to-action | Clean, direct | Medium | Neutral | Professional | `ModernRightTitle` (big + small right-aligned) |
| Premium boxed card reveal | Clean, premium | Medium | Neutral | Professional | `CardFillTitle` (white card with text) |
| Product/gaming title with underline | Bold, product | Medium-High | Neutral | Professional | `ControllersUnderlineTitle` (center + underline) |
| Luxury nested frame aesthetic | Premium, luxury | Medium | Neutral | Luxury | `DoubleFrameTitle` (outer + inner frame) |
| Label + headline + underline bars | Bold, hierarchical | Medium-High | Warm | Professional | `ExclusiveLabelTitle` (label + bars) |
| Dramatic statement with initial | Dramatic, bold | High | Warm | Professional | `GiantInitialTitle` (giant letter + line) |
| Numbered sequence/chapter | Structured, ordinal | Medium | Neutral | Professional | `NumberFrameTitle` (number in frame) |
| Dynamic offset tilted frames | Dynamic, modern | Medium-High | Neutral | Professional | `OffsetFramesTitle` (dual tilted frames) |
| Clean outlined box layout | Clean, boxed | Medium | Neutral | Professional | `OutlineBoxTitle` (single outline) |
| Classic overline + underline | Classic, editorial | Medium | Neutral | Professional | `OverlineUnderlineTitle` (overline + underline) |
| Split highlight with box anchor | Dynamic, anchored | Medium-High | Warm | Professional | `SplitHighlightTitle` (box + text + divider) |
| Statement with strikethrough + badge | Bold, emphasized | High | Neutral | Professional | `StrikethroughBadgeTitle` (strike + badge) |
| Editorial with vertical accent | Bold, editorial | Medium-High | Warm | Professional | `VerticalAccentTitle` (vertical bar + stack) |

## How to Use This Catalog

When generating a video composition:

1. **Analyze the script**: Extract mood, theme, energy level, target audience, and formality.
2. **Match layout**: Use the table above or scan preset metadata below.
3. **Select preset**: Pick the best match. If unsure, suggest top 2 with tradeoffs.
4. **Apply prop overrides**: Use `suggestedOverrides` for the matched context.
5. **Compose**: Overlay preset on background. No background included in title presets.

---

## Presets

### LabelStackTitle

**ID**: `LabelStackTitle`
**Export**: `src/shared/presets/titles`

**Description**
Small label above a large headline, left-aligned. Perfect for YouTube intros and explainer videos where a category tag precedes the main topic. Mixed font weights create clear hierarchy.

**Visual Characteristics**
- Style: Typographic, hierarchical, editorial
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["bold", "confident", "clear"],
  "theme": ["youtube", "explainer", "storytelling", "education"],
  "energy": "medium-to-high",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["TITLES KIT", "DYNAMIC"],
  "align": "left",
  "fontSize": [36, 96],
  "accent": ["none", "right"],
  "letterSpacing": [0.15, 0.02],
  "gap": 8,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `youtube-intro` | Faster entrance, tighter spacing for punchy open | `{ animationDuration: 30, staggerDelay: 8, gap: 4 }` |
| `explainer-chapter` | Slower, more deliberate for section headers | `{ animationDuration: 60, staggerDelay: 15, letterSpacing: [0.2, 0.04] }` |
| `brand-reveal` | Larger headline, more dramatic | `{ fontSize: [28, 120], animationDuration: 50, easing: [0.22, 1, 0.36, 1] }` |

**When to Use**
- YouTube video intros with topic + title structure
- Explainer videos needing chapter labels
- Any script with a "category + main point" structure

**When NOT to Use**
- When all text lines need equal visual weight
- Scripts requiring centered or right-aligned layout

**Composition Example**
```tsx
import { LabelStackTitle } from "./shared/presets/titles";
import { DarkGradientBackground } from "./shared/presets/backgrounds";

<DarkGradientBackground>
  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <LabelStackTitle lines={["EPISODE 1", "THE BEGINNING"]} color="#ffffff" />
  </div>
</DarkGradientBackground>
```

### StackedCenterTitle

**ID**: `StackedCenterTitle`
**Export**: `src/shared/presets/titles`

**Description**
Three bold lines centered on screen. Middle line is largest, creating a pyramid hierarchy. Ideal for brand names, event titles, or cinematic title cards.

**Visual Characteristics**
- Style: Typographic, symmetrical, monumental
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["dramatic", "structured", "monumental"],
  "theme": ["brand", "event", "cinematic", "luxury"],
  "energy": "medium",
  "colorTemp": "neutral",
  "formality": "professional-to-luxury",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["CREATIVE", "DESIGN", "STUDIO"],
  "align": "center",
  "fontSize": [72, 96, 72],
  "accent": "none",
  "letterSpacing": 0.02,
  "gap": 12,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `brand-reveal` | Even larger middle line for impact | `{ fontSize: [64, 120, 64], gap: 16 }` |
| `event-promo` | Faster, punchier for trailers | `{ animationDuration: 30, staggerDelay: 8 }` |
| `luxury-cinematic` | Slower, more elegant easing | `{ animationDuration: 60, easing: [0.25, 0.1, 0.25, 1] }` |

**When to Use**
- Brand name reveals with descriptor lines
- Event/conference title cards
- Cinematic intros needing symmetrical weight

**When NOT to Use**
- When text must be left or right aligned
- Scripts with only 1-2 lines of text

**Composition Example**
```tsx
import { StackedCenterTitle } from "./shared/presets/titles";

<StackedCenterTitle lines={["ACME", "DESIGN", "STUDIO"]} fontSize={[64, 96, 64]} />
```

### BoldRightTitle

**ID**: `BoldRightTitle`
**Export**: `src/shared/presets/titles`

**Description**
Two bold lines, right-aligned. Second line is larger than the first. Assertive and modern. Good for punchy statements and CTAs.

**Visual Characteristics**
- Style: Typographic, assertive, modern
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["bold", "assertive", "modern"],
  "theme": ["marketing", "cta", "motivational", "tech"],
  "energy": "high",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["BOLD IDEAS", "MATTER"],
  "align": "right",
  "fontSize": [72, 96],
  "accent": ["both", "none"],
  "letterSpacing": 0.02,
  "gap": 12,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `motivational-quote` | Larger second line for emphasis | `{ fontSize: [64, 120], gap: 8 }` |
| `tech-pitch` | Tighter, faster for pitch decks | `{ animationDuration: 30, staggerDelay: 6, gap: 6 }` |
| `cta-endcard` | Slide from right for directional feel | `{ entranceDirection: "right", animationDuration: 35 }` |

**When to Use**
- Motivational statements and quotes
- Call-to-action end cards
- Tech pitches needing assertive typography

**When NOT to Use**
- Centered or left-aligned layouts
- Calm, contemplative scripts

**Composition Example**
```tsx
import { BoldRightTitle } from "./shared/presets/titles";

<BoldRightTitle lines={["BUILD", "FASTER"]} fontSize={[80, 120]} />
```

### MinimalStyleTitle

**ID**: `MinimalStyleTitle`
**Export**: `src/shared/presets/titles`

**Description**
Three lines with mixed weights: small, large, small. Left-aligned. Editorial and refined. The large middle word acts as a focal point surrounded by lighter context.

**Visual Characteristics**
- Style: Typographic, editorial, refined
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["refined", "clean", "understated"],
  "theme": ["fashion", "editorial", "luxury", "minimal"],
  "energy": "low-to-medium",
  "colorTemp": "neutral",
  "formality": "luxury",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["MINIMAL", "STYLE", "CONCEPT"],
  "align": "left",
  "fontSize": [28, 96, 28],
  "accent": ["right", "none", "left"],
  "letterSpacing": [0.15, 0.02, 0.15],
  "gap": 8,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `fashion-editorial` | Even more contrast between lines | `{ fontSize: [24, 120, 24], letterSpacing: [0.2, 0.02, 0.2] }` |
| `luxury-brand` | Slower, more deliberate | `{ animationDuration: 60, staggerDelay: 18, easing: [0.25, 0.1, 0.25, 1] }` |
| `minimal-portfolio` | Tighter spacing, cleaner | `{ gap: 4, fontWeight: [300, 700, 300] }` |

**When to Use**
- Fashion and editorial content
- Luxury brand presentations
- Portfolio intros needing refined typography

**When NOT to Use**
- High-energy, fast-paced scripts
- When all lines need equal visual weight

**Composition Example**
```tsx
import { MinimalStyleTitle } from "./shared/presets/titles";

<MinimalStyleTitle lines={["THE", "ART", "OF DESIGN"]} />
```

### HeroSubtitleTitle

**ID**: `HeroSubtitleTitle`
**Export**: `src/shared/presets/titles`

**Description**
Large centered headline with a smaller subtitle beneath. Classic hero section layout. Strong hierarchy with clear primary/secondary relationship.

**Visual Characteristics**
- Style: Typographic, hierarchical, classic
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["authoritative", "clear", "confident"],
  "theme": ["hero", "landing", "intro", "corporate"],
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
  "lines": ["DYNAMIC", "Titles Kit"],
  "align": "center",
  "fontSize": [96, 36],
  "accent": ["none", "right"],
  "letterSpacing": [0.02, 0.1],
  "gap": 12,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `saas-hero` | Larger headline, tighter subtitle | `{ fontSize: [120, 32], gap: 8, letterSpacing: [0.02, 0.12] }` |
| `webinar-intro` | More spaced, readable from distance | `{ fontSize: [88, 40], gap: 20 }` |
| `product-launch` | Dramatic entrance with scale feel | `{ animationDuration: 50, easing: [0.22, 1, 0.36, 1] }` |

**When to Use**
- Hero sections and landing page videos
- Webinar and course intros
- Product launch title cards

**When NOT to Use**
- When subtitle needs to be same size as headline
- Right or left aligned layouts

**Composition Example**
```tsx
import { HeroSubtitleTitle } from "./shared/presets/titles";

<HeroSubtitleTitle lines={["REMOTION", "Video Presets"]} />
```

### StackedRightTitle

**ID**: `StackedRightTitle`
**Export**: `src/shared/presets/titles`

**Description**
Three bold lines right-aligned. Middle line is largest. Symmetrical pyramid but anchored to the right. Clean and structured for tech and modern presentations.

**Visual Characteristics**
- Style: Typographic, structured, modern
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["structured", "precise", "modern"],
  "theme": ["tech", "corporate", "data", "presentation"],
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
  "lines": ["CREATIVE", "TYPOGRAPHY", "PACK"],
  "align": "right",
  "fontSize": [72, 96, 72],
  "accent": ["none", "none", "left"],
  "letterSpacing": 0.02,
  "gap": 12,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `tech-deck` | Tighter, more compact for slides | `{ gap: 6, animationDuration: 30 }` |
| `corporate-pitch` | Slower, more authoritative | `{ animationDuration: 55, staggerDelay: 15 }` |
| `modern-portfolio` | Larger middle line for name emphasis | `{ fontSize: [56, 112, 56] }` |

**When to Use**
- Tech presentations and pitch decks
- Corporate videos needing structured typography
- Modern portfolios with right-aligned aesthetic

**When NOT to Use**
- Centered or left-aligned layouts
- Playful, casual scripts

**Composition Example**
```tsx
import { StackedRightTitle } from "./shared/presets/titles";

<StackedRightTitle lines={["FULL", "STACK", "DEV"]} />
```

### MinimalDuoTitle

**ID**: `MinimalDuoTitle`
**Export**: `src/shared/presets/titles`

**Description**
Small label + large headline, left-aligned. Even more minimal than LabelStackTitle. Two lines only. Understated elegance for premium content.

**Visual Characteristics**
- Style: Typographic, minimal, elegant
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["subtle", "elegant", "understated"],
  "theme": ["luxury", "minimal", "editorial", "wellness"],
  "energy": "low",
  "colorTemp": "neutral",
  "formality": "luxury",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["MINIMAL", "TITLES"],
  "align": "left",
  "fontSize": [28, 96],
  "accent": ["none", "right"],
  "letterSpacing": [0.15, 0.02],
  "gap": 8,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `luxury-brand` | Slower, more refined | `{ animationDuration: 60, staggerDelay: 18 }` |
| `wellness-intro` | Softer weights, more breathing room | `{ fontWeight: [300, 600], gap: 16 }` |
| `minimal-product` | Tighter, modern feel | `{ gap: 4, letterSpacing: [0.2, 0.04] }` |

**When to Use**
- Luxury brand videos
- Wellness and meditation intros
- Minimal product presentations

**When NOT to Use**
- High-energy, fast-paced content
- When more than 2 lines are needed

**Composition Example**
```tsx
import { MinimalDuoTitle } from "./shared/presets/titles";

<MinimalDuoTitle lines={["NEW", "COLLECTION"]} />
```

### StackedTrioCenterTitle

**ID**: `StackedTrioCenterTitle`
**Export**: `src/shared/presets/titles`

**Description**
Three bold lines centered, middle line largest. Energetic and organized. Perfect for event names, course modules, and structured announcements.

**Visual Characteristics**
- Style: Typographic, energetic, organized
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["energetic", "organized", "confident"],
  "theme": ["event", "course", "webinar", "promo"],
  "energy": "medium-to-high",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["DIGITAL", "MARKETING", "WEEK"],
  "align": "center",
  "fontSize": [72, 96, 72],
  "accent": ["both", "none", "both"],
  "letterSpacing": 0.02,
  "gap": 12,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `event-promo` | Faster for trailer feel | `{ animationDuration: 30, staggerDelay: 8 }` |
| `course-module` | Slower, more educational | `{ animationDuration: 55, staggerDelay: 15 }` |
| `product-week` | Larger middle for product name | `{ fontSize: [64, 120, 64] }` |

**When to Use**
- Event and conference promotions
- Online course module intros
- Structured announcements and promos

**When NOT to Use**
- Left or right aligned layouts
- Minimal, 1-2 line titles

**Composition Example**
```tsx
import { StackedTrioCenterTitle } from "./shared/presets/titles";

<StackedTrioCenterTitle lines={["REACT", "SUMMIT", "2026"]} />
```

### ModernRightTitle

**ID**: `ModernRightTitle`
**Export**: `src/shared/presets/titles`

**Description**
Large headline + smaller secondary line, right-aligned. Modern and direct. Good for outros, credits, and clean CTAs with a contemporary feel.

**Visual Characteristics**
- Style: Typographic, modern, direct
- Motion: Staggered slide-up + fade per line
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["modern", "direct", "clean"],
  "theme": ["outro", "credits", "cta", "tech"],
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
  "lines": ["MODERN", "TEXT REVEAL"],
  "align": "right",
  "fontSize": [96, 48],
  "accent": ["none", "right"],
  "letterSpacing": [0.02, 0.08],
  "gap": 12,
  "color": "#ffffff",
  "textTransform": "uppercase",
  "startFrame": 0,
  "animationDuration": 45,
  "staggerDelay": 12,
  "easing": [0.16, 1, 0.3, 1],
  "entranceDirection": "up"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `youtube-outro` | Faster, punchier | `{ animationDuration: 30, staggerDelay: 8 }` |
| `credits-roll` | Slower, more elegant | `{ animationDuration: 60, easing: [0.25, 0.1, 0.25, 1] }` |
| `cta-modern` | Tighter spacing, bolder secondary | `{ gap: 6, fontWeight: [700, 600] }` |

**When to Use**
- YouTube video outros
- End credits and acknowledgments
- Modern call-to-action cards

**When NOT to Use**
- Centered or left-aligned layouts
- When both lines need equal weight

**Composition Example**
```tsx
import { ModernRightTitle } from "./shared/presets/titles";

<ModernRightTitle lines={["THANKS", "FOR WATCHING"]} />
```

---

### CardFillTitle

**ID**: `CardFillTitle`
**Export**: `src/shared/presets/titles`

**Description**
White filled rectangle card containing centered title text. Elegant and contained. Perfect for clean, structured title reveals with a premium boxed feel.

**Visual Characteristics**
- Style: Boxed, clean, contained
- Motion: Card scales in + text staggers in
- Texture: None (text only)
- Depth: Flat with subtle box shadow

**Metadata**
```json
{
  "mood": ["clean", "premium", "structured"],
  "theme": ["presentation", "promo", "card"],
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
  "lines": ["CARD FILL"],
  "cardColor": "#ffffff",
  "cardPadding": 48,
  "cardWidth": 700,
  "textColor": "#171717",
  "textFontSize": 72,
  "subtitle": "Premium Collection",
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `presentation-card` | Dark card for contrast | `{ cardColor: "#1a1a1a", textColor: "#ffffff" }` |
| `promo-wide` | Wider card for more text | `{ cardWidth: 900 }` |

**When to Use**
- Presentation title cards
- Product promo cards
- Clean boxed title layouts

**When NOT to Use**
- Full-bleed backgrounds
- Minimal text-only needs

---

### ControllersUnderlineTitle

**ID**: `ControllersUnderlineTitle`
**Export**: `src/shared/presets/titles`

**Description**
Centered headline with animated underline bar and subtitle below. Classic gaming/product reveal style with emphasis on the main title.

**Visual Characteristics**
- Style: Centered, product-focused, bold
- Motion: Text in first, then underline expands, then subtitle
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["bold", "gaming", "product"],
  "theme": ["gaming", "product-reveal", "tech"],
  "energy": "medium-to-high",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["CONTROLLERS"],
  "subtitle": "Premium Gaming Gear",
  "accentColor": "#dc2626",
  "accentThickness": 3,
  "textColor": "#ffffff",
  "textFontSize": 96,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `product-reveal` | Red accent for brand | `{ accentColor: "#ff0000" }` |
| `tech-title` | Blue accent | `{ accentColor: "#0066ff" }` |

**When to Use**
- Product reveal videos
- Gaming content titles
- Tech product launches

**When NOT to Use**
- Minimal/editorial needs
- Multi-line stacked titles

---

### DoubleFrameTitle

**ID**: `DoubleFrameTitle`
**Export**: `src/shared/presets/titles`

**Description**
Nested double frame (outer colored border, inner white border) containing centered title and optional subtitle. Premium boxed aesthetic with layered depth.

**Visual Characteristics**
- Style: Boxed, layered, premium
- Motion: Outer frame in, inner frame in, text staggers
- Texture: None (text only)
- Depth: Layered (two frames)

**Metadata**
```json
{
  "mood": ["premium", "luxury", "structured"],
  "theme": ["brand-reveal", "premium", "luxury"],
  "energy": "medium",
  "colorTemp": "neutral",
  "formality": "luxury",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["DOUBLE FRAME"],
  "outerBorderColor": "#dc2626",
  "innerBorderColor": "#ffffff",
  "borderThickness": 2,
  "boxWidth": 600,
  "boxPadding": 48,
  "subtitle": "PREMIUM",
  "textColor": "#ffffff",
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `luxury-brand` | Gold outer frame | `{ outerBorderColor: "#d4af37" }` |
| `tech-box` | Blue outer frame | `{ outerBorderColor: "#0066ff" }` |

**When to Use**
- Luxury brand reveals
- Premium product titles
- High-end marketing cards

**When NOT to Use**
- Casual content
- Minimal needs

---

### ExclusiveLabelTitle

**ID**: `ExclusiveLabelTitle`
**Export**: `src/shared/presets/titles`

**Description**
Small label above large headline with accent bars below each text line. Left-aligned, creates strong hierarchy with multiple visual accents.

**Visual Characteristics**
- Style: Hierarchical, bold, editorial
- Motion: Label slides in, then headline with underline bars
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["bold", "confident", "exclusive"],
  "theme": ["brand", "exclusive", "editorial"],
  "energy": "medium-to-high",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["DYNAMIC", "TITLES"],
  "label": "EXCLUSIVE",
  "accentColor": "#dc2626",
  "accentThickness": 2,
  "accentWidth": 120,
  "labelFontSize": 24,
  "textFontSize": 96,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `brand-reveal` | Wider accent bars | `{ accentWidth: 200 }` |
| `editorial` | Thinner accent | `{ accentThickness: 1 }` |

**When to Use**
- Brand reveal titles
- Exclusive/limited content
- Editorial layouts

**When NOT to Use**
- Minimal needs
- Center-aligned content

---

### GiantInitialTitle

**ID**: `GiantInitialTitle`
**Export**: `src/shared/presets/titles`

**Description**
Giant colored initial letter followed by vertical divider line and stacked text. Dramatic typographic statement with strong visual anchor.

**Visual Characteristics**
- Style: Dramatic, typographic, statement
- Motion: Giant initial scales in, line expands, text fades in
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["dramatic", "bold", "statement"],
  "theme": ["brand", "statement", "intro"],
  "energy": "high",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["GIANT INITIAL"],
  "initial": "G",
  "initialColor": "#dc2626",
  "initialFontSize": 180,
  "lineColor": "#ffffff",
  "lineThickness": 2,
  "lineHeight": 200,
  "textFontSize": 48,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `brand-init` | Larger initial | `{ initialFontSize: 220 }` |
| `statement` | Bold color | `{ initialColor: "#ff0000" }` |

**When to Use**
- Brand name reveals
- Statement titles
- Dramatic intros

**When NOT to Use**
- Subtle/minimal needs
- Multi-word initials

---

### NumberFrameTitle

**ID**: `NumberFrameTitle`
**Export**: `src/shared/presets/titles`

**Description**
Number displayed inside a rotating outlined square frame, positioned left of headline text. Structured, numbered sequence feel.

**Visual Characteristics**
- Style: Structured, numbered, framed
- Motion: Frame rotates/scales in, text slides in
- Texture: None (text only)
- Depth: Flat with frame

**Metadata**
```json
{
  "mood": ["structured", "numbered", "ordinal"],
  "theme": ["序列", "numbered", "chapter"],
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
  "lines": ["FRAME TITLE"],
  "number": "01",
  "numberColor": "#dc2626",
  "frameColor": "#dc2626",
  "frameSize": 100,
  "frameThickness": 2,
  "textFontSize": 72,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `chapter-num` | Sequential numbers | `{ number: "01", number: "02", etc. }` |
| `step-num` | Step indicator | `{ frameColor: "#0066ff" }` |

**When to Use**
- Chapter titles
- Numbered sequences
- Step-by-step content

**When NOT to Use**
- Non-numbered content
- Centered layouts

---

### OffsetFramesTitle

**ID**: `OffsetFramesTitle`
**Export**: `src/shared/presets/titles`

**Description**
Two offset tilted rectangular frames (colored outer, white inner) containing centered title text. Dynamic layered layout with subtle rotation.

**Visual Characteristics**
- Style: Dynamic, layered, modern
- Motion: Outer frame tilts in, inner frame counter-rotates, text staggers
- Texture: None (text only)
- Depth: Layered offset frames

**Metadata**
```json
{
  "mood": ["dynamic", "modern", "layered"],
  "theme": ["modern", "trendy", "design"],
  "energy": "medium-to-high",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["OFFSET FRAMES"],
  "frame1Color": "#dc2626",
  "frame2Color": "#ffffff",
  "frameWidth": 450,
  "frameHeight": 140,
  "frameOffset": 16,
  "frameThickness": 2,
  "subtitle": "DYNAMIC LAYOUT",
  "textFontSize": 56,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `modern-brand` | More offset | `{ frameOffset: 24 }` |
| `trendy` | Blue accent | `{ frame1Color: "#0066ff" }` |

**When to Use**
- Modern brand titles
- Trendy design content
- Dynamic layouts

**When NOT to Use**
- Minimal/clean needs
- Formal content

---

### OutlineBoxTitle

**ID**: `OutlineBoxTitle`
**Export**: `src/shared/presets/titles`

**Description**
Single outlined rectangular border containing centered title and optional subtitle. Clean boxed look with colored border emphasis.

**Visual Characteristics**
- Style: Boxed, clean, outlined
- Motion: Box scales in, text staggers in
- Texture: None (text only)
- Depth: Flat with border

**Metadata**
```json
{
  "mood": ["clean", "boxed", "structured"],
  "theme": ["presentation", "boxed", "outlined"],
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
  "lines": ["OUTLINE BOX"],
  "boxBorderColor": "#dc2626",
  "boxBorderThickness": 3,
  "boxPadding": 48,
  "boxWidth": 600,
  "subtitle": "Premium Design",
  "textColor": "#ffffff",
  "textFontSize": 72,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `presentation` | Thinner border | `{ boxBorderThickness: 2 }` |
| `promo-bold` | Thicker border | `{ boxBorderThickness: 4 }` |

**When to Use**
- Presentation title cards
- Boxed content titles
- Outlined designs

**When NOT to Use**
- Full-bleed backgrounds
- Minimal text-only

---

### OverlineUnderlineTitle

**ID**: `OverlineUnderlineTitle`
**Export**: `src/shared/presets/titles`

**Description**
Small overline text above large headline with underline bar below. Classic title card with both top and bottom accent elements.

**Visual Characteristics**
- Style: Classic, structured, editorial
- Motion: Overline in, headline in with underline expanding
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["classic", "structured", "editorial"],
  "theme": ["classic", "title-card", "editorial"],
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
  "lines": ["OVERLINE"],
  "overline": "EST. 2024",
  "accentColor": "#dc2626",
  "accentThickness": 3,
  "overlineFontSize": 24,
  "textFontSize": 96,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `classic-title` | Traditional look | `{ overline: "EST. 2024" }` |
| `brand-sub` | Custom overline | `{ overline: "YOUR BRAND" }` |

**When to Use**
- Classic title cards
- Editorial content
- Brand establishment titles

**When NOT to Use**
- Minimal needs
- Non-structured layouts

---

### SplitHighlightTitle

**ID**: `SplitHighlightTitle`
**Export**: `src/shared/presets/titles`

**Description**
Colored highlight box on left side with headline text and divider line beside it. Dynamic split layout with strong visual anchor.

**Visual Characteristics**
- Style: Split, dynamic, anchored
- Motion: Box in, text in, divider line fades
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["dynamic", "bold", "anchored"],
  "theme": ["highlight", "feature", "spotlight"],
  "energy": "medium-to-high",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["HIGHLIGHT"],
  "boxColor": "#dc2626",
  "boxWidth": 100,
  "boxHeight": 160,
  "subtitle": "FEATURED",
  "textFontSize": 72,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `feature-highlight` | Larger box | `{ boxWidth: 140, boxHeight: 200 }` |
| `spotlight` | Taller box | `{ boxHeight: 200 }` |

**When to Use**
- Feature highlights
- Spotlight content
- Dynamic side-by-side

**When NOT to Use**
- Centered layouts
- Minimal needs

---

### StrikethroughBadgeTitle

**ID**: `StrikethroughBadgeTitle`
**Export**: `src/shared/presets/titles`

**Description**
Headline with animated horizontal strikethrough line through center, plus badge element below. Statement style with emphasis and label.

**Visual Characteristics**
- Style: Statement, bold, emphasized
- Motion: Text in, strikethrough sweeps across, badge pops in
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["bold", "statement", "emphasized"],
  "theme": ["statement", "new", "featured"],
  "energy": "high",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["STRIKETHROUGH"],
  "badge": "NEW",
  "badgeColor": "#dc2626",
  "lineColor": "#ffffff",
  "lineThickness": 2,
  "textFontSize": 72,
  "badgeFontSize": 20,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `new-badge` | Classic "NEW" | `{ badge: "NEW" }` |
| `featured` | "FEATURED" badge | `{ badge: "FEATURED", badgeColor: "#0066ff" }` |

**When to Use**
- New product titles
- Featured content
- Statement emphasis

**When NOT to Use**
- Subtle/minimal needs
- Non-emphasized content

---

### VerticalAccentTitle

**ID**: `VerticalAccentTitle`
**Export**: `src/shared/presets/titles`

**Description**
Vertical accent bar on left side with small uppercase text above and huge headline below. Strong editorial hierarchy with vertical line element.

**Visual Characteristics**
- Style: Editorial, hierarchical, bold
- Motion: Vertical bar grows, small text in, huge text in
- Texture: None (text only)
- Depth: Flat

**Metadata**
```json
{
  "mood": ["bold", "editorial", "hierarchical"],
  "theme": ["editorial", "brand", "statement"],
  "energy": "medium-to-high",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**
```json
{
  "lines": ["VERTICAL", "ACCENT"],
  "accentColor": "#dc2626",
  "accentThickness": 3,
  "accentHeight": 180,
  "smallTextFontSize": 28,
  "textFontSize": 108,
  "animationDuration": 45
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `brand-bold` | Taller accent | `{ accentHeight: 220 }` |
| `editorial` | Thinner accent | `{ accentThickness: 2 }` |

**When to Use**
- Brand titles
- Editorial content
- Bold statement layouts

**When NOT to Use**
- Centered layouts
- Minimal needs

---

## Selection Algorithm for AI Agents

Given: `script`, `theme`, `tone`

```
1. Extract features from script:
   - mood = [keywords from script]
   - energy = low | medium | high (from pacing, word choice)
   - alignment = left | center | right (from layout preference or context)
   - lineCount = 1 | 2 | 3 (from title structure)

2. Score each preset:
   score = mood_overlap * 0.3 + energy_match * 0.2 + alignment_match * 0.2 + lineCount_match * 0.2 + formality_match * 0.1

3. Pick top 2-3 presets.

4. For winner, apply suggestedOverrides[context] where context = theme + formality.

5. Generate code with chosen preset + overridden props.
```

**Rule**: Always suggest top 2-3 with brief rationale. Never auto-pick without giving alternatives unless user explicitly asks for auto-selection.
