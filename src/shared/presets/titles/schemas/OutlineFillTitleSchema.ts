import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const OutlineFillTitleSchema = z.object({
	animationDuration: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	fillColor: zColor().optional(),
	fontFamily: z.string().optional(),
	fontSize: z.union([z.number(), z.array(z.number())]).optional(),
	fontStyle: z.string().optional(),
	fontWeight: z.union([z.number(), z.array(z.number())]).optional(),
	gap: z.number().optional(),
	holdDuration: z.number().optional(),
	lines: z.array(z.string()),
	outlineColor: zColor().optional(),
	startFrame: z.number().optional(),
	strokeWidth: z.number().optional(),
	textTransform: z.enum(["capitalize", "lowercase", "none", "uppercase"]).optional(),
});
