import { z } from "zod";

export const PronunciationDrillSceneSchema = z.object({
  audioSrc: z.string(),
  durationInFrames: z.number(),
  phrase: z.string(),
  phraseIndex: z.number(),
  phraseTotal: z.number().optional(),
  pronunciations: z.array(z.string()),
  voDurationInFrames: z.number().optional(),
});
