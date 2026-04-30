import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const ControllersUnderlineTitleSchema = z.object({
  accentColor: zColor().optional(),
  accentThickness: z.number().optional(),
  animationDirection: z.enum(["down", "left", "right", "up"]).optional(),
  animationDuration: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  holdDuration: z.number().optional(),
  lines: z.array(z.string()),
  secondaryFontFamily: z.string().optional(),
  startFrame: z.number().optional(),
  subtitle: z.string().optional(),
  subtitleColor: zColor().optional(),
  subtitleFontSize: z.number().optional(),
  subtitleFontWeight: z.number().optional(),
  subtitleLetterSpacing: z.number().optional(),
  textColor: zColor().optional(),
  textFontSize: z.number().optional(),
  textFontWeight: z.number().optional(),
  textLetterSpacing: z.number().optional(),
});
