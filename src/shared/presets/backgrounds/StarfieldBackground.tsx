import React, { useMemo } from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Easing,
} from "remotion";

export type StarfieldBackgroundProps = {
	starColor?: string;
	baseColor?: string;
	starCount?: number;
	starOpacity?: number;
	animationDuration?: number;
	easing?: [number, number, number, number];
	children?: React.ReactNode;
};

interface Star {
	x: number;
	y: number;
	size: number;
	depth: number;
	speed: number;
	phase: number;
}

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({
	starColor = "#ffffff",
	baseColor = "#020408",
	starCount = 120,
	starOpacity = 0.8,
	animationDuration = 30,
	easing = [0.45, 0, 0.55, 1],
	children,
}) => {
	const frame = useCurrentFrame();
	const { width, height, fps } = useVideoConfig();

	const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
		easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const stars = useMemo<Star[]>(() => {
		const result: Star[] = [];
		for (let i = 0; i < starCount; i++) {
			const seed = i * 137.508;
			result.push({
				x: (Math.sin(seed) * 0.5 + 0.5) * width,
				y: (Math.cos(seed * 1.3) * 0.5 + 0.5) * height,
				size: 1 + (Math.sin(seed * 2.7) * 0.5 + 0.5) * 2.5,
				depth: 0.2 + (Math.sin(seed * 3.1) * 0.5 + 0.5) * 0.8,
				speed: 0.3 + (Math.sin(seed * 4.3) * 0.5 + 0.5) * 1.2,
				phase: seed,
			});
		}
		return result;
	}, [starCount, width, height]);

	return (
		<AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
			<AbsoluteFill style={{ pointerEvents: "none" }}>
				{stars.map((star, i) => {
					const drift = progress * Math.PI * 2 * star.speed + star.phase;
					const x = star.x + Math.sin(drift) * 20 * star.depth;
					const y = star.y + Math.cos(drift * 0.7) * 15 * star.depth;
					const twinkle = 0.5 + Math.sin(drift * 3) * 0.5;

					return (
						<div
							key={i}
							style={{
								position: "absolute",
								left: x,
								top: y,
								width: star.size,
								height: star.size,
								borderRadius: "50%",
								background: starColor,
								opacity: starOpacity * twinkle * star.depth,
								boxShadow: `0 0 ${star.size * 2}px ${starColor}`,
							}}
						/>
					);
				})}
			</AbsoluteFill>

			<AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
		</AbsoluteFill>
	);
};
