import React from "react";

import {
	StackedRepeatText,
	type StackedRepeatTextProps,
} from "../StackedRepeatText";

export const StackedRepeatTextComposition: React.FC<
	StackedRepeatTextProps
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
			<StackedRepeatText {...props} />
		</div>
	);
};
