import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const ShadowingSceneSchema = z.object({
  accentColor: zColor().optional(),
  audioSrc: z.string(),
  durationInFrames: z.number(),
  echoCount: z.number().optional(),
  enablePronunciation: z.boolean().optional(),
  enableWaveform: z.boolean().optional(),
  idleColor: zColor().optional(),
  micIconUrl: z.string().optional(),
  phrase: z.string(),
  phraseIndex: z.number(),
  phraseTotal: z.number().optional(),
  pronunciations: z.array(z.string()).optional(),
  pulseNotSpeakingColor: zColor().optional(),
  pulseSpeakingColor: zColor().optional(),
  rippleStyle: z.enum(["ripple", "single"]).optional(),
  sceneTitle: z.string().optional(),
  voDurationInFrames: z.number().optional(),
  waveformBars: z.number().optional(),
});
