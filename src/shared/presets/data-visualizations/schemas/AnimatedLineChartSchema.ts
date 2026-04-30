import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const AnimatedLineChartSchema = z.object({
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  dotLabels: z.boolean().optional(),
  dotStagger: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  holdDuration: z.number().optional(),
  lineColor: zColor().optional(),
  showCard: z.boolean().optional(),
  suffix: z.string().optional(),
  theme: z.record(z.string(), z.string()).optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
  totalLabel: z.string().optional(),
  totalPrefix: z.string().optional(),
  valueFormatter: z.function().optional(),
  data: z.array(
    z.object({
      color: zColor().optional(),
      label: z.string(),
      secondaryValue: z.number().optional(),
      value: z.number(),
    }),
  ),
});
