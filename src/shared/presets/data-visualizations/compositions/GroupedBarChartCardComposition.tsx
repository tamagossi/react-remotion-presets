import React from "react";

import { AbsoluteFill } from "remotion";

import { GroupedBarChartCard, type GroupedBarChartCardProps } from "../GroupedBarChartCard";

export const GroupedBarChartCardComposition: React.FC<GroupedBarChartCardProps> = (props) => {
	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: props.theme === "light" ? "#f5f5f5" : "#0a0a0a",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<GroupedBarChartCard {...props} />
		</AbsoluteFill>
	);
};
