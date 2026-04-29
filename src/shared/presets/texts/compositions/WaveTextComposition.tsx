import React from "react";

import { AbsoluteFill } from "remotion";

import { WaveText, type WaveTextProps } from "../WaveText";
import { useAnton } from "../../../../shared/hooks/useAnton";

export const WaveTextComposition: React.FC<WaveTextProps> = (props) => {
	useAnton();
	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: "#0a0a0a",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<WaveText {...props} />
		</AbsoluteFill>
	);
};
