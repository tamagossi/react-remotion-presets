import React from "react";

import {
	ProgressBarCard,
	type ProgressBarCardProps,
} from "../ProgressBarCard";

export const ProgressBarCardComposition: React.FC<
	ProgressBarCardProps
> = (props) => {
	return (
		<ProgressBarCard {...props}>
			<div />
		</ProgressBarCard>
	);
};
