import React from "react";

import {
	AreaChartGlow,
	type AreaChartGlowProps,
} from "../AreaChartGlow";

export const AreaChartGlowComposition: React.FC<AreaChartGlowProps> = (
	props,
) => {
	return (
		<AreaChartGlow {...props}>
			<div />
		</AreaChartGlow>
	);
};
