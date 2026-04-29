import { useMemo } from "react";

import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const useAnimatedCounter = ({
	delay = 0,
	duration,
	end,
	springConfig,
	start = 0,
}: {
	delay?: number;
	duration: number;
	end: number;
	springConfig?: { damping: number; mass: number; stiffness: number };
	start?: number;
}) => {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();

	return useMemo(() => {
		if (springConfig) {
			return (
				start +
				(end - start) *
					spring({
						config: springConfig,
						fps,
						frame: Math.max(0, frame - delay),
						from: 0,
						to: 1,
					})
			);
		}

		return interpolate(frame, [delay, delay + duration], [start, end], {
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
	}, [delay, duration, end, fps, frame, springConfig, start]);
};

export const usePathDrawOn = ({
	delay = 0,
	duration,
	easing = Easing.out(Easing.quad),
}: {
	delay?: number;
	duration: number;
	easing?: (_input: number) => number;
}) => {
	const frame = useCurrentFrame();

	return useMemo(() => {
		return interpolate(frame, [delay, delay + duration], [0, 1], {
			easing,
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
	}, [delay, duration, easing, frame]);
};

export const useArcDraw = ({
	delay = 0,
	duration,
	easing = Easing.out(Easing.quad),
	startAngle = 0,
	sweepAngle = 360,
}: {
	delay?: number;
	duration: number;
	easing?: (_input: number) => number;
	startAngle?: number;
	sweepAngle?: number;
}) => {
	const frame = useCurrentFrame();

	return useMemo(() => {
		const progress = interpolate(frame, [delay, delay + duration], [0, 1], {
			easing,
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
		return startAngle + sweepAngle * progress;
	}, [delay, duration, easing, frame, startAngle, sweepAngle]);
};

export const useStaggeredReveal = ({
	baseDelay = 0,
	count,
	itemDuration,
	stagger,
}: {
	baseDelay?: number;
	count: number;
	itemDuration: number;
	stagger: number;
}) => {
	const frame = useCurrentFrame();

	return useMemo(() => {
		return Array.from({ length: count }, (_, i) => {
			const delay = baseDelay + i * stagger;
			return interpolate(frame, [delay, delay + itemDuration], [0, 1], {
				easing: Easing.out(Easing.quad),
				extrapolateLeft: "clamp",
				extrapolateRight: "clamp",
			});
		});
	}, [baseDelay, count, frame, itemDuration, stagger]);
};

export const useWipeReveal = ({
	delay = 0,
	direction: _direction = "left-to-right",
	duration,
}: {
	delay?: number;
	duration: number;
	direction?: "bottom-to-top" | "left-to-right" | "right-to-left" | "top-to-bottom";
}) => {
	const frame = useCurrentFrame();

	return useMemo(() => {
		return interpolate(frame, [delay, delay + duration], [0, 1], {
			easing: Easing.out(Easing.quad),
			extrapolateLeft: "clamp",
			extrapolateRight: "clamp",
		});
	}, [delay, duration, frame]);
};

export const formatNumber = (value: number, prefix = "", suffix = ""): string => {
	const formatted = value.toLocaleString("en-US", {
		maximumFractionDigits: 0,
		minimumFractionDigits: 0,
	});
	return `${prefix}${formatted}${suffix}`;
};
