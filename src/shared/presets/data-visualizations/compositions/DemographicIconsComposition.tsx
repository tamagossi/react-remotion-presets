import React from "react";

import {
	DemographicIcons,
	type DemographicIconsProps,
} from "../DemographicIcons";

export const DemographicIconsComposition: React.FC<
	DemographicIconsProps
> = (props) => {
	return (
		<DemographicIcons {...props}>
			<div />
		</DemographicIcons>
	);
};
