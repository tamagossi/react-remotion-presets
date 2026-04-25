import React from "react";

import { AbsoluteFill } from "remotion";

import {
  StackedTrioCenterTitle,
  type StackedTrioCenterTitleProps,
} from "../StackedTrioCenterTitle";
import { useAnton } from "../../../hooks/useAnton";

export const StackedTrioCenterTitleComposition: React.FC<
	StackedTrioCenterTitleProps
> = ({
	lines = ["DIGITAL", "MARKETING", "WEEK"],
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
			<StackedTrioCenterTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};
