import React from "react";

import {
	SplitPercentageDisplay,
	type SplitPercentageDisplayProps,
} from "../SplitPercentageDisplay";

export const SplitPercentageDisplayComposition: React.FC<
	SplitPercentageDisplayProps
> = (props) => {
	return (
		<SplitPercentageDisplay {...props}>
			<div />
		</SplitPercentageDisplay>
	);
};
