import React, { useMemo } from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Easing,
} from "remotion";

export type DarkGradientBackgroundProps = {
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

export const DarkGradientBackground: React.FC<DarkGradientBackgroundProps> = ({
	colors = ["#3a6fa5", "#9b59b6", "#e74c3c"],
	baseColor = "#060d18",
	blobCount = 3,
	blobSize = 1.4,
	blobOpacity = 0.6,
	animationDuration = 20,
	blurAmount = 140,
	easing = [0.45, 0, 0.55, 1],
	grainOpacity = 0.04,
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
		const angle = progress * Math.PI * 2 * speed + phase;
		const radiusX = width * 0.35;
		const radiusY = height * 0.25;
		const size = Math.min(width, height) * blobSize;

		const x = width / 2 + radiusX * Math.cos(angle) - size / 2;
		const y = height / 2 + radiusY * Math.sin(angle * 0.8) - size / 2;

		blobs.push({ x, y, color, size });
	}

	const grainPattern = useMemo(() => {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
		return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
	}, []);

	return (
		<AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
			<AbsoluteFill style={{ pointerEvents: "none" }}>
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
							background: `radial-gradient(circle, ${blob.color} 0%, transparent 90%)`,
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
