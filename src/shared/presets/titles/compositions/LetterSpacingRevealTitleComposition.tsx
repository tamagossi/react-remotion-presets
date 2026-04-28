import React from "react";

import { AbsoluteFill } from "remotion";

import {
	LetterSpacingRevealTitle,
	type LetterSpacingRevealTitleProps,
} from "../LetterSpacingRevealTitle";
import { useAnton } from "../../../hooks/useAnton";

export const LetterSpacingRevealTitleComposition: React.FC<
	LetterSpacingRevealTitleProps
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
			<LetterSpacingRevealTitle {...props} />
		</AbsoluteFill>
	);
};
