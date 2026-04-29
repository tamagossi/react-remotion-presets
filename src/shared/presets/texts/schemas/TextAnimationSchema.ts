import {zColor} from "@remotion/zod-types";
import {z} from "zod";

export const TextAnimationSchema = z.object({
	amplitude: z.number().optional(),
	animationDuration: z.number().optional(),
	blinkingCursor: z.boolean().optional(),
	bounceDamping: z.number().optional(),
	bounceMass: z.number().optional(),
	bounceStiffness: z.number().optional(),
	chromaticOffset: z.number().optional(),
	cursorColor: z.string().optional(),
	cursorWidth: z.number().optional(),
	damping: z.number().optional(),
	durationInFrames: z.number().optional(),
	easing: z.tuple([z.number(), z.number(), z.number(), z.number()]).optional(),
	exitDuration: z.number().optional(),
	fontFamily: z.string().optional(),
	fontSize: z.union([z.number(), z.array(z.number())]).optional(),
	fontWeight: z.union([z.number(), z.array(z.number())]).optional(),
	frequency: z.number().optional(),
	glitchColor1: z.string().optional(),
	glitchColor2: z.string().optional(),
	glitchIntensity: z.number().optional(),
	holdDuration: z.number().optional(),
	letterSpacing: z.number().optional(),
	lineColors: z.array(z.string()).optional(),
	lineGap: z.number().optional(),
	lines: z.array(z.string()).optional(),
	overshoot: z.number().optional(),
	scaleStart: z.number().optional(),
	scrambleIntensity: z.number().optional(),
	slideDistance: z.number().optional(),
	slideY: z.number().optional(),
	staggerDelay: z.number().optional(),
	startFrame: z.number().optional(),
	text: z.string().optional(),
	textColor: z.union([zColor(), z.string()]).optional(),
	waveDirection: z.enum(["center-out", "left-to-right", "right-to-left"]).optional(),
	segments: z
		.array(z.object({color: z.string().optional(), text: z.string()}))
		.optional(),
	textTransform: z
		.enum(["capitalize", "lowercase", "none", "uppercase"])
		.optional(),
});
