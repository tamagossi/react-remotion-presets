import React from "react";

import {
	LoadingProgress,
	type LoadingProgressProps,
} from "../LoadingProgress";

export const LoadingProgressComposition: React.FC<LoadingProgressProps> = (
	props,
) => {
	return (
		<LoadingProgress {...props}>
			<div />
		</LoadingProgress>
	);
};
