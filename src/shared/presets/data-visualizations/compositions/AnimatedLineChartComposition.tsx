import React from "react";

import {
	AnimatedLineChart,
	type AnimatedLineChartProps,
} from "../AnimatedLineChart";

export const AnimatedLineChartComposition: React.FC<
	AnimatedLineChartProps
> = (props) => {
	return (
		<AnimatedLineChart {...props}>
			<div />
		</AnimatedLineChart>
	);
};
