import React from "react";

import { WiggleText, type WiggleTextProps } from "../WiggleText";

export const WiggleTextComposition: React.FC<WiggleTextProps> = (props) => {
	return (
		<div
			style={{
				alignItems: "center",
				background: "linear-gradient(135deg, #020617 0%, #0f172a 100%)",
				display: "flex",
				height: "100%",
				justifyContent: "center",
				width: "100%",
			}}
		>
			<WiggleText {...props} />
		</div>
	);
};
