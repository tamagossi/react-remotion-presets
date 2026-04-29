import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const CandlestickChartSchema = z.object({
	animationDuration: z.number().optional(),
	backgroundColor: zColor().optional(),
	cardBackgroundColor: zColor().optional(),
	cardBorderRadius: z.number().optional(),
	cardPadding: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	fontFamily: z.string().optional(),
	holdDuration: z.number().optional(),
	negativeColor: zColor().optional(),
	positiveColor: zColor().optional(),
	showCard: z.boolean().optional(),
	showLabels: z.boolean().optional(),
	theme: z.record(z.string(), z.string()).optional(),
	title: z.string().optional(),
	titleColor: zColor().optional(),
	data: z.array(
		z.object({
			color: zColor().optional(),
			label: z.string(),
			secondaryValue: z.number().optional(),
			value: z.number(),
		}),
	),
});
