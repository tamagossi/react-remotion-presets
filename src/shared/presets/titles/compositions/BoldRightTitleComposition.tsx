import React from "react";

import { AbsoluteFill } from "remotion";

import { BoldRightTitle, type BoldRightTitleProps } from "../BoldRightTitle";
import { useAnton } from "../../../hooks/useAnton";

export const BoldRightTitleComposition: React.FC<BoldRightTitleProps> = ({
	lines = ["BOLD IDEAS", "MATTER"],
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
			<BoldRightTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};
