import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const MorphingMeshBackgroundSchema = z.object({
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	blobCount: z.number().optional(),
	blobOpacity: z.number().optional(),
	blobSize: z.number().optional(),
	blobStagger: z.number().optional(),
	blurAmount: z.number().optional(),
	colors: z.array(zColor()).optional(),
	driftAmount: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	morphStiffness: z.number().optional(),
	vignetteStrength: z.number().optional(),
});