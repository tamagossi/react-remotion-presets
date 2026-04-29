import React from "react";

import { StackedBarChart, type StackedBarChartProps } from "..";

export const StackedBarChartComposition: React.FC<StackedBarChartProps> = (
	props,
) => {
	return (
		<StackedBarChart
			{...props}
			subtitle="Total sales for current year"
			title="YOUR TEXT"
			yMax={55}
			data={[
				{ label: "Mon", secondaryValue: 15, value: 48 },
				{ label: "Tue", secondaryValue: 18, value: 45 },
				{ label: "Wed", secondaryValue: 22, value: 42 },
				{ label: "Thu", secondaryValue: 25, value: 38 },
				{ label: "Fri", secondaryValue: 28, value: 34 },
				{ label: "Sat", secondaryValue: 20, value: 30 },
				{ label: "Sun", secondaryValue: 16, value: 26 },
			]}
		/>
	);
};
