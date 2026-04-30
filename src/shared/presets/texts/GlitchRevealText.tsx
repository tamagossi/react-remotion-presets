import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

const GLITCH_CHARS =
  "!@#$%^&*()_+-=[]{}|;':\",./<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export type GlitchRevealTextProps = {
  animationDuration?: number;
  chromaticOffset?: number;
  durationInFrames?: number;
  easing?: [number, number, number, number];
  exitDuration?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  glitchColor1?: string;
  glitchColor2?: string;
  holdDuration?: number;
  letterSpacing?: number;
  scrambleIntensity?: number;
  startFrame?: number;
  text: string;
  textColor?: string;
  textTransform?: "capitalize" | "lowercase" | "none" | "uppercase";
};

export const GlitchRevealText: React.FC<GlitchRevealTextProps> = ({
  animationDuration = 50,
  chromaticOffset = 8,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton",
  fontSize = 72,
  fontWeight = 400,
  glitchColor1 = "#00f0ff",
  glitchColor2 = "#ff0080",
  holdDuration = 30,
  letterSpacing = 0.02,
  scrambleIntensity = 0.8,
  startFrame = 0,
  text = "GLITCH REVEAL",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const effectiveHoldDuration =
    durationInFrames !== undefined
      ? Math.max(0, durationInFrames - animationDuration - exitDuration)
      : holdDuration;

  const chars = text.split("");
  const charCount = chars.length;
  const scrambleFrames = animationDuration * scrambleIntensity;
  const charRevealDelay = scrambleFrames / Math.max(charCount, 1);

  const exitStart = startFrame + animationDuration + effectiveHoldDuration;
  const exitEnd = exitStart + exitDuration;

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = frame >= exitStart ? exitT : 1;
  const containerX =
    frame >= exitStart ? (1 - exitT) * 20 * Math.sin(frame * 2) : 0;

  const aberrationT = interpolate(
    frame,
    [startFrame, startFrame + animationDuration * 0.4],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "row",
        opacity: containerOpacity,
        transform: `translate3d(${containerX}px, 0, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {chars.map((char, i) => {
        const revealFrame = startFrame + i * charRevealDelay;
        const isRevealed = frame >= revealFrame + charRevealDelay;
        const isScrambling = frame >= revealFrame && !isRevealed;

        const revealT = interpolate(
          frame,
          [revealFrame, revealFrame + charRevealDelay],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        let displayChar = char;
        if (isScrambling && char !== " ") {
          const seed = (frame * 7 + i * 13) % GLITCH_CHARS.length;
          displayChar = GLITCH_CHARS[seed];
        }

        const charOpacity = frame >= revealFrame ? 1 : 0;

        const glitchX = isScrambling
          ? Math.sin(frame * 3 + i * 7) * chromaticOffset * (1 - revealT)
          : 0;

        const exitCharDelay = Math.min(i * 2, Math.max(0, exitDuration - 1));
        const charExitT = interpolate(
          frame,
          [exitStart + exitCharDelay, exitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const finalOpacity =
          frame >= exitStart + exitCharDelay
            ? Math.max(charOpacity * charExitT, 0)
            : charOpacity;

        return (
          <span
            key={i}
            style={{
              color: textColor,
              display: "inline-block",
              fontFamily,
              fontSize,
              fontWeight,
              letterSpacing: `${letterSpacing}em`,
              lineHeight: 1,
              opacity: finalOpacity,
              position: "relative",
              textTransform,
              whiteSpace: "pre",
            }}
          >
            {aberrationT > 0.01 && isRevealed ? (
              <>
                <span
                  aria-hidden
                  style={{
                    color: glitchColor1,
                    left: -aberrationT * chromaticOffset,
                    mixBlendMode: "screen",
                    opacity: aberrationT * 0.7,
                    position: "absolute",
                    top: 0,
                  }}
                >
                  {char}
                </span>
                <span
                  aria-hidden
                  style={{
                    color: glitchColor2,
                    left: aberrationT * chromaticOffset,
                    mixBlendMode: "screen",
                    opacity: aberrationT * 0.7,
                    position: "absolute",
                    top: 0,
                  }}
                >
                  {char}
                </span>
              </>
            ) : null}
            <span
              style={{
                display: "inline-block",
                transform: `translate3d(${glitchX}px, 0, 0)`,
                willChange: "transform",
              }}
            >
              {displayChar}
            </span>
          </span>
        );
      })}
    </div>
  );
};
