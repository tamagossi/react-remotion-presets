import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const NumberFrameTitleSchema = z.object({
  animationDuration: z.number().optional(),
  dividerColor: zColor().optional(),
  dividerLength: z.number().optional(),
  dividerThickness: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  holdDuration: z.number().optional(),
  lines: z.array(z.string()),
  number: z.string().optional(),
  numberColor: zColor().optional(),
  numberFontSize: z.number().optional(),
  ringColor: zColor().optional(),
  ringThickness: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  textFontSize: z.number().optional(),
  textLetterSpacing: z.number().optional(),
});
