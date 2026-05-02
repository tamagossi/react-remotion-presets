import { z } from "zod";

export const EchoRepeatSceneSchema = z.object({
  audioSrc: z.string(),
  durationInFrames: z.number(),
  echoCount: z.number().optional(),
  phrase: z.string(),
  phraseIndex: z.number(),
  phraseTotal: z.number().optional(),
  voDurationInFrames: z.number().optional(),
});
