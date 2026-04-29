import React from "react";

import {
	LetterSpacingRevealText,
	type LetterSpacingRevealTextProps,
} from "../LetterSpacingRevealText";

export const LetterSpacingRevealTextComposition: React.FC<
	LetterSpacingRevealTextProps
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
			<LetterSpacingRevealText {...props} />
		</div>
	);
};
