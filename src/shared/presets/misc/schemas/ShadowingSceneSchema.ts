import { z } from "zod";

export const ShadowingSceneSchema = z.object({
  audioSrc: z.string(),
  durationInFrames: z.number(),
  microphoneSrc: z.string().optional(),
  phrase: z.string(),
  phraseIndex: z.number(),
  phraseTotal: z.number().optional(),
  voDurationInFrames: z.number().optional(),
});
