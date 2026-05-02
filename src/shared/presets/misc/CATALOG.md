# Misc Presets Catalog

AI selection guide for `src/shared/presets/misc/`.

## Quick Selection Guide

| Script Tone | Mood | Energy | Color Temp | Formality | Recommended Preset |
| ----------- | ---- | ------ | ---------- | --------- | ------------------ |
| Conversational, casual | Modern, social | Low-Medium | Cool | Casual-Professional | `ChatConversation` (glassmorphism bubbles, spring overshoot) |
| Energetic, promotional | Exciting, playful | Medium-High | Warm-Vibrant | Casual | `YouTubeSubscribeOverlay` (glass card, particle burst, subscribe action) |
| Educational, instructional | Focused, calm | Medium | Neutral-Cool | Structured | `ShadowingScene` (word reveal, mic pulse, echo trails, waveform bars, phonetic guides, progress bar) |

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
Universal language practice scene — the Swiss Army knife for listen-and-repeat exercises. Words reveal one by one with staggered animation. A central microphone icon pulses slowly during VO playback, then transitions to a faster pulse when it's the user's turn. Supports echo ghost trails (from EchoRepeatScene), pronunciation guides (from PronunciationDrillScene), waveform bars (from KaraokeShadowScene), and ripple ring animations. Fully configurable colors, custom title text, and custom mic icon.

**Visual Characteristics**

- Style: Clean, focused, educational — adapts to echo/ripple/waveform modes
- Motion: Smooth entry fade + translateY, staggered word reveal, mic pulse with scale breathing, optional ripple rings, optional echo ghost trails
- Texture: Colored mic circle with glow shadow, optional waveform equalizer bars, optional italic pronunciation guides
- Depth: Transparent overlay for background composition

**Metadata**

```json
{
  "mood": ["focused", "calm", "motivating", "structured", "hypnotic", "vibrant"],
  "theme": ["education", "language", "practice", "tutorial", "karaoke", "music", "pronunciation", "echo"],
  "energy": "low-to-high (configurable)",
  "colorTemp": "configurable",
  "formality": "structured",
  "complexity": "medium-to-high",
  "readability": "high"
}
```

**Default Props**

```json
{
  "accentColor": "#22c55e",
  "audioSrc": "...",
  "durationInFrames": 360,
  "echoCount": 0,
  "enablePronunciation": false,
  "enableWaveform": false,
  "idleColor": "#3b82f6",
  "micIconUrl": "",
  "phrase": "The quick brown fox jumps over the lazy dog",
  "phraseIndex": 1,
  "phraseTotal": 6,
  "pronunciations": [],
  "pulseNotSpeakingColor": "",
  "pulseSpeakingColor": "",
  "rippleStyle": "single",
  "sceneTitle": "Shadowing Practice",
  "voDurationInFrames": 252,
  "waveformBars": 16
}
```

**Suggested Prop Overrides by Context**

| Context | Override Rationale | Props |
| ------- | ------------------ | ----- |
| `beginner-phrases` | Slower reveal, larger text | `{ phrase: "Hello, how are you?" }` |
| `advanced-shadowing` | Longer phrases, more dots | `{ phrase: "The intricate patterns of neural networks...", phraseTotal: 10 }` |
| `quick-practice` | Short duration, minimal dots | `{ durationInFrames: 180, phraseTotal: 3 }` |
| `echo-repeat-drill` | Ghost word trails for hypnotic repetition | `{ echoCount: 3, idleColor: "#8b5cf6", rippleStyle: "ripple" }` |
| `pronunciation-drill` | Phonetic guides below each word | `{ enablePronunciation: true, pronunciations: ["SHEE", "SELZ", "SEE-shelz"], idleColor: "#f59e0b" }` |
| `karaoke-sing-along` | Waveform bars, vibrant colors | `{ enableWaveform: true, waveformBars: 16, idleColor: "#ec4899", sceneTitle: "Karaoke Shadow" }` |
| `meditation-mantra` | Deep echo, slow reveal, ripple rings | `{ echoCount: 5, rippleStyle: "ripple", idleColor: "#8b5cf6", sceneTitle: "Mantra Echo" }` |
| `corporate-training` | Subdued blue, no animations | `{ accentColor: "#3b82f6", idleColor: "#64748b" }` |

**When to Use**

- Language learning apps with listen-and-repeat exercises
- Pronunciation practice videos with phonetic guides
- Echo-based repetition drills
- Karaoke-style sing-along content
- Meditative mantra/chant content
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
    accentColor="#22c55e"
    audioSrc={staticFile("phrase-01.mp3")}
    durationInFrames={360}
    idleColor="#3b82f6"
    phrase="The quick brown fox jumps over the lazy dog"
    phraseIndex={1}
    phraseTotal={6}
    sceneTitle="Shadowing Practice"
    voDurationInFrames={252}
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
