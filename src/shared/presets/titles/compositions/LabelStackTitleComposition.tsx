import React from "react";

import { AbsoluteFill } from "remotion";

import { LabelStackTitle, type LabelStackTitleProps } from "../LabelStackTitle";
import { useAnton } from "../../../hooks/useAnton";

export const LabelStackTitleComposition: React.FC<LabelStackTitleProps> = ({
	lines = ["TITLES KIT", "DYNAMIC"],
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
			<LabelStackTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};
