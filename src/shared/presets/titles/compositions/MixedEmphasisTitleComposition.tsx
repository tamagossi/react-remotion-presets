import React from "react";

import { AbsoluteFill } from "remotion";

import { MixedEmphasisTitle, type MixedEmphasisTitleProps } from "../MixedEmphasisTitle";
import { useAnton } from "../../../hooks/useAnton";

export const MixedEmphasisTitleComposition: React.FC<MixedEmphasisTitleProps> = ({
	segments = [
		{ fontSize: 96, text: "KNOWLEDGE" },
		{ color: "#a0a0a0", fontSize: 72, fontStyle: "italic", text: "IS" },
		{ fontSize: 96, text: "POWER" },
	],
	...props
}) => {
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
			<MixedEmphasisTitle segments={segments} {...props} />
		</AbsoluteFill>
	);
};
