import React from "react";

import { AbsoluteFill } from "remotion";

import { SemiCircleGaugeCard, type SemiCircleGaugeCardProps } from "../SemiCircleGaugeCard";

export const SemiCircleGaugeCardComposition: React.FC<SemiCircleGaugeCardProps> = (props) => {
	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: props.theme === "light" ? "#f5f5f5" : "#0a0a0a",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<SemiCircleGaugeCard {...props} />
		</AbsoluteFill>
	);
};
