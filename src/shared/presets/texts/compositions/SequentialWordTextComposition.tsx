import React from "react";

import { AbsoluteFill } from "remotion";

import {
	SequentialWordText,
	type SequentialWordTextProps,
} from "../SequentialWordText";
import { useAnton } from "../../../../shared/hooks/useAnton";

export const SequentialWordTextComposition: React.FC<
	SequentialWordTextProps
> = ({
	text = "THANK YOU FOR WATCHING",
	...props
}) => {
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
			<SequentialWordText text={text} {...props} />
		</AbsoluteFill>
	);
};
