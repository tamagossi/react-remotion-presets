import React from "react";

import {
	DonutChartSet,
	type DonutChartSetProps,
} from "../DonutChartSet";

export const DonutChartSetComposition: React.FC<DonutChartSetProps> = (
	props,
) => {
	return (
		<DonutChartSet {...props}>
			<div />
		</DonutChartSet>
	);
};
