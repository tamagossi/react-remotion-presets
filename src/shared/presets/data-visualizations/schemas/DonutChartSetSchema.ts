import { zColor } from "@remotion/zod-types";
import { z } from "zod";

export const DonutChartSetSchema = z.object({
	animationDuration: z.number().optional(),
	backgroundColor: zColor().optional(),
	cardBackgroundColor: zColor().optional(),
	cardBorderRadius: z.number().optional(),
	cardPadding: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	fontFamily: z.string().optional(),
	showCard: z.boolean().optional(),
	theme: z.record(z.string(), z.string()).optional(),
	charts: z.array(
		z.object({
			color: zColor(),
			label: z.string(),
			max: z.number(),
			value: z.number(),
		}),
	),
});
