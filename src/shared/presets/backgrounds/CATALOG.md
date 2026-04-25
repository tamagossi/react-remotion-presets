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
