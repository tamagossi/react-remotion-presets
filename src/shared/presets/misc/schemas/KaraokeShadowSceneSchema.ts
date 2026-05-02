import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const KaraokeShadowSceneSchema = z.object({
  audioSrc: z.string(),
  durationInFrames: z.number(),
  phrase: z.string(),
  phraseIndex: z.number(),
  phraseTotal: z.number().optional(),
  voDurationInFrames: z.number().optional(),
  waveformBars: z.number().optional(),
  waveformColor: zColor().optional(),
});
