import React from "react";

import { Easing, interpolate, useCurrentFrame } from "remotion";

const GLITCH_CHARS =
  "!@#$%^&*()_+-=[]{}|;':\",./<>?`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export type TypewriterGlitchTextProps = {
  animationDuration?: number;
  blinkingCursor?: boolean;
  cursorColor?: string;
  cursorWidth?: number;
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

export const TypewriterGlitchText: React.FC<TypewriterGlitchTextProps> = ({
  animationDuration = 60,
  blinkingCursor = true,
  cursorColor = "#3b82f6",
  cursorWidth = 3,
  durationInFrames,
  easing = [0.16, 1, 0.3, 1],
  exitDuration = 25,
  fontFamily = "Anton, Impact, sans-serif",
  fontSize = 72,
  fontWeight = 400,
  glitchColor1 = "#00f0ff",
  glitchColor2 = "#ff0080",
  holdDuration = 20,
  letterSpacing = 0.02,
  scrambleIntensity = 0.8,
  startFrame = 0,
  text = "TYPEWRITER GLITCH",
  textColor = "#ffffff",
  textTransform = "uppercase",
}) => {
  const frame = useCurrentFrame();

  const effectiveHoldDuration =
    durationInFrames !== undefined
      ? Math.max(0, durationInFrames - animationDuration - exitDuration)
      : holdDuration;

  const chars = text.split("");
  const totalCharFrames = animationDuration;
  const charDelay = totalCharFrames / Math.max(chars.length, 1);
  const glitchFrames = exitDuration * scrambleIntensity;

  const exitStart = startFrame + animationDuration + effectiveHoldDuration;
  const exitEnd = exitStart + exitDuration;

  const exitT = interpolate(frame, [exitStart, exitEnd], [1, 0], {
    easing: Easing.bezier(...easing),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const containerOpacity = frame >= exitStart ? exitT : 1;
  const containerY = frame >= exitStart ? (1 - exitT) * 30 : 0;
  const containerX =
    frame >= exitStart ? (1 - exitT) * 20 * Math.sin(frame * 2) : 0;

  const revealedCount = Math.floor(
    interpolate(
      frame,
      [startFrame, startFrame + animationDuration],
      [0, chars.length],
      {
        easing: Easing.bezier(...easing),
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      },
    ),
  );

  const cursorVisible =
    blinkingCursor && frame >= startFrame && frame < exitStart
      ? Math.sin(((frame - startFrame) * Math.PI * 2) / 15) > 0
        ? 1
        : 0.2
      : frame >= startFrame && frame < exitStart
        ? 1
        : 0;

  const aberrationT = interpolate(
    frame,
    [exitStart, exitStart + exitDuration * 0.4],
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
        transform: `translate3d(${containerX}px, ${containerY}px, 0)`,
        willChange: "transform, opacity",
      }}
    >
      {chars.map((char, i) => {
        const isRevealed = i < revealedCount;
        const charEntryT = interpolate(
          frame,
          [startFrame + i * charDelay, startFrame + i * charDelay + 5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const isGlitching = frame >= exitStart && frame < exitEnd;
        const glitchProgress = interpolate(
          frame,
          [exitStart, exitStart + glitchFrames],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        let displayChar = char;
        if (isGlitching && char !== " ") {
          const seed = (frame * 7 + i * 13) % GLITCH_CHARS.length;
          displayChar = GLITCH_CHARS[seed];
        }

        const glitchX = isGlitching
          ? Math.sin(frame * 3 + i * 7) * 8 * (1 - glitchProgress)
          : 0;

        const charExitDelay =
          (i / Math.max(chars.length - 1, 1)) * exitDuration * 0.7;
        const charExitT = interpolate(
          frame,
          [exitStart + charExitDelay, exitEnd],
          [1, 0],
          {
            easing: Easing.bezier(...easing),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

        const finalOpacity =
          frame >= exitStart + charExitDelay
            ? Math.max(charEntryT * charExitT, 0)
            : isRevealed
              ? charEntryT
              : 0;

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
            {aberrationT > 0.01 && isGlitching ? (
              <>
                <span
                  aria-hidden
                  style={{
                    color: glitchColor1,
                    left: -aberrationT * 8,
                    mixBlendMode: "screen",
                    opacity: aberrationT * 0.7,
                    position: "absolute",
                    top: 0,
                    willChange: "opacity",
                  }}
                >
                  {char}
                </span>
                <span
                  aria-hidden
                  style={{
                    color: glitchColor2,
                    left: aberrationT * 8,
                    mixBlendMode: "screen",
                    opacity: aberrationT * 0.7,
                    position: "absolute",
                    top: 0,
                    willChange: "opacity",
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
      <span
        style={{
          backgroundColor: cursorColor,
          display: "inline-block",
          height: fontSize * 0.85,
          marginLeft: 2,
          opacity: cursorVisible,
          transform: `scaleY(${cursorVisible})`,
          width: cursorWidth,
          willChange: "opacity, transform",
        }}
      />
    </div>
  );
};
