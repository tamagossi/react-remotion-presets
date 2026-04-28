import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const PaperTextureBackgroundSchema = z.object({
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	edgeBleedColor: zColor().optional(),
	edgeBleedStrength: z.number().optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	vignetteStrength: z.number().optional(),
});