# Animation Principles for Remotion

Apply the 12 principles of animation adapted for frame-driven React video.

## 1. Squash and Stretch

Give objects weight and flexibility. Use `scaleX` + `scaleY` with inverse relationship.

```tsx
const scaleY = interpolate(frame, [0, 10], [0.5, 1], { extrapolateLeft: "clamp" });
const scaleX = 1 + (1 - scaleY) * 0.3; // squash when stretch, stretch when squash
```

**When to use:** Bounces, impacts, elastic UI elements. Skip for rigid objects.

## 2. Anticipation

Small backward motion before main action. Prepares viewer's eye.

```tsx
// Slide right: first slide left 10px, then right 100px
const x = interpolate(frame, [0, 5, 15], [-10, 0, 100], {
  easing: Easing.out(Easing.quad),
});
```

**When to use:** Any directional movement. 3-5 frames of anticipation at 30fps.

## 3. Staging

Clear focal point. Remove clutter. Guide eye with motion.

- One primary action per preset
- Secondary elements support, don't compete
- Use opacity (0.3-0.5) for background decorative elements
- Z-index layering: background < decorative < primary content < overlay

## 4. Straight Ahead Action vs Pose-to-Pose

**Straight ahead:** Calculate every frame. Good for physics, particles, continuous motion.

**Pose-to-pose:** Define keyframes, interpolate between. Good for UI animation, transitions.

Remotion favors pose-to-pose. Define start/end states, let `interpolate` handle middle.

```tsx
// Pose-to-pose: opacity 0 → 1 over 30 frames
const opacity = interpolate(frame, [0, 30], [0, 1]);
```

## 5. Follow Through and Overlapping Action

Elements don't stop simultaneously. Primary stops, secondary overshoots and settles.

```tsx
// Title stops at frame 20, subtitle follows with 10 frame delay
const titleY = interpolate(frame, [0, 20], [50, 0], { easing: Easing.out(Easing.back(1.2)) });
const subtitleY = interpolate(frame, [10, 30], [50, 0], { easing: Easing.out(Easing.back(1.2)) });
```

**When to use:** Multi-element presets. Stagger by 5-15 frames.

## 6. Slow In and Slow Out (Easing)

Natural motion accelerates and decelerates. Never linear for UI elements.

**Easing cheat sheet:**

| Curve | Feel | Use Case |
|-------|------|----------|
| `Easing.out(Easing.quad)` | Fast start, gentle stop | UI entrances, reveals |
| `Easing.in(Easing.quad)` | Gentle start, abrupt stop | Exits, dismissals |
| `Easing.inOut(Easing.quad)` | Symmetric smooth | Transitions, morphs |
| `Easing.out(Easing.back(1.5))` | Overshoot, settle | Playful entrances |
| `[0.22, 1, 0.36, 1]` | Apple-style smooth | Premium UI, luxury |
| `[0.45, 0, 0.55, 1]` | Sine-like, dreamy | Backgrounds, atmospheric |
| `[0.16, 1, 0.3, 1]` | Strong ease-out, snappy | Modern UI, responsive |
| `spring({ fps, frame, config: { damping: 10 } })` | Physics-based bounce | Organic, natural motion |

**Rule:** Default to `Easing.out(Easing.quad)` unless mood demands otherwise.

## 7. Arcs

Natural motion follows curved paths, not straight lines.

```tsx
// Arc motion: combine x and y with different easing
const x = interpolate(frame, [0, 30], [0, 200], { easing: Easing.inOut(Easing.quad) });
const y = interpolate(frame, [0, 30], [0, -50], { easing: Easing.out(Easing.quad) });
// Result: arc trajectory
```

## 8. Secondary Action

Supporting motion that reinforces primary action.

- Primary: text slides in
- Secondary: subtle shadow grows, or background blob shifts slightly

Keep secondary at 20-30% intensity of primary. Don't steal focus.

## 9. Timing

**Frame count reference (at 30fps):**

| Duration | Feel | Use Case |
|----------|------|----------|
| 5-8 frames | Instant, snappy | Micro-interactions |
| 10-15 frames | Quick, efficient | UI entrances |
| 20-30 frames | Smooth, comfortable | Standard reveals |
| 45-60 frames | Dramatic, deliberate | Title cards, emphasis |
| 90+ frames | Cinematic, slow | Backgrounds, atmosphere |

**Pacing rules:**
- Match script rhythm. Fast script = quick cuts, snappy easing.
- Slow script = longer holds, gentle easing.
- Vary timing. Don't make everything 30 frames.

## 10. Exaggeration

Push motion beyond realism for clarity and impact.

- Scale overshoot: go to 1.1 then settle to 1.0
- Opacity flash: briefly hit 1.2 (with mix-blend) then normalize
- Position: move 20% further than "correct" position, then snap back

**When to use:** Playful, energetic, youthful content. Skip for corporate/medical.

## 11. Solid Drawing (Spatial Awareness)

Respect 3D space even in 2D.

- Shadows imply height
- Parallax implies depth (background moves slower than foreground)
- Scale implies distance

```tsx
// Parallax: background moves at 0.3x speed of foreground
const bgX = interpolate(frame, [0, 100], [0, 30]);
const fgX = interpolate(frame, [0, 100], [0, 100]);
```

## 12. Appeal

Make it beautiful. Every preset should be visually satisfying.

- Golden ratio spacing (1:1.618)
- Color harmony (complementary, triadic, analogous)
- Clean typography hierarchy
- Purposeful whitespace
- Consistent visual language within category

## Remotion-Specific Patterns

### Frame-Driven Animation Template

```tsx
const frame = useCurrentFrame();
const { fps } = useVideoConfig();

// Define keyframes as [frame, value] pairs
const value = interpolate(frame, [0, 15, 30], [0, 1.1, 1], {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.out(Easing.back(1.2)),
});
```

### Spring Alternative

```tsx
import { spring } from "remotion";

const value = spring({
  frame,
  fps,
  config: { damping: 10, mass: 0.5, stiffness: 100 },
  from: 0,
  to: 1,
});
```

**Spring vs Interpolate:**
- Use `interpolate` for precise timing control (must hit frame 30 exactly)
- Use `spring` for organic, physics-based feel (timing emergent)

### Sequencing Helper

```tsx
// Multiple elements, staggered
const items = [0, 1, 2, 3];
const stagger = 10; // frames between each

items.map((i) => {
  const delay = i * stagger;
  const opacity = interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <div style={{ opacity }} key={i}>Item {i}</div>;
});
```

### Entrance + Hold + Exit Pattern

```tsx
const entrance = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
const exit = interpolate(frame, [durationInFrames - 15, durationInFrames], [1, 0], {
  extrapolateLeft: "clamp",
});
const opacity = Math.min(entrance, exit);
```
