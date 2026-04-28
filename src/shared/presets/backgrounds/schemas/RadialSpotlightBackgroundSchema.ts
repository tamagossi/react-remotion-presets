import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const RadialSpotlightBackgroundSchema = z.object({
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	blurAmount: z.number().optional(),
	breatheAmount: z.number().optional(),
	driftAmount: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	spotlightColor: zColor().optional(),
	spotlightOpacity: z.number().optional(),
	spotlightSize: z.number().optional(),
	spotlightX: z.number().optional(),
	spotlightY: z.number().optional(),
	vignetteStrength: z.number().optional(),
});