import React from "react";

import { AbsoluteFill } from "remotion";

import { ShadowDepthTitle, type ShadowDepthTitleProps } from "../ShadowDepthTitle";
import { useAnton } from "../../../hooks/useAnton";

export const ShadowDepthTitleComposition: React.FC<ShadowDepthTitleProps> = ({
	lines = ["EVOLVE", "ADAPT", "MOVE", "FORWARD"],
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
			<ShadowDepthTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};
