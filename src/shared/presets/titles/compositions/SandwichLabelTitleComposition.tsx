import React from "react";

import { AbsoluteFill } from "remotion";

import {
	SandwichLabelTitle,
	type SandwichLabelTitleProps,
} from "../SandwichLabelTitle";
import { useAnton } from "../../../hooks/useAnton";

export const SandwichLabelTitleComposition: React.FC<
	SandwichLabelTitleProps
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
			<SandwichLabelTitle {...props} />
		</AbsoluteFill>
	);
};
