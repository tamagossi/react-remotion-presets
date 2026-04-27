import React from "react";

import { AbsoluteFill } from "remotion";

import {
	OverlineUnderlineTitle,
	type OverlineUnderlineTitleProps,
} from "../OverlineUnderlineTitle";
import { useOswald } from "../../../hooks/useOswald";
import { useMontserrat } from "../../../hooks/useMontserrat";

export const OverlineUnderlineTitleComposition: React.FC<
	OverlineUnderlineTitleProps
> = ({ lines = ["OVERLINE"], ...props }) => {
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
			<OverlineUnderlineTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};