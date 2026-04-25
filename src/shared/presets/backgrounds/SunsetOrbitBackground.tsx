import React, { useMemo } from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Easing,
} from "remotion";

export type SunsetOrbitBackgroundProps = {
	colors?: string[];
	baseColor?: string;
	blobCount?: number;
	blobSize?: number;
	blobOpacity?: number;
	animationDuration?: number;
	blurAmount?: number;
	easing?: [number, number, number, number];
	grainOpacity?: number;
	grainAmount?: number;
	children?: React.ReactNode;
};

export const SunsetOrbitBackground: React.FC<SunsetOrbitBackgroundProps> = ({
	colors = ["#ff512f", "#dd2476", "#ff9966", "#f09819"],
	baseColor = "#1a0a0a",
	blobCount = 3,
	blobSize = 1.5,
	blobOpacity = 0.4,
	animationDuration = 25,
	blurAmount = 150,
	easing = [0.37, 0, 0.63, 1],
	grainOpacity = 0.03,
	grainAmount = 0.3,
	children,
}) => {
	const frame = useCurrentFrame();
	const { width, height, fps } = useVideoConfig();

	const progress = interpolate(frame, [0, animationDuration * fps], [0, 1], {
		easing: Easing.bezier(easing[0], easing[1], easing[2], easing[3]),
		extrapolateLeft: "clamp",
		extrapolateRight: "clamp",
	});

	const blobs = [];
	for (let i = 0; i < blobCount; i++) {
		const phase = i * ((Math.PI * 2) / blobCount);
		const color = colors[i % colors.length];
		const speed = 1 + i * 0.15;
		const t = progress * Math.PI * 2 * speed + phase;

		const a = width * 0.35;
		const b = height * 0.25;
		const size = Math.min(width, height) * blobSize;

		// Figure-8 / lemniscate motion
		const cosT = Math.cos(t);
		const sinT = Math.sin(t);
		const denom = 1 + sinT * sinT;

		const x = width / 2 + (a * cosT) / denom - size / 2;
		const y = height / 2 + (b * sinT * cosT) / denom - size / 2;

		blobs.push({ x, y, color, size });
	}

	const grainPattern = useMemo(() => {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
		return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
	}, []);

	return (
		<AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
			<AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
				{blobs.map((blob, i) => (
					<div
						key={i}
						style={{
							position: "absolute",
							left: blob.x,
							top: blob.y,
							width: blob.size,
							height: blob.size,
							borderRadius: "50%",
							background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
							filter: `blur(${blurAmount}px)`,
							opacity: blobOpacity,
						}}
					/>
				))}
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					pointerEvents: "none",
					opacity: grainOpacity * grainAmount,
					backgroundImage: grainPattern,
					backgroundRepeat: "repeat",
					backgroundSize: "128px 128px",
				}}
			/>

			<AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
		</AbsoluteFill>
	);
};
