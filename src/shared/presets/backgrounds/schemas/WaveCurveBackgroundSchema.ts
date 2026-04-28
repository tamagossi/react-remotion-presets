import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const WaveCurveBackgroundSchema = z.object({
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	flowSpeed: z.number().optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	reflectedWave: z.boolean().optional(),
	vignetteStrength: z.number().optional(),
	waveAccentColor: zColor().optional(),
	waveAmplitude: z.number().optional(),
	waveBlur: z.number().optional(),
	waveColor: zColor().optional(),
	waveFrequency: z.number().optional(),
	waveOffsetY: z.number().optional(),
	waveOpacity: z.number().optional(),
});