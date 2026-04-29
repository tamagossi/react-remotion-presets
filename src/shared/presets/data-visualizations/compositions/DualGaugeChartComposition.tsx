import React from "react";

import {
	DualGaugeChart,
	type DualGaugeChartProps,
} from "../DualGaugeChart";

export const DualGaugeChartComposition: React.FC<DualGaugeChartProps> = (
	props,
) => {
	return (
		<DualGaugeChart {...props}>
			<div />
		</DualGaugeChart>
	);
};
