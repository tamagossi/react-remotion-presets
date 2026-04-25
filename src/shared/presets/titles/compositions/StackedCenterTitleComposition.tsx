import React from "react";

import { AbsoluteFill } from "remotion";

import {
  StackedCenterTitle,
  type StackedCenterTitleProps,
} from "../StackedCenterTitle";
import { useAnton } from "../../../hooks/useAnton";

export const StackedCenterTitleComposition: React.FC<
	StackedCenterTitleProps
> = ({
	lines = ["CREATIVE", "DESIGN", "STUDIO"],
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
			<StackedCenterTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};
