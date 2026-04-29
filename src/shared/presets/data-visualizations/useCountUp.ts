import { Easing, interpolate } from "remotion";

export const useCountUp = (
	frame: number,
	from: number,
	to: number,
	startFrame: number,
	endFrame: number,
	easing: [number, number, number, number] = [0.16, 1, 0.3, 1],
): number => {
	const progress = interpolate(frame, [startFrame, endFrame], [0, 1], {
		easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	return from + (to - from) * progress;
};
