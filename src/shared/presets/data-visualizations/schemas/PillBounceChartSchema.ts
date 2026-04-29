import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const PillBounceChartSchema = z.object({
	animationDuration: z.number().optional(),
	backgroundColor: zColor().optional(),
	ballColor: zColor().optional(),
	ballSize: z.number().optional(),
	bounceDamping: z.number().optional(),
	bounceMass: z.number().optional(),
	bounceStiffness: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	holdDuration: z.number().optional(),
	labelColor: zColor().optional(),
	pillColor: zColor().optional(),
	pillHeight: z.number().optional(),
	pillWidth: z.number().optional(),
	staggerDelay: z.number().optional(),
	subtitle: z.string().optional(),
	subtitleColor: zColor().optional(),
	textColor: zColor().optional(),
	title: z.string().optional(),
	titleColor: zColor().optional(),
	pills: z.array(
		z.object({
			color: zColor().optional(),
			label: z.string(),
			number: z.string(),
		}),
	),
});
