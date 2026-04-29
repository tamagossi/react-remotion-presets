import React from "react";

import {
	CascadeLetterText,
	type CascadeLetterTextProps,
} from "../CascadeLetterText";

export const CascadeLetterTextComposition: React.FC<
	CascadeLetterTextProps
> = (props) => {
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
			<CascadeLetterText {...props} />
		</div>
	);
};
