import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const OffsetFramesTitleSchema = z.object({
	animationDirection: z.enum(["down", "left", "right", "up"]).optional(),
	animationDuration: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	fontFamily: z.string().optional(),
	frame1Color: zColor().optional(),
	frame2Color: zColor().optional(),
	frameHeight: z.number().optional(),
	frameOffset: z.number().optional(),
	frameThickness: z.number().optional(),
	frameWidth: z.number().optional(),
	lines: z.array(z.string()),
	secondaryFontFamily: z.string().optional(),
	showExitAnimation: z.boolean().optional(),
	startFrame: z.number().optional(),
	subtitle: z.string().optional(),
	subtitleColor: zColor().optional(),
	subtitleFontSize: z.number().optional(),
	subtitleLetterSpacing: z.number().optional(),
	textColor: zColor().optional(),
	textFontSize: z.number().optional(),
	textFontWeight: z.number().optional(),
	textLetterSpacing: z.number().optional(),
});