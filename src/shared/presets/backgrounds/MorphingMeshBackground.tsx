import React, { useMemo } from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Easing,
} from "remotion";

export type MorphingMeshBackgroundProps = {
	colors?: string[];
	baseColor?: string;
	blobCount?: number;
	blobSize?: number;
	blobOpacity?: number;
	animationDuration?: number;
	blobStagger?: number;
	morphStiffness?: number;
	driftAmount?: number;
	blurAmount?: number;
	easing?: [number, number, number, number];
	grainOpacity?: number;
	grainAmount?: number;
	children?: React.ReactNode;
};

function hexToRgb(hex: string): [number, number, number] {
	const clean = hex.replace("#", "");
	const bigint = parseInt(clean, 16);
	return [
		(bigint >> 16) & 255,
		(bigint >> 8) & 255,
		bigint & 255,
	];
}

function rgbToHex(r: number, g: number, b: number): string {
	return `#${[r, g, b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`;
}

function lerpColor(a: string, b: string, t: number): string {
	const [r1, g1, b1] = hexToRgb(a);
	const [r2, g2, b2] = hexToRgb(b);
	return rgbToHex(
		r1 + (r2 - r1) * t,
		g1 + (g2 - g1) * t,
		b1 + (b2 - b1) * t
	);
}

export const MorphingMeshBackground: React.FC<MorphingMeshBackgroundProps> = ({
	colors = ["#4a00e0", "#8e2de2", "#da22ff", "#1fddff", "#ff006e"],
	baseColor = "#0a0a1a",
	blobCount = 5,
	blobSize = 1.2,
	blobOpacity = 0.5,
	animationDuration = 20,
	blobStagger = 0.8,
	morphStiffness = 1.0,
	driftAmount = 0.6,
	blurAmount = 120,
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
		const phase = i * blobStagger;
		const speed = 1 + i * 0.12;
		const t = progress * Math.PI * 2 * speed + phase;

		const radiusX = width * driftAmount * (0.6 + (i % 3) * 0.2);
		const radiusY = height * driftAmount * (0.5 + (i % 2) * 0.25);

		const x = width / 2 + radiusX * Math.sin(t * 0.7 + phase) - (Math.min(width, height) * blobSize) / 2;
		const y = height / 2 + radiusY * Math.sin(t * 0.9 + phase * 1.3) - (Math.min(width, height) * blobSize) / 2;

		const scale = 1 + Math.sin(t * 1.2 + phase) * 0.3 * morphStiffness;
		const size = Math.min(width, height) * blobSize * scale;

		const colorIndex = (i + progress * colors.length) % colors.length;
		const colorA = colors[Math.floor(colorIndex) % colors.length];
		const colorB = colors[Math.ceil(colorIndex) % colors.length];
		const colorT = colorIndex - Math.floor(colorIndex);
		const color = lerpColor(colorA, colorB, colorT);

		blobs.push({ x, y, color, size });
	}

	const grainPattern = useMemo(() => {
		const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(#n)"/></svg>`;
		return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
	}, []);

	return (
		<AbsoluteFill style={{ background: baseColor, overflow: "hidden" }}>
			<AbsoluteFill style={{ mixBlendMode: "soft-light", pointerEvents: "none" }}>
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
