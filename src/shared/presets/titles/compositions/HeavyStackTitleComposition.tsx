import React from "react";

import { AbsoluteFill } from "remotion";

import {
	HeavyStackTitle,
	type HeavyStackTitleProps,
} from "../HeavyStackTitle";
import { useAnton } from "../../../hooks/useAnton";

export const HeavyStackTitleComposition: React.FC<HeavyStackTitleProps> = (
	props,
) => {
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
			<HeavyStackTitle {...props} />
		</AbsoluteFill>
	);
};
