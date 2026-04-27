import React from "react";

import { AbsoluteFill } from "remotion";

import { CardFillTitle, type CardFillTitleProps } from "../CardFillTitle";
import { useOswald } from "../../../hooks/useOswald";
import { useMontserrat } from "../../../hooks/useMontserrat";

export const CardFillTitleComposition: React.FC<CardFillTitleProps> = ({
	lines = ["CARD FILL"],
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
			<CardFillTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};