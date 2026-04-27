import React from "react";

import { AbsoluteFill } from "remotion";

import {
	VerticalAccentTitle,
	type VerticalAccentTitleProps,
} from "../VerticalAccentTitle";
import { useOswald } from "../../../hooks/useOswald";
import { useMontserrat } from "../../../hooks/useMontserrat";

export const VerticalAccentTitleComposition: React.FC<
	VerticalAccentTitleProps
> = ({ lines = ["VERTICAL", "ACCENT"], ...props }) => {
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
			<VerticalAccentTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};