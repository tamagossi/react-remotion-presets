# Animation Redflags — Quick-Fail Scan

Common anti-patterns that immediately degrade quality. Run this scan first on every preset. Each item is a binary check — either it has the problem or it doesn't.

## 🔴 Critical Redflags

Catastrophic issues that must be fixed before the preset is usable.

| # | Redflag | What To Check | Fix |
|---|---|---|---|
| R1 | **No exit animation** | Components render out to `durationInFrames` but no opacity/transform fade out exists | Add exit: opacity 1→0 over last 15-25 frames |
| R2 | **Unreadable text** | Text contrast < 3:1 against background, or font too small (<16px) | Increase contrast, bump fontSize |
| R3 | **White/black hole** | Background has region where common text colors (white, black) become invisible | Shift gradient stops, add overlay for contrast |
| R4 | **Layout collapse** | `whiteSpace: "pre"` missing on `text.split("")` characters → spaces removed | Add `whiteSpace: "pre"` to each char span |
| R5 | **Broken `filter` string** | `filter: 'blur(10px)'` without `willChange: 'filter'` AND filter value is string (ok) but check for typos like `blurr()` | Fix typo, add willChange |
| R6 | **Render loop / memory leak** | Unbounded `Array.from({length: frame * 10})` or similar — grows every frame | Cap array size, use fixed particle count |
| R7 | **Layout thrashing** | Using `top`/`left` for animation instead of `transform: translate()` | Switch to transform |

## 🟡 Enhancement Redflags

Working but unprofessional — holds the preset back from being stunning.

| # | Redflag | What To Check | Fix |
|---|---|---|---|
| R8 | **Linear easing** | `interpolate(...)` without easing parameter, or easing is `Easing.linear` | Add `Easing.out(Easing.quad)` or appropriate curve |
| R9 | **No anticipation** | Directional movement (slide, scale) without 3-5 frame counter-move | Add anticipation: `[-5, 0, target]` keyframes |
| R10 | **No stagger** | Multiple elements appear at exact same frame | Add stagger: `i * staggerDelay` offset |
| R11 | **Default values ugly** | Running the preset with no props produces an unimpressive result | Polish defaults — they are the first impression |
| R12 | **No `willChange`** | Animating `opacity`, `transform`, or `filter` without `willChange` on the element | Add `willChange: "opacity, transform, filter"` (only what you animate) |
| R13 | **Filter abuse** | `blur(80px+)` on full-screen element, or multiple heavy filters simultaneously | Reduce blur radius, simplify |
| R14 | **Entry too fast** | Main content appears in <8 frames | Extend entry to minimum 10-15 frames |
| R15 | **Hold too short** | Readable state lasts <15 frames | Extend holdDuration |
| R16 | **Missing `fontFamily` fallback** | Single font name without fallback chain | Add: `"Anton, Impact, sans-serif"` |
| R17 | **Missing `lineHeight`** | `lineHeight` not set → browser default varies | Set explicitly: `lineHeight: 1.2` or `1` |
| R18 | **No `extrapolate*` clamp** | `interpolate(...)` without `extrapolateLeft` or `extrapolateRight` → values extend past range | Add `extrapolateLeft: "clamp"` and `extrapolateRight: "clamp"` |

## 🟢 Polish Redflags

Subtle issues that separate good from great.

| # | Redflag | What To Check | Fix |
|---|---|---|---|
| R19 | **No secondary motion** | Preset has only one layer of animation — nothing subtle in background | Add shadow drift, background breath, accent pulse |
| R20 | **No grain/vignette** | Cinematic preset without texture overlay | Add `GrainOverlay` (opacity 0.03-0.06), `VignetteOverlay` (strength 0.2-0.3) |
| R21 | **Shadow too dark/light** | Drop shadow at 50% opacity → cartoon; at 5% → invisible | Use 15-25% opacity for shadows |
| R22 | **Gradient banding** | Visible color steps in gradient (especially on dark backgrounds) | Add intermediate stops, increase gradient resolution |
| R23 | **Exit doesn't echo entry** | Entry slides from right, exit fades → inconsistent language | Mirror entry in exit (slide right → slide right out) |
| R24 | **No overshoot** | Scale/opacity targets exactly 1.0 → no "alive" feeling | Overshoot to 1.05-1.1 then settle (with back easing) |

## 🔵 Refactor Redflags

Code quality issues — don't change visuals but hurt maintainability.

| # | Redflag | What To Check | Fix |
|---|---|---|---|
| R25 | **Unused imports** | Imported but never referenced | Remove |
| R26 | **Props not alphabetical** | Interface properties in random order | Sort alphabetically |
| R27 | **JSX props not alphabetical** | Inline props in random order | Sort alphabetically |
| R28 | **Hardcoded duration** | `interpolate(frame, [0, 30], ...)` — 30 is arbitrary, not a prop | Extract to prop: `entryDuration` |
| R29 | **`any` type** | `(props: any)` or `data: any[]` | Type properly with interface |
| R30 | **Missing Zod schema** | Component has props but no corresponding schema | Create schema file |
| R31 | **Missing export** | Component exists but not in barrel export or Root.tsx | Register properly |

## Scan Procedure

1. Read the component file
2. Check each redflag R1-R31 in order (Critical first)
3. For each hit, note the file, line, and severity
4. Bundle related redflags (e.g., R8 + R18 often appear together — linear easing without clamp)
5. Present as findings in the report step
