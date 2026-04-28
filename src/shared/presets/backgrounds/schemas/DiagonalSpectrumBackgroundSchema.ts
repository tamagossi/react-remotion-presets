import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const DiagonalSpectrumBackgroundSchema = z.object({
	angleEnd: z.number().optional(),
	angleStart: z.number().optional(),
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	colors: z.array(zColor()).optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	spectrumOpacity: z.number().optional(),
	stopOffsets: z.array(z.number()).optional(),
	vignetteStrength: z.number().optional(),
});