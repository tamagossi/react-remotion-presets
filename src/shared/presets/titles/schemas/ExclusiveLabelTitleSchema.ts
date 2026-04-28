import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const ExclusiveLabelTitleSchema = z.object({
	accentColor: zColor().optional(),
	accentThickness: z.number().optional(),
	accentWidth: z.number().optional(),
	animationDirection: z.enum(["down", "left", "right", "up"]).optional(),
	animationDuration: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	fontFamily: z.string().optional(),
	holdDuration: z.number().optional(),
	label: z.string().optional(),
	labelColor: zColor().optional(),
	labelFontSize: z.number().optional(),
	labelLetterSpacing: z.number().optional(),
	labelTextTransform: z.enum(["capitalize", "lowercase", "none", "uppercase"]).optional(),
	lines: z.array(z.string()),
	secondaryFontFamily: z.string().optional(),
	startFrame: z.number().optional(),
	textColor: zColor().optional(),
	textFontSize: z.number().optional(),
	textFontWeight: z.number().optional(),
	textLetterSpacing: z.number().optional(),
});