import React from "react";

import {
	HorizontalBarChart,
	type HorizontalBarChartProps,
} from "../HorizontalBarChart";

export const HorizontalBarChartComposition: React.FC<
	HorizontalBarChartProps
> = (props) => {
	return (
		<HorizontalBarChart {...props}>
			<div />
		</HorizontalBarChart>
	);
};
