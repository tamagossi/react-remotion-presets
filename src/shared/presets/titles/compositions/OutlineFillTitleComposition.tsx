import React from "react";

import { AbsoluteFill } from "remotion";

import {
	OutlineFillTitle,
	type OutlineFillTitleProps,
} from "../OutlineFillTitle";
import { useAnton } from "../../../hooks/useAnton";

export const OutlineFillTitleComposition: React.FC<
	OutlineFillTitleProps
> = (props) => {
	useAnton();
	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: "#000000",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<OutlineFillTitle {...props} />
		</AbsoluteFill>
	);
};
