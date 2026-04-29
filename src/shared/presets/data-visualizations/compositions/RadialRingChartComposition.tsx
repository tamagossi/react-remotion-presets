import React from "react";

import { RadialRingChart, type RadialRingChartProps } from "..";

export const RadialRingChartComposition: React.FC<RadialRingChartProps> = (
	props,
) => {
	return (
		<RadialRingChart
			{...props}
			title="Info Elements"
			rings={[
				{ color: "#10b981", label: "Text 1", value: 85 },
				{ color: "#34d399", label: "Text 2", value: 65 },
				{ color: "#6ee7b7", label: "Text 3", value: 45 },
				{ color: "#a7f3d0", label: "Text 4", value: 30 },
			]}
		/>
	);
};
