import React from "react";

import {
	AbsoluteFill,
	Easing,
	interpolate,
	useCurrentFrame,
} from "remotion";

import { DataCard, type DataCardProps } from "./DataCard";

export type DataTableCardProps = Omit<
	DataCardProps,
	"children" | "metricValue"
> & {
	columns: { align?: "left" | "right"; key: string; label: string; width?: string }[];
	data: Record<string, number | string>[];
	headerColor?: string;
	metricValue?: number;
	rowGap?: number;
	showHeader?: boolean;
	showIndex?: boolean;
};

export const DataTableCard: React.FC<DataTableCardProps> = ({
	columns,
	data,
	headerColor,
	metricValue,
	rowGap = 8,
	showHeader = true,
	showIndex = true,
	...cardProps
}) => {
	const frame = useCurrentFrame();
	const tableWidth = 460;

	const headerBg = headerColor ?? (cardProps.theme === "light" ? "#f0f0f0" : "#2a2a2a");
	const textColor = cardProps.theme === "light" ? "#666666" : "#a0a0a0";
	const labelColor = cardProps.theme === "light" ? "#1a1a1a" : "#ffffff";
	const rowBg = cardProps.theme === "light" ? "#fafafa" : "#1a1a1a";
	const rowAltBg = cardProps.theme === "light" ? "#f5f5f5" : "#222222";

	const animStart = 20;

	return (
		<AbsoluteFill
			style={{
				alignItems: "center",
				background: cardProps.theme === "light" ? "#f5f5f5" : "#0a0a0a",
				display: "flex",
				justifyContent: "center",
			}}
		>
			<DataCard {...cardProps} metricValue={metricValue}>
				<div style={{ width: tableWidth }}>
					{showHeader && (
						<div
							style={{
								background: headerBg,
								borderRadius: 8,
								display: "flex",
								marginBottom: 8,
								padding: "10px 16px",
							}}
						>
							{showIndex && (
								<div
									style={{
										color: textColor,
										fontFamily: "sans-serif",
										fontSize: 11,
										fontWeight: 600,
										width: 30,
									}}
								>
									#
								</div>
								)}
							{columns.map((col) => (
								<div
									key={col.key}
									style={{
										color: textColor,
										flex: col.width ? undefined : 1,
										fontFamily: "sans-serif",
										fontSize: 11,
										fontWeight: 600,
										textAlign: col.align ?? "left",
										width: col.width,
									}}
								>
									{col.label}
								</div>
							))}
						</div>
					)}

					<div style={{ display: "flex", flexDirection: "column", gap: rowGap }}>
						{data.map((row, rowIndex) => {
							const rowDelay = animStart + rowIndex * 3;
							const rowOpacity = interpolate(frame, [rowDelay, rowDelay + 8], [0, 1], {
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							});

							const rowX = interpolate(frame, [rowDelay, rowDelay + 10], [-20, 0], {
								easing: Easing.out(Easing.quad),
								extrapolateLeft: "clamp",
								extrapolateRight: "clamp",
							});

							return (
								<div
									key={rowIndex}
									style={{
										alignItems: "center",
										background: rowIndex % 2 === 0 ? rowBg : rowAltBg,
										borderRadius: 8,
										display: "flex",
										opacity: rowOpacity,
										padding: "10px 16px",
										transform: `translateX(${rowX}px)`,
									}}
								>
									{showIndex && (
										<div
											style={{
												color: textColor,
												fontFamily: "sans-serif",
												fontSize: 11,
												fontWeight: 500,
												width: 30,
											}}
										>
											{rowIndex + 1}
										</div>
									)}
									{columns.map((col) => {
										const rawValue = row[col.key];
										const isNumber = typeof rawValue === "number";

										const countProgress = interpolate(
											frame,
											[rowDelay + 5, rowDelay + 20],
											[0, 1],
										{
											extrapolateLeft: "clamp",
											extrapolateRight: "clamp",
											easing: Easing.bezier(
												cardProps.enterEasing?.[0] ?? 0.16,
												cardProps.enterEasing?.[1] ?? 1,
												cardProps.enterEasing?.[2] ?? 0.3,
												cardProps.enterEasing?.[3] ?? 1,
											),
										},
										);
										const countValue = isNumber
											? (rawValue as number) * countProgress
											: 0;

										const displayValue = isNumber
											? countValue.toLocaleString(undefined, {
													maximumFractionDigits: 2,
													minimumFractionDigits: 0,
												})
											: rawValue;

										const isPositive =
											isNumber && rawValue > 0;
										const isNegative =
											isNumber && rawValue < 0;

										return (
											<div
												key={col.key}
												style={{
													flex: col.width ? undefined : 1,
													fontFamily: "sans-serif",
													fontSize: 12,
													fontWeight: isNumber ? 600 : 500,
													textAlign: col.align ?? "left",
													width: col.width,
													color: isPositive
														? "#22c55e"
														: isNegative
															? "#ef4444"
															: labelColor,
												}}
											>
												{displayValue}
											</div>
										);
									})}
								</div>
							);
						})}
					</div>
				</div>
			</DataCard>
		</AbsoluteFill>
	);
};
