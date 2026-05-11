# Explainer Video Design

Storytelling structure, storyboarding, and script-driven design for explainer presets. Based on Atlassian/Loom explainer video best practices.

## What Is an Explainer Video

A short, compelling video (1-3 minutes) that sells an idea or product by highlighting its biggest strengths and benefits. Think video elevator pitch — not a tutorial or how-to. Focuses on high-level value, not technical details.

## Story Structure

Every explainer preset should follow this arc:

```
Hook → Problem → Solution → Benefits → CTA
```

### Hook (first 5-8 seconds)
Grab attention immediately. Visual surprise, bold statement, or relatable moment. The viewer decides to stay or leave in under 9 seconds.

### Problem (frames 180-540)
State the pain point your product/idea solves. Make the viewer think "yes, that's me." Use specific, relatable scenarios.

### Solution (frames 540-900)
Introduce your product/idea as the answer. Show, don't tell. Demonstrate the transformation.

### Benefits (frames 900-1200)
What changes for the user? Focus on outcomes, not features. "You'll save 10 hours a week" not "Our tool has automated scheduling."

### CTA (frames 1200-1350)
Clear, single action. "Sign up for free," "Book a demo," "Download the guide." One CTA per video.

## The 6 Video Types

Match preset style to the right video type:

| Type | Visual Style | Best For | Example |
|------|-------------|----------|---------|
| **Live Action** | Real people, real environments | Established brands, physical products, credibility | Airbnb, Asana |
| **Animated (2D/3D)** | Illustrated characters, motion graphics | SaaS, abstract concepts, flexibility | Ahrefs, ClickUp, Mailchimp |
| **Whiteboard** | Hand-drawn illustrations, time-lapse drawing | Budget-friendly storytelling, complex processes | ScheduleBase |
| **Kinetic Typography** | Animated text only | Short motivational, simple messages | Fast low-budget content |
| **Screencast** | Screen recording + voiceover | Product demos, software walkthroughs | Loom, Braze |
| **Live Stream** | Live, unedited broadcast | Credibility, audience connection, Q&A | Ecommerce, social |

### When to Apply Each Type to a Remotion Preset

- **Animated**: Use `texts/` presets + `backgrounds/` + `data-visualizations/` — the core remotion strength
- **Kinetic Typography**: Use `texts/` presets on clean backgrounds with no other visuals
- **Screencast**: Overlay `misc/ChatConversation` or `lower-thirds/` on screen recordings
- **Whiteboard**: Use geometric pattern backgrounds + text animations with hand-drawn aesthetic fonts

## Storyboarding for Presets

Before building any explainer preset, sketch the scene flow:

```
Scene 1: Background fade-in + Title    (0-60 frames)
Scene 2: Problem statement appears     (60-180)
Scene 3: Transition + solution reveal  (180-360)
Scene 4: Benefit bullets stagger in    (360-540)
Scene 5: CTA with button animation    (540-600)
```

### Storyboarding Rules

1. Each scene = one idea. If a scene has two ideas, split it.
2. Scene length: 60-180 frames (1-3 seconds at 60fps). Vary duration for rhythm.
3. Transitions between scenes: 15-30 frames. Use fade, wipe, or morph.
4. Max 6-8 scenes for a 2-minute video.
5. First and last scenes get extra frames for impact.

## Script-Driven Design

The script dictates the visual timing — not the other way around.

### Writing the Script

1. Start with scene descriptions from storyboard
2. Expand each scene into 1-3 spoken sentences
3. Use conversational language — as if speaking to one person
4. Avoid jargon. If your grandma wouldn't understand it, rewrite.
5. Time the script: speak it aloud at natural pace. 150 words ≈ 60 seconds.

### Syncing Visuals to Script

```tsx
// Map script timestamps to frame ranges
const scriptTimings = {
  hook: { start: 0, end: 480 },       // "Ever wished project tracking was easier?"
  problem: { start: 480, end: 1080 },  // Script lines 2-4
  solution: { start: 1080, end: 1800 }, // Script lines 5-8
  benefits: { start: 1800, end: 2400 }, // Script lines 9-12
  cta: { start: 2400, end: 2700 },     // "Try it free at example.com"
};

// Use these boundaries to control animation progress
const sceneProgress = interpolate(
  frame,
  [scriptTimings.solution.start, scriptTimings.solution.end],
  [0, 1],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
);
```

### Benefits vs Features

Never list features in an explainer. Always translate to benefits:

| Feature (bad) | Benefit (good) |
|---|---|
| "Uses AES-256 encryption" | "Your data stays private and secure" |
| "Has 47 integrations" | "Connects to all the tools you already use" |
| "Real-time sync" | "Your team always sees the latest version" |
| "Cloud-based architecture" | "Access your work from anywhere, on any device" |

## Pacing and Timing

### Duration Rules

| Video Length | Max Scenes | Words in Script | Best For |
|---|---|---|---|
| 30 seconds | 3-4 | ~75 | Social media, ads |
| 60 seconds | 5-6 | ~150 | Product feature highlight |
| 90 seconds | 6-7 | ~225 | Full product intro |
| 120 seconds | 7-8 | ~300 | Brand story, comprehensive explainer |
| 180 seconds | 8-10 | ~450 | Complex product, enterprise |

**Hard rule:** Never exceed 5 minutes. An explainer stops being an explainer at that point.

### Pacing Patterns

- **Fast-slow-fast**: Hook fast, explain slow, CTA fast
- **Slow burn**: Build tension, reveal payoff (premium/luxury)
- **Steady rhythm**: Consistent pace throughout (corporate/educational)
- **Punchy cuts**: Quick scenes with match cuts (social media, youth)

### Pause Points

Natural pauses between scenes let information sink in:

```tsx
// After each major point, hold for 30-60 frames before next scene
const holdFrames = 45; // 0.75 seconds at 60fps

// Between script sections, add visual breathing room
// Dim previous content, let it rest, then bring in new content
```

## CTA Design

### CTA Do's
- One clear action per video
- Visual emphasis: brighter color, larger scale, animation pop
- Position: center or lower-third, never corners
- Appears after all benefits are delivered (not before)
- Hold for minimum 90 frames (1.5 seconds) after appearing

### CTA Don'ts
- Multiple CTAs competing for attention
- Text-only CTA without visual button/badge
- CTA that appears before the viewer knows what the product is
- Aggressive sales language ("BUY NOW!!!")
- Fading out immediately — let it breathe

## Quality Standards

### Technical Baseline
- HD resolution minimum (1280x720)
- Professional color grading (no raw ungraded footage feel)
- Clean audio if voiceover included (no hiss, pops, uneven levels)
- Precise timing — no animation drifts from script timing
- Consistent visual language across all scenes

### Engagement Checkpoints

After building the preset, ask:
1. Would I watch this to the end if I stumbled on it?
2. Do I understand the core value in the first 8 seconds?
3. Is the CTA obvious and compelling?
4. Would I be proud to put this on my company's homepage?
5. Does every single frame serve the story? (If not, cut it.)

## Integration with Remotion Presets

### Composing an Explainer from Presets

```tsx
// An explainer video combines multiple presets:
<DarkGradientBackground>
  <Sequence from={0} durationInFrames={300}>
    <SingleWordZoomText text="Struggling?" />
  </Sequence>
  <Sequence from={300} durationInFrames={480}>
    <WordSlideText text="Managing projects shouldn't be hard" />
  </Sequence>
  <Sequence from={780} durationInFrames={600}>
    <IconGridList items={benefits} />
  </Sequence>
  <Sequence from={1380} durationInFrames={300}>
    <ColorStackText lines={["Try it free", "at example.com"]} />
  </Sequence>
</DarkGradientBackground>
```

### Prop Design for Explainer Presets

Every explainer preset should expose:
- `scriptTimings: Record<string, { start: number; end: number }>` — Scene boundary frames
- `voiceoverDuration: number` — Total voiceover length in frames
- `holdFrames: number` — Pause duration between major points
- `transitionDuration: number` — Cross-scene transition frames
- `ctaFrame: number` — Frame where CTA appears

### Explainer-Ready Preset Checklist

A preset is "explainer-ready" when:
- Entry animation completes within 30-60 frames (not sluggish)
- Content area supports dynamic text lengths (not fixed-width)
- Exit animation is clean and brief (15-30 frames)
- Works when sequenced after/before other presets (no jarring transitions)
- Supports `Sequence` wrapping without z-index conflicts
