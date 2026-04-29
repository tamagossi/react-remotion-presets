import React from "react";

import { AbsoluteFill } from "remotion";

import { DataTableCard, type DataTableCardProps } from "../DataTableCard";

export const DataTableCardComposition: React.FC<DataTableCardProps> = (props) => {
	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: props.theme === "light" ? "#f5f5f5" : "#0a0a0a",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<DataTableCard {...props} />
		</AbsoluteFill>
	);
};
