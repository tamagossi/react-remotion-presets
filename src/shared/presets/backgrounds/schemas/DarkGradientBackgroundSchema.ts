import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const DarkGradientBackgroundSchema = z.object({
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	blobCount: z.number().optional(),
	blobOpacity: z.number().optional(),
	blobSize: z.number().optional(),
	blurAmount: z.number().optional(),
	colors: z.array(zColor()).optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	vignetteStrength: z.number().optional(),
});