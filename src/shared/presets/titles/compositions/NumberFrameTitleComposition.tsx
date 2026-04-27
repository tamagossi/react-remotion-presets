import React from "react";

import { AbsoluteFill } from "remotion";

import {
	NumberFrameTitle,
	type NumberFrameTitleProps,
} from "../NumberFrameTitle";
import { useOswald } from "../../../hooks/useOswald";
import { useMontserrat } from "../../../hooks/useMontserrat";

export const NumberFrameTitleComposition: React.FC<NumberFrameTitleProps> = ({
	lines = ["FRAME TITLE"],
	...props
}) => {
	useOswald();
	useMontserrat();
	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: "#000000",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<NumberFrameTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};