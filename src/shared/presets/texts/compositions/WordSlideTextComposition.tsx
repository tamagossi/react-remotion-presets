import React from "react";

import { AbsoluteFill } from "remotion";

import { WordSlideText, type WordSlideTextProps } from "../WordSlideText";
import { useAnton } from "../../../../shared/hooks/useAnton";

export const WordSlideTextComposition: React.FC<WordSlideTextProps> = (
	props,
) => {
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
			<WordSlideText {...props} />
		</AbsoluteFill>
	);
};
