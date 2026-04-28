import React from "react";

import { AbsoluteFill } from "remotion";

import { GlitchStrokeTitle, type GlitchStrokeTitleProps } from "../GlitchStrokeTitle";
import { useAnton } from "../../../hooks/useAnton";

export const GlitchStrokeTitleComposition: React.FC<GlitchStrokeTitleProps> = ({
	lines = ["THE PAST IS", "NEVER DEAD"],
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
			<GlitchStrokeTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};
