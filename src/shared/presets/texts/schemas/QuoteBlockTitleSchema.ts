import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const QuoteBlockTitleSchema = z.object({
  align: z.enum(["center", "left", "right"]).optional(),
  animationDuration: z.number().optional(),
  attribution: z.string().optional(),
  attributionColor: zColor().optional(),
  attributionFontSize: z.number().optional(),
  chromaticAberration: z.boolean().optional(),
  chromaticOffset: z.number().optional(),
  color: zColor().optional(),
  context: z.string().optional(),
  contextColor: zColor().optional(),
  contextFontSize: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  gap: z.number().optional(),
  holdDuration: z.number().optional(),
  quote: z.string().optional(),
  quoteFontSize: z.number().optional(),
  startFrame: z.number().optional(),
  textTransform: z
    .enum(["capitalize", "lowercase", "none", "uppercase"])
    .optional(),
});
