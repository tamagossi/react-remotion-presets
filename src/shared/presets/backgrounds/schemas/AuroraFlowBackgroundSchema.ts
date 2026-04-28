import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const AuroraFlowBackgroundSchema = z.object({
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	blurAmount: z.number().optional(),
	colors: z.array(zColor()).optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	flowAmount: z.number().optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	vignetteStrength: z.number().optional(),
	zoneOpacity: z.number().optional(),
	zoneSize: z.number().optional(),
});