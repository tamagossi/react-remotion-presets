import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const StrikethroughBadgeTitleSchema = z.object({
	animationDirection: z.enum(["down", "left", "right", "up"]).optional(),
	animationDuration: z.number().optional(),
	badge: z.string().optional(),
	badgeColor: zColor().optional(),
	badgeFontSize: z.number().optional(),
	badgePaddingX: z.number().optional(),
	badgePaddingY: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	fontFamily: z.string().optional(),
	lineColor: zColor().optional(),
	lines: z.array(z.string()),
	lineThickness: z.number().optional(),
	secondaryFontFamily: z.string().optional(),
	showExitAnimation: z.boolean().optional(),
	startFrame: z.number().optional(),
	textColor: zColor().optional(),
	textFontSize: z.number().optional(),
	textFontWeight: z.number().optional(),
	textLetterSpacing: z.number().optional(),
});