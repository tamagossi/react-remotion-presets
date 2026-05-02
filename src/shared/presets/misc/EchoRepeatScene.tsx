import React from "react";

import { Audio, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { MicIcon } from "./MicIcon";

export type EchoRepeatSceneProps = {
  audioSrc: string;
  durationInFrames: number;
  echoCount?: number;
  phrase: string;
  phraseIndex: number;
  phraseTotal?: number;
  voDurationInFrames?: number;
};

export const EchoRepeatScene: React.FC<EchoRepeatSceneProps> = ({
  audioSrc,
  durationInFrames,
  echoCount = 3,
  phrase,
  phraseIndex,
  phraseTotal = 6,
  voDurationInFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = phrase.split(" ");

  const wordRevealInterval = Math.max(5, 10 - Math.floor(words.length / 3));
  const fontSize = words.length <= 12 ? 42 : words.length <= 15 ? 38 : 36;

  const entryProgress = spring({
    config: { damping: 200, mass: 1, stiffness: 100 },
    fps,
    frame,
  });

  const progressBarWidth = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const voCompletionThreshold =
    voDurationInFrames !== undefined
      ? voDurationInFrames
      : durationInFrames * 0.7;
  const isVoComplete = frame >= voCompletionThreshold;

  const microphoneColor = isVoComplete ? "#22c55e" : "#8b5cf6";

  const wordRevealStart = 15;
  const echoDelay = 6;

  return (
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
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          gap: 32,
          maxWidth: 1200,
          opacity: interpolate(entryProgress, [0, 1], [0, 1]),
          transform: `translateY(${interpolate(entryProgress, [0, 1], [40, 0])}px)`,
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              color: isVoComplete ? "#22c55e" : "#a78bfa",
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Echo Repeat
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            {Array.from({ length: phraseTotal }).map((_, i) => (
              <div
                key={i}
                style={{
                  borderRadius: 4,
                  height: 8,
                  width: i + 1 === phraseIndex ? 24 : 8,
                  backgroundColor:
                    i + 1 <= phraseIndex ? "#8b5cf6" : "#475569",
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: 180,
            justifyContent: "center",
            position: "relative",
            width: 180,
          }}
        >
          {Array.from({ length: 3 }).map((_, ripple) => {
            const rippleOffset = ripple * 12;
            const ripplePhase =
              Math.sin((frame - 30 - rippleOffset) * 0.06) * 0.5 + 0.5;
            const rippleScale = 0.6 + ripplePhase * 0.6 + ripple * 0.25;
            const rippleOpacity = (0.3 - ripple * 0.08) * (0.6 + ripplePhase * 0.4);
            return (
              <div
                key={ripple}
                style={{
                  border: `2px solid ${microphoneColor}`,
                  borderRadius: "50%",
                  height: "100%",
                  opacity: rippleOpacity,
                  position: "absolute",
                  transform: `scale(${rippleScale})`,
                  width: "100%",
                }}
              />
            );
          })}
          <div
            style={{
              alignItems: "center",
              backgroundColor: microphoneColor,
              borderRadius: "50%",
              boxShadow: `0 8px 32px ${microphoneColor}40`,
              display: "flex",
              height: 80,
              justifyContent: "center",
              position: "absolute",
              width: 80,
            }}
          >
            <MicIcon color="#ffffff" size={40} />
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexWrap: "wrap",
            gap: "0 12px",
            justifyContent: "center",
            maxWidth: 1000,
            minHeight: 140,
          }}
        >
          {words.map((word, index) => {
            const wordFrame =
              frame - wordRevealStart - index * wordRevealInterval;
            const wordOpacity = interpolate(wordFrame, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const wordY = interpolate(wordFrame, [0, 8], [15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <span
                key={index}
                style={{ display: "inline-block", position: "relative" }}
              >
                {Array.from({ length: echoCount + 1 }).map((_, echoIdx) => {
                  if (echoIdx === 0) {
                    return (
                      <span
                        key={echoIdx}
                        style={{
                          color: "#ffffff",
                          fontFamily: '"Inter", sans-serif',
                          fontSize,
                          fontWeight: 600,
                          opacity: wordOpacity,
                          position: "relative",
                          transform: `translateY(${wordY}px)`,
                          zIndex: 1,
                        }}
                      >
                        {word}
                      </span>
                    );
                  }
                  const echoFrame =
                    wordFrame - echoIdx * echoDelay;
                  const echoOp = interpolate(echoFrame, [0, 8], [0, 0.15], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  const echoX = echoIdx * 6;
                  const echoBlur = interpolate(echoFrame, [0, 12], [0, 4], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  });
                  return (
                    <span
                      key={echoIdx}
                      style={{
                        color: "#ffffff",
                        filter: `blur(${echoBlur}px)`,
                        fontFamily: '"Inter", sans-serif',
                        fontSize,
                        fontWeight: 600,
                        left: 0,
                        opacity: echoOp,
                        position: "absolute",
                        top: 0,
                        transform: `translateY(${wordY}px) translateX(${echoX}px)`,
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </span>
            );
          })}
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 8,
            width: 400,
          }}
        >
          <div
            style={{
              backgroundColor: "#334155",
              borderRadius: 3,
              height: 6,
              overflow: "hidden",
              width: "100%",
            }}
          >
            <div
              style={{
                backgroundColor: microphoneColor,
                borderRadius: 3,
                height: "100%",
                width: `${progressBarWidth}%`,
              }}
            />
          </div>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: 8,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                color: microphoneColor,
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
                fontWeight: isVoComplete ? 700 : 500,
                letterSpacing: isVoComplete ? "0.05em" : "normal",
              }}
            >
              {isVoComplete ? "Say it" : "Hear it"}
            </div>
            {isVoComplete && (
              <div
                style={{
                  alignItems: "center",
                  backgroundColor: "#22c55e",
                  borderRadius: 12,
                  color: "#ffffff",
                  display: "flex",
                  fontFamily: '"Inter", sans-serif',
                  fontSize: 10,
                  fontWeight: 700,
                  height: 20,
                  justifyContent: "center",
                  padding: "0 10px",
                  textTransform: "uppercase",
                }}
              >
                Repeat
              </div>
            )}
          </div>
        </div>
      </div>

      <Audio src={audioSrc} />
    </div>
  );
};
