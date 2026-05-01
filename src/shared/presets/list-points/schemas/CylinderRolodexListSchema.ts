import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const CylinderRolodexListSchema = z.object({
  animationDuration: z.number().optional(),
  dimOpacity: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.number().optional(),
  holdDuration: z.number().optional(),
  itemGap: z.number().optional(),
  items: z.array(z.string()),
  perspective: z.number().optional(),
  rotationSpeed: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  visibleCount: z.number().optional(),
  textTransform: z
    .enum(["capitalize", "lowercase", "none", "uppercase"])
    .optional(),
});
