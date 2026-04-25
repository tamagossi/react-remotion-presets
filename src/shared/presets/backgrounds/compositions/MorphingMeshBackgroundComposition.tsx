import React from "react";
import { MorphingMeshBackground, type MorphingMeshBackgroundProps } from "../";

export const MorphingMeshBackgroundComposition: React.FC<MorphingMeshBackgroundProps> = (
	props
) => {
	return (
		<MorphingMeshBackground {...props}>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					height: "100%",
					color: "#ffffff",
					fontFamily: "sans-serif",
					textAlign: "center",
					padding: "0 64px",
				}}
			>
				<h1 style={{ fontSize: "72px", fontWeight: 700, margin: 0, lineHeight: 1.1 }}>
					Gradient Backgrounds
				</h1>
				<p style={{ fontSize: "24px", fontWeight: 400, marginTop: "16px", opacity: 0.8 }}>
					Fully customizable &amp; looped
				</p>
			</div>
		</MorphingMeshBackground>
	);
};
