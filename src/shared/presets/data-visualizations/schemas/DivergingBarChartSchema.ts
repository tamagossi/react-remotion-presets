import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const DivergingBarChartSchema = z.object({
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  barWidth: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  gridColor: zColor().optional(),
  holdDuration: z.number().optional(),
  labelColor: zColor().optional(),
  negativeColor: zColor().optional(),
  positiveColor: zColor().optional(),
  showLabels: z.boolean().optional(),
  staggerDelay: z.number().optional(),
  subtitle: z.string().optional(),
  subtitleColor: zColor().optional(),
  textColor: zColor().optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
  yMax: z.number().optional(),
  data: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
    }),
  ),
});
