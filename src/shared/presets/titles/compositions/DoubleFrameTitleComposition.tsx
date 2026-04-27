import React from "react";

import { AbsoluteFill } from "remotion";

import {
	DoubleFrameTitle,
	type DoubleFrameTitleProps,
} from "../DoubleFrameTitle";
import { useOswald } from "../../../hooks/useOswald";
import { useMontserrat } from "../../../hooks/useMontserrat";

export const DoubleFrameTitleComposition: React.FC<DoubleFrameTitleProps> = ({
	lines = ["DOUBLE FRAME"],
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
			<DoubleFrameTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};