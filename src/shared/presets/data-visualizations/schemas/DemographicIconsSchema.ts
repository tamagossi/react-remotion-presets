import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const DemographicIconsSchema = z.object({
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fontFamily: z.string().optional(),
  showCard: z.boolean().optional(),
  theme: z.record(z.string(), z.string()).optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
  groups: z.array(
    z.object({
      color: zColor(),
      icon: z.enum(["person", "woman"]),
      label: z.string(),
      value: z.number(),
    }),
  ),
});
