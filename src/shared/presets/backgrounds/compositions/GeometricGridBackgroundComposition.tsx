import React from "react";
import {
	GeometricGridBackground,
	type GeometricGridBackgroundProps,
} from "..";

export const GeometricGridBackgroundComposition: React.FC<GeometricGridBackgroundProps> = (
	props,
) => {
	return (
		<GeometricGridBackground {...props}>
			<div
				style={{
					alignItems: "center",
					color: "#ffffff",
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
				Geometric Grid Background
			</div>
		</GeometricGridBackground>
	);
};
