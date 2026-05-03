# Category Heuristics — List Points / Bullet Lists

List point presets present sequential information — features, steps, talking points. The animation must guide the eye through each item deliberately.

## Structural Check

A list preset typically has:

- Array of items (`items: string[]` or structured objects)
- Staggered reveal per item (one at a time or cumulative)
- Visual bullet/icon before each item
- Vertical or horizontal stack with consistent spacing
- Scroll, morph, or focus animation to highlight current item

## List-Specific Evaluation Criteria

### 1. Stagger Rhythm

The timing between items must feel intentional and match content importance.

**Check:**
- Items enter one at a time with consistent stagger (8-20 frames between)
- Stagger delay is a controllable prop (not hardcoded)
- First item doesn't have zero delay (give audience a moment to orient)
- Last item leaves enough time for reading before exit

**Redflags:**
- All items appear simultaneously → 🔴 Critical (not a list reveal, just a static card)
- Uneven stagger → 🟡 Enhancement (unless intentional emphasis pattern)
- Stagger too fast (<5 frames) → 🟡 Enhancement (can't process previous before next arrives)
- Stagger too slow (>30 frames) → 🟡 Enhancement (loses momentum)

### 2. Progressive Disclosure

As items appear, how does the previous establish and fade?

**Options:**
- **Cumulative**: All previous items stay visible (standard bullet list)
- **Focus**: Current item at full opacity, previous at 30-50% opacity (spotlight effect)
- **Replace**: Previous item exits as new enters (kinetic morph)
- **Scroll**: Previous items scroll up/down as new enters (rolodex)

**Check:**
- Chosen pattern is appropriate for content type
- Transitions between states are smooth (no abrupt opacity jumps)
- Previous items don't abruptly disappear unless that's the design

**Redflags:**
- Opacity jump from 0.4 to 0 (previous item vanishes) → 🟡 Enhancement
- Current item not clearly indicated → 🔴 Critical (audience doesn't know where to look)
- Pattern inconsistent (some cumulative, some focus) → 🟡 Enhancement

### 3. Bullet / Icon Choreography

The bullet or icon should reinforce the text, not distract.

**Check:**
- Bullet/icon enters before, with, or slightly after text (choose deliberately)
- Bullet animation matches text animation style (both scale, or both slide)
- Icon size is proportional to text (not larger than text x-height)
- If bullet is animated (drawing, pulsing), it's secondary motion at 20-40% intensity

**Redflags:**
- Bullet animates more prominently than text → 🟡 Enhancement
- No bullet/icon — plain text list → 🟢 Polish (valid if intentional)
- Bullet uses different easing than text → 🟢 Polish

### 4. Spacing & Layout

List items must breathe.

**Check:**
- Vertical gap between items is 0.5-1.5x the item's line height
- Items are aligned (consistent indent)
- Bullet/icon is consistently positioned relative to text
- Container has padding (at least 20px from edges)
- If list scrolls, container clips overflow properly

**Redflags:**
- Items too close (gap < 0.3x line height) → 🟡 Enhancement
- Items too far apart (gap > 3x) → 🟡 Enhancement
- Icons misaligned (wiggling x-position) → 🔴 Critical
- No padding → 🟡 Enhancement

### 5. Exit Handling

How does the list conclude?

**Check:**
- All items exit gracefully (not just vanish)
- Exit order: same as entry (first-in-first-out) OR reverse (first-in-last-out) — be deliberate
- Exit stagger matches entry stagger
- Empty state after exit is clean (no artifacts)

**Redflags:**
- No exit animation → 🔴 Critical
- Items exit in random order → 🟡 Enhancement
- Exit stagger different from entry (without reason) → 🟢 Polish

### 6. Content Count Scaling

Lists must work with different item counts.

**Check:**
- Test mentally: 2 items, 5 items, 8 items, 12 items
- Layout doesn't overflow at high counts
- Animation still works at low counts (no empty frames)
- Item count doesn't break the total timing

**Redflags:**
- Layout breaks at 5+ items → 🔴 Critical
- Animation assumes minimum count → 🟡 Enhancement
- No `maxItems` or overflow handling → 🟡 Enhancement

### 7. Common List Anti-Patterns

- Hardcoded stagger delay (not a prop) → can't match different reading speeds.
- Items use opacity 0-1 without position shift → flat, unmotivated entries.
- Bullet and text enter at exact same time with exact same animation → redundant, not reinforcing.
- No `overflow: "hidden"` on scrolling lists → items render outside container.
- Using `<br>` for spacing instead of consistent margin/padding → fragile layout.
