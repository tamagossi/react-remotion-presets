import React from "react";
import {
	SunsetOrbitBackground,
	type SunsetOrbitBackgroundProps,
} from "..";

export const SunsetOrbitBackgroundComposition: React.FC<SunsetOrbitBackgroundProps> = (
	props,
) => {
	return (
		<SunsetOrbitBackground {...props}>
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
				Sunset Orbit Background
			</div>
		</SunsetOrbitBackground>
	);
};
