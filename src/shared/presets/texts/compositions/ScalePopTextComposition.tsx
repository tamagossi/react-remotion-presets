import React from "react";

import { AbsoluteFill } from "remotion";

import { ScalePopText, type ScalePopTextProps } from "../ScalePopText";
import { useAnton } from "../../../../shared/hooks/useAnton";

export const ScalePopTextComposition: React.FC<ScalePopTextProps> = (props) => {
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
			<ScalePopText {...props} />
		</AbsoluteFill>
	);
};
