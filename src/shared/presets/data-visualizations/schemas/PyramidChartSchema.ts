import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const PyramidChartSchema = z.object({
  animationDuration: z.number().optional(),
  arrowColor: zColor().optional(),
  arrowOpacity: z.number().optional(),
  backgroundColor: zColor().optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  labelFontSize: z.number().optional(),
  showArrow: z.boolean().optional(),
  showCard: z.boolean().optional(),
  subtitle: z.string().optional(),
  subtitleColor: zColor().optional(),
  theme: z.record(z.string(), z.string()).optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
  data: z.array(
    z.object({
      color: zColor().optional(),
      label: z.string(),
      value: z.number(),
    }),
  ),
});
