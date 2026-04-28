import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const PlexusNetworkBackgroundSchema = z.object({
	animationDuration: z.number().optional(),
	baseColor: zColor().optional(),
	connectionDistance: z.number().optional(),
	connectionOpacity: z.number().optional(),
	driftAmount: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	emergentShapes: z.boolean().optional(),
	grainAmount: z.number().optional(),
	grainOpacity: z.number().optional(),
	gridDensity: z.number().optional(),
	lineColor: zColor().optional(),
	lineWidth: z.number().optional(),
	nodeColor: zColor().optional(),
	nodeSize: z.number().optional(),
	pulseIntensity: z.number().optional(),
	shapeOpacity: z.number().optional(),
	vignetteStrength: z.number().optional(),
});