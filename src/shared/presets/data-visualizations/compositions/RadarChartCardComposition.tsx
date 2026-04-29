import React from "react";

import { AbsoluteFill } from "remotion";

import { RadarChartCard, type RadarChartCardProps } from "../RadarChartCard";

export const RadarChartCardComposition: React.FC<RadarChartCardProps> = (props) => {
	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: props.theme === "light" ? "#f5f5f5" : "#0a0a0a",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<RadarChartCard {...props} />
		</AbsoluteFill>
	);
};
