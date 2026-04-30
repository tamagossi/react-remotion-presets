import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const PillTagListSchema = z.object({
  animationDuration: z.number().optional(),
  borderColor: zColor().optional(),
  dimOpacity: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  focusDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.number().optional(),
  highlightBgColor: zColor().optional(),
  highlightTextColor: zColor().optional(),
  holdDuration: z.number().optional(),
  itemGap: z.number().optional(),
  items: z.array(z.string()),
  pillPaddingX: z.number().optional(),
  pillPaddingY: z.number().optional(),
  pillRadius: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  textTransform: z
    .enum(["capitalize", "lowercase", "none", "uppercase"])
    .optional(),
});
