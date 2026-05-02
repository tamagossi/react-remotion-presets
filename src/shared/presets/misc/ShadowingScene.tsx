import React from "react";

import { Audio, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

import { MicIcon } from "./MicIcon";

export type ShadowingSceneProps = {
  accentColor?: string;
  audioSrc: string;
  durationInFrames: number;
  echoCount?: number;
  enablePronunciation?: boolean;
  enableWaveform?: boolean;
  idleColor?: string;
  micIconUrl?: string;
  phrase: string;
  phraseIndex: number;
  phraseTotal?: number;
  pronunciations?: string[];
  pulseNotSpeakingColor?: string;
  pulseSpeakingColor?: string;
  rippleStyle?: "ripple" | "single";
  sceneTitle?: string;
  voDurationInFrames?: number;
  waveformBars?: number;
};

export const ShadowingScene: React.FC<ShadowingSceneProps> = ({
  accentColor = "#22c55e",
  audioSrc,
  durationInFrames,
  echoCount = 0,
  enablePronunciation = false,
  enableWaveform = false,
  idleColor = "#3b82f6",
  micIconUrl,
  phrase,
  phraseIndex,
  phraseTotal = 6,
  pronunciations = [],
  pulseNotSpeakingColor,
  pulseSpeakingColor,
  rippleStyle = "single",
  sceneTitle,
  voDurationInFrames,
  waveformBars = 16,
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

  const speakingColor = accentColor;
  const notSpeakingColor = idleColor;
  const microphoneColor = isVoComplete ? speakingColor : notSpeakingColor;

  const pulseSpeakColor = pulseSpeakingColor ?? speakingColor;
  const pulseIdleColor = pulseNotSpeakingColor ?? notSpeakingColor;
  const pulseColor = isVoComplete ? pulseSpeakColor : pulseIdleColor;

  const titleLabel = sceneTitle ?? "Shadowing Practice";

  const pulseSpeed = isVoComplete ? 0.25 : 0.15;
  const pulsePhase = Math.sin((frame - 30) * pulseSpeed) * 0.5 + 0.5;
  const pulseScale = 1 + pulsePhase * (isVoComplete ? 0.15 : 0.08);
  const pulseOpacity = isVoComplete
    ? 0.6 + pulsePhase * 0.3
    : 0.4 + pulsePhase * 0.3;

  const wordRevealStart = 15;
  const echoDelay = 6;

  const micSize = 100;

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
              color: isVoComplete ? speakingColor : notSpeakingColor,
              fontFamily: '"Inter", sans-serif',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {titleLabel}
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
                    i + 1 <= phraseIndex ? notSpeakingColor : "#475569",
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
          {rippleStyle === "ripple"
            ? Array.from({ length: 3 }).map((_, ripple) => {
                const rippleOffset = ripple * 12;
                const ripplePhase =
                  Math.sin((frame - 30 - rippleOffset) * 0.06) * 0.5 + 0.5;
                const rippleScale =
                  0.6 + ripplePhase * 0.6 + ripple * 0.25;
                const rippleOpacity =
                  (0.3 - ripple * 0.08) * (0.6 + ripplePhase * 0.4);
                return (
                  <div
                    key={ripple}
                    style={{
                      border: `2px solid ${pulseColor}`,
                      borderRadius: "50%",
                      height: "100%",
                      opacity: rippleOpacity,
                      position: "absolute",
                      transform: `scale(${rippleScale})`,
                      width: "100%",
                    }}
                  />
                );
              })
            : null}
          {rippleStyle === "single" ? (
            <div
              style={{
                backgroundColor: pulseColor,
                borderRadius: "50%",
                height: 140,
                opacity: pulseOpacity,
                position: "absolute",
                transform: `scale(${pulseScale})`,
                width: 140,
              }}
            />
          ) : null}
          <div
            style={{
              alignItems: "center",
              backgroundColor: microphoneColor,
              borderRadius: "50%",
              boxShadow: `0 8px 32px ${microphoneColor}40`,
              display: "flex",
              height: micSize,
              justifyContent: "center",
              position: "absolute",
              width: micSize,
            }}
          >
            {micIconUrl ? (
              <Img
                alt="Microphone"
                src={micIconUrl}
                style={{
                  height: micSize * 0.5,
                  width: micSize * 0.5,
                }}
              />
            ) : (
              <MicIcon color="#ffffff" size={micSize * 0.5} />
            )}
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            justifyContent: "center",
            maxWidth: 1000,
            minHeight: enablePronunciation ? 170 : 120,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexWrap: "wrap",
              gap: "0 12px",
              justifyContent: "center",
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
                    display: "inline-block",
                    position: "relative",
                  }}
                >
                  {echoCount > 0
                    ? Array.from({ length: echoCount + 1 }).map(
                        (_, echoIdx) => {
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
                          const echoOp = interpolate(
                            echoFrame,
                            [0, 8],
                            [0, 0.15],
                            {
                              extrapolateLeft: "clamp",
                              extrapolateRight: "clamp",
                            }
                          );
                          const echoX = echoIdx * 6;
                          const echoBlur = interpolate(
                            echoFrame,
                            [0, 12],
                            [0, 4],
                            {
                              extrapolateLeft: "clamp",
                              extrapolateRight: "clamp",
                            }
                          );
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
                        }
                      )
                    : null}
                  {echoCount === 0 ? (
                    <span
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
                  ) : null}
                </span>
              );
            })}
          </div>
          {enablePronunciation && pronunciations.length > 0 ? (
            <div
              style={{
                alignItems: "center",
                display: "flex",
                flexWrap: "wrap",
                gap: "0 12px",
                justifyContent: "center",
                marginTop: 6,
              }}
            >
              {pronunciations.map((pron, index) => {
                const wordFrame =
                  frame - wordRevealStart - index * wordRevealInterval;
                const pronOpacity = interpolate(wordFrame, [0, 8], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
                const pronY = interpolate(wordFrame, [0, 8], [10, 0], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });

                return (
                  <span
                    key={index}
                    style={{
                      color: microphoneColor,
                      display: "inline-block",
                      fontFamily: '"Inter", sans-serif',
                      fontSize: fontSize * 0.6,
                      fontStyle: "italic",
                      fontWeight: 400,
                      opacity: pronOpacity * 0.8,
                      transform: `translateY(${pronY}px)`,
                    }}
                  >
                    {pron}
                  </span>
                );
              })}
            </div>
          ) : null}
        </div>

        {enableWaveform ? (
          <div
            style={{
              alignItems: "flex-end",
              display: "flex",
              gap: 3,
              height: 32,
              justifyContent: "center",
              width: 400,
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
                    backgroundColor: pulseColor,
                    borderRadius: 2,
                    height: barHeight,
                    opacity: isVoComplete ? 0.7 : 0.4,
                    width: Math.max(4, 16 - i * 0.7),
                  }}
                />
              );
            })}
          </div>
        ) : null}

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
                backgroundColor: isVoComplete ? speakingColor : notSpeakingColor,
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
                color: isVoComplete ? speakingColor : notSpeakingColor,
                fontFamily: '"Inter", sans-serif',
                fontSize: 12,
                fontWeight: isVoComplete ? 700 : 500,
                letterSpacing: isVoComplete ? "0.05em" : "normal",
              }}
            >
              {isVoComplete ? "Your turn!" : "Listen and repeat..."}
            </div>
            {isVoComplete ? (
              <div
                style={{
                  alignItems: "center",
                  backgroundColor: speakingColor,
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
            ) : null}
          </div>
        </div>
      </div>

      <Audio src={audioSrc} />
    </div>
  );
};
