import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const StackedBarChartSchema = z.object({
	animationDuration: z.number().optional(),
	backgroundColor: zColor().optional(),
	barColor: zColor().optional(),
	barWidth: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	gridColor: zColor().optional(),
	holdDuration: z.number().optional(),
	labelColor: zColor().optional(),
	secondaryColor: zColor().optional(),
	showValues: z.boolean().optional(),
	staggerDelay: z.number().optional(),
	subtitle: z.string().optional(),
	subtitleColor: zColor().optional(),
	textColor: zColor().optional(),
	title: z.string().optional(),
	titleColor: zColor().optional(),
	valueColor: zColor().optional(),
	yMax: z.number().optional(),
	data: z.array(
		z.object({
			label: z.string(),
			secondaryValue: z.number().optional(),
			value: z.number(),
		}),
	),
});
