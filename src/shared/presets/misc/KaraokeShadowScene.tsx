import React from "react";

import { Audio, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { MicIcon } from "./MicIcon";

export type KaraokeShadowSceneProps = {
  audioSrc: string;
  durationInFrames: number;
  phrase: string;
  phraseIndex: number;
  phraseTotal?: number;
  voDurationInFrames?: number;
  waveformBars?: number;
  waveformColor?: string;
};

export const KaraokeShadowScene: React.FC<KaraokeShadowSceneProps> = ({
  audioSrc,
  durationInFrames,
  phrase,
  phraseIndex,
  phraseTotal = 6,
  voDurationInFrames,
  waveformBars = 16,
  waveformColor,
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

  const accentColor = isVoComplete ? "#22c55e" : "#ec4899";
  const waveColor = waveformColor ?? accentColor;

  const pulseSpeed = isVoComplete ? 0.25 : 0.15;
  const pulsePhase = Math.sin((frame - 30) * pulseSpeed) * 0.5 + 0.5;
  const pulseScale = 1 + pulsePhase * (isVoComplete ? 0.18 : 0.1);

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
          gap: 28,
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
              color: isVoComplete ? "#22c55e" : "#ec4899",
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Karaoke Shadow
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
                    i + 1 <= phraseIndex ? "#ec4899" : "#475569",
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
              backgroundColor: accentColor,
              borderRadius: "50%",
              height: 140,
              opacity: 0.25 + pulsePhase * 0.15,
              position: "absolute",
              transform: `scale(${pulseScale})`,
              width: 140,
            }}
          />
          <div
            style={{
              alignItems: "center",
              backgroundColor: accentColor,
              borderRadius: "50%",
              boxShadow: `0 8px 32px ${accentColor}40`,
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

            const highlightProgress = interpolate(
              wordFrame,
              [3, 16],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );

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
                  position: "relative",
                  transform: `translateY(${wordY}px)`,
                }}
              >
                <span
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    background: `linear-gradient(90deg, ${accentColor} ${
                      highlightProgress * 100
                    }%, transparent ${highlightProgress * 100}%)`,
                  }}
                >
                  {word}
                </span>
              </span>
            );
          })}
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 12,
            width: 400,
          }}
        >
          <div
            style={{
              alignItems: "flex-end",
              display: "flex",
              gap: 3,
              height: 32,
              justifyContent: "center",
              width: "100%",
            }}
          >
            {Array.from({ length: waveformBars }).map((_, i) => {
              const barPhase =
                Math.sin((frame * 0.3 + i * 1.2) * pulseSpeed) * 0.5 + 0.5;
              const barHeight = isVoComplete
                ? 4 + barPhase * 28
                : 3 + barPhase * 18;
              return (
                <div
                  key={i}
                  style={{
                    backgroundColor: waveColor,
                    borderRadius: 2,
                    height: barHeight,
                    opacity: isVoComplete ? 0.7 : 0.4,
                    transition: "height 0.05s linear",
                    width: Math.max(4, 16 - i * 0.7),
                  }}
                />
              );
            })}
          </div>

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
                backgroundColor: accentColor,
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
                color: isVoComplete ? "#22c55e" : "#f472b6",
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
                fontWeight: isVoComplete ? 700 : 500,
                letterSpacing: isVoComplete ? "0.05em" : "normal",
              }}
            >
              {isVoComplete ? "Your voice" : "Follow along"}
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
                Sing Now
              </div>
            )}
          </div>
        </div>
      </div>

      <Audio src={audioSrc} />
    </div>
  );
};
