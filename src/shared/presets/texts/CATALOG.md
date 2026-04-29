# Text Presets Catalog

AI selection guide for `src/shared/presets/texts/`.

## Quick Selection Guide

| Script Tone | Mood | Energy | Recommended Preset |
|-------------|------|--------|-------------------|
| Cinematic, dramatic reveal | Mysterious, sleek | Medium | `BlurRevealText` (heavy blur, slow easing) |
| Tech, futuristic, focus pull | Sleek, immersive | Medium | `FocusShiftText` (directional blur + slide) |
| Creative, dynamic, energetic | Playful, bold | High | `ScalePopText` (spring bounce, word stagger) |
| Digital, glitch, cyberpunk | Edgy, chaotic | High | `GlitchRevealText` (scramble, chromatic aberration) |
| Editorial, wave motion | Fluid, rhythmic | Medium | `WaveText` (sine wave per-character) |
| Typewriter, documentary | Neutral, precise | Low | `TypewriterText` (character reveal, cursor) |
| Jittery, chaotic energy | Unstable, raw | High | `WiggleText` (random jitter decay) |
| Letter spacing expansion | Cinematic, wide | Medium | `LetterSpacingRevealText` (blur + spacing) |
| Word cycling, dynamic | Changing, active | Medium-High | `WordSwapText` (crossfade word rotation) |
| Layered depth, echo | Atmospheric, deep | Medium | `StackedRepeatText` (offset echo layers) |
| Falling letters, playful | Dynamic, bouncy | Medium-High | `CascadeLetterText` (rotate + drop in) |
| Mixed typography, editorial | Structured, bold | Medium | `MixedWeightSlideText` (alternating weights + slide) |
| Dramatic typewriter + glitch exit | Digital, chaotic | High | `TypewriterGlitchText` (type then scramble) |
| Inline color highlight reveal | Bold, editorial | Medium | `InlineHighlightText` (segmented color text) |
| Staggered word slide-in | Clean, direct | Medium | `WordSlideText` (words slide from left) |
| Multi-line stack reveal | Powerful, bold | Medium-High | `StackedLineText` (lines slide up staggered) |
| Minimal fade + slide | Subtle, calm | Low | `SimpleFadeText` (opacity + gentle Y slide) |
| Bold colored stack zoom | Assertive, punchy | High | `ColorStackText` (colored lines with zoom) |
| Sequential word fade-in | Grateful, closing | Low-Medium | `SequentialWordText` (words appear one by one) |
| Single word dramatic zoom | Impactful, bold | High | `SingleWordZoomText` (scale from zero) |

## Presets

### BlurRevealText

**ID**: `BlurRevealText`
**Export**: `src/shared/presets/texts`

**Description**
Per-character blur-to-sharp reveal with simultaneous scale-up. Each letter starts heavily blurred and slightly scaled down, snapping into focus with cinematic easing. Staggered timing creates a wave of clarity across the text.

**Visual Characteristics**

- Style: Cinematic, soft, elegant
- Motion: Blur decay + scale up (frame-driven)
- Depth: Blur creates soft depth before snap

**Metadata**

```json
{
  "mood": ["cinematic", "elegant", "mysterious", "sleek"],
  "theme": ["intro", "title", "reveal", "luxury"],
  "energy": "medium",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 45,
  "blurAmount": 12,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "scaleStart": 0.85,
  "staggerDelay": 3,
  "startFrame": 0,
  "text": "BLUR REVEAL",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Title reveals where soft entry feels premium
- Cinematic intros needing focus metaphor
- Any script with mysterious or elegant tone

**When NOT to Use**

- Fast-paced energetic scripts (blur feels too slow)
- Content needing immediate readability

### FocusShiftText

**ID**: `FocusShiftText`
**Export**: `src/shared/presets/texts`

**Description**
Whole-text rack-focus effect. Text starts blurred and offset along X/Y axis, simultaneously sliding into position and coming into sharp focus. Simulates a camera pulling focus.

**Visual Characteristics**

- Style: Cinematic, camera-like, immersive
- Motion: Blur decay + positional slide (frame-driven)
- Depth: Strong depth-of-field metaphor

**Metadata**

```json
{
  "mood": ["cinematic", "immersive", "sleek", "focused"],
  "theme": ["intro", "product", "tech", "film"],
  "energy": "medium",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 50,
  "blurAmount": 16,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "shiftX": 60,
  "shiftY": 0,
  "startFrame": 0,
  "text": "FOCUS SHIFT",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Product reveals with camera focus metaphor
- Cinematic title cards
- Tech content wanting precision feel

**When NOT to Use**

- Multi-line text (works best on short phrases)
- Scripts needing per-character stagger

### CascadeLetterText

**ID**: `CascadeLetterText`
**Export**: `src/shared/presets/texts`

**Description**
Per-character cascade with rotation. Each letter drops in from a configurable direction while rotating from an angled start to upright. Energetic, playful feel with controlled physics.

**Visual Characteristics**

- Style: Playful, dynamic, bouncy
- Motion: Translate + rotate decay (frame-driven)
- Depth: Rotation adds 3D-like energy

**Metadata**

```json
{
  "mood": ["playful", "dynamic", "energetic", "bold"],
  "theme": ["creative", "youth", "entertainment", "gaming"],
  "energy": "medium-to-high",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 45,
  "cascadeDirection": "down",
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "rotation": 45,
  "startFrame": 0,
  "text": "CASCADE",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Creative content needing kinetic energy
- Gaming, entertainment, youth videos
- Any script with playful or bold tone

**When NOT to Use**

- Corporate/formal scripts (rotation feels too casual)
- Content needing minimal, restrained motion

### MixedWeightSlideText

**ID**: `MixedWeightSlideText`
**Export**: `src/shared/presets/texts`

**Description**
Per-word slide-in with alternating font weights. Words enter from alternating left/right directions while toggling between configured font weights. Editorial, magazine-style typography feel.

**Visual Characteristics**

- Style: Editorial, structured, bold
- Motion: Horizontal slide + weight contrast (frame-driven)
- Depth: Weight variation creates typographic hierarchy

**Metadata**

```json
{
  "mood": ["bold", "structured", "editorial", "modern"],
  "theme": ["fashion", "editorial", "branding", "luxury"],
  "energy": "medium",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 45,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeights": [400, 700],
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "slideDirection": "alternate",
  "startFrame": 0,
  "text": "MIXED WEIGHT",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Editorial/fashion content with typographic contrast
- Branding videos needing weight hierarchy
- Any script with modern, magazine-style aesthetic

**When NOT to Use**

- Single-word text (weight alternation requires multiple words)
- Scripts needing uniform typographic weight

### StackedRepeatText

**ID**: `StackedRepeatText`
**Export**: `src/shared/presets/texts`

**Description**
Layered echo effect with multiple semi-transparent copies of the same text. Layers fan out from a single point with slight positional offset and fading opacity, creating typographic depth.

**Visual Characteristics**

- Style: Atmospheric, deep, layered
- Motion: Layer fan-out from center (frame-driven)
- Depth: Overlapping layers create echo depth

**Metadata**

```json
{
  "mood": ["atmospheric", "deep", "cinematic", "mysterious"],
  "theme": ["intro", "title", "music", "art"],
  "energy": "medium",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "easing": [0.22, 1, 0.36, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "layerCount": 4,
  "layerOffset": 4,
  "layerOpacity": 0.15,
  "letterSpacing": 0.02,
  "startFrame": 0,
  "text": "STACKED",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Music videos, artistic content needing depth
- Title cards with echo/motion blur aesthetic
- Any script with atmospheric or layered mood

**When NOT to Use**

- Content needing sharp, single-layer readability
- Small text (layers reduce clarity)

### WordSwapText

**ID**: `WordSwapText`
**Export**: `src/shared/presets/texts`

**Description**
Rotating word carousel with crossfade and vertical slide. An array of words cycles through, with each new word sliding up into place while the previous slides out. Dynamic, ever-changing feel.

**Visual Characteristics**

- Style: Dynamic, active, changing
- Motion: Vertical crossfade swap (frame-driven)
- Depth: Single word visible at a time

**Metadata**

```json
{
  "mood": ["dynamic", "active", "energetic", "modern"],
  "theme": ["tech", "creative", "branding", "presentation"],
  "energy": "medium-to-high",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 30,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "startFrame": 0,
  "swapInterval": 45,
  "textColor": "#ffffff",
  "textTransform": "uppercase",
  "words": ["CREATE", "DESIGN", "BUILD"]
}
```

**When to Use**

- Presentations showing multiple related concepts
- Branding videos with rotating taglines
- Any script needing word cycling without cut

**When NOT to Use**

- Static messages (swapping adds unnecessary motion)
- Long words that overflow container during swap

### TypewriterGlitchText

**ID**: `TypewriterGlitchText`
**Export**: `src/shared/presets/texts`

**Description**
Typewriter character reveal with colored blinking cursor, followed by a glitch scramble exit. Text types in cleanly, holds, then each character scrambles through random glyphs with chromatic aberration before fading out.

**Visual Characteristics**

- Style: Digital, cyberpunk, chaotic
- Motion: Type-in + glitch scramble exit (frame-driven)
- Depth: RGB channel split during exit

**Metadata**

```json
{
  "mood": ["chaotic", "digital", "edgy", "futuristic"],
  "theme": ["cyberpunk", "tech", "gaming", "hacking"],
  "energy": "high",
  "complexity": "medium"
}
```

**Default Props**

```json
{
  "animationDuration": 60,
  "blinkingCursor": true,
  "cursorColor": "#3b82f6",
  "cursorWidth": 3,
  "durationInFrames": 120,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "glitchColor1": "#00f0ff",
  "glitchColor2": "#ff0080",
  "holdDuration": 20,
  "letterSpacing": 0.02,
  "scrambleIntensity": 0.8,
  "startFrame": 0,
  "text": "TYPEWRITER GLITCH",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Tech intros with typewriter + digital decay aesthetic
- Hacking/cyberpunk themed content
- Any script needing a dramatic exit after calm entry

**When NOT to Use**

- Corporate/formal scripts (glitch feels unprofessional)
- Content needing clean, minimal exits

### InlineHighlightText

**ID**: `InlineHighlightText`
**Export**: `src/shared/presets/texts`

**Description**
Inline text with configurable colored segments. Each segment reveals character-by-character with slight stagger, allowing specific words or letters to appear in accent colors while the rest stays neutral.

**Visual Characteristics**

- Style: Editorial, bold, precise
- Motion: Per-character staggered reveal (frame-driven)
- Depth: Flat, color-driven hierarchy

**Metadata**

```json
{
  "mood": ["bold", "editorial", "precise", "modern"],
  "theme": ["branding", "fashion", "editorial", "tech"],
  "energy": "medium",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "durationInFrames": 120,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "segments": [
    { "color": "#ef4444", "text": "e" },
    { "text": "Patmos" }
  ],
  "startFrame": 0,
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Brand names with specific colored letters
- Editorial text with inline emphasis
- Any script needing inline color variation

**When NOT to Use**

- Long paragraphs (per-char reveal too slow)
- Scripts with no color emphasis needs

### WordSlideText

**ID**: `WordSlideText`
**Export**: `src/shared/presets/texts`

**Description**
Words slide in from the left with staggered timing, creating a clean horizontal reveal. Each word travels from an offset position while fading in, then holds before sliding out on exit.

**Visual Characteristics**

- Style: Clean, direct, modern
- Motion: Horizontal slide + fade (frame-driven)
- Depth: Flat

**Metadata**

```json
{
  "mood": ["clean", "modern", "direct", "confident"],
  "theme": ["corporate", "tech", "presentation", "branding"],
  "energy": "medium",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "durationInFrames": 120,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "slideDistance": 80,
  "staggerDelay": 8,
  "startFrame": 0,
  "text": "WORDS APPEAR AT THE RIGHT TIME",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Presentations with clean word reveals
- Corporate scripts needing direct motion
- Any script with medium energy and clean aesthetic

**When NOT to Use**

- Emotional/narrative scripts (too mechanical)
- Content needing per-character flair

### StackedLineText

**ID**: `StackedLineText`
**Export**: `src/shared/presets/texts`

**Description**
Multi-line text stack where each line slides up and fades in with staggered timing. Creates a powerful typographic block reveal, ideal for bold statements or multi-word headlines.

**Visual Characteristics**

- Style: Bold, powerful, structured
- Motion: Vertical slide + fade per line (frame-driven)
- Depth: Flat

**Metadata**

```json
{
  "mood": ["bold", "powerful", "structured", "assertive"],
  "theme": ["fashion", "editorial", "branding", "sports"],
  "energy": "medium-to-high",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "durationInFrames": 120,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "lineGap": 16,
  "lines": ["FULL SCREEN", "POWERFUL", "TYPOGRAPHY"],
  "staggerDelay": 10,
  "startFrame": 0,
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Bold headlines with multiple lines
- Editorial/fashion title cards
- Any script needing stacked typographic power

**When NOT to Use**

- Single-line text (wasted vertical space)
- Small screens with limited height

### SimpleFadeText

**ID**: `SimpleFadeText`
**Export**: `src/shared/presets/texts`

**Description**
Clean opacity fade with optional vertical slide. The entire text block fades in smoothly, holds, then fades out with a subtle opposite slide. Minimal, elegant, and highly readable.

**Visual Characteristics**

- Style: Minimal, elegant, calm
- Motion: Opacity + gentle Y translate (frame-driven)
- Depth: Flat

**Metadata**

```json
{
  "mood": ["calm", "elegant", "minimal", "subtle"],
  "theme": ["wellness", "lifestyle", "luxury", "documentary"],
  "energy": "low",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "durationInFrames": 120,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "slideY": 20,
  "startFrame": 0,
  "text": "INSPIRED BY CURIOSITY",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Minimal intros where motion must not distract
- Wellness, lifestyle, luxury content
- Any script with calm or contemplative tone

**When NOT to Use**

- High-energy scripts (fade feels too slow)
- Content needing per-character or per-word flair

### ColorStackText

**ID**: `ColorStackText`
**Export**: `src/shared/presets/texts`

**Description**
Bold stacked lines with per-line color control and dramatic zoom entrance. Each line scales up from zero with an overshoot bounce, creating a punchy, assertive reveal. Ideal for high-contrast statements.

**Visual Characteristics**

- Style: Bold, punchy, high-contrast
- Motion: Scale zoom + fade per line (frame-driven)
- Depth: Flat, color-driven

**Metadata**

```json
{
  "mood": ["assertive", "bold", "punchy", "energetic"],
  "theme": ["sports", "gaming", "branding", "entertainment"],
  "energy": "high",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 45,
  "durationInFrames": 120,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 96,
  "fontWeight": 700,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "lineColors": ["#ef4444", "#ef4444", "#ffffff"],
  "lineGap": 12,
  "lines": ["TRUE", "POWER OF", "WORDS"],
  "staggerDelay": 12,
  "startFrame": 0,
  "textTransform": "uppercase"
}
```

**When to Use**

- Bold statements with color emphasis
- Sports, gaming, entertainment content
- Any script needing high impact and contrast

**When NOT to Use**

- Subtle/minimal scripts (too aggressive)
- Content needing uniform color

### SequentialWordText

**ID**: `SequentialWordText`
**Export**: `src/shared/presets/texts`

**Description**
Words appear one by one with a subtle scale pop, creating a gentle sequential reveal. Each word fades and scales into place, then holds before fading out in reverse order. Perfect for closing messages or credits.

**Visual Characteristics**

- Style: Gentle, sequential, calm
- Motion: Fade + scale per word (frame-driven)
- Depth: Flat

**Metadata**

```json
{
  "mood": ["gentle", "grateful", "calm", "closing"],
  "theme": ["credits", "outro", "wellness", "documentary"],
  "energy": "low-to-medium",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "durationInFrames": 120,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 72,
  "fontWeight": 400,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "staggerDelay": 10,
  "startFrame": 0,
  "text": "THANK YOU FOR WATCHING",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Outros and thank-you messages
- Credits or closing sequences
- Any script needing gentle word-by-word pacing

**When NOT to Use**

- Fast-paced scripts (sequential feels too slow)
- Single-word headlines

### SingleWordZoomText

**ID**: `SingleWordZoomText`
**Export**: `src/shared/presets/texts`

**Description**
Single large word with dramatic scale zoom entrance. The word starts small, overshoots slightly, then settles to full size with a clean opacity fade. Exit scales down and fades out for a punchy outro.

**Visual Characteristics**

- Style: Impactful, bold, singular
- Motion: Scale zoom + fade (frame-driven)
- Depth: Flat

**Metadata**

```json
{
  "mood": ["impactful", "bold", "singular", "dramatic"],
  "theme": ["sports", "gaming", "branding", "intro"],
  "energy": "high",
  "complexity": "low"
}
```

**Default Props**

```json
{
  "animationDuration": 40,
  "durationInFrames": 120,
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Anton",
  "fontSize": 120,
  "fontWeight": 700,
  "holdDuration": 30,
  "letterSpacing": 0.02,
  "overshoot": 1.15,
  "scaleStart": 0.3,
  "startFrame": 0,
  "text": "WORDS",
  "textColor": "#ffffff",
  "textTransform": "uppercase"
}
```

**When to Use**

- Single-word impact moments
- Sports, gaming, or branding intros
- Any script needing maximum emphasis on one word

**When NOT to Use**

- Multi-word phrases (use ColorStackText or StackedLineText instead)
- Subtle/minimal scripts
