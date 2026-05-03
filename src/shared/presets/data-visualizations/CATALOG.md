# Data Visualizations Catalog

AI selection guide for `src/shared/presets/data-visualizations/`.

## Quick Selection Guide

| Script Tone | Mood       | Energy | Color Temp | Formality    | Recommended Preset       |
| ----------- | ---------- | ------ | ---------- | ------------ | ------------------------ |
| Corporate   | Trust      | Medium | Cool       | Professional | `AnimatedLineChart`      |
| Tech        | Futuristic | High   | Cool       | Professional | `AreaChartGlow`          |
| Financial   | Dramatic   | High   | Neutral    | Professional | `CandlestickChart`       |
| Analytical  | Neutral    | Medium | Cool       | Professional | `HorizontalBarChart`     |
| Dashboard   | Energetic  | Medium | Vibrant    | Professional | `DualGaugeChart`         |
| Minimal     | Calm       | Low    | Neutral    | Professional | `CircularRadialGauge`    |
| Corporate   | Trust      | Medium | Cool       | Professional | `DonutChartSet`          |
| Tech        | Futuristic | Medium | Cool       | Professional | `NestedArcChart`         |
| Fitness     | Energetic  | High   | Vibrant    | Casual       | `ActivityRings`          |
| Corporate   | Trust      | Medium | Warm       | Professional | `ProgressBarCard`        |
| Tech        | Futuristic | Medium | Cool       | Professional | `LoadingProgress`        |
| Bold        | Energetic  | High   | Vibrant    | Casual       | `SplitPercentageDisplay` |
| Social      | Playful    | Medium | Vibrant    | Casual       | `DemographicIcons`       |
| Educational | Warm       | Low    | Warm       | Professional | `PyramidChart`           |
| Social      | Playful    | Medium | Cool       | Casual       | `IconStatGrid`           |
| Analytical  | Neutral    | Medium | Cool       | Professional | `RadarChart`             |
| Analytical  | Analytical | Medium | Vibrant    | Professional | `DotScatterChart`        |
| Status      | Neutral    | Low    | Neutral    | Professional | `TrafficLightDots`       |

## How to Use This Catalog

When generating a video composition:

1. **Analyze the script**: Extract mood, theme, energy level, target audience, formality.
2. **Match dimensions**: Use table above or scan preset metadata.
3. **Select preset**: Pick best match. If unsure, suggest top 2 with tradeoffs.
4. **Apply prop overrides**: Use `suggestedOverrides` for matched context.
5. **Compose**: Integrate preset into composition.

## Presets

### AnimatedLineChart

**ID**: `AnimatedLineChart`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Smooth SVG line chart with path draw-on animation, staggered data point dots, dashed vertical tooltip lines, and an animated total counter. Perfect for sales history and trend visualization.

**Visual Characteristics**

- Style: geometric/minimal
- Motion: staggered, path draw-on
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["corporate", "trust"],
  "theme": ["corporate", "tech"],
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
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "data": [],
  "dotLabels": true,
  "dotStagger": 6,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "lineColor": "#d4c44a",
  "showCard": true,
  "suffix": "",
  "title": "YOUR SALES HISTORY / AUTO CHECK",
  "titleColor": "#ffffff",
  "totalLabel": "TOTAL SALES FOR THE YEAR",
  "totalPrefix": "$"
}
```

**Suggested Prop Overrides by Context**

| Context                  | Override Rationale                 | Props                                                      |
| ------------------------ | ---------------------------------- | ---------------------------------------------------------- |
| `corporate-professional` | Muted colors for corporate reports | `{ lineColor: "#3b82f6", cardBackgroundColor: "#f8fafc" }` |
| `tech-futuristic`        | Neon glow effect                   | `{ lineColor: "#06b6d4", backgroundColor: "#020617" }`     |

**When to Use**

- Sales reports and trend analysis
- Monthly/quarterly performance reviews
- Financial overview videos

**When NOT to Use**

- When comparing multiple series (use HorizontalBarChart instead)
- When emphasizing part-to-whole relationships (use DonutChartSet)

---

### AreaChartGlow

**ID**: `AreaChartGlow`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Glowing blue area chart with gradient fill reveal via clip-path expansion, vertical indicator sweep, and large animated total. Cinematic and futuristic feel.

**Visual Characteristics**

- Style: geometric/futuristic
- Motion: clip-path reveal, sweep
- Texture: glow/blur
- Depth: layered

**Metadata**

```json
{
  "mood": ["tech", "futuristic"],
  "theme": ["tech", "corporate"],
  "energy": "high",
  "colorTemp": "cool",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "accentLabel": "Total expenditure for 10 years",
  "animationDuration": 90,
  "areaColor": "#3b82f6",
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "data": [],
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "glowColor": "#60a5fa",
  "showCard": true,
  "title": "",
  "titleColor": "#ffffff",
  "totalPrefix": "$",
  "verticalLineColor": "#ffffff"
}
```

**Suggested Prop Overrides by Context**

| Context                  | Override Rationale        | Props                                            |
| ------------------------ | ------------------------- | ------------------------------------------------ |
| `tech-futuristic`        | Cyan glow for sci-fi feel | `{ areaColor: "#06b6d4", glowColor: "#22d3ee" }` |
| `corporate-professional` | Subtle blue for reports   | `{ areaColor: "#1e40af", glowColor: "#3b82f6" }` |

---

### CandlestickChart

**ID**: `CandlestickChart`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Bitcoin-style candlestick chart with bars growing from centerline, green/red color coding, and staggered reveal. Dark theme with hex-pattern feel.

**Visual Characteristics**

- Style: geometric/financial
- Motion: staggered grow
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["dramatic", "energetic"],
  "theme": ["finance", "tech"],
  "energy": "high",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "data": [],
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "negativeColor": "#ef4444",
  "positiveColor": "#22c55e",
  "showCard": true,
  "showLabels": true,
  "title": "BITCOIN",
  "titleColor": "#ffffff"
}
```

---

### HorizontalBarChart

**ID**: `HorizontalBarChart`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Grouped horizontal bars comparing two data series with staggered slide-in animation. Orange vs blue color scheme with legend.

**Visual Characteristics**

- Style: geometric/analytical
- Motion: staggered slide-in
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["neutral", "analytical"],
  "theme": ["corporate", "education"],
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
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "data": [],
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "showCard": true,
  "showLegend": true,
  "title": "Statistical analysis",
  "titleColor": "#ffffff"
}
```

---

### DualGaugeChart

**ID**: `DualGaugeChart`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Two semicircular gauges with gradient arc stroke-draw, spring-animated needle rotation, and counting values. Side-by-side comparison.

**Visual Characteristics**

- Style: geometric/dashboard
- Motion: spring physics
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["energetic", "tech"],
  "theme": ["tech", "corporate"],
  "energy": "medium",
  "colorTemp": "vibrant",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "gauge1": { "color": "#a3e635", "label": "", "max": 1000, "value": 0 },
  "gauge2": { "color": "#2dd4bf", "label": "", "max": 1000, "value": 0 },
  "showCard": true
}
```

---

### CircularRadialGauge

**ID**: `CircularRadialGauge`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Circular gauge with radial tick marks that stagger in, center gradient blob, and spring-animated percentage counter. Minimal and elegant.

**Visual Characteristics**

- Style: geometric/minimal
- Motion: staggered, spring
- Texture: gradient glow
- Depth: layered

**Metadata**

```json
{
  "mood": ["calm", "tech"],
  "theme": ["tech", "wellness"],
  "energy": "low",
  "colorTemp": "cool",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "gradientColors": ["#7c3aed", "#3b82f6"],
  "max": 100,
  "showCard": true,
  "title": "",
  "value": 0
}
```

---

### DonutChartSet

**ID**: `DonutChartSet`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Three side-by-side donut charts with arc stroke draw-on, inner percentage counter, 10-frame stagger, and an optional title with concurrent entry/exit animations.

**Visual Characteristics**

- Style: geometric/corporate
- Motion: staggered draw-on
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["corporate", "trust"],
  "theme": ["corporate", "education"],
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
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "charts": [],
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "showCard": true
}
```

---

### NestedArcChart

**ID**: `NestedArcChart`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Concentric arcs that reveal outward from center with labels and leader lines. Great for hierarchical or nested data.

**Visual Characteristics**

- Style: geometric/tech
- Motion: outward reveal
- Texture: none
- Depth: layered

**Metadata**

```json
{
  "mood": ["tech", "futuristic"],
  "theme": ["tech", "corporate"],
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
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "data": [],
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "showCard": true,
  "title": "",
  "titleColor": "#ffffff"
}
```

---

### ActivityRings

**ID**: `ActivityRings`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Apple Watch-style concentric activity rings with spring-animated fill, gap styling, and side labels. Pink, green, and cyan colors.

**Visual Characteristics**

- Style: geometric/fitness
- Motion: spring physics
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["energetic", "playful"],
  "theme": ["fitness", "health"],
  "energy": "high",
  "colorTemp": "vibrant",
  "formality": "casual",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "rings": [],
  "showCard": true
}
```

---

### ProgressBarCard

**ID**: `ProgressBarCard`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Large animated counter with gradient progress bar and percentage display. Light theme with colorful bar.

**Visual Characteristics**

- Style: geometric/corporate
- Motion: counter + bar fill
- Texture: gradient
- Depth: flat

**Metadata**

```json
{
  "mood": ["corporate", "trust"],
  "theme": ["corporate", "finance"],
  "energy": "medium",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 90,
  "backgroundColor": "#e8e8e8",
  "barColors": ["#ef4444", "#f97316", "#eab308", "#22c55e"],
  "cardBackgroundColor": "#f0f0f0",
  "cardBorderRadius": 12,
  "cardPadding": 40,
  "currentValue": 0,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "maxValue": 100,
  "prefix": "$",
  "showCard": true,
  "suffix": "",
  "title": "COMPANY CAPITAL",
  "titleColor": "#888888"
}
```

---

### LoadingProgress

**ID**: `LoadingProgress`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Giant outlined numbers with gradient progress bar and shimmer effect. Dark cinematic theme.

**Visual Characteristics**

- Style: geometric/tech
- Motion: counter + bar fill
- Texture: outline/stroke
- Depth: layered

**Metadata**

```json
{
  "mood": ["tech", "futuristic"],
  "theme": ["tech", "entertainment"],
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
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "barColor": "#f87171",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 0,
  "cardPadding": 40,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "label": "Movie loading...",
  "showCard": true,
  "value": 0
}
```

---

### SplitPercentageDisplay

**ID**: `SplitPercentageDisplay`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Giant percentage split horizontally by color (white top / dark bottom) with horizontal wipe reveal and scale pop.

**Visual Characteristics**

- Style: geometric/bold
- Motion: wipe + scale
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["energetic", "bold"],
  "theme": ["creative", "sporty"],
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
  "accentColor": "#ef4444",
  "animationDuration": 90,
  "backgroundColor": "#ef4444",
  "bottomColor": "#1f2937",
  "cardBackgroundColor": "transparent",
  "cardBorderRadius": 0,
  "cardPadding": 40,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "showCard": true,
  "suffix": "%",
  "value": 0
}
```

---

### DemographicIcons

**ID**: `DemographicIcons`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Icon silhouettes (person/woman) that scale in with spring physics, percentage counts up, and labels slide in.

**Visual Characteristics**

- Style: geometric/social
- Motion: spring scale
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["playful", "social"],
  "theme": ["social", "education"],
  "energy": "medium",
  "colorTemp": "vibrant",
  "formality": "casual",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "groups": [],
  "showCard": true
}
```

---

### PyramidChart

**ID**: `PyramidChart`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Layered colored pyramid with layers sliding up from bottom, staggered 8 frames each. Maslow-style hierarchy visualization.

**Visual Characteristics**

- Style: geometric/educational
- Motion: staggered slide-up
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["warm", "educational"],
  "theme": ["education", "wellness"],
  "energy": "low",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 90,
  "arrowColor": "#ffffff",
  "arrowOpacity": 0.3,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "data": [],
  "easing": [0.16, 1, 0.3, 1],
  "exitDuration": 25,
  "fontFamily": "Inter",
  "labelFontSize": 16,
  "showArrow": true,
  "showCard": true,
  "subtitle": "",
  "subtitleColor": "#a0a0b0",
  "title": "",
  "titleColor": "#ffffff"
}
```

---

### IconStatGrid

**ID**: `IconStatGrid`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Icon circles that scale in with spring physics, percentages count up, and labels fade in below. Social media style.

**Visual Characteristics**

- Style: geometric/social
- Motion: spring scale
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["playful", "social"],
  "theme": ["social", "tech"],
  "energy": "medium",
  "colorTemp": "cool",
  "formality": "casual",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "items": [],
  "showCard": true,
  "title": "Account Statistic",
  "titleColor": "#ffffff"
}
```

---

### RadarChart

**ID**: `RadarChart`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Hexagonal spider chart with axes drawing on, gradient fill expanding from center, vertex dots popping in, and axis labels backed by configurable background rectangles. Optional title and subtitle animate in with staggered fade + slide, then fade out concurrently with the chart exit.

**Visual Characteristics**

- Style: geometric/analytical
- Motion: draw-on + expand + staggered label reveal
- Texture: gradient
- Depth: flat

**Metadata**

```json
{
  "mood": ["neutral", "analytical"],
  "theme": ["corporate", "tech"],
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
  "animationDuration": 90,
  "backgroundColor": "#e8e8e8",
  "cardBackgroundColor": "#f5f5f5",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "data": [],
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "gradientColors": ["#a855f7", "#f97316"],
  "labelBackgroundColor": "#ffffff",
  "labelBackgroundPadding": 6,
  "labelBackgroundRadius": 4,
  "labelColor": "#333333",
  "showCard": true,
  "subtitle": "",
  "subtitleColor": "#666666",
  "title": "",
  "titleColor": "#333333"
}
```

---

### DotScatterChart

**ID**: `DotScatterChart`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Proper 2D scatter plot for visualizing relationship between two numeric variables — correlation, clustering, ML model results. Dots spring into position at their exact data coordinates with staggered animation, supported by x/y axes, grid lines, and per-point labels.

**Visual Characteristics**

- Style: analytical/data-driven
- Motion: spring pop-in with overshoot
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["analytical", "data-driven"],
  "theme": ["corporate", "education", "tech"],
  "energy": "medium",
  "colorTemp": "vibrant",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "data": [],
  "dotRadius": 5,
  "fontFamily": "Inter",
  "showAxisLabels": true,
  "showCard": true,
  "showGrid": true,
  "showLabels": true,
  "title": "",
  "titleColor": "#ffffff",
  "xAxisLabel": "",
  "yAxisLabel": ""
}
```

---

### TrafficLightDots

**ID**: `TrafficLightDots`
**Export**: `src/shared/presets/data-visualizations`

**Description**
Status dots arranged on a faint vertical track with spring-animated scale-in, pulsing glow on the active dot, an animated title/subtitle header, and a large status caption. Clean hierarchical status indicator with unified concurrent exit.

**Visual Characteristics**

- Style: geometric/status
- Motion: spring scale + pulse + staggered header reveal
- Texture: none
- Depth: flat

**Metadata**

```json
{
  "mood": ["neutral", "calm"],
  "theme": ["corporate", "tech"],
  "energy": "low",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "activeIndex": 0,
  "animationDuration": 90,
  "backgroundColor": "#0a0a14",
  "cardBackgroundColor": "#141420",
  "cardBorderRadius": 16,
  "cardPadding": 40,
  "dots": [],
  "easing": [0.16, 1, 0.3, 1],
  "fontFamily": "Inter",
  "showCard": true,
  "showStatusCaption": true,
  "showTrack": true,
  "subtitle": "Live monitoring",
  "subtitleColor": "#a0a0b0",
  "title": "System Status",
  "titleColor": "#ffffff"
}
```

## Future Presets (Planned)

- BubbleChart — animated bubble chart with size scaling
- SankeyDiagram — flow diagram with animated paths
- TreeMap — hierarchical rectangles with staggered reveal

## Selection Algorithm for AI Agents

Given: `script`, `theme`, `tone`

```
1. Extract features from script
2. Score each preset: mood_overlap * 0.4 + energy_match * 0.2 + color_match * 0.2 + formality_match * 0.2
3. Pick top 2-3
4. Apply suggestedOverrides[context]
5. Generate code
```

**Rule**: Always suggest top 2-3 with brief rationale. Never auto-pick without alternatives unless user asks.
