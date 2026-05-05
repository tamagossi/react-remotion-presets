# List Presets Catalog

AI selection guide for `src/shared/presets/list/`.

## Quick Selection Guide

| Script Tone | Mood | Energy | Color Temp | Formality | Recommended Preset |
|-------------|------|--------|------------|-----------|-------------------|
| Bold announcement, chapter header | Confident, minimal | Medium | Warm | Professional | `BarRevealList` (vertical rules + title) |
| Data dashboard, compact metrics | Architectural, precise | Medium | Neutral | Professional | `CompactBarList` (thin accent lines + values) |
| Product features, bullet points | Refined, minimal | Medium | Warm | Professional | `CardBulletList` (bordered card with bullets) |
| Search results, tip lists, ranked items | Modern, dynamic | Medium-High | Cool | Casual-Professional | `FlatSearchList` (flat pill bar + 2-col grid) |
| Search results, tip lists, ranked items | Modern, dynamic | Medium-High | Cool-Vibrant | Casual-Professional | `GradientSearchList` (gradient pill + numbered circles) |
| Process steps, rankings, chapters | Architectural, indexing | Medium | Cool | Professional | `NumberedCircleList` (drawn-on rings + spine) |
| Search results, tip lists, ranked items | Modern, sleek | Medium-High | Cool | Casual-Professional | `OutlineSearchList` (outline pill + numbered circles) |
| Feature grid, service overview | Organized, balanced | Medium | Warm | Professional | `IconGridList` (icon cards in grid) |
| Schedule, timeline, agenda | Refined, minimal | Medium | Warm | Professional | `TimelineScheduleList` (thin spine + dot markers) |

## How to Use This Catalog

When generating a video composition:

1. **Analyze the script**: Extract mood, theme, energy level, target audience, and formality.
2. **Match layout**: Use the table above or scan preset metadata.
3. **Select preset**: Pick best match. If unsure, suggest top 2 with tradeoffs.
4. **Apply prop overrides**: Use `suggestedOverrides` for matched context.
5. **Compose**: Overlay preset on background. No background included in list presets.

---

## Presets

### BarRevealList

**ID**: `BarRevealList`
**Export**: `src/shared/presets/list`

**Description**
Bold title with a thin accent underline, followed by list items each marked by a vertical editorial rule that grows from the top. Text slides up and fades in alongside each rule. The rules breathe with subtle opacity modulation during the hold. Clean, architectural, and minimal — like a fine art exhibition catalog.

**Visual Characteristics**

- Style: Editorial, vertical-rule, fine art
- Motion: scaleY rule grow from top + text slide-up fade
- Texture: None (flat colors)
- Depth: Flat with rule emphasis

**Metadata**

```json
{
  "mood": ["editorial", "minimal", "refined"],
  "theme": ["exhibition", "documentary", "chapter", "announcement"],
  "energy": "medium",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "title": "LIST TITLES",
  "items": [
    { "label": "ALERT YOUR DREAMS", "sublabel": "Create something amazing and flat" },
    { "label": "SLAM YOUR ENEMY", "sublabel": "Design, develop, deliver" },
    { "label": "LIKE A PHOTOGRAPHY", "sublabel": "Soft motion" },
    { "label": "LIKE A RAINY DAY", "sublabel": "" },
    { "label": "A HARD TASK", "sublabel": "" }
  ],
  "accentColor": "#cc4444",
  "backgroundColor": "#09090c",
  "textColor": "#f0f0f0",
  "secondaryTextColor": "#78788a",
  "titleFontSize": 56,
  "itemFontSize": 24,
  "sublabelFontSize": 15,
  "barHeight": 32,
  "itemGap": 28,
  "ruleWidth": 2,
  "enterDuration": 45,
  "exitDuration": 30,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitEasing": [0.55, 0, 1, 1],
  "staggerDelay": 10,
  "startFrame": 0
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `youtube-chapter` | Faster, punchier for video chapters | `{ enterDuration: 30, staggerDelay: 6, itemGap: 12 }` |
| `documentary-section` | Slower, more deliberate | `{ enterDuration: 60, staggerDelay: 12 }` |
| `tech-specs` | Cooler colors, thinner bars | `{ accentColor: "#0066ff", barHeight: 20 }` |

**When to Use**

- YouTube chapter / section headers
- Documentary episode lists
- Product feature announcements
- Bold list reveals with hierarchy

**When NOT to Use**

- Compact spaces (use CompactBarList instead)
- No title needed (use CompactBarList)
- Grid layouts (use IconGridList)

**Composition Example**

```tsx
import { BarRevealList } from "./shared/presets/list";

<BarRevealList
  title="FEATURES"
  items={[
    { label: "REAL-TIME SYNC", sublabel: "Instant data updates" },
    { label: "COLLABORATION", sublabel: "Team workflows" },
  ]}
/>
```

---

### CompactBarList

**ID**: `CompactBarList`
**Export**: `src/shared/presets/list`

**Description**
Clean architectural list with thin vertical accent lines that grow from the bottom up alongside label text and optional right-aligned values. No track backgrounds — just precise lines, generous spacing, and refined typography. Understated and precise, like a blueprint detail sheet.

**Visual Characteristics**

- Style: Architectural, minimal, precise
- Motion: Thin line scaleY grow from bottom + text slide-up fade
- Texture: None (flat colors)
- Depth: Flat

**Metadata**

```json
{
  "mood": ["architectural", "minimal", "precise"],
  "theme": ["dashboard", "metrics", "analytics", "report"],
  "energy": "low-to-medium",
  "colorTemp": "neutral",
  "formality": "professional",
  "complexity": "low",
  "readability": "high"
}
```

**Default Props**

```json
{
  "title": "A SIMPLE LIST TITLE",
  "items": [
    { "label": "A GLOBAL REACH OF DRIVERS", "value": "" },
    { "label": "A CRIME NEEDS A VICTIM", "value": "" },
    { "label": "A CARDIOVASCULAR SYSTEM WORKS", "value": "" },
    { "label": "A THE BEST PERFORMANCE OF EFFICIENCY", "value": "" },
    { "label": "A CONVERSATION IS A SKILL", "value": "" }
  ],
  "accentColor": "#6688cc",
  "backgroundColor": "#09090c",
  "textColor": "#f0f0f0",
  "valueColor": "#78788a",
  "titleFontSize": 36,
  "itemFontSize": 18,
  "valueFontSize": 16,
  "barHeight": 22,
  "itemGap": 14,
  "lineWidth": 3,
  "showTitleUnderline": true,
  "enterDuration": 40,
  "exitDuration": 25,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitEasing": [0.55, 0, 1, 1],
  "staggerDelay": 8,
  "startFrame": 0
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `dashboard-metrics` | Add values, smaller text | `{ itemFontSize: 14, valueFontSize: 14, barHeight: 16 }` |
| `pricing-table` | Values on right for prices | `{ items: [{label: "Basic", value: "$9"}, ...] }` |
| `report-summary` | Tighter, more items | `{ itemGap: 6, staggerDelay: 4 }` |

**When to Use**

- Data dashboards and metrics
- Pricing tables
- Report summaries
- Space-constrained lists

**When NOT to Use**

- When you need large, bold visuals (use BarRevealList)
- When you need icons or cards (use IconGridList)

**Composition Example**

```tsx
import { CompactBarList } from "./shared/presets/list";

<CompactBarList
  title="METRICS"
  items={[
    { label: "Active Users", value: "12.4K" },
    { label: "Revenue", value: "$84K" },
  ]}
/>
```

---

### CardBulletList

**ID**: `CardBulletList`
**Export**: `src/shared/presets/list`

**Description**
Title outside a bordered card with staggered bullet-point list inside. The card draws in with a scaling border, then bullets animate with a spin-in outline circle and subtle slide. Clean, contained, and refined — like a gallery exhibition placard.

**Visual Characteristics**

- Style: Bordered, refined, minimal
- Motion: Card scale-in + bullet outline spin-in + text slide
- Texture: None (flat colors)
- Depth: Flat with card border

**Metadata**

```json
{
  "mood": ["refined", "contained", "minimal"],
  "theme": ["features", "product", "presentation", "card"],
  "energy": "medium",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "title": "LIST TITLE",
  "items": [
    { "text": "Turn up the heat in your kitchen with a well-structured list" },
    { "text": "Break down complex features into digestible bullet points" },
    { "text": "Make your product stand out with bold, clear copy" },
    { "text": "Drive engagement with punchy, concise messaging" }
  ],
  "backgroundColor": "#09090c",
  "cardBackgroundColor": "transparent",
  "cardBorderColor": "#cc4444",
  "bulletColor": "#cc4444",
  "textColor": "#f0f0f0",
  "titleFontSize": 28,
  "itemFontSize": 20,
  "cardBorderRadius": 12,
  "cardPadding": 36,
  "itemGap": 18,
  "titleAccentUnderline": true,
  "enterDuration": 50,
  "exitDuration": 30,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitEasing": [0.55, 0, 1, 1],
  "staggerDelay": 10,
  "startFrame": 0
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `product-features` | Larger card, more padding | `{ cardPadding: 48, titleFontSize: 40 }` |
| `presentation-slide` | Dark card for contrast | `{ cardBackgroundColor: "#2a2a2a" }` |
| `mobile-app` | Smaller, tighter | `{ cardPadding: 20, itemFontSize: 16 }` |

**When to Use**

- Product feature lists
- Presentation bullet points
- Contained card layouts
- Clean, structured content

**When NOT to Use**

- Full-width layouts (use BarRevealList)
- Grid layouts (use IconGridList)
- Timeline data (use TimelineScheduleList)

**Composition Example**

```tsx
import { CardBulletList } from "./shared/presets/list";

<CardBulletList
  title="KEY FEATURES"
  items={[
    { text: "Real-time collaboration" },
    { text: "Auto-sync across devices" },
  ]}
/>
```

---

### NumberedCircleList

**ID**: `NumberedCircleList`
**Export**: `src/shared/presets/list`

**Description**
Outline rings drawn on via SVG stroke animation, each containing a number that fades in after the ring completes. Labels and optional descriptions slide in from the right. A thin connecting spine links the rings. Architectural, precise, and minimal — like a type specimen index.

**Visual Characteristics**

- Style: Architectural, ring-drawn, index
- Motion: SVG ring stroke-dash draw-on + number fade-in + text slide
- Texture: None (flat colors)
- Depth: Flat with ring emphasis and spine

**Metadata**

```json
{
  "mood": ["architectural", "minimal", "indexing"],
  "theme": ["steps", "process", "ranking", "chapter"],
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
  "items": [
    { "number": 1, "label": "STRENGTHEN ORGANIC CONTENT EFFECTIVELY", "description": "" },
    { "number": 2, "label": "CONNECT PEOPLE IN REAL TIME", "description": "" },
    { "number": 3, "label": "GENERATE LEADS FOR GROWTH", "description": "" },
    { "number": 4, "label": "CLICK ACTIVATE TO ENGAGE NEW AUDIENCE", "description": "" }
  ],
  "accentColor": "#6688cc",
  "backgroundColor": "#09090c",
  "textColor": "#f0f0f0",
  "descriptionColor": "#78788a",
  "circleSize": 48,
  "ringWidth": 2,
  "numberFontSize": 24,
  "labelFontSize": 22,
  "descriptionFontSize": 14,
  "itemGap": 28,
  "showRipple": false,
  "enterDuration": 45,
  "exitDuration": 25,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitEasing": [0.55, 0, 1, 1],
  "staggerDelay": 10,
  "startFrame": 0
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `process-steps` | Larger circles for emphasis | `{ circleSize: 72, numberFontSize: 36 }` |
| `ranking` | Show descriptions for context | `{ items: [{number: 1, label: "First", description: "Top performer"}, ...] }` |
| `minimal-steps` | Smaller, cleaner | `{ circleSize: 40, labelFontSize: 18, itemGap: 12 }` |

**When to Use**

- Step-by-step processes
- Rankings and leaderboards
- Chapter / section numbering
- Sequential instructions

**When NOT to Use**

- Unordered lists (use BarRevealList)
- Grid layouts (use IconGridList)
- Timeline data (use TimelineScheduleList)

**Composition Example**

```tsx
import { NumberedCircleList } from "./shared/presets/list";

<NumberedCircleList
  items={[
    { number: 1, label: "DISCOVER", description: "Find your audience" },
    { number: 2, label: "DESIGN", description: "Create your solution" },
  ]}
/>
```

---

### IconGridList

**ID**: `IconGridList`
**Export**: `src/shared/presets/list`

**Description**
Grid of accent-colored cards, each with an icon on top and a label below. Cards stagger-scale in with a subtle bounce, followed by icon pop-in and text fade-up. Great for feature grids, service overviews, and categorized content.

**Visual Characteristics**

- Style: Grid, balanced, organized
- Motion: Card scale-in + icon pop + text fade-up
- Texture: None (flat colors)
- Depth: Flat with card separation

**Metadata**

```json
{
  "mood": ["organized", "balanced", "clean"],
  "theme": ["features", "services", "grid", "overview"],
  "energy": "medium",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "items": [
    { "icon": "🔥", "label": "FAST DELIVERY", "description": "Ship in 24h" },
    { "icon": "💎", "label": "PREMIUM QUALITY", "description": "Top materials" },
    { "icon": "🚀", "label": "BOOST TRAFFIC", "description": "Grow faster" },
    { "icon": "📈", "label": "SCALE UP", "description": "Expand reach" }
  ],
  "accentColor": "#e60012",
  "backgroundColor": "#1a1a1a",
  "textColor": "#ffffff",
  "iconColor": "#ffffff",
  "descriptionColor": "#a0a0a0",
  "iconFontSize": 32,
  "labelFontSize": 18,
  "descriptionFontSize": 14,
  "cardBorderRadius": 12,
  "cardGap": 16,
  "cardPadding": 24,
  "enterDuration": 45,
  "exitDuration": 25,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitEasing": [0.55, 0, 1, 1],
  "staggerDelay": 8,
  "startFrame": 0
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `feature-grid` | More items, smaller cards | `{ cardPadding: 16, labelFontSize: 14 }` |
| `services-overview` | Larger icons, bolder | `{ iconFontSize: 48, labelFontSize: 22 }` |
| `pricing-plans` | 3 columns, no descriptions | `{ items: [...3 items], description: "" }` |

**When to Use**

- Feature grids
- Service overviews
- Categorized content
- Product capabilities

**When NOT to Use**

- Sequential lists (use NumberedCircleList)
- Timeline data (use TimelineScheduleList)
- Single-column lists (use BarRevealList)

**Composition Example**

```tsx
import { IconGridList } from "./shared/presets/list";

<IconGridList
  items={[
    { icon: "⚡", label: "SPEED", description: "Lightning fast" },
    { icon: "🔒", label: "SECURITY", description: "Enterprise grade" },
  ]}
/>
```

---

### TimelineScheduleList

**ID**: `TimelineScheduleList`
**Export**: `src/shared/presets/list`

**Description**
Refined serif timeline with a thin vertical spine, small dot markers, and ultra-thin progress bars. Icons and labels sit beside each marker, with time values on the right. The spine draws down, dots pop in, and bars stretch across — all understated and elegant. Minimal and warm, like a gallery event program.

**Visual Characteristics**

- Style: Refined, minimal, serif-timeline
- Motion: Spine scaleY draw + dot pop-in + text slide + bar scaleX
- Texture: None (flat colors)
- Depth: Flat with spine track

**Metadata**

```json
{
  "mood": ["refined", "minimal", "warm"],
  "theme": ["schedule", "agenda", "timeline", "event"],
  "energy": "medium",
  "colorTemp": "warm",
  "formality": "professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "items": [
    { "label": "BREAKFAST WITH THE FAMILY", "time": "8:00 PM", "duration": "", "icon": "🍽️" },
    { "label": "WALK WITH THE DOG", "time": "12:00 PM", "duration": "", "icon": "🐕" },
    { "label": "CAREER GROWTH", "time": "14:00", "duration": "", "icon": "📈" },
    { "label": "COMMUNICATION WITH FRIENDS", "time": "15:0", "duration": "", "icon": "💬" }
  ],
  "accentColor": "#b8945c",
  "backgroundColor": "#09090c",
  "textColor": "#f0f0f0",
  "secondaryTextColor": "#78788a",
  "iconColor": "#b8945c",
  "labelFontSize": 20,
  "timeFontSize": 16,
  "iconSize": 20,
  "barHeight": 1,
  "markerSize": 6,
  "spineWidth": 1,
  "trackColor": "rgba(255, 255, 255, 0.04)",
  "itemGap": 28,
  "enterDuration": 45,
  "exitDuration": 25,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitEasing": [0.55, 0, 1, 1],
  "staggerDelay": 10,
  "startFrame": 0
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `event-agenda` | Show durations | `{ items: [{label: "Opening", time: "9:00", duration: "30 min"}, ...] }` |
| `daily-schedule` | Personal, warmer | `{ accentColor: "#f59e0b", iconSize: 24 }` |
| `project-timeline` | Milestones, no icons | `{ icon: "", barHeight: 6 }` |

**When to Use**

- Event agendas and schedules
- Daily routines / timelines
- Project milestones
- Program overviews

**When NOT to Use**

- Simple unordered lists (use BarRevealList)
- Grid layouts (use IconGridList)
- Rankings (use NumberedCircleList)

**Composition Example**

```tsx
import { TimelineScheduleList } from "./shared/presets/list";

<TimelineScheduleList
  items={[
    { label: "Keynote", time: "9:00 AM", duration: "45 min", icon: "🎤" },
    { label: "Workshop", time: "10:00 AM", duration: "90 min", icon: "🔧" },
  ]}
/>
```

---

### FlatSearchList

**ID**: `FlatSearchList`
**Export**: `src/shared/presets/list`

**Description**
Search-style list with a solid flat pill bar at the top featuring a colored accent icon and a search button. List items appear in a two-column grid below, each with a small colored bullet. Perfect for tip lists, feature overviews, and search result presentations with a clean modern UI feel.

**Visual Characteristics**

- Style: Modern UI, flat, search-bar aesthetic
- Motion: Pill bar scale-in with overshoot, typewriter text reveal, grid items stagger slide-up
- Texture: None (flat colors)
- Depth: Flat with subtle scale transforms

**Metadata**

```json
{
  "mood": ["modern", "clean", "dynamic", "organized"],
  "theme": ["tech", "search", "tips", "features", "education"],
  "energy": "medium-to-high",
  "colorTemp": "cool",
  "formality": "casual-to-professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "accentColor": "#f59e0b",
  "accentIcon": "🔍",
  "barBorderRadius": 32,
  "barHeight": 56,
  "barPaddingX": 24,
  "barWidth": 600,
  "bulletSize": 10,
  "columns": 2,
  "enterDuration": 45,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitDuration": 30,
  "exitEasing": [0.55, 0, 1, 1],
  "iconSize": 20,
  "itemGap": 16,
  "itemTitleFontSize": 16,
  "items": [
    { "bulletColor": "#f59e0b", "title": "Prioritize Tasks" },
    { "bulletColor": "#22c55e", "title": "Communicate Effectively" },
    { "bulletColor": "#3b82f6", "title": "Time Management" },
    { "bulletColor": "#ec4899", "title": "Take Care of Yourself" },
    { "bulletColor": "#a855f7", "title": "Stay Organized" },
    { "bulletColor": "#f97316", "title": "Continuous Learning" }
  ],
  "listStaggerDelay": 8,
  "searchBarBackground": "#ffffff",
  "searchQuery": "Top Four Acclaimed Films Overview",
  "showAccentIcon": true,
  "startFrame": 0,
  "textColor": "#ffffff",
  "typewriterSpeed": 2
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `tech-search` | Blue accent for tech feel | `{ accentColor: "#3b82f6", bulletSize: 8 }` |
| `wellness-tips` | Green palette, softer motion | `{ accentColor: "#22c55e", enterDuration: 55, listStaggerDelay: 12 }` |
| `product-features` | Larger text, single column | `{ columns: 1, itemTitleFontSize: 20, barWidth: 700 }` |
| `social-content` | Vibrant multi-color bullets | `{ items: [...with varied bulletColor] }` |

**When to Use**

- Search result presentations and tip lists
- Feature overviews in two-column grid layout
- Educational content with bullet points
- Modern UI-style video content
- Any script needing a search bar + list reveal pattern

**When NOT to Use**

- Sequential step-by-step processes (use NumberedCircleList)
- Single-column compact lists (use CompactBarList)
- Timeline or schedule data (use TimelineScheduleList)

**Composition Example**

```tsx
import { FlatSearchList } from "./shared/presets/list";

<FlatSearchList
  searchQuery="Productivity Tips"
  items={[
    { bulletColor: "#3b82f6", title: "Prioritize Tasks" },
    { bulletColor: "#22c55e", title: "Time Block" },
    { bulletColor: "#f59e0b", title: "Take Breaks" },
  ]}
/>
```

---

### GradientSearchList

**ID**: `GradientSearchList`
**Export**: `src/shared/presets/list`

**Description**
Search-style list with a gradient-filled pill bar at the top. The bar animates in with scale overshoot, then the search query types out character by character. Below, list items with numbered colored circles stagger-reveal with slide-up motion. Cinematic and modern — like a premium search UI animation.

**Visual Characteristics**

- Style: Modern UI, gradient, search-bar aesthetic
- Motion: Pill bar scale-in with back overshoot, typewriter text, numbered circles stagger slide-up
- Texture: Gradient fill on search bar
- Depth: Flat with scale transforms

**Metadata**

```json
{
  "mood": ["modern", "dynamic", "sleek", "vibrant"],
  "theme": ["tech", "search", "tips", "lifestyle", "education"],
  "energy": "medium-to-high",
  "colorTemp": "cool-vibrant",
  "formality": "casual-to-professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "barBorderRadius": 32,
  "barHeight": 56,
  "barPaddingX": 24,
  "enterDuration": 45,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitDuration": 30,
  "exitEasing": [0.55, 0, 1, 1],
  "gradientColors": ["#3b82f6", "#60a5fa"],
  "iconSize": 20,
  "itemGap": 16,
  "itemSubtitleColor": "#a0a0a0",
  "itemSubtitleFontSize": 14,
  "itemTitleFontSize": 18,
  "items": [
    { "iconColor": "#f59e0b", "number": 1, "subtitle": "Focus on priorities", "title": "Plan daily" },
    { "iconColor": "#22c55e", "number": 2, "subtitle": "Boost energy and health", "title": "Exercise regularly" },
    { "iconColor": "#ec4899", "number": 3, "subtitle": "Reduce stress, stay present", "title": "Practice mindfulness" },
    { "iconColor": "#3b82f6", "number": 4, "subtitle": "Sleep, rest, and recover", "title": "Keep balanced" },
    { "iconColor": "#a855f7", "number": 5, "subtitle": "Nourish your body", "title": "Eat well, stay hydrated" }
  ],
  "listStaggerDelay": 10,
  "numberFontSize": 14,
  "numberSize": 36,
  "searchQuery": "5 Useful Habits for Life Improvement",
  "showClearButton": true,
  "startFrame": 0,
  "textColor": "#ffffff",
  "typewriterSpeed": 2
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `tech-startup` | Cyan-purple gradient for tech vibe | `{ gradientColors: ["#06b6d4", "#a855f7"], searchQuery: "Product Features" }` |
| `wellness-lifestyle` | Soft pink gradient, slower pacing | `{ gradientColors: ["#ec4899", "#f472b6"], enterDuration: 55, listStaggerDelay: 12 }` |
| `fitness-tips` | Energetic orange-red gradient | `{ gradientColors: ["#f97316", "#ef4444"], searchQuery: "Workout Routine" }` |
| `minimal-dark` | Subtle monochrome gradient | `{ gradientColors: ["#334155", "#475569"], itemSubtitleColor: "#94a3b8" }` |

**When to Use**

- Search result tip lists and ranked items
- Lifestyle and habit presentations
- Product feature reveals with search UI aesthetic
- Educational content with numbered steps
- Any script needing gradient + typewriter + stagger list animation

**When NOT to Use**

- Compact data dashboards (use CompactBarList)
- Timeline or schedule data (use TimelineScheduleList)
- Grid layout feature overviews (use IconGridList or FlatSearchList)

**Composition Example**

```tsx
import { GradientSearchList } from "./shared/presets/list";

<GradientSearchList
  searchQuery="Morning Routine Tips"
  gradientColors={["#f97316", "#f59e0b"]}
  items={[
    { number: 1, title: "Wake up early", subtitle: "Set alarm 30 min earlier", iconColor: "#f97316" },
    { number: 2, title: "Hydrate first", subtitle: "Drink water before coffee", iconColor: "#22c55e" },
  ]}
/>
```

---

### OutlineSearchList

**ID**: `OutlineSearchList`
**Export**: `src/shared/presets/list`

**Description**
Search-style list with a transparent pill bar featuring a colored outline stroke. The bar scales in with overshoot, then the query types out. List items below use numbered circles or checkmark icons inside outline rings. Sleek and minimal — perfect for modern dark-themed presentations.

**Visual Characteristics**

- Style: Minimal, outlined, modern UI
- Motion: Pill bar scale-in with back overshoot, typewriter text, outline circles stagger slide-up
- Texture: Colored stroke border on transparent bar
- Depth: Flat with stroke emphasis

**Metadata**

```json
{
  "mood": ["modern", "sleek", "minimal", "clean"],
  "theme": ["tech", "search", "tips", "lifestyle", "education"],
  "energy": "medium-to-high",
  "colorTemp": "cool",
  "formality": "casual-to-professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "barBorderRadius": 32,
  "barHeight": 56,
  "barPaddingX": 24,
  "enterDuration": 45,
  "enterEasing": [0.16, 1, 0.3, 1],
  "exitDuration": 30,
  "exitEasing": [0.55, 0, 1, 1],
  "iconSize": 20,
  "itemGap": 16,
  "itemIconStyle": "numbered",
  "itemSubtitleColor": "#a0a0a0",
  "itemSubtitleFontSize": 14,
  "itemTitleFontSize": 18,
  "items": [
    { "iconColor": "#f59e0b", "number": 1, "subtitle": "Mix walking and jogging, gradually increasing running time", "title": "Start Slow" },
    { "iconColor": "#22c55e", "number": 2, "subtitle": "Get proper running shoes to prevent injuries", "title": "Wear Good Shoes" },
    { "iconColor": "#f97316", "number": 3, "subtitle": "Stretch before and after to avoid soreness", "title": "Warm Up/Cool Down" },
    { "iconColor": "#3b82f6", "number": 4, "subtitle": "Aim for short runs, then build up", "title": "Set Small Goals" },
    { "iconColor": "#a855f7", "number": 5, "subtitle": "Rest if you feel pain or fatigue", "title": "Listen to Your Body" }
  ],
  "listStaggerDelay": 10,
  "numberFontSize": 14,
  "numberSize": 36,
  "outlineColor": "#3b82f6",
  "outlineWidth": 2,
  "searchBarBackground": "transparent",
  "searchQuery": "Tips for Starting a Running Routine",
  "showClearButton": false,
  "showSearchIcon": true,
  "startFrame": 0,
  "textColor": "#ffffff",
  "typewriterSpeed": 2
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
|---------|-------------------|-------|
| `tech-minimal` | Thin cyan outline, checkmarks | `{ outlineColor: "#06b6d4", outlineWidth: 1, itemIconStyle: "checkmark" }` |
| `health-wellness` | Green outline, numbered circles | `{ outlineColor: "#22c55e", searchQuery: "Healthy Habits" }` |
| `nightlife-dramatic` | Neon pink outline, no search icon | `{ outlineColor: "#ec4899", showSearchIcon: false, enterDuration: 35 }` |
| `corporate-clean` | Blue outline, clear button on | `{ outlineColor: "#3b82f6", showClearButton: true, showSearchIcon: true }` |

**When to Use**

- Dark-themed search result presentations
- Minimal tip lists with outline aesthetic
- Lifestyle and fitness content
- Modern UI demonstrations
- Any script needing stroke/outline + typewriter + stagger animation

**When NOT to Use**

- Light backgrounds without adjusting outline color for contrast
- Data-heavy dashboards (use CompactBarList)
- Grid layouts (use FlatSearchList or IconGridList)

**Composition Example**

```tsx
import { OutlineSearchList } from "./shared/presets/list";

<OutlineSearchList
  searchQuery="Design Principles"
  outlineColor="#ec4899"
  itemIconStyle="numbered"
  items={[
    { number: 1, title: "Consistency", subtitle: "Maintain visual language throughout", iconColor: "#ec4899" },
    { number: 2, title: "Hierarchy", subtitle: "Guide the eye with scale and contrast", iconColor: "#a855f7" },
  ]}
/>
```

---

## Future Presets (Planned)

- `TimelineVerticalList` — vertical timeline with connecting line
- `ChecklistList` — animated checkboxes with strikethrough
- `AccordionList` — expandable/collapsible items

## Selection Algorithm for AI Agents

Given: `script`, `theme`, `tone`

```
1. Extract features from script
2. Score each preset: mood*overlap * 0.4 + energy*match * 0.2 + color*match * 0.2 + formality*match * 0.2
3. Pick top 2-3
4. Apply suggestedOverrides[context]
5. Generate code
```

**Rule**: Always suggest top 2-3 with brief rationale. Never auto-pick without alternatives unless user asks.
