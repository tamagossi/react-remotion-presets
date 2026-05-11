# Educational Video Patterns

Design patterns for language learning, professional training, and skill-building video presets. Covers shadowing, pronunciation, engineering English, workplace communication, and interview preparation.

## Core Educational Patterns

### 1. Shadowing / Listen-and-Repeat

The foundational language learning pattern: learner hears audio, then repeats it. Visual feedback bridges the gap.

**Visual structure:**
```
[Countdown/Prep] → [Audio Plays] → [Mic Active] → [Feedback] → [Next Phrase]
```

**Frame allocation (at 60fps):**
- Prep phase: 30-60 frames (prepares the learner visually)
- Audio playback: matches `voDurationInFrames`
- Speak window: 60-180 frames after audio (configurable)
- Feedback display: 30-60 frames
- Transition to next: 15-30 frames

**Key props:**
```tsx
export type ShadowingPresetProps = {
  phrase: string;
  audioSrc: string;
  voDurationInFrames: number;
  speakWindowFrames: number;       // Time allowed for learner to repeat
  showPhonetics: boolean;          // IPA or simplified pronunciation guide
  highlightSyllable: boolean;      // Stress marks on emphasized syllables
  echoCount: number;               // Number of echo/replay iterations
  enableWaveform: boolean;         // Audio waveform visualization
  enableMicPulse: boolean;         // Pulsing mic icon during speak window
};
```

### 2. Staggered Word Reveal

Words appear one at a time in rhythm with the voiceover, reinforcing the connection between spoken and written forms.

```tsx
const words = phrase.split(" ");
const wordDurations = computeWordDurations(audioSrc, words);
// Each word appears at its audio timestamp
words.map((word, i) => {
  const startFrame = cumulativeDuration(words.slice(0, i));
  const opacity = interpolate(frame, [startFrame, startFrame + 5], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <span style={{ opacity }}>{word} </span>;
});
```

**When to use:** Language learning, pronunciation drills, dictation exercises, karaoke-style sing-alongs.

### 3. Phonetic Guide Overlay

IPA or simplified pronunciation displayed below the main text.

```
Text:    "engineer"
IPA:     /ˌen-jə-ˈnir/
Syllables: en · ji · NEER
```

**Design rules:**
- Phonetic text: 50-60% the size of main text
- Lighter opacity (70-80%) so it supports, not competes
- Stress markers: bold or accent-colored on emphasized syllable
- Font: monospace or sans-serif for IPA readability

### 4. Waveform Visualization

Audio waveform bars that animate during playback, giving visual shape to sound.

```tsx
const waveformBars = 16; // Default: 16 bars
const barHeights = useMemo(() => {
  // Analyze audio frequency data
  return computeBarHeights(audioSrc, waveformBars, frame, fps);
}, [audioSrc, waveformBars, frame, fps]);

bars.map((height, i) => (
  <div
    key={i}
    style={{
      height: `${height * 100}%`,
      width: `${100 / waveformBars - 2}%`,
      backgroundColor: accentColor,
      borderRadius: 2,
      transition: `height ${1000 / fps}ms linear`,
    }}
  />
));
```

**When to use:** During audio playback only. Hide or reduce during speak window so learner focuses on their own voice.

### 5. Mic Pulse Feedback

Visual indicator showing when the microphone is "listening" — encourages learner participation.

```tsx
const micPulse = spring({
  frame: frame - speakWindowStart,
  fps,
  config: { damping: 8, mass: 0.3, stiffness: 150 },
});

// Continuous breathing pulse during speak window
const breatheScale = 1 + Math.sin(frame * 0.1) * 0.05;

<MicIcon
  scale={isSpeaking ? micPulse : breatheScale}
  color={isSpeaking ? speakingColor : idleColor}
/>
```

**Color coding:**
- Voiceover playing: idle color (e.g., blue)
- Speak window: accent color (e.g., green)
- After speaking: feedback color (matches performance: green=good, amber=ok, red=practice more)

### 6. Progress Tracking

Visual indicator showing position within the lesson.

**Patterns:**
- Progress bar: horizontal bar filling left to right
- Phrase counter: "3 / 10" with animated number change
- Timeline dots: dot per phrase, filled/active/upcoming states
- Ring progress: circular gauge (Apple Watch activity rings style)

```tsx
const progressWidth = interpolate(
  frame,
  [0, totalLessonFrames],
  [0, 100],
  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
);

const phraseDots = Array.from({ length: totalPhrases }, (_, i) => {
  const state = i < currentPhraseIndex ? "completed"
    : i === currentPhraseIndex ? "active"
    : "upcoming";
  return <Dot key={i} state={state} />;
});
```

## Domain-Specific Patterns

### Engineering English

**Common content types:**
- "Describe your role" — professional self-introduction
- "Explain a technical concept" — simplifying complexity
- "Engineering interview" — Q&A format with technical vocabulary
- "Project status update" — structured reporting
- "Remote team communication" — async communication patterns

**Visual style:** Clean, structured, professional. Cool tones (blues, slates). Geometric patterns. Monospace for technical terms. Sans-serif for body. Avoid playful/distracting animations.

**Recommended background presets:** `GeometricGridBackground`, `GridDotPatternBackground`, `DarkGradientBackground`

**Recommended text presets:** `WordSlideText`, `BlurRevealText`, `FocusShiftText`, `TypewriterText`

### Professional English / British RP

**Common content types:**
- "Introduce yourself" — professional networking context
- "Workplace communication" — email, meetings, presentations
- "Remote job English" — async work, video calls, chat
- "Business small talk" — cultural fluency

**Visual style:** Refined, international, sophisticated. Neutral-warm tones. Serif accents for RP/formal feel. Clean layouts with ample whitespace. Subtle animations (no glitch, no overshoot).

**Recommended background presets:** `LightGradientBackground`, `DiagonalSpectrumBackground`, `PaperTextureBackground`

**Recommended text presets:** `SimpleFadeText`, `MixedWeightSlideText`, `LetterSpacingRevealText`, `StackedLineText`

### Interview Preparation

**Common content types:**
- Mock Q&A: question appears, pause, model answer appears
- "Tell me about yourself" — structured self-introduction
- Technical question → answer reveal
- Behavioral questions (STAR method: Situation, Task, Action, Result)

**Visual structure:**
```
[Question appears] → [Thinking pause: 3-5 seconds] → [Answer reveals] → [Key points highlight]
```

```tsx
const interviewFlow = {
  questionFrame: 0,
  pauseDuration: 180,  // 3 seconds thinking time
  answerStartFrame: 180,
  answerDuration: 600, // 10 seconds answer
  highlightFrame: 780, // Key terms highlight after answer
};

const questionOpacity = interpolate(frame, [0, 20], [0, 1]);
const answerOpacity = interpolate(frame, [180, 200], [0, 1]);
```

### Remote Work English

**Common content types:**
- Async video message (Loom-style)
- Written → spoken: chat message → voice note
- Meeting phrases and responses
- Status update templates

**Visual style:** Modern, approachable, slightly casual. Warm-cool balance. Chat UI elements (glassmorphism bubbles). Screen-sharing overlays.

**Recommended presets:** `ChatConversation`, `FlatSearchList`, `CardBulletList`

## Voiceover Integration

### Timing Animation to Audio

```tsx
import { useAudioData, visualizeAudio } from "@remotion/media-utils";

const audioData = useAudioData(audioSrc);
if (!audioData) return null;

const visualization = visualizeAudio({
  audioData,
  fps,
  frame,
  numberOfSamples: 1,
});

const currentAmplitude = visualization[0]; // 0-1, use for reactive visuals

// Tie visual element timing to audio analysis
const isSpeaking = currentAmplitude > 0.1;
const wordBoundaries = detectWordBoundaries(audioSrc); // External analysis
```

### Audio-Visual Sync Rules

1. Text must be fully visible (and static) when voiceover reads it — don't animate during narration
2. After animation completes, hold for minimum 15 frames before advancing
3. If word appears before voiceover: text sits static until audio catches up
4. If audio is faster than animation: increase stagger speed or reduce word count
5. During speak window (learner talking): remove all text animation, show static reference

### Call-and-Response Timing

```
Voiceover: "Revenue grew by" (60 frames)
Visual: "Revenue grew by" appears word by word
Voiceover: [silence, 120 frames for learner to read]
Voiceover: "forty-seven percent" (45 frames)
Visual: "47%" appears with chart
Voiceover: [silence, 180 frames for learner to process]
Next phrase begins...
```

## Accessibility for Educational Content

- All audio must have captions or transcript available
- Phonetic text must not be the only way to understand pronunciation
- High contrast for text (educational content = readability is paramount)
- No rapid flashing (seizure risk — keep animation changes below 3 per second)
- Allow pause and replay conceptually (even if not in Remotion, the timing should be generous enough that a learner doesn't feel rushed)

## Prop Design for Educational Presets

```tsx
export type EducationalPresetProps = {
  /** Audio source for voiceover */
  audioSrc: string;
  /** Duration of voiceover in frames */
  voDurationInFrames: number;
  /** Total duration including pre-roll, speak window, and post-roll */
  durationInFrames: number;
  /** Show phonetic/IPA pronunciation guide */
  showPhonetics?: boolean;
  /** Enable waveform visualization during playback */
  enableWaveform?: boolean;
  /** Enable microphone pulse indicator during speak window */
  enableMicPulse?: boolean;
  /** Frames after audio ends for learner to speak */
  speakWindowFrames?: number;
  /** Number of echo/replay iterations */
  echoCount?: number;
  /** Progress indicator style */
  progressStyle?: "bar" | "dots" | "counter" | "ring";
  /** Accent color for active/emphasized elements */
  accentColor?: string;
  /** Idle/neutral color */
  idleColor?: string;
};
```
