import React, { useMemo } from "react";

import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  random,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type YouTubeSubscribeOverlayProps = {
  actionFrame: number;
  avatarBorderColor: string;
  avatarBorderWidth: number;
  avatarSize: number;
  avatarUrl: string;
  bellWiggleIntensity: number;
  cardBorderRadius: number;
  cardGlowColor: string;
  cardGlowIntensity: number;
  cardPadding: number;
  channelName: string;
  checkmarkColor: string;
  enterDuration: number;
  enterEasing: [number, number, number, number];
  exitDuration: number;
  exitEasing: [number, number, number, number];
  fontFamily: string;
  fontSize: number;
  glassBlur: number;
  glassOpacity: number;
  notificationDotColor: string;
  particleColor: string;
  particleCount: number;
  particleSpread: number;
  position:
    | "bottom-center"
    | "bottom-left"
    | "bottom-right"
    | "center"
    | "top-center"
    | "top-left"
    | "top-right";
  showLike: boolean;
  showNotificationDot: boolean;
  subscribedColor: string;
  subscribeColor: string;
  subscribedText: string;
  subscribeText: string;
  textColor: string;
};

const ACTION_MORPH_DURATION = 18;
const PARTICLES_LIFETIME = 28;
const BELL_WIGGLE_DURATION = 18;

const particleDirections = (
  count: number,
  spread: number
): Array<{ dx: number; dy: number }> => {
  const dirs: Array<{ dx: number; dy: number }> = [];
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (random(null) - 0.5) * 0.4;
    const dist = spread * (0.5 + random(null) * 0.7);
    dirs.push({ dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist });
  }
  return dirs;
};

export const YouTubeSubscribeOverlay: React.FC<YouTubeSubscribeOverlayProps> = ({
  actionFrame = 75,
  avatarBorderColor = "#ff0000",
  avatarBorderWidth = 3,
  avatarSize = 48,
  avatarUrl = "",
  bellWiggleIntensity = 15,
  cardBorderRadius = 16,
  cardGlowColor = "rgba(255, 0, 0, 0.3)",
  cardGlowIntensity = 1,
  cardPadding = 14,
  channelName = "Channel Name",
  checkmarkColor = "#ffffff",
  enterDuration = 20,
  enterEasing = [0.22, 1, 0.36, 1],
  exitDuration = 20,
  exitEasing = [0.45, 0, 0.55, 1],
  fontFamily = "Inter, system-ui, sans-serif",
  fontSize = 18,
  glassBlur = 20,
  glassOpacity = 0.12,
  notificationDotColor = "#ff0000",
  particleColor = "rgba(255, 50, 50, 0.8)",
  particleCount = 10,
  particleSpread = 70,
  position = "bottom-left",
  showLike = false,
  showNotificationDot = true,
  subscribeColor = "#ff0000",
  subscribedColor = "#606060",
  subscribedText = "SUBSCRIBED",
  subscribeText = "SUBSCRIBE",
  textColor = "#ffffff",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const particles = useMemo(
    () => particleDirections(particleCount, particleSpread),
    [particleCount, particleSpread]
  );

  const posMap: Record<
    YouTubeSubscribeOverlayProps["position"],
    { alignItems: string; justifyContent: string }
  > = {
    "bottom-center": { alignItems: "center", justifyContent: "flex-end" },
    "bottom-left": { alignItems: "flex-start", justifyContent: "flex-end" },
    "bottom-right": { alignItems: "flex-end", justifyContent: "flex-end" },
    center: { alignItems: "center", justifyContent: "center" },
    "top-center": { alignItems: "center", justifyContent: "flex-start" },
    "top-left": { alignItems: "flex-start", justifyContent: "flex-start" },
    "top-right": { alignItems: "flex-end", justifyContent: "flex-start" },
  };

  const dir = posMap[position];
  const safePad = 48;

  const exitStart = Math.max(0, durationInFrames - exitDuration);
  const exitProgress = interpolate(
    frame,
    [exitStart, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(
        exitEasing[0],
        exitEasing[1],
        exitEasing[2],
        exitEasing[3]
      ),
    }
  );

  const entryEase = Easing.bezier(
    enterEasing[0],
    enterEasing[1],
    enterEasing[2],
    enterEasing[3]
  );

  const entryProgressRaw = interpolate(frame, [0, enterDuration], [0, 1], {
    easing: entryEase,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const actionFrameLocal = Math.max(enterDuration + 5, actionFrame);
  const actionProgress = interpolate(
    frame,
    [actionFrameLocal, actionFrameLocal + ACTION_MORPH_DURATION],
    [0, 1],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const cardOpacity = Math.min(
    Math.max(0, entryProgressRaw),
    Math.max(0, 1 - exitProgress)
  );

  const cardScale = interpolate(entryProgressRaw, [0, 0.7, 1], [0.92, 1.03, 1]);
  const cardScaleExit = interpolate(exitProgress, [0, 1], [1, 0.96]);
  const cardScaleFinal = cardScaleExit < 1 ? cardScaleExit : cardScale;
  const cardY = interpolate(entryProgressRaw, [0, 1], [24, 0]);
  const cardYExit = interpolate(exitProgress, [0, 1], [0, 16]);
  const cardYFinal = cardYExit > 0 ? cardYExit : cardY;

  const avatarRingProgress = interpolate(
    frame,
    [0, enterDuration * 0.8],
    [0, 1],
    {
      easing: entryEase,
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const avatarRingCircumference =
    Math.PI * (avatarSize + avatarBorderWidth + 4) * 2;

  const nameXEntry = interpolate(entryProgressRaw, [0, 0.5, 1], [-20, 2, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const nameOpacityEntry = interpolate(
    entryProgressRaw,
    [0.1, 0.6],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const buttonScaleEntry = interpolate(
    entryProgressRaw,
    [0.2, 0.8, 1],
    [0.6, 1.15, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );
  const buttonOpacityEntry = interpolate(
    entryProgressRaw,
    [0.15, 0.7],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const subscribeColorProgress = interpolate(
    actionProgress,
    [0, 0.6, 1],
    [1, 0.3, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const subscribedColorProgress = interpolate(
    actionProgress,
    [0, 0.4, 1],
    [0, 0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const subscribedScale = interpolate(
    actionProgress,
    [0.5, 0.75, 1],
    [0.7, 1.12, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const checkmarkProgress = interpolate(
    actionProgress,
    [0.6, 0.85, 1],
    [0, 0.5, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const bellVisible = actionProgress > 0.7 ? 1 : 0;
  const bellFade = interpolate(actionProgress, [0.7, 0.95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bellSpring = spring({
    config: { damping: 8, mass: 0.5, stiffness: 180 },
    fps,
    frame: frame - actionFrameLocal - ACTION_MORPH_DURATION,
    from: 0,
    to: 1,
    delay: Math.round(
      (actionFrameLocal + ACTION_MORPH_DURATION * 0.7) * 1000 / (fps * 1000)
    ),
  });
  const bellScale = bellVisible ? bellSpring : 0;

  const wiggleLocalFrame =
    frame - actionFrameLocal - Math.round(ACTION_MORPH_DURATION * 1.3);
  const bellWiggle = interpolate(
    wiggleLocalFrame,
    [0, 5, 10, BELL_WIGGLE_DURATION],
    [0, bellWiggleIntensity, -bellWiggleIntensity * 0.6, 0],
    {
      easing: Easing.inOut(Easing.quad),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const dotBounceLocalFrame =
    frame - actionFrameLocal - ACTION_MORPH_DURATION;
  const dotBounce = spring({
    config: { damping: 6, mass: 0.4, stiffness: 200 },
    fps,
    frame: dotBounceLocalFrame - 10,
    from: 0,
    to: 1,
    delay: Math.round(
      (actionFrameLocal + ACTION_MORPH_DURATION + 10) * 1000 / (fps * 1000)
    ),
  });

  const bgColor = `rgba(255, 255, 255, ${glassOpacity})`;

  const getGlowStyle = () => {
    const intensity = cardGlowIntensity * (1 - exitProgress);
    if (intensity <= 0) return undefined;
    return {
      boxShadow: `0 0 ${Math.round(40 * intensity)}px ${cardGlowColor}`,
    };
  };

  const buttonShimmerX = interpolate(
    actionProgress,
    [0, 0.5, 1],
    [-150, 200, 200],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  const buttonWidth = Math.max(
    subscribeText.length * fontSize * 0.7 + 32,
    subscribedText.length * fontSize * 0.7 + 32,
    130
  );

  const gap = 14;
  const cardHeight = Math.max(avatarSize, fontSize * 1.4) + cardPadding * 2;

  const likeOpacityEntry = interpolate(entryProgressRaw, [0.3, 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const originV = position.includes("top") ? "top" : "bottom";
  const originH = position.includes("left")
    ? "left"
    : position.includes("right")
      ? "right"
      : "center";

  return (
    <AbsoluteFill
      style={{
        alignItems: dir.alignItems,
        display: "flex",
        justifyContent: dir.justifyContent,
        opacity: cardOpacity,
        padding: safePad,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          alignItems: "center",
          background: bgColor,
          border: `1px solid rgba(255, 255, 255, 0.15)`,
          borderRadius: cardBorderRadius,
          display: "flex",
          flexDirection: "row",
          gap,
          height: cardHeight,
          padding: cardPadding,
          transform: `scale(${cardScaleFinal}) translateY(${cardYFinal}px)`,
          transformOrigin: `${originH} ${originV}`,
          backdropFilter: `blur(${interpolate(exitProgress, [0, 1], [glassBlur, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
          ...getGlowStyle(),
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            height: avatarSize + avatarBorderWidth + 8,
            justifyContent: "center",
            position: "relative",
            width: avatarSize + avatarBorderWidth + 8,
          }}
        >
          {avatarUrl ? (
            <>
              <div
                style={{
                  borderRadius: "50%",
                  height: avatarSize,
                  overflow: "hidden",
                  width: avatarSize,
                }}
              >
                <Img
                  src={avatarUrl}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              </div>
              <svg
                height={avatarSize + avatarBorderWidth + 8}
                width={avatarSize + avatarBorderWidth + 8}
                style={{
                  left: 0,
                  position: "absolute",
                  top: 0,
                }}
              >
                <circle
                  cx={(avatarSize + avatarBorderWidth + 8) / 2}
                  cy={(avatarSize + avatarBorderWidth + 8) / 2}
                  fill="none"
                  r={avatarSize / 2 + avatarBorderWidth}
                  stroke={avatarBorderColor}
                  strokeDasharray={avatarRingCircumference}
                  strokeLinecap="round"
                  strokeWidth={avatarBorderWidth}
                  transform={`rotate(-90 ${(avatarSize + avatarBorderWidth + 8) / 2} ${(avatarSize + avatarBorderWidth + 8) / 2})`}
                  strokeDashoffset={
                    avatarRingCircumference * (1 - avatarRingProgress)
                  }
                />
              </svg>
            </>
          ) : (
            <div
              style={{
                alignItems: "center",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "50%",
                display: "flex",
                height: avatarSize,
                justifyContent: "center",
                width: avatarSize,
              }}
            >
              <svg
                fill="rgba(255, 255, 255, 0.4)"
                height={avatarSize * 0.45}
                viewBox="0 0 24 24"
                width={avatarSize * 0.45}
              >
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
          )}
        </div>

        <span
          style={{
            color: textColor,
            fontFamily,
            fontSize,
            fontWeight: 600,
            opacity: nameOpacityEntry,
            transform: `translateX(${nameXEntry}px)`,
            whiteSpace: "nowrap",
          }}
        >
          {channelName}
        </span>

        {showLike && (
          <div
            style={{
              opacity: likeOpacityEntry,
            }}
          >
            <svg
              fill="none"
              height={fontSize}
              stroke={textColor}
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              width={fontSize}
            >
              <path d="M7 22V11m-5 3l5-11h12.4c.9 0 1.6.7 1.6 1.6v1.4c0 .2 0 .4-.1.6L19 14.4c-.1.3-.4.6-.8.6H7m-5 0h5v7H2v-7z" />
            </svg>
          </div>
        )}

        <div
          style={{
            opacity: buttonOpacityEntry,
            position: "relative",
            transform: `scale(${buttonScaleEntry})`,
          }}
        >
          <div
            style={{
              alignItems: "center",
              backgroundColor: subscribeColor,
              borderRadius: 3,
              display: "flex",
              height: fontSize + 16,
              justifyContent: "center",
              minWidth: buttonWidth,
              overflow: "hidden",
              paddingLeft: 16,
              paddingRight: 16,
              position: "relative",
            }}
          >
            {actionProgress < 0.3 && (
              <div
                style={{
                  background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)`,
                  height: "100%",
                  left: 0,
                  opacity: 1 - actionProgress,
                  pointerEvents: "none",
                  position: "absolute",
                  top: 0,
                  transform: `translateX(${buttonShimmerX}px)`,
                  width: 150,
                }}
              />
            )}

            <span
              style={{
                color: textColor,
                fontFamily,
                fontSize,
                fontWeight: 600,
                letterSpacing: 0.5,
                opacity: Math.max(0, 1 - actionProgress * 2),
                position: "absolute",
                whiteSpace: "nowrap",
              }}
            >
              {subscribeText}
            </span>

            <div
              style={{
                alignItems: "center",
                display: "flex",
                gap: 6,
                opacity: subscribedColorProgress,
                transform: `scale(${subscribedScale})`,
              }}
            >
              <span
                style={{
                  color: textColor,
                  fontFamily,
                  fontSize,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  whiteSpace: "nowrap",
                }}
              >
                {subscribedText}
              </span>

              <svg
                height={fontSize * 0.8}
                viewBox="0 0 24 24"
                width={fontSize * 0.8}
              >
                <polyline
                  fill="none"
                  points="4,12 10,18 20,6"
                  stroke={checkmarkColor}
                  strokeDasharray={36}
                  strokeDashoffset={36 * (1 - checkmarkProgress)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                />
              </svg>
            </div>
          </div>

          {actionProgress > 0.3 && (
            <div
              style={{
                backgroundColor: subscribedColor,
                borderRadius: 3,
                height: fontSize + 16,
                left: 0,
                opacity: subscribeColorProgress,
                position: "absolute",
                top: 0,
                width: "100%",
              }}
            />
          )}
        </div>

        <div
          style={{
            opacity: bellFade,
            position: "relative",
            transform: `scale(${bellScale})`,
          }}
        >
          <div
            style={{
              position: "relative",
              transform: `rotate(${bellWiggle}deg)`,
            }}
          >
            <svg
              fill={textColor}
              height={fontSize + 4}
              viewBox="0 0 24 24"
              width={fontSize + 4}
            >
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.1-2-5.6-5-6.3V4c0-.6-.4-1-1-1s-1 .4-1 1v.7c-3 .7-5 3.2-5 6.3v5l-2 2v1h16v-1l-2-2z" />
            </svg>

            {showNotificationDot && (
              <div
                style={{
                  backgroundColor: notificationDotColor,
                  borderRadius: "50%",
                  boxShadow: `0 0 6px ${notificationDotColor}`,
                  height: 8,
                  position: "absolute",
                  right: 2,
                  top: 2,
                  transform: `scale(${dotBounce})`,
                  width: 8,
                }}
              />
            )}
          </div>
        </div>
      </div>

      {actionProgress > 0.1 &&
        particles.map((d, i) => {
          const pFrame =
            frame - actionFrameLocal - Math.round(i * 1.5);
          const pProgress = interpolate(
            pFrame,
            [0, PARTICLES_LIFETIME],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          if (pProgress <= 0 || pProgress >= 1) return null;
          const px = d.dx * pProgress;
          const py = d.dy * pProgress - 8 * pProgress * pProgress;
          const pOpacity = interpolate(
            pProgress,
            [0, 0.15, 0.7, 1],
            [0, 1, 0.6, 0]
          );
          const pScale = interpolate(pProgress, [0, 0.5, 1], [0.3, 1, 0.2]);
          return (
            <div
              key={i}
              style={{
                backgroundColor: particleColor,
                borderRadius: "50%",
                height: 6,
                left: "50%",
                marginLeft: -3,
                marginTop: -3,
                opacity: pOpacity,
                pointerEvents: "none",
                position: "fixed",
                top: "50%",
                transform: `translate(${px}px, ${py}px) scale(${pScale})`,
                width: 6,
              }}
            />
          );
        })}
    </AbsoluteFill>
  );
};
