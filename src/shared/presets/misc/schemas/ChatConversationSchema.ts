import { z } from "zod";

import { zColor } from "@remotion/zod-types";

export const ChatConversationSchema = z.object({
  bubbleBorderRadius: z.number().optional(),
  bubbleGap: z.number().optional(),
  bubbleMaxWidth: z.number().optional(),
  bubblePadding: z.number().optional(),
  defaultBubbleColor: zColor().optional(),
  defaultTextColor: zColor().optional(),
  enterDuration: z.number().optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.number().optional(),
  fontWeight: z.number().optional(),
  glowColor: zColor().optional(),
  glowIntensity: z.number().optional(),
  position: z.enum(["center", "left", "right"]).optional(),
  staggerDelay: z.number().optional(),
  threadWidth: z.number().optional(),
  enterEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  exitEasing: z
    .tuple([z.number(), z.number(), z.number(), z.number()])
    .optional(),
  messages: z.array(
    z.object({
      bubbleColor: zColor().optional(),
      duration: z.number(),
      side: z.enum(["left", "right"]),
      text: z.string(),
      textColor: zColor().optional(),
    })
  ),
});
