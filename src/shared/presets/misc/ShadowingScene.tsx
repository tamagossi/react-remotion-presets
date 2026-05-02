import React from "react";

import { Audio, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { MicIcon } from "./MicIcon";

export type ShadowingSceneProps = {
  audioSrc: string;
  durationInFrames: number;
  microphoneSrc?: string;
  phrase: string;
  phraseIndex: number;
  phraseTotal?: number;
  voDurationInFrames?: number;
};

export const ShadowingScene: React.FC<ShadowingSceneProps> = ({
  audioSrc,
  durationInFrames,
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

  const pulseSpeed = isVoComplete ? 0.25 : 0.15;
  const pulsePhase = Math.sin((frame - 30) * pulseSpeed) * 0.5 + 0.5;
  const pulseScale = 1 + pulsePhase * (isVoComplete ? 0.15 : 0.08);
  const pulseOpacity = isVoComplete
    ? 0.6 + pulsePhase * 0.3
    : 0.4 + pulsePhase * 0.3;

  const microphoneColor = isVoComplete ? "#22c55e" : "#3b82f6";

  const wordRevealStart = 15;

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
              color: isVoComplete ? "#22c55e" : "#64748b",
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Shadowing Practice
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
                    i + 1 <= phraseIndex ? "#3b82f6" : "#475569",
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: 140,
            justifyContent: "center",
            position: "relative",
            width: 140,
          }}
        >
          <div
            style={{
              backgroundColor: microphoneColor,
              borderRadius: "50%",
              height: 140,
              opacity: pulseOpacity,
              position: "absolute",
              transform: `scale(${pulseScale})`,
              width: 140,
            }}
          />
          <div
            style={{
              alignItems: "center",
              backgroundColor: microphoneColor,
              borderRadius: "50%",
              boxShadow: `0 8px 32px ${microphoneColor}40`,
              display: "flex",
              height: 100,
              justifyContent: "center",
              position: "absolute",
              width: 100,
            }}
          >
            <MicIcon color="#ffffff" size={50} />
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
            minHeight: 120,
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
                style={{
                  color: "#ffffff",
                  display: "inline-block",
                  fontFamily: '"Inter", sans-serif',
                  fontSize,
                  fontWeight: 600,
                  opacity: wordOpacity,
                  transform: `translateY(${wordY}px)`,
                }}
              >
                {word}
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
                backgroundColor: isVoComplete ? "#22c55e" : "#3b82f6",
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
                color: isVoComplete ? "#22c55e" : "#94a3b8",
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
                fontWeight: isVoComplete ? 700 : 500,
                letterSpacing: isVoComplete ? "0.05em" : "normal",
              }}
            >
              {isVoComplete ? "Your turn!" : "Listen and repeat..."}
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
                Speak Now
              </div>
            )}
          </div>
        </div>
      </div>

      <Audio src={audioSrc} />
    </div>
  );
};
