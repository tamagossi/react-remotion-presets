# Category Heuristics — Data Visualizations / Charts

Data visualization presets must balance animation excitement with data integrity. The data must be true at all times.

## Structural Check

A data viz preset typically has:

- Data input (array of values, categories, or time series)
- Visual representation (bars, arcs, lines, dots, rings)
- Animated growth/draw-on from zero or baseline
- Labels and/or legends
- Color coding for categories

## Data Viz-Specific Evaluation Criteria

### 1. Animation Truthfulness

The data must be accurate at every frame. Animation is a reveal, not a distortion.

**Check:**
- Values animate from 0 (or baseline) to their final value
- During animation: the relative proportions are directionally correct
- No element overshoots its final value and settles (unless overshoot is a deliberate 1.05x bounce)
- Labels update to reflect current frame values (if animated)
- Animation doesn't imply a trend that isn't in the data

**Redflags:**
- Value animates past its target and never returns → 🔴 Critical (lying)
- Proportions are wrong during animation (bar A passes bar B when A < B) → 🔴 Critical
- Label shows wrong value during animation → 🟡 Enhancement
- Animation creates false ranking (small bar passes large bar mid-animation) → 🔴 Critical

### 2. Data-to-Ink Ratio

Every pixel should communicate data. Minimize decorative non-data elements.

**Check:**
- Chart elements (bars, arcs, lines) consume >70% of the visual space
- Grid lines are subtle (10-20% opacity, thin)
- Labels don't overwhelm the data
- Background elements don't cross chart area
- No "chart junk" (unnecessary 3D effects, heavy drop shadows, excessive decoration)

**Redflags:**
- Grid lines at 50% opacity → 🟡 Enhancement (competing with data)
- Labels larger than bars → 🟡 Enhancement (inverted hierarchy)
- Heavy decorative background inside chart area → 🟡 Enhancement
- Chart junk elements → 🟡 Enhancement

### 3. Chart Type Appropriateness

The visualization type must match the data and story.

| Data Type | Best Chart |
|---|---|
| Categories × single value | Horizontal or vertical bar chart |
| Parts of a whole | Donut/pie chart or stacked bar |
| Time series | Line chart or area chart |
| Comparison | Grouped/diverging bar chart |
| Distribution | Scatter plot, box plot |
| Progress/goal | Gauge, progress ring, activity ring |

**Redflags:**
- Donut chart with 8+ segments → 🟡 Enhancement (illegible slices)
- Bar chart with unordered categories → 🟡 Enhancement (should be sorted)
- Line chart with categorical x-axis → 🟡 Enhancement (misleading trend line)

### 4. Label Timing

Labels must appear when the viewer can connect them to data.

**Check:**
- Labels appear with or slightly after their data element
- Labels are legible throughout animation (don't fade to 0.1 opacity)
- Value labels show the animated (current) value, not just final value
- Axis labels and titles are present and readable

**Redflags:**
- Labels appear 20+ frames before data → 🔴 Critical (confusing)
- Labels never reach full opacity → 🔴 Critical (unreadable)
- Final value labels show 0 during animation → 🟡 Enhancement (confusing)
- No labels at all → 🔴 Critical (what am I looking at?)

### 5. Color Coding

Colors must be consistent, accessible, and semantically meaningful.

**Check:**
- Each category has a distinct, consistent color
- Colors are distinguishable at small sizes (thin lines, small dots)
- Color-blind-safe palette considered (avoid red/green as sole differentiator)
- Sequential data uses lightness gradient (light→dark for low→high)
- Diverging data uses two-hue scale (blue→white→red for negative→positive)

**Redflags:**
- Two categories with near-identical colors → 🟡 Enhancement
- Red/green as only differentiator → 🟡 Enhancement (8% of males are red-green colorblind)
- Random colors without meaning → 🟢 Polish
- Colors clash with background → 🟡 Enhancement

### 6. Scale & Axis Integrity

The scale must be honest and consistent.

**Check:**
- Y-axis starts at 0 (for bar charts) — don't truncate
- Line chart axis range is appropriate (can be auto-scaled, but not misleading)
- Scale is consistent across grouped/compared charts
- If scale adjusts dynamically, it's smooth and doesn't cause visual jumps

**Redflags:**
- Bar chart y-axis not starting at 0 → 🔴 Critical (standard violation, misleading)
- Scale changes abruptly → 🟡 Enhancement
- Inconsistent scales across grouped charts → 🟡 Enhancement

### 7. Common Data Viz Anti-Patterns

- Animating each bar from 0 sequentially but one bar's growth obscures another's → use stagger with enough gap.
- Using `Math.round()` on animated values → creates stair-step animation.
- Hardcoded chart dimensions → doesn't adapt to different compositions.
- Placeholder data in component defaults → use realistic sample data.
- No `data` JSON schema validation → broken on bad input.
