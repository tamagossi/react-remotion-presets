import React from "react";
import {
	AbsoluteFill,
	useCurrentFrame,
	useVideoConfig,
	interpolate,
	Easing,
} from "remotion";

export type GeometricGridBackgroundProps = {
	lineColor?: string;
	baseColor?: string;
	lineOpacity?: number;
	lineWidth?: number;
	gridDensity?: number;
	perspective?: number;
	animationDuration?: number;
	easing?: [number, number, number, number];
	children?: React.ReactNode;
};

export const GeometricGridBackground: React.FC<GeometricGridBackgroundProps> = ({
	lineColor = "#4a7fcf",
	baseColor = "#060d18",
	lineOpacity = 0.6,
	lineWidth = 1,
	gridDensity = 12,
	perspective = 600,
	animationDuration = 20,
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

	const offset = progress * (height / gridDensity);

	const horizontalLines = [];
	for (let i = -2; i <= gridDensity + 2; i++) {
		const y = (i * height) / gridDensity + offset;
		horizontalLines.push(
			<line
				key={`h-${i}`}
				x1={0}
				y1={y}
				x2={width}
				y2={y}
				stroke={lineColor}
				strokeWidth={lineWidth}
				opacity={lineOpacity}
			/>
		);
	}

	const verticalLines = [];
	for (let i = 0; i <= gridDensity; i++) {
		const x = (i * width) / gridDensity;
		verticalLines.push(
			<line
				key={`v-${i}`}
				x1={x}
				y1={0}
				x2={x}
				y2={height}
				stroke={lineColor}
				strokeWidth={lineWidth}
				opacity={lineOpacity}
			/>
		);
	}

	return (
		<AbsoluteFill
			style={{
				background: baseColor,
				overflow: "hidden",
				perspective: `${perspective}px`,
			}}
		>
			<AbsoluteFill
				style={{
					pointerEvents: "none",
					transform: `rotateX(60deg) translateY(${-height * 0.3}px)`,
					transformOrigin: "center center",
				}}
			>
				<svg
					width={width}
					height={height}
					style={{ position: "absolute", top: 0, left: 0 }}
				>
					{horizontalLines}
					{verticalLines}
				</svg>
			</AbsoluteFill>

			<AbsoluteFill
				style={{
					pointerEvents: "none",
					background: `radial-gradient(ellipse at 50% 50%, ${lineColor}33 0%, transparent 70%)`,
					mixBlendMode: "screen",
				}}
			/>

			<AbsoluteFill style={{ zIndex: 10 }}>{children}</AbsoluteFill>
		</AbsoluteFill>
	);
};
