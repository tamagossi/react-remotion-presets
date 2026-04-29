import React from "react";

import { AbsoluteFill } from "remotion";

import {
	InlineHighlightText,
	type InlineHighlightTextProps,
} from "../InlineHighlightText";
import { useAnton } from "../../../../shared/hooks/useAnton";

export const InlineHighlightTextComposition: React.FC<
	InlineHighlightTextProps
> = (props) => {
	useAnton();
	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: "#0a0a0a",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<InlineHighlightText {...props} />
		</AbsoluteFill>
	);
};
