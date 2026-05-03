import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const DotScatterChartSchema = z.object({
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  dotRadius: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fontFamily: z.string().optional(),
  showAxisLabels: z.boolean().optional(),
  showCard: z.boolean().optional(),
  showGrid: z.boolean().optional(),
  showLabels: z.boolean().optional(),
  theme: z.record(z.string(), z.string()).optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
  xAxisLabel: z.string().optional(),
  yAxisLabel: z.string().optional(),
  data: z.array(
    z.object({
      color: zColor().optional(),
      label: z.string(),
      secondaryValue: z.number().optional(),
      value: z.number(),
    }),
  ),
});
