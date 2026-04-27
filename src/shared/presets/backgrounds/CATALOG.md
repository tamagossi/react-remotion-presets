# Background Presets Catalog

AI selection guide for `src/shared/presets/backgrounds/`.

## Quick Selection Guide

| Script Tone                        | Mood                 | Energy      | Color Temp         | Formality           | Recommended Preset                                                       |
| ---------------------------------- | -------------------- | ----------- | ------------------ | ------------------- | ------------------------------------------------------------------------ |
| Corporate, serious, informative    | Calm, focused        | Low-Medium  | Cool/Neutral       | Professional        | `DarkGradientBackground` (reduce blobOpacity, faster easing)             |
| Tech, futuristic, AI               | Mysterious, sleek    | Medium      | Cool               | Professional-Luxury | `DarkGradientBackground` (increase blobCount, add cyan accent)           |
| Playful, creative, youth           | Dynamic, energetic   | High        | Vibrant            | Casual              | `DarkGradientBackground` (vibrant colors, faster animationDuration)      |
| Nightlife, entertainment           | Dramatic, intense    | High        | Warm/Cool contrast | Luxury              | `DarkGradientBackground` (high contrast colors, slow easing)             |
| Educational, documentary           | Neutral, trustworthy | Low         | Neutral            | Professional        | `DarkGradientBackground` (subtle blobs, low grain)                       |
| Emotional, storytelling            | Contemplative        | Low         | Warm               | Casual              | `DarkGradientBackground` (warm palette, slow orbit)                      |
| Bright, optimistic, airy           | Uplifting, fresh     | Medium      | Warm/Cool          | Casual              | `LightGradientBackground` (default palette, gentle orbit)                |
| Wellness, lifestyle, clean         | Calm, serene         | Low-Medium  | Cool               | Casual              | `LightGradientBackground` (reduce blobOpacity, slower animationDuration) |
| Creative, entertainment, nightlife | Dynamic, vibrant     | High        | Vibrant            | Casual-Luxury       | `MorphingMeshBackground` (default palette, high morphStiffness)          |
| Tech, futuristic, product launch   | Sleek, immersive     | Medium-High | Cool-Vibrant       | Professional-Luxury | `MorphingMeshBackground` (cool palette, slower blobStagger)              |
| Music, nightlife, gaming           | Energetic, bold      | High        | Vibrant            | Casual              | `NeonPulseBackground` (default palette, high pulseIntensity)             |
| Meditation, wellness, ASMR         | Calm, minimal        | Low         | Neutral            | Casual              | `MonochromeDriftBackground` (default palette, slower animationDuration)  |
| Emotional, travel, nature          | Warm, nostalgic      | Medium      | Warm               | Casual              | `SunsetOrbitBackground` (default palette, gentle orbit)                  |
| Corporate, tech, data              | Structured, precise  | Medium      | Neutral            | Professional        | `GeometricGridBackground` (default palette, tighter gridDensity)         |
| Space, science, cosmic             | Immersive, vast      | Medium      | Cool               | Casual-Luxury       | `StarfieldBackground` (default palette, more starCount)                  |
| Spotlight, focus, product hero     | Calm, focused        | Low-Medium  | Any (color-driven) | Casual-Professional | `RadialSpotlightBackground` (single tint, gentle breathe)                |
| Editorial, fashion, lifestyle      | Smooth, stylish      | Medium      | Any                | Casual-Luxury       | `WaveCurveBackground` (custom wave color + accent)                       |
| Cinematic, drama, intro scenes     | Moody, atmospheric   | Low-Medium  | Cool/Vibrant       | Luxury              | `CornerGlowBackground` (2 glows opposite corners)                        |
| Tech, fintech, data, intro         | Clean, gradient-pure | Medium      | Cool/Vibrant       | Professional        | `DiagonalSpectrumBackground` (2-3 stop palette, subtle angle drift)      |
| Music video, creative, dreamy      | Ethereal, fluid      | Medium      | Vibrant            | Casual-Luxury       | `AuroraFlowBackground` (4-corner palette, slow flow)                     |
| Product reveal, hero focus        | Atmospheric, focused | Low-Medium  | Cool/Vibrant       | Luxury              | `HaloVignetteBackground` (2 edge blobs, dark center)                    |
| Tech, cyberpunk, neon arc         | Sleek, futuristic    | Medium      | Cool               | Professional-Luxury | `SweepArcBackground` (single cyan arc, slow drift)                       |
| Ocean, deep tech, data flow       | Immersive, layered   | Medium      | Cool               | Professional        | `FlowWaveBackground` (3 diagonal bands, teal drift)                       |
| Warm, earthy, cozy                | Inviting, grounded   | Low-Medium  | Warm               | Casual              | `WarmDriftBackground` (amber Lissajous drift)                            |

## How to Use This Catalog

When generating a video composition:

1. **Analyze the script**: Extract mood, theme, energy level, target audience, and formality.
2. **Match dimensions**: Use the table above or scan preset metadata below.
3. **Select preset**: Pick the best match. If unsure, suggest top 2 with tradeoffs.
4. **Apply prop overrides**: Use `suggestedOverrides` for the matched context.
5. **Compose**: Wrap content in the chosen background component.

---

## Presets

### DarkGradientBackground

**ID**: `DarkGradientBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Animated radial-gradient orbs on dark base. Orbs orbit elliptically with subtle speed variation. Grain overlay adds texture. `mixBlendMode: screen` creates rich color interaction.

**Visual Characteristics**

- Style: Abstract, organic, atmospheric
- Motion: Slow continuous orbit (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Blurred blobs create depth layers

**Metadata**

```json
{
  "mood": ["calm", "mysterious", "sleek", "contemplative", "dramatic"],
  "theme": ["tech", "corporate", "nightlife", "storytelling", "futuristic"],
  "energy": "low-to-medium",
  "colorTemp": "cool",
  "formality": "professional-to-luxury",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "colors": ["#0f1b2e", "#1e3a5f", "#2d1b4e"],
  "baseColor": "#060d18",
  "blobCount": 3,
  "blobSize": 1.4,
  "blobOpacity": 0.45,
  "animationDuration": 20,
  "blurAmount": 140,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context                  | Override Rationale                                   | Props                                                                                                                                         |
| ------------------------ | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `corporate-professional` | Reduce distraction, faster cycle for efficiency feel | `{ blobOpacity: 0.25, animationDuration: 12, blobCount: 2, grainOpacity: 0.02 }`                                                              |
| `tech-futuristic`        | Colder palette, more orbs, sharper motion            | `{ colors: ["#0a192f", "#112240", "#233554"], blobCount: 4, blobOpacity: 0.5, animationDuration: 15, easing: [0.4, 0, 0.6, 1] }`              |
| `playful-creative`       | Vibrant colors, faster orbit, more energy            | `{ colors: ["#ff006e", "#8338ec", "#3a86ff"], blobOpacity: 0.6, animationDuration: 10, blobSize: 1.6 }`                                       |
| `nightlife-dramatic`     | High contrast, slow cinematic easing, intense        | `{ colors: ["#ff0000", "#0000ff", "#ff00ff"], blobOpacity: 0.7, animationDuration: 25, easing: [0.16, 1, 0.3, 1], blurAmount: 100 }`          |
| `educational-neutral`    | Minimal, trustworthy, unobtrusive                    | `{ colors: ["#1a1a2e", "#16213e", "#0f3460"], blobOpacity: 0.2, blobCount: 2, grainOpacity: 0.01, animationDuration: 30 }`                    |
| `emotional-warm`         | Warm palette, gentle slow motion                     | `{ colors: ["#2d142c", "#5e2a4a", "#8e4a6b"], baseColor: "#1a0b1a", blobOpacity: 0.35, animationDuration: 35, easing: [0.25, 0.1, 0.25, 1] }` |

**When to Use**

- Dark-themed videos where text/content needs to pop
- Tech/corporate explainers needing subtle motion
- Any script with cool, professional, or mysterious tone
- When you want atmospheric depth without visual clutter

**When NOT to Use**

- Bright/happy scripts requiring warm, light backgrounds
- Content with very small text (grain may reduce perceived sharpness)
- Scripts needing static, non-moving backgrounds (use a solid color instead)

**Composition Example**

```tsx
import { DarkGradientBackground } from "./shared/presets/backgrounds";

<DarkGradientBackground colors={["#0f1b2e", "#1e3a5f", "#2d1b4e"]}>
  <YourContent />
</DarkGradientBackground>;
```

### LightGradientBackground

**ID**: `LightGradientBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Animated radial-gradient orbs on light base. Orbs orbit elliptically with subtle speed variation. Grain overlay adds texture. `mixBlendMode: normal` creates soft color interaction suited for bright backgrounds.

**Visual Characteristics**

- Style: Abstract, organic, atmospheric
- Motion: Slow continuous orbit (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Blurred blobs create depth layers

**Metadata**

```json
{
  "mood": ["bright", "optimistic", "serene", "uplifting", "fresh"],
  "theme": ["wellness", "lifestyle", "creative", "education", "storytelling"],
  "energy": "low-to-medium",
  "colorTemp": "warm-to-cool",
  "formality": "casual",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "colors": ["#fbc2eb", "#a6c1ee", "#8ec5fc"],
  "baseColor": "#f5f7ff",
  "blobCount": 3,
  "blobSize": 1.4,
  "blobOpacity": 0.5,
  "animationDuration": 20,
  "blurAmount": 160,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.03,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context           | Override Rationale                           | Props                                                                                                                       |
| ----------------- | -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `wellness-calm`   | Softer, slower, minimal distraction          | `{ blobOpacity: 0.3, animationDuration: 30, blobCount: 2, grainOpacity: 0.01 }`                                             |
| `playful-bright`  | More energy, higher saturation, faster orbit | `{ colors: ["#ff9a9e", "#fecfef", "#fecfef"], blobOpacity: 0.6, animationDuration: 12, blobSize: 1.6 }`                     |
| `corporate-light` | Neutral, clean, unobtrusive                  | `{ colors: ["#e0e7ff", "#d1e0fd", "#c7d2fe"], blobOpacity: 0.25, blobCount: 2, grainOpacity: 0.01, animationDuration: 25 }` |
| `lifestyle-fresh` | Airy pastels, gentle motion                  | `{ colors: ["#a1c4fd", "#c2e9fb", "#fbc2eb"], blobOpacity: 0.4, animationDuration: 22 }`                                    |

**When to Use**

- Bright, optimistic videos where dark bg feels too heavy
- Wellness, lifestyle, creative content needing airy atmosphere
- Educational or explainer videos with warm, approachable tone
- Any script with light, fresh, or serene mood

**When NOT to Use**

- Dark/moody scripts needing depth and mystery
- Content with very light text (contrast may suffer)
- Scripts needing static, non-moving backgrounds (use solid color instead)

**Composition Example**

```tsx
import { LightGradientBackground } from "./shared/presets/backgrounds";

<LightGradientBackground colors={["#fbc2eb", "#a6c1ee", "#8ec5fc"]}>
  <YourContent />
</LightGradientBackground>;
```

### MorphingMeshBackground

**ID**: `MorphingMeshBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Animated mesh of soft radial-gradient blobs drifting on dark base. Blobs follow Lissajous curves with independent phase offsets, continuously morphing scale. Colors cycle through palette over time. `mixBlendMode: soft-light` creates rich, layered color interaction reminiscent of aurora and flowing gradients.

**Visual Characteristics**

- Style: Abstract, organic, immersive
- Motion: Continuous drift + scale morph (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Multiple overlapping blurred blobs create layered depth

**Metadata**

```json
{
  "mood": ["dynamic", "vibrant", "immersive", "mysterious", "energetic"],
  "theme": ["nightlife", "entertainment", "tech", "creative", "futuristic"],
  "energy": "medium-to-high",
  "colorTemp": "vibrant",
  "formality": "casual-to-luxury",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "colors": ["#4a00e0", "#8e2de2", "#da22ff", "#1fddff", "#ff006e"],
  "baseColor": "#0a0a1a",
  "blobCount": 5,
  "blobSize": 1.2,
  "blobOpacity": 0.5,
  "animationDuration": 20,
  "blobStagger": 0.8,
  "morphStiffness": 1.0,
  "driftAmount": 0.6,
  "blurAmount": 120,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context               | Override Rationale                                     | Props                                                                                                                                                 |
| --------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `nightlife-energetic` | Maximum vibrancy, aggressive morph, fast cycle         | `{ blobOpacity: 0.7, morphStiffness: 1.8, animationDuration: 12, blobCount: 6, driftAmount: 0.8 }`                                                    |
| `tech-futuristic`     | Cool palette, smooth drift, lower stagger for cohesion | `{ colors: ["#0a192f", "#112240", "#64ffda", "#233554", "#8892b0"], blobStagger: 0.4, morphStiffness: 0.6, animationDuration: 25 }`                   |
| `playful-creative`    | Saturated warm-cool mix, bouncy morph                  | `{ colors: ["#ff006e", "#8338ec", "#3a86ff", "#ffbe0b", "#fb5607"], morphStiffness: 1.5, blobSize: 1.5, animationDuration: 15 }`                      |
| `luxury-premium`      | Deep jewel tones, slow elegant drift                   | `{ colors: ["#2d142c", "#5e2a4a", "#8e4a6b", "#d4af37", "#1a1a2e"], morphStiffness: 0.5, animationDuration: 35, blobStagger: 1.2, driftAmount: 0.4 }` |
| `corporate-modern`    | Minimal distraction, slower motion, fewer blobs        | `{ colors: ["#1a1a2e", "#16213e", "#0f3460", "#533483", "#e94560"], blobOpacity: 0.3, blobCount: 3, morphStiffness: 0.4, animationDuration: 30 }`     |

**When to Use**

- Entertainment, nightlife, or music content needing vibrant, living background
- Product launches and tech reveals wanting immersive, futuristic atmosphere
- Creative portfolios and showreels where background is part of the aesthetic
- Any script demanding high energy, vibrant color, and dynamic motion

**When NOT to Use**

- Corporate/formal scripts requiring minimal, unobtrusive backgrounds (use `DarkGradientBackground` instead)
- Content with extensive small text (mesh motion may distract from reading)
- Scripts needing static or single-color backgrounds
- Situations where color vibrancy would clash with brand guidelines

**Composition Example**

```tsx
import { MorphingMeshBackground } from "./shared/presets/backgrounds";

<MorphingMeshBackground
  colors={["#4a00e0", "#8e2de2", "#da22ff", "#1fddff", "#ff006e"]}
>
  <YourContent />
</MorphingMeshBackground>;
```

---

## Presets (Continued)

### NeonPulseBackground

**ID**: `NeonPulseBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Radial-gradient blobs pulsing in size from center positions. `mixBlendMode: overlay` creates intense neon glow. Fast cycle, vibrant palette. Blobs have slight orbital drift while scaling.

**Visual Characteristics**

- Style: Abstract, neon, energetic
- Motion: Radial pulse + subtle drift (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Overlapping pulses create rhythmic depth

**Metadata**

```json
{
  "mood": ["energetic", "bold", "vibrant", "dynamic", "playful"],
  "theme": ["nightlife", "gaming", "music", "creative", "youth"],
  "energy": "high",
  "colorTemp": "vibrant",
  "formality": "casual",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "colors": ["#ff006e", "#8338ec", "#3a86ff", "#06ffa5", "#ffbe0b"],
  "baseColor": "#050505",
  "blobCount": 4,
  "blobSize": 1.0,
  "blobOpacity": 0.55,
  "animationDuration": 12,
  "pulseIntensity": 0.6,
  "blurAmount": 100,
  "easing": [0.4, 0, 0.6, 1],
  "grainOpacity": 0.03,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context            | Override Rationale                      | Props                                                                           |
| ------------------ | --------------------------------------- | ------------------------------------------------------------------------------- |
| `gaming-energetic` | Maximum pulse, faster cycle, more blobs | `{ pulseIntensity: 0.9, animationDuration: 8, blobCount: 6, blurAmount: 80 }`   |
| `music-rhythmic`   | Strong pulse synced to beat feel        | `{ pulseIntensity: 0.8, animationDuration: 10, blobOpacity: 0.7 }`              |
| `neon-minimal`     | Fewer blobs, softer pulse               | `{ blobCount: 2, pulseIntensity: 0.3, animationDuration: 20, blurAmount: 140 }` |

**When to Use**

- Nightlife, gaming, music content needing bold energy
- Youth-oriented videos with vibrant aesthetic
- Any script demanding high visibility and dynamic motion

**When NOT to Use**

- Corporate/formal scripts requiring restraint
- Content needing calm, minimal atmosphere
- Scripts with very small text (pulse may distract)

**Composition Example**

```tsx
import { NeonPulseBackground } from "./shared/presets/backgrounds";

<NeonPulseBackground colors={["#ff006e", "#8338ec", "#3a86ff"]}>
  <YourContent />
</NeonPulseBackground>;
```

### MonochromeDriftBackground

**ID**: `MonochromeDriftBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Two large grayscale blobs drifting extremely slowly on dark base. Extreme blur and low opacity create an almost imperceptible, meditative motion. No grain by default. Minimal visual noise.

**Visual Characteristics**

- Style: Minimal, meditative, subtle
- Motion: Ultra-slow drift (frame-driven, no CSS animation)
- Texture: Very subtle static grain
- Depth: Extreme blur dissolves edges into base

**Metadata**

```json
{
  "mood": ["calm", "minimal", "contemplative", "serene", "neutral"],
  "theme": ["meditation", "wellness", "ASMR", "mindfulness", "minimal"],
  "energy": "low",
  "colorTemp": "neutral",
  "formality": "casual",
  "complexity": "low",
  "readability": "maximum"
}
```

**Default Props**

```json
{
  "colors": ["#e0e0e0", "#b0b0b0"],
  "baseColor": "#1a1a1a",
  "blobSize": 1.8,
  "blobOpacity": 0.2,
  "animationDuration": 45,
  "blurAmount": 200,
  "easing": [0.25, 0.1, 0.25, 1],
  "grainOpacity": 0.02,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context           | Override Rationale          | Props                                                                               |
| ----------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| `meditation-deep` | Even slower, softer         | `{ animationDuration: 60, blobOpacity: 0.15, blurAmount: 240, grainOpacity: 0.01 }` |
| `wellness-spa`    | Slightly warmer grey        | `{ colors: ["#d4d4d4", "#a8a8a8"], baseColor: "#1f1f1f" }`                          |
| `minimal-focus`   | Single blob, barely visible | `{ colors: ["#c0c0c0"], blobSize: 2.2, blobOpacity: 0.12 }`                         |

**When to Use**

- Meditation, wellness, ASMR content needing zero distraction
- Minimalist videos where background must disappear
- Scripts with calm, contemplative, or neutral tone

**When NOT to Use**

- Content needing energy, vibrancy, or visual interest
- Scripts where background should contribute to mood
- Bright/happy scripts (monochrome feels cold)

**Composition Example**

```tsx
import { MonochromeDriftBackground } from "./shared/presets/backgrounds";

<MonochromeDriftBackground>
  <YourContent />
</MonochromeDriftBackground>;
```

### SunsetOrbitBackground

**ID**: `SunsetOrbitBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Warm-toned blobs following figure-8 (lemniscate) paths on dark base. `mixBlendMode: screen` creates rich sunset color interaction. Slower, more emotional motion than standard elliptical orbits.

**Visual Characteristics**

- Style: Abstract, warm, emotional
- Motion: Figure-8 orbit (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Blurred blobs create soft glow layers

**Metadata**

```json
{
  "mood": ["warm", "nostalgic", "emotional", "contemplative", "serene"],
  "theme": ["travel", "nature", "storytelling", "lifestyle", "emotional"],
  "energy": "medium",
  "colorTemp": "warm",
  "formality": "casual",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "colors": ["#ff512f", "#dd2476", "#ff9966", "#f09819"],
  "baseColor": "#1a0a0a",
  "blobCount": 3,
  "blobSize": 1.5,
  "blobOpacity": 0.4,
  "animationDuration": 25,
  "blurAmount": 150,
  "easing": [0.37, 0, 0.63, 1],
  "grainOpacity": 0.03,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context             | Override Rationale         | Props                                                                             |
| ------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| `travel-wanderlust` | Richer sunset palette      | `{ colors: ["#ff512f", "#f09819", "#ff9966", "#f5576c"], animationDuration: 30 }` |
| `emotional-story`   | Slower, more contemplative | `{ animationDuration: 40, blobOpacity: 0.3, easing: [0.25, 0.1, 0.25, 1] }`       |
| `nature-earth`      | Earthy warm tones          | `{ colors: ["#d4a373", "#faedcd", "#ccd5ae"], baseColor: "#1a120b" }`             |

**When to Use**

- Travel, nature, lifestyle content with warm emotional tone
- Storytelling videos needing nostalgic or contemplative feel
- Any script with sunset, warmth, or journey themes

**When NOT to Use**

- Corporate/tech scripts needing cool precision
- Content with cool color branding
- Scripts needing high energy or fast motion

**Composition Example**

```tsx
import { SunsetOrbitBackground } from "./shared/presets/backgrounds";

<SunsetOrbitBackground colors={["#ff512f", "#dd2476", "#ff9966"]}>
  <YourContent />
</SunsetOrbitBackground>;
```

### GeometricGridBackground

**ID**: `GeometricGridBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Perspective grid lines scrolling vertically on dark base. CSS `perspective` + `rotateX` creates 3D floor effect. Frame-driven vertical offset creates continuous scroll motion. Clean, structured, no blobs.

**Visual Characteristics**

- Style: Geometric, structured, technical
- Motion: Vertical grid scroll (frame-driven, no CSS animation)
- Texture: Clean lines, no grain
- Depth: Perspective transform creates 3D space

**Metadata**

```json
{
  "mood": ["structured", "precise", "technical", "modern", "clean"],
  "theme": ["tech", "corporate", "data", "science", "futuristic"],
  "energy": "medium",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "maximum"
}
```

**Default Props**

```json
{
  "lineColor": "#2a3f5f",
  "baseColor": "#060d18",
  "lineOpacity": 0.35,
  "lineWidth": 1,
  "gridDensity": 12,
  "perspective": 600,
  "animationDuration": 20,
  "easing": [0.45, 0, 0.55, 1]
}
```

**Suggested Prop Overrides by Context**

| Context           | Override Rationale           | Props                                                                                |
| ----------------- | ---------------------------- | ------------------------------------------------------------------------------------ |
| `tech-cyber`      | Brighter lines, tighter grid | `{ lineColor: "#64ffda", lineOpacity: 0.5, gridDensity: 18, animationDuration: 15 }` |
| `corporate-clean` | Subtle, minimal distraction  | `{ lineColor: "#e0e0e0", lineOpacity: 0.15, gridDensity: 8, animationDuration: 30 }` |
| `data-science`    | Grid-focused, precise        | `{ gridDensity: 20, lineWidth: 0.5, animationDuration: 25 }`                         |

**When to Use**

- Tech, corporate, data visualization content
- Videos needing structured, precise aesthetic
- Futuristic scripts where background reinforces tech theme

**When NOT to Use**

- Organic, nature, or emotional scripts (too rigid)
- Content needing soft, flowing motion
- Scripts where grid would compete with data visualizations

**Composition Example**

```tsx
import { GeometricGridBackground } from "./shared/presets/backgrounds";

<GeometricGridBackground lineColor="#2a3f5f" gridDensity={12}>
  <YourContent />
</GeometricGridBackground>;
```

### StarfieldBackground

**ID**: `StarfieldBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Depth-layered stars with parallax drift on dark base. Stars have different sizes, depths, and drift speeds. Twinkle effect via opacity modulation. No blobs, no grain. Clean cosmic aesthetic.

**Visual Characteristics**

- Style: Cosmic, immersive, clean
- Motion: Parallax drift + twinkle (frame-driven, no CSS animation)
- Texture: None (clean stars)
- Depth: 3 depth layers with different speeds

**Metadata**

```json
{
  "mood": ["immersive", "vast", "mysterious", "serene", "awe-inspiring"],
  "theme": ["space", "science", "cosmic", "meditation", "nature"],
  "energy": "medium",
  "colorTemp": "cool",
  "formality": "casual-to-luxury",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "starColor": "#ffffff",
  "baseColor": "#020408",
  "starCount": 120,
  "starOpacity": 0.8,
  "animationDuration": 30,
  "easing": [0.45, 0, 0.55, 1]
}
```

**Suggested Prop Overrides by Context**

| Context               | Override Rationale        | Props                                                            |
| --------------------- | ------------------------- | ---------------------------------------------------------------- |
| `space-sci-fi`        | More stars, cooler tint   | `{ starCount: 200, starColor: "#a8d8ea", baseColor: "#010205" }` |
| `meditation-cosmic`   | Fewer stars, slower drift | `{ starCount: 60, animationDuration: 60, starOpacity: 0.5 }`     |
| `science-documentary` | Subtle, informative       | `{ starCount: 80, starOpacity: 0.4, animationDuration: 40 }`     |

**When to Use**

- Space, science, cosmic content needing immersive depth
- Meditation videos with vast, awe-inspiring theme
- Any script with night sky, universe, or exploration motifs

**When NOT to Use**

- Corporate/formal scripts (too whimsical)
- Content needing warm, earthy tones
- Scripts with extensive small text (stars may distract)

**Composition Example**

```tsx
import { StarfieldBackground } from "./shared/presets/backgrounds";

<StarfieldBackground starCount={120} starColor="#ffffff">
  <YourContent />
</StarfieldBackground>;
```

---

### RadialSpotlightBackground

**ID**: `RadialSpotlightBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Single soft radial spotlight on dark base. Center gently drifts in a slow loop while spotlight breathes (size pulse). Designed for hero / focus shots where one subject must read clearly. Frame-driven, no CSS animation.

**Visual Characteristics**

- Style: Minimal, focused, atmospheric
- Motion: Slow drift + subtle breathe
- Texture: Subtle static grain
- Depth: Single blurred radial creates strong vignette

**Metadata**

```json
{
  "mood": ["focused", "calm", "intimate", "premium"],
  "theme": ["product", "portrait", "spotlight", "intro", "tech"],
  "energy": "low-to-medium",
  "colorTemp": "any",
  "formality": "casual-to-professional",
  "complexity": "low",
  "readability": "maximum"
}
```

**Default Props**

```json
{
  "baseColor": "#0a1a0e",
  "spotlightColor": "#1cc23a",
  "spotlightSize": 1.3,
  "spotlightOpacity": 0.7,
  "spotlightX": 0.5,
  "spotlightY": 0.5,
  "driftAmount": 0.08,
  "breatheAmount": 0.15,
  "blurAmount": 120,
  "animationDuration": 18,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context              | Override Rationale                  | Props                                                                                               |
| -------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `product-hero`       | Off-center spotlight, warm tint     | `{ spotlightColor: "#fbbf24", spotlightX: 0.65, spotlightY: 0.45, breatheAmount: 0.08 }`            |
| `tech-mono`          | Cool monochrome, subtle drift       | `{ spotlightColor: "#94a3b8", baseColor: "#0a0f18", driftAmount: 0.04, breatheAmount: 0.1 }`        |
| `cinematic-deep`     | Slow breathe, large glow            | `{ spotlightSize: 1.6, animationDuration: 30, breatheAmount: 0.2, blurAmount: 160 }`                |

**When to Use**

- Hero shots, product reveals, intros where focus matters
- Single subject framing
- Any script needing visual gravity toward center

**When NOT to Use**

- Complex multi-element scenes
- Energetic/busy content (too quiet)

**Composition Example**

```tsx
import { RadialSpotlightBackground } from "./shared/presets/backgrounds";

<RadialSpotlightBackground spotlightColor="#1cc23a">
  <YourContent />
</RadialSpotlightBackground>;
```

### WaveCurveBackground

**ID**: `WaveCurveBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Two-tone gradient divided by a smooth animated sine-wave SVG path. Wave flows horizontally, curves softened by blur. Editorial feel — clean upper region for content, colored wave below as accent.

**Visual Characteristics**

- Style: Stylish, editorial, smooth
- Motion: Horizontal sine flow
- Texture: Subtle grain
- Depth: Soft-edged 2-tone split

**Metadata**

```json
{
  "mood": ["smooth", "stylish", "editorial", "calm"],
  "theme": ["fashion", "lifestyle", "editorial", "music", "portfolio"],
  "energy": "medium",
  "colorTemp": "any",
  "formality": "casual-to-luxury",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "baseColor": "#1a0218",
  "waveColor": "#c026d3",
  "waveAccentColor": "#f0abfc",
  "waveAmplitude": 0.18,
  "waveFrequency": 1.2,
  "waveOffsetY": 0.6,
  "waveBlur": 30,
  "waveOpacity": 1,
  "flowSpeed": 1,
  "animationDuration": 18,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context              | Override Rationale                  | Props                                                                                                           |
| -------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `dark-elegant`       | Black base, single dark accent      | `{ baseColor: "#000000", waveColor: "#1f2937", waveAccentColor: "#374151", waveBlur: 50 }`                      |
| `vibrant-fashion`    | Hot magenta wave on near-black      | `{ baseColor: "#0a0212", waveColor: "#ec4899", waveAccentColor: "#fb7185", flowSpeed: 1.3 }`                    |
| `cool-tech`          | Cyan wave, low amplitude            | `{ baseColor: "#02061a", waveColor: "#0891b2", waveAccentColor: "#22d3ee", waveAmplitude: 0.1 }`                |

**When to Use**

- Editorial / fashion / portfolio intros
- Lower-third backgrounds (set `waveOffsetY: 0.75`)
- Any composition wanting a clean "upper canvas + colored bottom" split

**When NOT to Use**

- Centered subject shots (wave competes for attention)
- Very text-dense scenes

**Composition Example**

```tsx
import { WaveCurveBackground } from "./shared/presets/backgrounds";

<WaveCurveBackground waveColor="#c026d3" waveAccentColor="#f0abfc">
  <YourContent />
</WaveCurveBackground>;
```

### CornerGlowBackground

**ID**: `CornerGlowBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Dark base with up to 4 corner-anchored color glows, soft fall-off via blur. Gentle drift loop. Cinematic mood with directional light feel. Asymmetric by default.

**Visual Characteristics**

- Style: Cinematic, moody, directional
- Motion: Subtle edge drift
- Texture: Subtle grain
- Depth: Strong center vignette from corner-only light

**Metadata**

```json
{
  "mood": ["moody", "cinematic", "atmospheric", "dramatic"],
  "theme": ["film", "drama", "luxury", "tech-reveal"],
  "energy": "low-to-medium",
  "colorTemp": "cool-vibrant",
  "formality": "luxury",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "baseColor": "#0a0a14",
  "glowColors": ["#7c3aed", "#06b6d4"],
  "glowCorners": ["br", "tr"],
  "glowSize": 1.3,
  "glowOpacity": 0.7,
  "glowDrift": 0.05,
  "blurAmount": 140,
  "animationDuration": 22,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context              | Override Rationale                       | Props                                                                                                              |
| -------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `red-drama`          | Crimson glow, navy opposite corner       | `{ glowColors: ["#dc2626", "#1e3a8a"], glowCorners: ["br", "tl"], glowSize: 1.5 }`                                 |
| `single-side`        | One-sided glow only                      | `{ glowColors: ["#a855f7"], glowCorners: ["br"], glowSize: 1.6, glowOpacity: 0.8 }`                                |
| `four-corner`        | Subtle 4-corner ambient                  | `{ glowColors: ["#6366f1", "#06b6d4", "#ec4899", "#22c55e"], glowCorners: ["tl","tr","br","bl"], glowOpacity: 0.4 }` |

**When to Use**

- Cinematic intros / outros
- Luxury product reveals with directional lighting
- Drama / film-style title cards

**When NOT to Use**

- Bright cheerful scripts
- Content where edges hold key info (glow blooms inward)

**Composition Example**

```tsx
import { CornerGlowBackground } from "./shared/presets/backgrounds";

<CornerGlowBackground glowColors={["#7c3aed", "#06b6d4"]} glowCorners={["br", "tr"]}>
  <YourContent />
</CornerGlowBackground>;
```

### DiagonalSpectrumBackground

**ID**: `DiagonalSpectrumBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
Pure linear-gradient sweep across diagonal axis. Angle slowly rotates between `angleStart` and `angleEnd`. No blobs, no SVG — just clean gradient motion. Perfect for app/UI intros.

**Visual Characteristics**

- Style: Clean, modern, minimal
- Motion: Gradient angle drift
- Texture: Subtle grain
- Depth: Flat — pure color blend

**Metadata**

```json
{
  "mood": ["clean", "modern", "premium", "calm"],
  "theme": ["tech", "fintech", "saas", "data", "intro"],
  "energy": "medium",
  "colorTemp": "any",
  "formality": "professional",
  "complexity": "low",
  "readability": "maximum"
}
```

**Default Props**

```json
{
  "colors": ["#0072ff", "#00c6a7", "#0072ff"],
  "baseColor": "#02061a",
  "angleStart": 135,
  "angleEnd": 200,
  "spectrumOpacity": 1,
  "animationDuration": 24,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context              | Override Rationale                     | Props                                                                                       |
| -------------------- | -------------------------------------- | ------------------------------------------------------------------------------------------- |
| `fintech-clean`      | Two-stop blue, narrow angle range      | `{ colors: ["#1e3a8a", "#3b82f6"], angleStart: 160, angleEnd: 180 }`                        |
| `vibrant-saas`       | Three-stop vibrant                     | `{ colors: ["#8b5cf6", "#ec4899", "#f59e0b"], angleStart: 120, angleEnd: 220 }`             |
| `subtle-luxury`      | Dark muted spectrum                    | `{ colors: ["#1f2937", "#374151", "#1f2937"], spectrumOpacity: 0.9 }`                       |

**When to Use**

- App / SaaS / fintech intros
- Title cards needing pure-gradient mood
- Quick branded backdrops

**When NOT to Use**

- Scripts wanting organic motion (this is geometric)
- Stories needing depth/atmosphere

**Composition Example**

```tsx
import { DiagonalSpectrumBackground } from "./shared/presets/backgrounds";

<DiagonalSpectrumBackground colors={["#0072ff", "#00c6a7", "#0072ff"]}>
  <YourContent />
</DiagonalSpectrumBackground>;
```

### AuroraFlowBackground

**ID**: `AuroraFlowBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**
4 large soft radial color zones anchored to canvas corners, very high blur, slow position breathing. `mixBlendMode: screen` produces aurora-like color blending. Ethereal, fluid mood.

**Visual Characteristics**

- Style: Ethereal, fluid, dreamy
- Motion: Slow corner-anchored drift
- Texture: Subtle grain
- Depth: Heavy blur dissolves zones into base

**Metadata**

```json
{
  "mood": ["ethereal", "dreamy", "fluid", "vibrant"],
  "theme": ["music", "creative", "fashion", "art", "wellness"],
  "energy": "medium",
  "colorTemp": "vibrant",
  "formality": "casual-to-luxury",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "baseColor": "#0a0418",
  "colors": ["#3b82f6", "#a855f7", "#ec4899", "#06b6d4"],
  "zoneSize": 1.3,
  "zoneOpacity": 0.65,
  "flowAmount": 0.12,
  "blurAmount": 180,
  "animationDuration": 25,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context              | Override Rationale                     | Props                                                                                                       |
| -------------------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `northern-lights`    | Green/teal/violet aurora               | `{ colors: ["#10b981", "#06b6d4", "#8b5cf6", "#22c55e"], baseColor: "#020617" }`                            |
| `sunset-aurora`      | Warm 4-corner palette                  | `{ colors: ["#f59e0b", "#ec4899", "#ef4444", "#fbbf24"], baseColor: "#1a0a0a" }`                            |
| `subtle-dreamy`      | Lower opacity, more blur               | `{ zoneOpacity: 0.45, blurAmount: 220, animationDuration: 35 }`                                             |

**When to Use**

- Music videos, creative reels
- Dreamy / ethereal mood pieces
- Art and fashion intros

**When NOT to Use**

- Corporate/precise content
- Scripts needing flat clean backdrop

**Composition Example**

```tsx
import { AuroraFlowBackground } from "./shared/presets/backgrounds";

<AuroraFlowBackground colors={["#3b82f6", "#a855f7", "#ec4899", "#06b6d4"]}>
  <YourContent />
</AuroraFlowBackground>;
```

---

### FlowWaveBackground

**ID**: `FlowWaveBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**

Diagonal flowing wave bands on dark base. Multiple blurred rectangular strips with `linear-gradient` drift horizontally with phase-offset sine modulation per wave. Each band rotated at a slightly different angle creating layered depth. Teal/deep-blue color palette.

**Visual Characteristics**

- Style: Immersive, layered, deep
- Motion: Horizontal drift + vertical sine modulation (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Multiple overlapping blurred bands create deep flow

**Metadata**

```json
{
  "mood": ["immersive", "layered", "deep", "flowing", "tech"],
  "theme": ["ocean", "data", "tech", "finance", "science"],
  "energy": "medium",
  "colorTemp": "cool",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 18,
  "baseColor": "#020617",
  "easing": [0.45, 0, 0.55, 1],
  "flowSpeed": 0.6,
  "grainOpacity": 0.04,
  "grainAmount": 0.3,
  "waveBlur": 80,
  "waveColors": ["#0e7490", "#1e3a8a", "#0891b2"],
  "waveCount": 3,
  "waveOpacity": 0.6,
  "waveThickness": 0.35
}
```

**Suggested Prop Overrides by Context**

| Context           | Override Rationale                     | Props                                                                                                            |
| ----------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `ocean-deep`      | Deeper blue palette, slower flow        | `{ waveColors: ["#0c4a6e", "#1e3a8a", "#164e63"], flowSpeed: 0.4, animationDuration: 25 }`                      |
| `data-flow`       | Single-band subtle flow                 | `{ waveCount: 2, waveColors: ["#3b82f6", "#6366f1"], waveOpacity: 0.45, flowSpeed: 0.3 }`                      |
| `neon-wave`       | Vibrant bands, fast flow                | `{ waveColors: ["#06b6d4", "#8b5cf6", "#ec4899"], waveOpacity: 0.8, flowSpeed: 1.2, waveBlur: 60 }`             |
| `warm-flow`       | Warm tones instead of cool             | `{ waveColors: ["#d97706", "#dc2626", "#f59e0b"], baseColor: "#1a0a0a" }`                                       |

**When to Use**

- Tech, data science, ocean-themed content needing layered depth
- Finance/fintech backgrounds requiring cool, immersive flow
- Any script with deep, flowing, or layered visual metaphor

**When NOT to Use**

- Content needing bright, airy atmosphere
- Scripts requiring static or minimal motion
- Warm/earthy themes (use `WarmDriftBackground` instead)

**Composition Example**

```tsx
import { FlowWaveBackground } from "./shared/presets/backgrounds";

<FlowWaveBackground waveColors={["#0e7490", "#1e3a8a", "#0891b2"]} flowSpeed={0.6}>
  <YourContent />
</FlowWaveBackground>;
```

---

### HaloVignetteBackground

**ID**: `HaloVignetteBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**

Edge-anchored soft blobs creating dark oval center (negative space). Blobs alternate left/right placement with slow circular drift and gentle size breathing. Heavy blur dissolves edges into atmospheric vignette. Magenta/violet palette from original video.

**Visual Characteristics**

- Style: Cinematic, atmospheric, vignette
- Motion: Slow edge drift + size breathe (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Strong center vignette from edge-only light

**Metadata**

```json
{
  "mood": ["cinematic", "atmospheric", "dramatic", "mysterious", "focused"],
  "theme": ["product", "hero", "reveal", "cinematic", "premium"],
  "energy": "low-to-medium",
  "colorTemp": "cool-vibrant",
  "formality": "luxury",
  "complexity": "low",
  "readability": "maximum"
}
```

**Default Props**

```json
{
  "animationDuration": 20,
  "baseColor": "#0a0212",
  "blobCount": 2,
  "blobOpacity": 0.7,
  "blobSize": 1.8,
  "blurAmount": 200,
  "breatheAmount": 0.15,
  "colors": ["#c026d3", "#7c3aed"],
  "driftAmount": 0.06,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context               | Override Rationale                         | Props                                                                                                         |
| --------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| `product-hero`        | Magenta/violet from video, off-center    | `{ blobCount: 2, blobOpacity: 0.8, breatheAmount: 0.1 }`                                                     |
| `cinematic-red-blue`  | Deep red vs blue edge blobs               | `{ colors: ["#dc2626", "#3b82f6"], baseColor: "#0a0a14" }`                                                    |
| `gold-premium`        | Gold edge glow, dark center                | `{ colors: ["#d4af37", "#b8860b"], baseColor: "#0a0804", blobOpacity: 0.6 }`                                   |
| `neon-focus`          | Brighter blobs, stronger vignette         | `{ colors: ["#22d3ee", "#a855f7"], blobOpacity: 0.9, breatheAmount: 0.2 }`                                    |

**When to Use**

- Product hero / reveal shots needing dark center for text
- Cinematic intros with atmospheric vignette
- Premium / luxury content requiring focus
- Any scene where background must frame rather than distract

**When NOT to Use**

- Bright, cheerful scripts (dark center feels heavy)
- Content needing even illumination across frame
- Minimalist/clean aesthetic (vignette adds too much atmosphere)

**Composition Example**

```tsx
import { HaloVignetteBackground } from "./shared/presets/backgrounds";

<HaloVignetteBackground colors={["#c026d3", "#7c3aed"]} baseColor="#0a0212">
  <YourContent />
</HaloVignetteBackground>;
```

---

### SweepArcBackground

**ID**: `SweepArcBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**

Single soft radial-gradient arc sweeping from bottom of frame on dark base. Arc position set via `arcPosition` (multiplier relative to frame center), creating visible curved band with gentle horizontal drift and size breathing. Cyan palette from original video.

**Visual Characteristics**

- Style: Sleek, futuristic, clean
- Motion: Horizontal drift + subtle breathe (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Single blurred arc creates directional flow

**Metadata**

```json
{
  "mood": ["sleek", "futuristic", "clean", "minimal", "tech"],
  "theme": ["tech", "cyberpunk", "product", "intro", "reveal"],
  "energy": "medium",
  "colorTemp": "cool",
  "formality": "professional-luxury",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 16,
  "arcColor": "#06b6d4",
  "arcOpacity": 0.75,
  "arcPosition": 1.25,
  "arcWidth": 1.4,
  "baseColor": "#020617",
  "blurAmount": 160,
  "breatheAmount": 0.12,
  "driftAmount": 0.04,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.03,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context            | Override Rationale                  | Props                                                                                                    |
| ------------------ | ----------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `tech-neon`        | Bright neon arc, default palette   | `{ arcColor: "#22d3ee", arcOpacity: 0.9, blurAmount: 120 }`                                              |
| `warm-arc`         | Warm amber sweep                    | `{ arcColor: "#f59e0b", baseColor: "#0a0400", driftAmount: 0.06 }`                                       |
| `minimal-arc`      | Subtle, slower, less distraction    | `{ arcOpacity: 0.4, animationDuration: 25, breatheAmount: 0.06, driftAmount: 0.02 }`                    |
| `dual-arc`         | Two arcs: top + bottom              | `{ arcPosition: 1.5, arcWidth: 1.8 }`                                                                   |

**When to Use**

- Tech/cyberpunk intros needing sleek sweep
- Product reveals with directional light
- Any scene wanting single luminous arc accent
- Minimal compositions where one gradient element is enough

**When NOT to Use**

- Content needing full-frame atmospheric fills
- Scripts with warm, earthy aesthetic
- Multi-element compositions (arc can feel sparse)

**Composition Example**

```tsx
import { SweepArcBackground } from "./shared/presets/backgrounds";

<SweepArcBackground arcColor="#06b6d4" baseColor="#020617">
  <YourContent />
</SweepArcBackground>;
```

---

### WarmDriftBackground

**ID**: `WarmDriftBackground`
**Export**: `src/shared/presets/backgrounds`

**Description**

Organic warm-toned blobs drifting on dark warm base. Blobs follow Lissajous-like paths via `driftComplexity` frequency control, creating freeform non-elliptical motion. Amber/brown palette from original video. Gentle, cozy feel.

**Visual Characteristics**

- Style: Organic, warm, cozy, comfortable
- Motion: Freeform Lissajous drift (frame-driven, no CSS animation)
- Texture: Subtle static grain
- Depth: Blurred blobs create soft warm glow layers

**Metadata**

```json
{
  "mood": ["warm", "cozy", "organic", "comfortable", "inviting"],
  "theme": ["lifestyle", "wellness", "food", "nature", "storytelling"],
  "energy": "low-to-medium",
  "colorTemp": "warm",
  "formality": "casual",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 30,
  "baseColor": "#1a0a04",
  "blobCount": 2,
  "blobOpacity": 0.55,
  "blobSize": 2.0,
  "blurAmount": 180,
  "colors": ["#d97706", "#b45309", "#92400e"],
  "driftAmount": 0.5,
  "driftComplexity": 1.2,
  "easing": [0.45, 0, 0.55, 1],
  "grainOpacity": 0.04,
  "grainAmount": 0.3
}
```

**Suggested Prop Overrides by Context**

| Context            | Override Rationale                | Props                                                                                                         |
| ------------------ | --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `cozy-evening`     | Deep amber, slower drift          | `{ colors: ["#92400e", "#78350f"], animationDuration: 40, driftAmount: 0.35 }`                                 |
| `autumn-warm`      | Richer warm palette               | `{ colors: ["#dc2626", "#ea580c", "#d97706"], blobOpacity: 0.6 }`                                              |
| `soft-cream`       | Lighter, creamier tones           | `{ colors: ["#fbbf24", "#f59e0b", "#d97706"], baseColor: "#1c1108", blobOpacity: 0.5, blurAmount: 200 }`      |
| `candle-glow`      | Single warm blob, minimal motion  | `{ blobCount: 1, colors: ["#f59e0b"], driftAmount: 0.2, driftComplexity: 0.8, animationDuration: 45 }`          |

**When to Use**

- Lifestyle, wellness, food content needing warmth
- Emotional storytelling with cozy aesthetic
- Any script with warm, earthy, inviting mood
- Autumn/fall-themed videos

**When NOT to Use**

- Tech/corporate scripts needing cool precision
- Content with dark/serious tone (warmth may feel out of place)
- Fast-paced energetic content (drift is slow, organic)

**Composition Example**

```tsx
import { WarmDriftBackground } from "./shared/presets/backgrounds";

<WarmDriftBackground colors={["#d97706", "#b45309", "#92400e"]} baseColor="#1a0a04">
  <YourContent />
</WarmDriftBackground>;
```

---

## Selection Algorithm for AI Agents

Given: `script`, `theme`, `tone`

```
1. Extract features from script:
   - mood = [keywords from script]
   - energy = low | medium | high (from pacing, word choice)
   - colorTemp = warm | cool | neutral | vibrant (from adjectives)
   - formality = casual | professional | luxury (from audience + vocabulary)

2. Score each preset:
   score = mood_overlap * 0.4 + energy_match * 0.2 + colorTemp_match * 0.2 + formality_match * 0.2

3. Pick top 2-3 presets.

4. For winner, apply suggestedOverrides[context] where context = theme + formality.

5. Generate code with chosen preset + overridden props.
```

**Rule**: Always suggest top 2-3 with brief rationale. Never auto-pick without giving alternatives unless user explicitly asks for auto-selection.
