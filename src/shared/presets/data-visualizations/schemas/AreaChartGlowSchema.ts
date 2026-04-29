import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const AreaChartGlowSchema = z.object({
	accentLabel: z.string().optional(),
	animationDuration: z.number().optional(),
	areaColor: zColor().optional(),
	backgroundColor: zColor().optional(),
	cardBackgroundColor: zColor().optional(),
	cardBorderRadius: z.number().optional(),
	cardPadding: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	fontFamily: z.string().optional(),
	glowColor: zColor().optional(),
	holdDuration: z.number().optional(),
	showCard: z.boolean().optional(),
	suffix: z.string().optional(),
	theme: z.record(z.string(), z.string()).optional(),
	title: z.string().optional(),
	titleColor: zColor().optional(),
	totalPrefix: z.string().optional(),
	verticalLineColor: zColor().optional(),
	data: z.array(
		z.object({
			color: zColor().optional(),
			label: z.string(),
			secondaryValue: z.number().optional(),
			value: z.number(),
		}),
	),
});
