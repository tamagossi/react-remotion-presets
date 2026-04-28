import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const LetterSpacingRevealTitleSchema = z.object({
	animationDuration: z.number().optional(),
	divider: z.string().optional(),
	dividerColor: zColor().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	endLetterSpacing: z.number().optional(),
	exitDuration: z.number().optional(),
	fontFamily: z.string().optional(),
	fontSize: z.number().optional(),
	fontStyle: z.string().optional(),
	fontWeight: z.number().optional(),
	holdDuration: z.number().optional(),
	startFrame: z.number().optional(),
	startLetterSpacing: z.number().optional(),
	text: z.string(),
	textColor: zColor().optional(),
	textTransform: z.enum(["capitalize", "lowercase", "none", "uppercase"]).optional(),
});
