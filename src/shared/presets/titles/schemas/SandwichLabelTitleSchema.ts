import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const SandwichLabelTitleSchema = z.object({
	animationDuration: z.number().optional(),
	bottomText: z.string(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	fontFamily: z.string().optional(),
	fontSize: z.number().optional(),
	fontStyle: z.string().optional(),
	fontWeight: z.number().optional(),
	gap: z.number().optional(),
	holdDuration: z.number().optional(),
	label: z.string(),
	labelColor: zColor().optional(),
	labelFontSize: z.number().optional(),
	labelFontWeight: z.number().optional(),
	labelLetterSpacing: z.number().optional(),
	startFrame: z.number().optional(),
	textColor: zColor().optional(),
	textTransform: z.enum(["capitalize", "lowercase", "none", "uppercase"]).optional(),
	topText: z.string(),
});
