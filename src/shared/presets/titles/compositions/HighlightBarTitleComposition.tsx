import React from "react";

import { AbsoluteFill } from "remotion";

import {
	HighlightBarTitle,
	type HighlightBarTitleProps,
} from "../HighlightBarTitle";
import { useAnton } from "../../../hooks/useAnton";

export const HighlightBarTitleComposition: React.FC<
	HighlightBarTitleProps
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
			<HighlightBarTitle {...props} />
		</AbsoluteFill>
	);
};
