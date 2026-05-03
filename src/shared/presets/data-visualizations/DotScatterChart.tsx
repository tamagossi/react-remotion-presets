import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

import { useInter } from "../../hooks";
import {
  BaseChartProps,
  ChartTheme,
  type DataPoint,
  defaultDarkTheme,
} from "./types";

export type DotScatterChartProps = BaseChartProps & {
  data: DataPoint[];
  dotRadius?: number;
  showAxisLabels?: boolean;
  showGrid?: boolean;
  showLabels?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
};

const getNiceTicks = (min: number, max: number, maxTicks = 5): number[] => {
  const range = max - min;
  if (Math.abs(range) < 1e-8) {
    return [min];
  }
  const roughStep = range / (maxTicks - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(Math.max(roughStep, 1e-10))));
  const normalized = roughStep / magnitude;
  let niceStep = magnitude;
  if (normalized >= 7) {
    niceStep = 10 * magnitude;
  } else if (normalized >= 3) {
    niceStep = 5 * magnitude;
  } else if (normalized >= 1.5) {
    niceStep = 2 * magnitude;
  }
  const niceMin = Math.floor(min / niceStep) * niceStep;
  const niceMax = Math.ceil(max / niceStep) * niceStep;
  const result: number[] = [];
  for (let v = niceMin; v <= niceMax + niceStep * 0.5; v += niceStep) {
    result.push(Math.round(v * 100) / 100);
  }
  return result;
};

const formatTick = (tick: number): string =>
  Number.isInteger(tick) ? String(tick) : tick.toFixed(1);

export const DotScatterChart: React.FC<DotScatterChartProps> = ({
  animationDuration: _animationDuration = 25,
  backgroundColor = "#0a0a14",
  cardBackgroundColor = "#141420",
  cardBorderRadius = 16,
  cardPadding = 40,
  data,
  dotRadius = 5,
  easing = [0.16, 1, 0.3, 1],
  fontFamily = "Inter",
  showAxisLabels = true,
  showCard = true,
  showGrid = true,
  showLabels = true,
  theme: themeOverride,
  title = "",
  titleColor = "#ffffff",
  xAxisLabel = "",
  yAxisLabel = "",
}) => {
  useInter();
  const frame = useCurrentFrame();
  const { durationInFrames, fps, height, width } = useVideoConfig();

  const theme: ChartTheme = { ...defaultDarkTheme, ...themeOverride };

  const validData = useMemo(
    () => data.filter((d) => d.secondaryValue !== undefined),
    [data],
  );

  const marginLeft = showAxisLabels ? 64 : 24;
  const marginRight = 24;
  const marginTop = 0;
  const marginBottom = showAxisLabels ? 48 : 24;

  const outerWidth = showCard
    ? width - 80 - cardPadding * 2
    : width - 80;
  const outerHeight = showCard
    ? height - 80 - cardPadding * 2
    : height - 80;
  const titleHeight = title ? 60 : 0;
  const svgWidth = outerWidth;
  const svgHeight = outerHeight - titleHeight;
  const chartWidth = svgWidth - marginLeft - marginRight;
  const chartHeight = svgHeight - marginTop - marginBottom;

  const scales = useMemo(() => {
    if (validData.length === 0) {
      return null;
    }

    const xValues = validData.map((d) => d.value);
    const yValues = validData.map((d) => d.secondaryValue!);

    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xRange = xMax - xMin || 1;
    const yRange = yMax - yMin || 1;
    const xPadding = xRange * 0.1;
    const yPadding = yRange * 0.1;

    const xScaleMin = xMin - xPadding;
    const xScaleMax = xMax + xPadding;
    const yScaleMin = yMin - yPadding;
    const yScaleMax = yMax + yPadding;

    const xScale = (v: number) =>
      ((v - xScaleMin) / (xScaleMax - xScaleMin)) * chartWidth;
    const yScale = (v: number) =>
      chartHeight -
      ((v - yScaleMin) / (yScaleMax - yScaleMin)) * chartHeight;

    return { xScale, xScaleMax, xScaleMin, yScale, yScaleMax, yScaleMin };
  }, [validData, chartWidth, chartHeight]);

  const ticks = useMemo(() => {
    if (!scales) {
      return { xTicks: [], yTicks: [] };
    }
    return {
      xTicks: getNiceTicks(scales.xScaleMin, scales.xScaleMax),
      yTicks: getNiceTicks(scales.yScaleMin, scales.yScaleMax),
    };
  }, [scales]);

  const exitProgress = interpolate(
    frame,
    [durationInFrames - 25, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp" },
  );

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [0, 15], [-16, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const axesOpacity = interpolate(frame, [8, 24], [0, 1], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gridOpacity = interpolate(frame, [12, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chartContent = (
    <>
      {title && (
        <div
          style={{
            color: titleColor,
            fontFamily,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.03em",
            marginBottom: 12,
            opacity: titleOpacity * exitProgress,
            textAlign: "center",
            textTransform: "uppercase",
            transform: `translateY(${titleY}px)`,
          }}
        >
          {title}
        </div>
      )}

      <svg
        height={svgHeight}
        style={{ display: "block", opacity: exitProgress }}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        width={svgWidth}
      >
        <g transform={`translate(${marginLeft}, ${marginTop})`}>
          {showGrid &&
            scales &&
            ticks.yTicks.map((tick) => (
              <line
                key={`gh-${tick}`}
                opacity={gridOpacity * 0.25}
                stroke={theme.gridColor}
                strokeWidth={0.5}
                x1={0}
                x2={chartWidth}
                y1={scales.yScale(tick)}
                y2={scales.yScale(tick)}
              />
            ))}
          {showGrid &&
            scales &&
            ticks.xTicks.map((tick) => (
              <line
                key={`gv-${tick}`}
                opacity={gridOpacity * 0.25}
                stroke={theme.gridColor}
                strokeWidth={0.5}
                x1={scales.xScale(tick)}
                x2={scales.xScale(tick)}
                y1={0}
                y2={chartHeight}
              />
            ))}

          <line
            opacity={axesOpacity}
            stroke={theme.secondaryTextColor}
            strokeWidth={1}
            x1={0}
            x2={chartWidth}
            y1={chartHeight}
            y2={chartHeight}
          />
          <line
            opacity={axesOpacity}
            stroke={theme.secondaryTextColor}
            strokeWidth={1}
            x1={0}
            x2={0}
            y1={0}
            y2={chartHeight}
          />

          {showAxisLabels &&
            scales &&
            ticks.xTicks.map((tick) => {
              const tx = scales.xScale(tick);
              return (
                <g key={`tx-${tick}`}>
                  <line
                    opacity={axesOpacity}
                    stroke={theme.secondaryTextColor}
                    strokeWidth={1}
                    x1={tx}
                    x2={tx}
                    y1={chartHeight}
                    y2={chartHeight + 4}
                  />
                  <text
                    fill={theme.secondaryTextColor}
                    fontFamily={fontFamily}
                    fontSize={10}
                    opacity={axesOpacity}
                    textAnchor="middle"
                    x={tx}
                    y={chartHeight + 16}
                  >
                    {formatTick(tick)}
                  </text>
                </g>
              );
            })}
          {showAxisLabels &&
            scales &&
            ticks.yTicks.map((tick) => {
              const ty = scales.yScale(tick);
              return (
                <g key={`ty-${tick}`}>
                  <line
                    opacity={axesOpacity}
                    stroke={theme.secondaryTextColor}
                    strokeWidth={1}
                    x1={-4}
                    x2={0}
                    y1={ty}
                    y2={ty}
                  />
                  <text
                    fill={theme.secondaryTextColor}
                    fontFamily={fontFamily}
                    fontSize={10}
                    opacity={axesOpacity}
                    textAnchor="end"
                    x={-8}
                    y={ty + 4}
                  >
                    {formatTick(tick)}
                  </text>
                </g>
              );
            })}

          {showAxisLabels && xAxisLabel && (
            <text
              fill={theme.secondaryTextColor}
              fontFamily={fontFamily}
              fontSize={11}
              fontWeight={500}
              letterSpacing="0.04em"
              opacity={axesOpacity}
              textAnchor="middle"
              x={chartWidth / 2}
              y={chartHeight + 36}
            >
              {xAxisLabel}
            </text>
          )}
          {showAxisLabels && yAxisLabel && (
            <text
              fill={theme.secondaryTextColor}
              fontFamily={fontFamily}
              fontSize={11}
              fontWeight={500}
              letterSpacing="0.04em"
              opacity={axesOpacity}
              textAnchor="middle"
              transform={`rotate(-90) translate(${-chartHeight / 2}, ${-marginLeft + 18})`}
            >
              {yAxisLabel}
            </text>
          )}

          {scales &&
            validData.map((item, i) => {
              const delay = i * 4;
              const dotProgress = spring({
                config: { damping: 10, stiffness: 120 },
                fps,
                frame: Math.max(0, frame - 20 - delay),
                from: 0,
                to: 1,
              });

              const cx = scales.xScale(item.value);
              const cy = scales.yScale(item.secondaryValue!);
              const dotColor = item.color || theme.accentColor;

              const labelOpacity = interpolate(
                frame,
                [35 + delay, 48 + delay],
                [0, 1],
                { extrapolateLeft: "clamp" },
              );

              const labelYOffset =
                i % 2 === 0 ? -dotRadius - 12 : dotRadius + 16;

              return (
                <g key={`dot-${i}`}>
                  <circle
                    cx={cx}
                    cy={cy}
                    fill="none"
                    opacity={dotProgress * 0.3}
                    r={dotRadius + 4}
                    stroke={dotColor}
                    strokeWidth={1}
                  />
                  <circle
                    cx={cx}
                    cy={cy}
                    fill={dotColor}
                    r={dotRadius}
                    style={{
                      transform: `scale(${dotProgress})`,
                      transformOrigin: `${cx}px ${cy}px`,
                    }}
                  />
                  {showLabels && (
                    <text
                      fill={theme.primaryTextColor}
                      fontFamily={fontFamily}
                      fontSize={10}
                      fontWeight={500}
                      opacity={labelOpacity * 0.9}
                      textAnchor="middle"
                      x={cx}
                      y={cy + labelYOffset}
                    >
                      {item.label}
                    </text>
                  )}
                </g>
              );
            })}
        </g>
      </svg>
    </>
  );

  if (!showCard) {
    return (
      <AbsoluteFill
        style={{
          alignItems: "center",
          backgroundColor,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 40,
        }}
      >
        {chartContent}
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        backgroundColor,
        display: "flex",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          backgroundColor: cardBackgroundColor,
          border: `1px solid ${theme.cardBorderColor}`,
          borderRadius: cardBorderRadius,
          height: height - 80,
          overflow: "hidden",
          padding: cardPadding,
          width: width - 80,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {chartContent}
        </div>
      </div>
    </AbsoluteFill>
  );
};
