# Script-Driven Animation

Techniques for synchronizing animation to voiceover scripts. Every motion must serve the spoken word — timing, emphasis, and rhythm all flow from the script.

## Script Analysis

### Extracting Timing from Script

Before touching any animation, analyze the script:

```tsx
const script = {
  sections: [
    {
      id: "hook",
      text: "Ever felt like your tools are slowing you down?",
      startFrame: 0,
      endFrame: 300,
    },
    {
      id: "problem",
      text: "You're not alone. Most teams waste 30% of their week on manual tasks.",
      startFrame: 300,
      endFrame: 720,
    },
    {
      id: "solution",
      text: "Our platform automates the busywork so you can focus on what matters.",
      startFrame: 720,
      endFrame: 1200,
    },
  ],
  keywords: [
    { word: "slowing", emphasis: "high", frame: 180 },
    { word: "30%", emphasis: "high", frame: 480 },
    { word: "automates", emphasis: "medium", frame: 900 },
  ],
};
```

### Script Tone Analysis

| Script Property | Animation Implication |
|---|---|
| Short sentences, rapid pace | Snappy easing, short durations (10-15 frame reveals) |
| Long, flowing sentences | Smooth easing, longer durations (20-30 frame reveals) |
| Rhetorical questions | Pause after reveal, subtle scale pulse on key word |
| Statistics/numbers | Dramatic scale pop or counter animation |
| Emotional language | Slower easing, warmer colors, softer motion |
| Technical language | Clean, geometric motion, monospace fonts if code |
| Call to action | Bold entrance, brief overshoot, high contrast |

### Keyword Emphasis Mapping

```tsx
const emphasisMap = {
  high: {
    scale: 1.15,
    color: accentColor,
    duration: 15, // frames for emphasis animation
    easing: Easing.out(Easing.back(1.3)),
  },
  medium: {
    scale: 1.05,
    color: secondaryAccent,
    duration: 10,
    easing: Easing.out(Easing.quad),
  },
  low: {
    scale: 1.0,
    color: textColor,
    duration: 0,
  },
};
```

## Word-Level Timing

### Word-by-Word Reveal with Audio Sync

```tsx
// Each word has its own frame range based on when voiceover says it
const wordTimings = [
  { word: "Revenue", startFrame: 0, endFrame: 45 },
  { word: "grew", startFrame: 45, endFrame: 90 },
  { word: "by", startFrame: 90, endFrame: 105 },
  { word: "47%", startFrame: 105, endFrame: 180 },
];

// Render each word independently, animating at its specific time
const Word: React.FC<{ timing: WordTiming; frame: number }> = ({ timing, frame }) => {
  const progress = interpolate(
    frame,
    [timing.startFrame, timing.startFrame + 10],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const isEmphasized = timing.word.match(/[\d%]+/); // Numbers get emphasis
  return (
    <span
      style={{
        display: "inline-block",
        marginRight: "0.3em",
        opacity: progress,
        transform: `translateY(${(1 - progress) * 8}px) scale(${isEmphasized ? 1.1 * progress : 1})`,
        color: isEmphasized ? accentColor : textColor,
      }}
    >
      {timing.word}
    </span>
  );
};
```

### Character vs Word vs Line Timing

| Granularity | Best For | Avoid For |
|---|---|---|
| **Per-character** | Short titles, dramatic reveals, glitch effects | Body text, educational content, any text meant to be read |
| **Per-word** | Short phrases, keyword emphasis, shadowing | Long paragraphs, detailed explanations |
| **Per-line** | Bullet points, multi-line titles, body text | Short single-word reveals |
| **Per-block** | Scene transitions, chapter titles | Detailed content, word-level sync |

**Rule:** Body text (3+ words in a line) should appear per-line or per-block, never per-character. Moving text is harder to read — respect the learner's cognitive load.

## Audio-Visual Sync Rules

### The Golden Rule of Sync

```
Text must be fully visible and static when voiceover reads it.
```

If animation hasn't finished when audio reaches that word, the viewer's verbal and visual channels conflict.

### Phrasing Buffer

```tsx
// Always buffer: text appears slightly BEFORE audio says it
const preRollFrames = 10; // Text is fully visible 10 frames before audio reference

const textAppearFrame = audioReferenceFrame - animationDuration - preRollFrames;

// Text settles (animation done) at textAppearFrame + animationDuration
// Audio hits at textAppearFrame + animationDuration + preRollFrames
// This gives the eye time to land on the word before the ear hears it
```

### Post-Phrase Hold

After the final word of a phrase, hold the text static before transitioning:

```tsx
const postRollFrames = 30; // Hold text visible for 30 frames after audio finishes

const sceneEndFrame = audioEndFrame + postRollFrames;
// Text exits starting at sceneEndFrame
// Next scene enters starting at sceneEndFrame + 15 (brief gap)
```

### Scene Transition Timing

```
[Previous Scene Exit: 15 frames]
[Gap: 10-15 frames]
[Next Scene Entry: 20-30 frames]
```

Never overlap scene entry and exit animations — the viewer needs clean separation between ideas.

## Call-and-Response Pattern

For interactive/educational presets where the viewer is expected to respond:

```
Phase 1: Prompt appears  (frames 0-60)        — "What's the past tense of 'go'?"
Phase 2: Pause/think     (frames 60-180)      — Static prompt, maybe subtle pulse
Phase 3: Answer reveals  (frames 180-240)     — "went" appears with emphasis
Phase 4: Explanation     (frames 240-360)     — Grammar note, example sentence
Phase 5: Next prompt     (frames 360+)        — Transition
```

```tsx
const callAndResponse = {
  prompt: { start: 0, end: 60 },
  thinkWindow: { start: 60, end: 180 },  // Learner thinks/responds
  reveal: { start: 180, end: 240 },
  explanation: { start: 240, end: 360 },
};

// During thinkWindow: prompt is fully visible, no new animations
// During reveal: answer animates in with emphasis
// During explanation: supplemental text appears, answer stays visible
```

## Dynamic Timing from Audio Data

When audio analysis is available, derive timings automatically:

```tsx
import { getAudioDuration } from "@remotion/media-utils";

const audioDurationInSeconds = await getAudioDuration(audioSrc);
const totalFrames = Math.ceil(audioDurationInSeconds * fps);

// Simple heuristic: 150 words per minute = 2.5 words per second = 24 frames per word at 60fps
const estimatedWordCount = script.split(" ").length;
const wordsPerMinute = (estimatedWordCount / audioDurationInSeconds) * 60;
const framesPerWord = Math.round((audioDurationInSeconds * fps) / estimatedWordCount);

// Adjust animation speed based on speaking rate
const staggerDelay = wordsPerMinute > 180 ? 5 : wordsPerMinute > 140 ? 8 : 12;
// Fast speaker: tighter stagger. Slow speaker: more breathing room.
```

## Multi-Language Considerations

### Text Expansion/Contraction

Different languages have different character density:

| Language | Expansion vs English | Animation Impact |
|---|---|---|
| German | +30% more characters | Slow down reveals, more frames per word |
| Japanese | -30% characters (kanji) | Speed up per-character, but same per-word |
| Spanish | +15% more characters | Slightly more reveal time |
| Chinese | -40% characters | Per-word timing, not per-character |
| Arabic | RTL layout | Mirror all directional animations |

### Font Support

Ensure chosen font supports the target language's character set. Noto fonts have the broadest coverage. Test with real content before finalizing.

## Animation Timing Cheat Sheet

| Script Element | Animation Pattern | Duration | Easing |
|---|---|---|---|
| Title/intro | Scale + fade from center | 20-30 frames | Easing.out(Easing.back(1.2)) |
| Section header | Slide from left | 15-20 frames | Easing.out(Easing.quad) |
| Body bullet | Fade + slight slide up (8px) | 10-15 frames | Easing.out(Easing.quad) |
| Keyword emphasis | Scale pop to 1.1 | 8-12 frames | Easing.out(Easing.back(1.3)) |
| Number/stat | Counter animation or scale | 15-25 frames | Easing.out(Easing.back(1.1)) |
| Image reveal | Fade in (or mask reveal) | 15-20 frames | Easing.inOut(Easing.quad) |
| CTA button | Scale from 0.8 with spring | 20-25 frames | spring({ damping: 10 }) |
| Scene exit | Fade + slight slide (direction) | 12-18 frames | Easing.in(Easing.quad) |

## Debugging Script Sync

### Visual Debug Overlay

```tsx
// Development-only timeline bar showing script sections
const DEBUG = false; // Set true when timing script

{DEBUG && (
  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 20 }}>
    {script.sections.map((section) => (
      <div
        key={section.id}
        style={{
          position: "absolute",
          left: `${(section.startFrame / durationInFrames) * 100}%`,
          width: `${((section.endFrame - section.startFrame) / durationInFrames) * 100}%`,
          height: "100%",
          backgroundColor: sectionColors[section.id],
          opacity: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
        }}
      >
        {section.id}
      </div>
    ))}
  </div>
)}
```

### Sync Checklist

Before shipping a script-driven preset, verify:
- [ ] Text is fully visible before voiceover reaches each word
- [ ] No animation overlap with audio for critical words
- [ ] Post-phrase holds are long enough to read (15+ frames)
- [ ] Scene transitions don't clip active text
- [ ] Emphasized keywords get visual treatment at the right frame
- [ ] Total animation timing matches voiceover duration with buffer
- [ ] If script changes, all frame references update automatically
