import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const DataTableCardSchema = z.object({
	animationDuration: z.number().optional(),
	badgeColor: zColor().optional(),
	badgeText: z.string().optional(),
	cardBg: zColor().optional(),
	cardBorderRadius: z.number().optional(),
	cardPadding: z.number().optional(),
	columns: z.array(z.object({ align: z.enum(["left", "right"]).optional(), key: z.string(), label: z.string(), width: z.string().optional() })),
	data: z.array(z.record(z.string(), z.union([z.number(), z.string()]))),
	enterEasing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	headerColor: zColor().optional(),
	holdDuration: z.number().optional(),
	metricLabel: z.string().optional(),
	metricPrefix: z.string().optional(),
	metricSuffix: z.string().optional(),
	metricValue: z.number().optional(),
	rowGap: z.number().optional(),
	showHeader: z.boolean().optional(),
	showIndex: z.boolean().optional(),
	staggerDelay: z.number().optional(),
	subtitle: z.string().optional(),
	theme: z.enum(["dark", "light"]).optional(),
	title: z.string().optional(),
});
