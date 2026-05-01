import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const RadarChartCardSchema = z.object({
  animationDuration: z.number().optional(),
  badgeColor: zColor().optional(),
  badgeText: z.string().optional(),
  cardBg: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  colors: z.array(zColor()).optional(),
  exitDuration: z.number().optional(),
  fillOpacity: z.number().optional(),
  gridLines: z.boolean().optional(),
  holdDuration: z.number().optional(),
  lineWidth: z.number().optional(),
  maxValue: z.number().optional(),
  metricLabel: z.string().optional(),
  metricPrefix: z.string().optional(),
  metricSuffix: z.string().optional(),
  metricValue: z.number().optional(),
  pointRadius: z.number().optional(),
  size: z.number().optional(),
  staggerDelay: z.number().optional(),
  subtitle: z.string().optional(),
  theme: z.enum(["dark", "light"]).optional(),
  title: z.string().optional(),
  data: z.array(
    z.object({ color: zColor(), label: z.string(), value: z.number() }),
  ),
  enterEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
});
