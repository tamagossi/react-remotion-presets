import React from "react";

import { AbsoluteFill } from "remotion";

import { TypewriterText, type TypewriterTextProps } from "../TypewriterText";
import { useAnton } from "../../../../shared/hooks/useAnton";

export const TypewriterTextComposition: React.FC<TypewriterTextProps> = (
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
			<TypewriterText {...props} />
		</AbsoluteFill>
	);
};
