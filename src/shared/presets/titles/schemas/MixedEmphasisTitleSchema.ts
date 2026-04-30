import { z } from "zod";

import { zColor } from "@remotion/zod-types";

const SegmentSchema = z.object({
  color: zColor().optional(),
  fontSize: z.number().optional(),
  fontStyle: z.enum(["italic", "normal"]).optional(),
  fontWeight: z.number().optional(),
  letterSpacing: z.number().optional(),
  text: z.string(),
});

export const MixedEmphasisTitleSchema = z.object({
  align: z.enum(["center", "left", "right"]).optional(),
  animationDuration: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  entranceDirection: z.enum(["down", "left", "right", "up"]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  gap: z.number().optional(),
  holdDuration: z.number().optional(),
  lineGap: z.number().optional(),
  segments: z.union([z.array(SegmentSchema), z.array(z.array(SegmentSchema))]),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
  textTransform: z
    .enum(["capitalize", "lowercase", "none", "uppercase"])
    .optional(),
});
