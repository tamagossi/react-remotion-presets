import React from "react";

import { AbsoluteFill } from "remotion";

import { GiantInitialTitle, type GiantInitialTitleProps } from "../GiantInitialTitle";
import { useOswald } from "../../../hooks/useOswald";
import { useMontserrat } from "../../../hooks/useMontserrat";

export const GiantInitialTitleComposition: React.FC<GiantInitialTitleProps> = ({
	lines = ["GIANT INITIAL"],
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
			<GiantInitialTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};