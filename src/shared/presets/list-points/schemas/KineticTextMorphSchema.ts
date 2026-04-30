import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const KineticTextMorphSchema = z.object({
  animationDuration: z.number().optional(),
  dimOpacity: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.number().optional(),
  gradientColors: z.array(zColor()).optional(),
  holdDuration: z.number().optional(),
  itemGap: z.number().optional(),
  items: z.array(z.string()),
  morphBlur: z.number().optional(),
  morphDuration: z.number().optional(),
  prefixText: z.string().optional(),
  prefixTextColor: zColor().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  textTransform: z
    .enum(["capitalize", "lowercase", "none", "uppercase"])
    .optional(),
});
