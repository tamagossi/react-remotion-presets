import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const DonutChartSchema = z.object({
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  badgeColor: zColor().optional(),
  badgeRadius: z.number().optional(),
  donutRadius: z.number().optional(),
  donutWidth: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  holdDuration: z.number().optional(),
  labelColor: zColor().optional(),
  showPercentages: z.boolean().optional(),
  staggerDelay: z.number().optional(),
  subtitle: z.string().optional(),
  subtitleColor: zColor().optional(),
  textColor: zColor().optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
  data: z.array(
    z.object({
      color: zColor(),
      label: z.string(),
      value: z.number(),
    }),
  ),
});
