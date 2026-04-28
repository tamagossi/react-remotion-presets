import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const GlitchStrokeTitleSchema = z.object({
  align: z.enum(["center", "left", "right"]).optional(),
  animationDuration: z.number().optional(),
  chromaticAberration: z.boolean().optional(),
  chromaticOffset: z.number().optional(),
  color: z.union([zColor(), z.array(zColor())]).optional(),
  easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
  entranceDirection: z.enum(["down", "left", "right", "up"]).optional(),
  exitDuration: z.number().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.union([z.number(), z.array(z.number())]).optional(),
  fontWeight: z.union([z.number(), z.array(z.number())]).optional(),
  gap: z.number().optional(),
  glitchDecay: z.number().optional(),
  glitchIntensity: z.number().optional(),
  holdDuration: z.number().optional(),
  letterSpacing: z.union([z.number(), z.array(z.number())]).optional(),
  lines: z.array(z.string()),
  staggerDelay: z.number().optional(),
  startFrame: z.number().optional(),
  strokeColor: z.union([zColor(), z.array(zColor())]).optional(),
  strokeWidth: z.number().optional(),
  textTransform: z.enum(["capitalize", "lowercase", "none", "uppercase"]).optional(),
});