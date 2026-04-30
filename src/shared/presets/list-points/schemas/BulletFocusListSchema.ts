import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const BulletFocusListSchema = z.object({
  animationDuration: z.number().optional(),
  bulletColor: zColor().optional(),
  bulletLength: z.number().optional(),
  bulletThickness: z.number().optional(),
  dimOpacity: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  focusDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.number().optional(),
  holdDuration: z.number().optional(),
  itemGap: z.number().optional(),
  items: z.array(z.string()),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  textTransform: z
    .enum(["capitalize", "lowercase", "none", "uppercase"])
    .optional(),
});
