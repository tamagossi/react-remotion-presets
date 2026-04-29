import React from "react";

import {
	DotScatterChart,
	type DotScatterChartProps,
} from "../DotScatterChart";

export const DotScatterChartComposition: React.FC<DotScatterChartProps> = (
	props,
) => {
	return (
		<DotScatterChart {...props}>
			<div />
		</DotScatterChart>
	);
};
