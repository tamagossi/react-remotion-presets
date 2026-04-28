import React from "react";

import { AbsoluteFill } from "remotion";

import {
	GeometricMaskTitle,
	type GeometricMaskTitleProps,
} from "../GeometricMaskTitle";
import { useAnton } from "../../../hooks/useAnton";

export const GeometricMaskTitleComposition: React.FC<
	GeometricMaskTitleProps
> = (props) => {
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
			<GeometricMaskTitle {...props} />
		</AbsoluteFill>
	);
};
