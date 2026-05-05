import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const TimelineScheduleListSchema = z.object({
  accentColor: zColor().optional(),
  backgroundColor: zColor().optional(),
  barHeight: z.number().optional(),
  enterDuration: z.number().optional(),
  enterEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  exitEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  iconColor: zColor().optional(),
  iconSize: z.number().optional(),
  itemGap: z.number().optional(),
  labelFontSize: z.number().optional(),
  markerSize: z.number().optional(),
  secondaryTextColor: zColor().optional(),
  spineWidth: z.number().optional(),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
  textColor: zColor().optional(),
  timeFontSize: z.number().optional(),
  trackColor: zColor().optional(),
  items: z.array(
    z.object({
      duration: z.string().optional(),
      icon: z.string().optional(),
      label: z.string(),
      time: z.string(),
    }),
  ),
});
