import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const GeometricMaskTitleSchema = z.object({
	animationDuration: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	fontFamily: z.string().optional(),
	fontSize: z.number().optional(),
	fontStyle: z.string().optional(),
	fontWeight: z.number().optional(),
	holdDuration: z.number().optional(),
	maskColor: zColor().optional(),
	maskWidth: z.number().optional(),
	startFrame: z.number().optional(),
	text: z.string(),
	textColor: zColor().optional(),
	textTransform: z.enum(["capitalize", "lowercase", "none", "uppercase"]).optional(),
});
