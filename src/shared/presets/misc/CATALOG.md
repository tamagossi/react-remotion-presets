# Misc Presets Catalog

AI selection guide for `src/shared/presets/misc/`.

## Quick Selection Guide

| Script Tone | Mood | Energy | Color Temp | Formality | Recommended Preset |
| ----------- | ---- | ------ | ---------- | --------- | ------------------ |
| Conversational, casual | Modern, social | Low-Medium | Cool | Casual-Professional | `ChatConversation` (glassmorphism bubbles, spring overshoot) |
| Energetic, promotional | Exciting, playful | Medium-High | Warm-Vibrant | Casual | `YouTubeSubscribeOverlay` (glass card, particle burst, subscribe action) |
| Educational, instructional | Focused, calm | Medium | Neutral-Cool | Structured | `ShadowingScene` (word reveal, mic pulse, progress bar, VO synced) |
| Repetitive, echo-driven | Hypnotic, rhythmic | Low-Medium | Cool | Casual | `EchoRepeatScene` (ghost word trails, ripple rings, muted purple accent) |
| Phonetic, language-learning | Precise, studious | Medium | Warm | Formal | `PronunciationDrillScene` (phonetic guides, syllable emphasis, amber accent) |
| Energetic, sing-along | Vibrant, festive | High | Warm-Vibrant | Casual | `KaraokeShadowScene` (waveform bars, sweep highlight, pink accent) |

## How to Use This Catalog

When generating a video composition:

1. **Analyze the script**: Extract mood, theme, energy level, target audience, formality.
2. **Match dimensions**: Use table above or scan preset metadata.
3. **Select preset**: Pick best match. If unsure, suggest top 2 with tradeoffs.
4. **Apply prop overrides**: Use `suggestedOverrides` for matched context.
5. **Compose**: Integrate preset into composition.

## Presets

### ChatConversation

**ID**: `ChatConversation`
**Export**: `src/shared/presets/misc`

**Description**
Cinematic minimal chat conversation thread. Glassmorphism bubbles animate in with scale + opacity + spring overshoot, staggered by configurable delay. Auto-scroll keeps newest message in view. No avatars, no timestamps — pure cinematic overlay designed for testimonials, quote reveals, or social content integration.

**Visual Characteristics**

- Style: Minimal, glassmorphism, cinematic
- Motion: Staggered scale-in with overshoot settle, smooth auto-scroll
- Texture: Subtle glow shadow per bubble
- Depth: Transparent background for overlay use

**Metadata**

```json
{
  "mood": ["calm", "modern", "sleek", "contemplative"],
  "theme": ["tech", "social", "storytelling", "testimonial"],
  "energy": "low-to-medium",
  "colorTemp": "cool",
  "formality": "casual-to-professional",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "bubbleBorderRadius": 20,
  "bubbleGap": 14,
  "bubbleMaxWidth": 420,
  "bubblePadding": 18,
  "defaultBubbleColor": "rgba(20, 20, 30, 0.72)",
  "defaultTextColor": "#ffffff",
  "enterDuration": 22,
  "enterEasing": [0.22, 1, 0.36, 1],
  "exitDuration": 20,
  "exitEasing": [0.45, 0, 0.55, 1],
  "fontFamily": "Inter, system-ui, sans-serif",
  "fontSize": 24,
  "fontWeight": 400,
  "glowColor": "rgba(124, 58, 237, 0.25)",
  "glowIntensity": 1,
  "position": "right",
  "staggerDelay": 18,
  "threadWidth": 520
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
| ------- | ------------------ | ----- |
| `social-stories` | Brighter bubbles, faster stagger for snappy feel | `{ bubbleGap: 10, enterDuration: 16, glowColor: "rgba(236, 72, 153, 0.3)", staggerDelay: 12 }` |
| `testimonial-corporate` | Neutral palette, restrained motion, left position | `{ defaultBubbleColor: "rgba(30, 30, 40, 0.8)", enterDuration: 18, glowIntensity: 0.5, position: "left", staggerDelay: 14 }` |
| `nightlife-dramatic` | Deep purple glow, high intensity, slow cinematic entry | `{ defaultBubbleColor: "rgba(10, 10, 20, 0.85)", enterDuration: 28, glowColor: "rgba(192, 38, 211, 0.4)", glowIntensity: 1.5, staggerDelay: 22 }` |
| `playful-creative` | Rounded bubbly style, vibrant glow, quick bounce | `{ bubbleBorderRadius: 28, enterDuration: 14, glowColor: "rgba(59, 130, 246, 0.35)", staggerDelay: 10 }` |

**When to Use**

- Overlay chat messages on video footage (social content, storytelling)
- Testimonial quote sequences with conversational feel
- Product demo showing user reactions or reviews
- Any script needing realistic but cinematic chat UI

**When NOT to Use**

- Scripts needing full mobile UI replication (no avatars, timestamps, read receipts)
- Content where chat is the primary focus for extended duration (preset designed for overlay)
- Very bright backgrounds without adjusting bubble opacity/color

**Composition Example**

```tsx
import { ChatConversation } from "./shared/presets/misc";

<ChatConversation
  messages={[
    { duration: 50, side: "left", text: "Hey! Are you free this Saturday?" },
    { duration: 55, side: "right", text: "Yup, nothing planned yet. What's up?" },
  ]}
  position="right"
>
  <YourBackground />
</ChatConversation>
```

## Future Presets (Planned)

### YouTubeSubscribeOverlay

**ID**: `YouTubeSubscribeOverlay`
**Export**: `src/shared/presets/misc`

**Description**
Premium glassmorphism YouTube-style subscribe button overlay. A frosted glass card with SVG avatar ring draw-on, channel name, and red subscribe button. On action: particle burst erupts from the button, it morphs to a "subscribed" state with checkmark SVG draw-on, and a bell icon springs in with notification dot bounce + wiggle. Designed as a transparent overlay for any background.

**Visual Characteristics**

- Style: Glassmorphism, premium, modern
- Motion: Staggered entry with overshoot, particle burst on action, spring bell + dot
- Texture: Frosted glass with backdrop-blur, subtle glow aura
- Depth: Transparent overlay, works on any background

**Metadata**

```json
{
  "mood": ["exciting", "playful", "premium", "modern"],
  "theme": ["social", "tech", "promotional", "gaming"],
  "energy": "medium-to-high",
  "colorTemp": "warm-vibrant",
  "formality": "casual",
  "complexity": "high",
  "readability": "high"
}
```

**Default Props**

```json
{
  "actionFrame": 75,
  "avatarBorderColor": "#ff0000",
  "avatarBorderWidth": 3,
  "avatarSize": 48,
  "avatarUrl": "",
  "bellWiggleIntensity": 15,
  "cardBorderRadius": 16,
  "cardGlowColor": "rgba(255, 0, 0, 0.3)",
  "cardGlowIntensity": 1,
  "cardPadding": 14,
  "channelName": "Channel Name",
  "checkmarkColor": "#ffffff",
  "enterDuration": 20,
  "enterEasing": [0.22, 1, 0.36, 1],
  "exitDuration": 20,
  "exitEasing": [0.45, 0, 0.55, 1],
  "fontFamily": "Inter, system-ui, sans-serif",
  "fontSize": 18,
  "glassBlur": 20,
  "glassOpacity": 0.12,
  "notificationDotColor": "#ff0000",
  "particleColor": "rgba(255, 50, 50, 0.8)",
  "particleCount": 10,
  "particleSpread": 70,
  "position": "bottom-left",
  "showLike": false,
  "showNotificationDot": true,
  "subscribedColor": "#606060",
  "subscribedText": "SUBSCRIBED",
  "subscribeColor": "#ff0000",
  "subscribeText": "SUBSCRIBE",
  "textColor": "#ffffff"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
| ------- | ------------------ | ----- |
| `gaming-stream` | Vibrant purple glow, faster action, like icon enabled | `{ avatarBorderColor: "#9146FF", cardGlowColor: "rgba(145, 70, 255, 0.4)", subscribeColor: "#9146FF", showLike: true, actionFrame: 60 }` |
| `corporate-tech` | Subdued blue tones, slower pace, no particles | `{ avatarBorderColor: "#3b82f6", cardGlowColor: "rgba(59, 130, 246, 0.25)", particleCount: 0, subscribeColor: "#3b82f6", enterDuration: 30 }` |
| `viral-short` | Snappy entry, center position, bigger particles | `{ actionFrame: 45, enterDuration: 12, particleCount: 16, particleSpread: 90, position: "center" }` |
| `light-background` | Darker glass for visibility on bright surfaces | `{ glassOpacity: 0.2, cardGlowColor: "rgba(255, 0, 0, 0.15)", textColor: "#1a1a1a", subscribeColor: "#cc0000" }` |

**When to Use**

- Social media content with subscribe/reaction CTAs
- Video intros/outros with channel branding
- Stream overlays with subscribe button
- Promotional videos with interactive elements
- Any composition needing a YouTube-style subscribe call-to-action overlay

**When NOT to Use**

- Static images or screenshots (particles and bell wiggle are frame-driven)
- Content needing a full YouTube UI replica (this is a minimal cinematic overlay)
- Extremely dark or busy backgrounds without adjusting glassOpacity

**Composition Example**

```tsx
import { YouTubeSubscribeOverlay } from "./shared/presets/misc";

<YouTubeSubscribeOverlay
  actionFrame={90}
  avatarUrl="https://example.com/avatar.jpg"
  channelName="My Channel"
  position="bottom-left"
>
  <YourBackground />
</YouTubeSubscribeOverlay>
```

### ShadowingScene

**ID**: `ShadowingScene`
**Export**: `src/shared/presets/misc`

**Description**
Language shadowing practice scene. Words reveal one by one with staggered animation. A central microphone icon pulses slowly during VO playback (blue), then transitions to a faster pulse (green) when the VO completes, signaling it's the user's turn. A progress bar fills across the bottom, and a "Speak Now" badge appears on user turn. Designed as a transparent overlay for any background.

**Visual Characteristics**

- Style: Clean, focused, educational
- Motion: Smooth entry fade + translateY, staggered word reveal, mic pulse with scale breathing
- Texture: Colored mic circle with glow shadow
- Depth: Transparent overlay for background composition

**Metadata**

```json
{
  "mood": ["focused", "calm", "motivating", "structured"],
  "theme": ["education", "language", "practice", "tutorial"],
  "energy": "medium",
  "colorTemp": "neutral-cool",
  "formality": "structured",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "audioSrc": "...",
  "durationInFrames": 360,
  "phrase": "The quick brown fox jumps over the lazy dog",
  "phraseIndex": 1,
  "phraseTotal": 6,
  "voDurationInFrames": 252
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
| ------- | ------------------ | ----- |
| `beginner-phrases` | Slower reveal, larger text | `{ phrase: "Hello, how are you?" }` |
| `advanced-shadowing` | Longer phrases, more dots | `{ phrase: "The intricate patterns of neural networks...", phraseTotal: 10 }` |
| `quick-practice` | Short duration, minimal dots | `{ durationInFrames: 180, phraseTotal: 3 }` |

**When to Use**

- Language learning apps with listen-and-repeat exercises
- Pronunciation practice videos
- Any interactive audio-visual drill requiring VO+user turn states
- Educational content with timed speaking prompts

**When NOT to Use**

- When text must appear all at once (use a text preset instead)
- Non-audio contexts where progress bar alone isn't meaningful
- When background is too bright/full — the white text needs contrast

**Composition Example**

```tsx
import { ShadowingScene } from "./shared/presets/misc";

<YourBackground>
  <ShadowingScene
    audioSrc={staticFile("phrase-01.mp3")}
    durationInFrames={360}
    phrase="The quick brown fox jumps over the lazy dog"
    phraseIndex={1}
    phraseTotal={6}
    voDurationInFrames={252}
  />
</YourBackground>
```

### EchoRepeatScene

**ID**: `EchoRepeatScene`
**Export**: `src/shared/presets/misc`

**Description**
Echo-driven repeat-after-me scene. Words appear with ghost trail copies that fade and blur behind the main text, creating a hypnotic echo effect. Concentric ripple rings pulse outward from the central mic icon. Purple accent during VO, green on user turn. For rhythmic, repetitive language drills.

**Visual Characteristics**

- Style: Hypnotic, dreamy, rhythmic
- Motion: Word reveal with blurred echo trails (2-3 copies), ripple rings breathing, staggered entry
- Texture: Blurred ghost text copies, expanding ring borders
- Depth: Transparent overlay with spatial echo layers

**Metadata**

```json
{
  "mood": ["hypnotic", "rhythmic", "dreamy", "contemplative"],
  "theme": ["language", "meditation", "rhythm", "echo"],
  "energy": "low-to-medium",
  "colorTemp": "cool",
  "formality": "casual",
  "complexity": "medium",
  "readability": "high"
}
```

**Default Props**

```json
{
  "audioSrc": "...",
  "durationInFrames": 360,
  "echoCount": 3,
  "phrase": "Every sunset brings the promise of a new dawn",
  "phraseIndex": 1,
  "phraseTotal": 6,
  "voDurationInFrames": 252
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
| ------- | ------------------ | ----- |
| `meditation-mantra` | Deep echo, slow reveal | `{ echoCount: 5 }` |
| `quick-echo` | Single echo, fast pace | `{ echoCount: 1, durationInFrames: 180 }` |
| `dramatic-reveal` | Long trails, slow words | `{ echoCount: 4, phrase: "Everything... changes..." }` |

**When to Use**

- Echo-based listen-and-repeat language exercises
- Meditative or rhythmic speech patterns
- Hypnotic visual effect for mantra/chant content
- Content where trailing echoes reinforce memory

**When NOT to Use**

- Fast-paced content where echo trails distract
- Very short phrases (echoes bunch up visually)
- Text-heavy content needing clean readability

**Composition Example**

```tsx
import { EchoRepeatScene } from "./shared/presets/misc";

<YourBackground>
  <EchoRepeatScene
    audioSrc={staticFile("echo-phrase.mp3")}
    durationInFrames={360}
    echoCount={3}
    phrase="Every sunset brings the promise of a new dawn"
    phraseIndex={1}
    phraseTotal={6}
    voDurationInFrames={252}
  />
</YourBackground>
```

### PronunciationDrillScene

**ID**: `PronunciationDrillScene`
**Export**: `src/shared/presets/misc`

**Description**
Pronunciation drill scene with phonetic guides. Each word reveals with its romanized pronunciation displayed below in italic. Amber/gold accent during VO study phase transitions to green for practice phase. The phonetic guides appear staggered with their parent words, creating a layered learning view. Ideal for language pronunciation practice.

**Visual Characteristics**

- Style: Academic, precise, warm
- Motion: Parent word + phonetic guide paired stagger, smooth slide-in, pulse circle
- Texture: Italic subscript guides beneath bold words
- Depth: Transparent overlay, layered word+guide pairs

**Metadata**

```json
{
  "mood": ["precise", "studious", "warm", "academic"],
  "theme": ["education", "language", "phonetics", "pronunciation"],
  "energy": "medium",
  "colorTemp": "warm",
  "formality": "formal",
  "complexity": "medium",
  "readability": "very-high"
}
```

**Default Props**

```json
{
  "audioSrc": "...",
  "durationInFrames": 360,
  "phrase": "She sells seashells by the seashore",
  "phraseIndex": 1,
  "phraseTotal": 6,
  "pronunciations": ["SHEE", "SELZ", "SEE-shelz", "BAHY", "the", "SEE-shawr"],
  "voDurationInFrames": 252
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
| ------- | ------------------ | ----- |
| `ipa-phonetics` | Use IPA symbols in guides | `{ pronunciations: ["/ˈʃæd.oʊ/", "/ˈpræk.tɪs/"] }` |
| `syllable-drill` | Emphasize syllable breaks | `{ pronunciations: ["SHA", "dow", "ing"], phrase: "SHADOWING" }` |
| `minimal-pairs` | Contrastive pronunciation | `{ phrase: "ship sheep", pronunciations: ["/ʃɪp/", "/ʃiːp/"] }` |

**When to Use**

- Language pronunciation training videos
- Phonetics and accent reduction content
- Minimal pair drills for language learners
- Academic ESL/EFL content

**When NOT to Use**

- When pronunciation guides aren't needed
- Quick-reference text (guides add visual weight)
- Non-language contexts where romanization seems out of place

**Composition Example**

```tsx
import { PronunciationDrillScene } from "./shared/presets/misc";

<YourBackground>
  <PronunciationDrillScene
    audioSrc={staticFile("tongue-twister.mp3")}
    durationInFrames={360}
    phrase="She sells seashells by the seashore"
    phraseIndex={1}
    phraseTotal={6}
    pronunciations={["SHEE", "SELZ", "SEE-shelz", "BAHY", "the", "SEE-shawr"]}
    voDurationInFrames={252}
  />
</YourBackground>
```

### KaraokeShadowScene

**ID**: `KaraokeShadowScene`
**Export**: `src/shared/presets/misc`

**Description**
Karaoke-style follow-along scene. Words reveal with a gradient sweep highlight effect that fills each word from left to right. A waveform equalizer of animated bars sits above the progress bar, pulsing gently during VO (pink) and more vigorously on user turn (green). Designed for sing-along, chant-along, or energetic repetition exercises.

**Visual Characteristics**

- Style: Energetic, vibrant, musical
- Motion: Gradient sweep highlight per word, waveform bars bouncing, mic pulse, progress bar slide
- Texture: Color sweep gradients, animated equalizer bars, glow shadow on mic
- Depth: Transparent overlay with stacked visualizer + progress elements

**Metadata**

```json
{
  "mood": ["energetic", "vibrant", "festive", "playful"],
  "theme": ["music", "karaoke", "sing-along", "performance"],
  "energy": "high",
  "colorTemp": "warm-vibrant",
  "formality": "casual",
  "complexity": "medium-high",
  "readability": "high"
}
```

**Default Props**

```json
{
  "audioSrc": "...",
  "durationInFrames": 360,
  "phrase": "We are the champions my friend",
  "phraseIndex": 1,
  "phraseTotal": 6,
  "voDurationInFrames": 252,
  "waveformBars": 16,
  "waveformColor": "#ec4899"
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
| ------- | ------------------ | ----- |
| `club-karaoke` | More bars, neon color | `{ waveformBars: 24, waveformColor: "#06b6d4" }` |
| `acoustic-chill` | Fewer bars, warm tone | `{ waveformBars: 8, waveformColor: "#f59e0b" }` |
| `childrens-song` | Big text, playful bars | `{ phrase: "Twinkle twinkle little star", waveformBars: 12 }` |

**When to Use**

- Karaoke-style sing-along content
- Music video overlays with lyrics reveal
- Energetic chant or mantra repetition
- Performance or talent show content

**When NOT to Use**

- Quiet, minimal content (waveform bars may feel busy)
- Very long phrases (gradient sweep loses impact)
- Corporate/academic contexts (too playful)

**Composition Example**

```tsx
import { KaraokeShadowScene } from "./shared/presets/misc";

<YourBackground>
  <KaraokeShadowScene
    audioSrc={staticFile("song-verse.mp3")}
    durationInFrames={360}
    phrase="We are the champions my friend"
    phraseIndex={1}
    phraseTotal={6}
    voDurationInFrames={252}
    waveformBars={16}
    waveformColor="#ec4899"
  />
</YourBackground>
```

## Future Presets (Planned)

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
