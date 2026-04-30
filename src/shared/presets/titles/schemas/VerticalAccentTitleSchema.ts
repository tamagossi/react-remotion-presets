import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const VerticalAccentTitleSchema = z.object({
  accentColor: zColor().optional(),
  accentHeight: z.number().optional(),
  accentThickness: z.number().optional(),
  animationDirection: z.enum(["down", "left", "right", "up"]).optional(),
  animationDuration: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  holdDuration: z.number().optional(),
  lines: z.array(z.string()),
  secondaryFontFamily: z.string().optional(),
  smallTextColor: zColor().optional(),
  smallTextFontSize: z.number().optional(),
  smallTextLetterSpacing: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  textFontSize: z.number().optional(),
  textFontWeight: z.number().optional(),
  textLetterSpacing: z.number().optional(),
});
