import React from "react";

import {
	RadarChart,
	type RadarChartProps,
} from "../RadarChart";

export const RadarChartComposition: React.FC<RadarChartProps> = (props) => {
	return (
		<RadarChart {...props}>
			<div />
		</RadarChart>
	);
};
