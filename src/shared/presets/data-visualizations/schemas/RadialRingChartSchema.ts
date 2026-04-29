import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const RadialRingChartSchema = z.object({
	animationDuration: z.number().optional(),
	backgroundColor: zColor().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	holdDuration: z.number().optional(),
	labelColor: zColor().optional(),
	legendGap: z.number().optional(),
	legendStaggerDelay: z.number().optional(),
	maxValue: z.number().optional(),
	ringGap: z.number().optional(),
	showLegend: z.boolean().optional(),
	staggerDelay: z.number().optional(),
	subtitle: z.string().optional(),
	subtitleColor: zColor().optional(),
	textColor: zColor().optional(),
	title: z.string().optional(),
	titleColor: zColor().optional(),
	rings: z.array(
		z.object({
			color: zColor(),
			label: z.string(),
			value: z.number(),
		}),
	),
});
