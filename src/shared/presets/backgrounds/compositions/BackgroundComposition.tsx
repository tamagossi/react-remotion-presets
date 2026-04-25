import React from "react";
import {
	DarkGradientBackground,
	type DarkGradientBackgroundProps,
} from "..";

export const BackgroundComposition: React.FC<DarkGradientBackgroundProps> = (
	props,
) => {
	return (
		<DarkGradientBackground {...props}>
			<div
				style={{
					alignItems: "center",
					color: "white",
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
				Dark Gradient Background
			</div>
		</DarkGradientBackground>
	);
};
