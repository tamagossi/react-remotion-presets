import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const CornerGlowBackgroundSchema = z.object({
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	blurAmount: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	glowColors: z.array(zColor()).optional(),
	glowCorners: z.array(z.enum(["bl", "br", "tl", "tr"])).optional(),
	glowDrift: z.number().optional(),
	glowOpacity: z.number().optional(),
	glowSize: z.number().optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	vignetteStrength: z.number().optional(),
});