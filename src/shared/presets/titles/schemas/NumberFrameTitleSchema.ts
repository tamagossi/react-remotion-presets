import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const NumberFrameTitleSchema = z.object({
  animationDirection: z.enum(["down", "left", "right", "up"]).optional(),
  animationDuration: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  frameColor: zColor().optional(),
  frameSize: z.number().optional(),
  frameThickness: z.number().optional(),
  holdDuration: z.number().optional(),
  lines: z.array(z.string()),
  number: z.string().optional(),
  numberColor: zColor().optional(),
  secondaryFontFamily: z.string().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  textFontSize: z.number().optional(),
  textFontWeight: z.number().optional(),
  textLetterSpacing: z.number().optional(),
});
