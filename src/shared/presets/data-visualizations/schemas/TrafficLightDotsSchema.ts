import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const TrafficLightDotsSchema = z.object({
  activeIndex: z.number().optional(),
  animationDuration: z.number().optional(),
  backgroundColor: zColor().optional(),
  cardBackgroundColor: zColor().optional(),
  cardBorderRadius: z.number().optional(),
  cardPadding: z.number().optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  fontFamily: z.string().optional(),
  showCard: z.boolean().optional(),
  showStatusCaption: z.boolean().optional(),
  showTrack: z.boolean().optional(),
  subtitle: z.string().optional(),
  subtitleColor: zColor().optional(),
  theme: z.record(z.string(), z.string()).optional(),
  title: z.string().optional(),
  titleColor: zColor().optional(),
  dots: z.array(
    z.object({
      color: zColor(),
      label: z.string().optional(),
    }),
  ),
});
