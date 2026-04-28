import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const GiantInitialTitleSchema = z.object({
	animationDirection: z.enum(["down", "left", "right", "up"]).optional(),
	animationDuration: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	fontFamily: z.string().optional(),
	initial: z.string().optional(),
	initialColor: zColor().optional(),
	initialFontSize: z.number().optional(),
	lineColor: zColor().optional(),
	lines: z.array(z.string()),
	lineThickness: z.number().optional(),
	lineWidth: z.number().optional(),
	secondaryFontFamily: z.string().optional(),
	showExitAnimation: z.boolean().optional(),
	startFrame: z.number().optional(),
	textColor: zColor().optional(),
	textFontSize: z.number().optional(),
	textFontWeight: z.number().optional(),
	textLetterSpacing: z.number().optional(),
});