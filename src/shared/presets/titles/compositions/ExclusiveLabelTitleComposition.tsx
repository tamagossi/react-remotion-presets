import React from "react";

import { AbsoluteFill } from "remotion";

import {
	ExclusiveLabelTitle,
	type ExclusiveLabelTitleProps,
} from "../ExclusiveLabelTitle";
import { useOswald } from "../../../hooks/useOswald";
import { useMontserrat } from "../../../hooks/useMontserrat";

export const ExclusiveLabelTitleComposition: React.FC<
	ExclusiveLabelTitleProps
> = ({ lines = ["DYNAMIC", "TITLES"], ...props }) => {
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
			<ExclusiveLabelTitle lines={lines} {...props} />
		</AbsoluteFill>
	);
};