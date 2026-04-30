import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const GroupedBarChartSchema = z.object({
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  barWidth: z.number().optional(),
  description: z.string().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  gridColor: zColor().optional(),
  groupGap: z.number().optional(),
  holdDuration: z.number().optional(),
  labelColor: zColor().optional(),
  legendStaggerDelay: z.number().optional(),
  staggerDelay: z.number().optional(),
  subtitle: z.string().optional(),
  subtitleColor: zColor().optional(),
  textColor: zColor().optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
  xLabels: z.array(z.string()),
  yMax: z.number().optional(),
  series: z.array(
    z.object({
      color: zColor(),
      name: z.string(),
      values: z.array(z.number()),
    }),
  ),
});
