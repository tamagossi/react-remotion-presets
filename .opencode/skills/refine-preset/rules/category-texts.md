# Category Heuristics — Text Animations

Text animation presets exist to make words feel alive. They must balance expressiveness with readability.

## Structural Check

A text animation preset typically has:

- Core text content (`text: string`)
- Character-level or word-level animation loop
- Stagger-controlled reveal or continuous motion
- Animated property: opacity, blur, scale, position, rotation, or color

## Text-Specific Evaluation Criteria

### 1. Pacing: Per-Character vs Per-Word vs Full-Line

The grain of animation affects both performance and feel.

**Check:**
- Per-character: Appropriate for short text (<20 chars). Fine grain, more compute. Use `staggerDelay: 1-5`.
- Per-word: Appropriate for medium text (3-10 words). Natural reading rhythm. Use `staggerDelay: 5-15`.
- Full-line: Appropriate for long text or simplicity. Fastest, simplest. Single timeline, no stagger.

**Redflags:**
- Per-character on 100+ chars → 🟡 Enhancement (performance + reading fatigue)
- Per-word on 2 words → 🟢 Polish (too coarse, use per-char)
- Inconsistent grain (some chars grouped, some not) → 🟡 Enhancement

### 2. Stagger Delay Math

Stagger timing must feel rhythmic.

**Check:**
- Total entry duration = `staggerDelay × (itemCount - 1) + perItemDuration`
- Is this total reasonable? (10-45 frames for entry)
- Stagger feels musical — even spacing, not random
- If `charDelay` is dynamic (based on `animationDuration / charCount`), the math is correct

**Redflags:**
- Total stagger duration > 60 frames → 🟡 Enhancement (too slow, audience waits)
- Total stagger duration < 8 frames → 🟡 Enhancement (too fast, doesn't feel staggered)
- Stagger delay math results in uneven pacing → 🟡 Enhancement

### 3. Filter-Based Animations

Blur, brightness, and other filters are expensive and have edge cases.

**Check:**
- `blur()` values are bounded (0-20px typical, never >50px unless intentional)
- `filter` property includes `willChange: "filter"` on the element
- Multiple simultaneous filters are intentional (blur + brightness on same element is OK, but be aware)
- Filter transition is smooth — no visible steps or banding

**Redflags:**
- `blur(100px)` → 🟡 Enhancement (performance hit, visually muddy)
- No `willChange: "filter"` on blurred elements → 🟡 Enhancement
- Filter-only animation with no transform → 🟢 Polish (less GPU-friendly than transforms)

### 4. Readability During Motion

Text must remain readable even while animating.

**Check:**
- During reveal: can I read the revealed portion?
- During continuous motion (wave, wiggle): is motion amplitude low enough (5-15px) to stay readable?
- Do opacity transitions leave text at readable opacity for most frames (>0.5 opacity)?
- If blur is used as reveal: blur clears to 0 quickly (within 5-10 frames per char)

**Redflags:**
- Text is completely unreadable for >20 frames → 🔴 Critical
- Motion amplitude >30px on body text → 🟡 Enhancement
- Blur stays at >5px for extended periods → 🟡 Enhancement

### 5. Opacity Thresholds

Gradual opacity reveals need careful thresholds.

**Check:**
- Entry: opacity reaches 1 within the first 30% of total presence
- Hold: opacity stays at 1 for at least 15 frames
- Exit: opacity drops to 0 within the last 20% of total presence
- Characters don't flash (brief opacity dips to 0 mid-animation)

**Redflags:**
- Opacity never reaches 1 → 🔴 Critical (faded, illegible)
- Opacity chart has gaps (characters flash in and out) → 🟡 Enhancement
- Opacity animation has "staircase" steps → 🟢 Polish

### 6. Multi-Line Text

If text contains newlines or wraps, animation must handle multi-line layout.

**Check:**
- `\n` characters in text string are handled (preserved as whitespace or as line breaks)
- Wrapped text maintains proper alignment during animation
- Words don't jump between lines during scale/blur transitions
- `textAlign` is set explicitly

**Redflags:**
- Newlines break the animation (e.g., per-char loop includes `\n` as visible) → 🔴 Critical
- Layout shifts during per-char reveals → 🟡 Enhancement

### 7. Common Text Anti-Patterns

- Splitting `text.split("")` without `whiteSpace: "pre"` → spaces collapse, layout breaks.
- Per-char animation without `display: "inline-block"` on each span → transforms don't apply.
- Using `i * staggerDelay` as reveal START but blending into hold poorly → abrupt transition.
- Applying `scale()` to text without `transform: scale(${value})` → `scale` is not a CSS property.
- No `fontFamily` default → browser default in render (inconsistent across platforms).
