import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const YouTubeSubscribeOverlaySchema = z.object({
  actionFrame: z.number().optional(),
  avatarBorderColor: zColor().optional(),
  avatarBorderWidth: z.number().optional(),
  avatarSize: z.number().optional(),
  avatarUrl: z.string().optional(),
  bellWiggleIntensity: z.number().optional(),
  cardBorderRadius: z.number().optional(),
  cardGlowColor: zColor().optional(),
  cardGlowIntensity: z.number().optional(),
  cardPadding: z.number().optional(),
  channelName: z.string().optional(),
  checkmarkColor: zColor().optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.number().optional(),
  glassBlur: z.number().optional(),
  glassOpacity: z.number().optional(),
  notificationDotColor: zColor().optional(),
  particleColor: zColor().optional(),
  particleCount: z.number().optional(),
  particleSpread: z.number().optional(),
  showLike: z.boolean().optional(),
  showNotificationDot: z.boolean().optional(),
  subscribeColor: zColor().optional(),
  subscribedColor: zColor().optional(),
  subscribedText: z.string().optional(),
  subscribeText: z.string().optional(),
  textColor: zColor().optional(),
  enterEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  exitEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  position: z
    .enum([
      "bottom-center",
      "bottom-left",
      "bottom-right",
      "center",
      "top-center",
      "top-left",
      "top-right",
    ])
    .optional(),
});
