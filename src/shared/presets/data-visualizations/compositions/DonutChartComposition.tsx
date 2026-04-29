import React from "react";

import { DonutChart, type DonutChartProps } from "..";

export const DonutChartComposition: React.FC<DonutChartProps> = (props) => {
	return (
		<DonutChart
			{...props}
			title="CREATIVE INFOGRAPHIC"
			data={[
				{ color: "#ec4899", label: "Segment A", value: 55 },
				{ color: "#a5f3fc", label: "Segment B", value: 25 },
				{ color: "#f9fafb", label: "Segment C", value: 15 },
				{ color: "#06b6d4", label: "Segment D", value: 5 },
			]}
		/>
	);
};
