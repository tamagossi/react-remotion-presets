import React from "react";

import { AbsoluteFill } from "remotion";

import { ColorStackText, type ColorStackTextProps } from "../ColorStackText";
import { useAnton } from "../../../../shared/hooks/useAnton";

export const ColorStackTextComposition: React.FC<ColorStackTextProps> = ({
	lineColors = ["#ef4444", "#ffffff"],
	lines = ["TRUE POWER", "OF WORDS"],
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
			<ColorStackText lineColors={lineColors} lines={lines} {...props} />
		</AbsoluteFill>
	);
};
