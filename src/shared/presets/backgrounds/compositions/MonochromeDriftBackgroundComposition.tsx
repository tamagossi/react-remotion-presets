import React from "react";
import {
	MonochromeDriftBackground,
	type MonochromeDriftBackgroundProps,
} from "..";

export const MonochromeDriftBackgroundComposition: React.FC<MonochromeDriftBackgroundProps> = (
	props,
) => {
	return (
		<MonochromeDriftBackground {...props}>
			<div
				style={{
					alignItems: "center",
					color: "#e0e0e0",
					display: "flex",
					fontFamily: "sans-serif",
					fontSize: 48,
					fontWeight: 300,
					height: "100%",
					justifyContent: "center",
					letterSpacing: "0.05em",
					textAlign: "center",
				}}
			>
				Monochrome Drift Background
			</div>
		</MonochromeDriftBackground>
	);
};
