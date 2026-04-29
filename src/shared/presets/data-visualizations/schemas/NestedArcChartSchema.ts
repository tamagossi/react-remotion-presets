import { zColor } from "@remotion/zod-types";
import { z } from "zod";

export const NestedArcChartSchema = z.object({
	animationDuration: z.number().optional(),
	backgroundColor: zColor().optional(),
	cardBackgroundColor: zColor().optional(),
	cardBorderRadius: z.number().optional(),
	cardPadding: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	fontFamily: z.string().optional(),
	showCard: z.boolean().optional(),
	theme: z.record(z.string(), z.string()).optional(),
	title: z.string().optional(),
	titleColor: zColor().optional(),
	data: z.array(
		z.object({
			color: zColor().optional(),
			label: z.string(),
			value: z.number(),
		}),
	),
});
