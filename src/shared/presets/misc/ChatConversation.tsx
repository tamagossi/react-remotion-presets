import React from "react";

import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export type ChatMessage = {
  bubbleColor?: string;
  duration: number;
  side: "left" | "right";
  text: string;
  textColor?: string;
};

export type ChatConversationProps = {
  bubbleBorderRadius: number;
  bubbleGap: number;
  bubbleMaxWidth: number;
  bubblePadding: number;
  defaultBubbleColor: string;
  defaultTextColor: string;
  enterDuration: number;
  enterEasing: [number, number, number, number];
  exitDuration: number;
  exitEasing: [number, number, number, number];
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  glowColor: string;
  glowIntensity: number;
  messages: ChatMessage[];
  position: "center" | "left" | "right";
  staggerDelay: number;
  threadWidth: number;
};

const estimateBubbleHeight = (
  fontSize: number,
  maxWidth: number,
  padding: number,
  text: string
): number => {
  const charsPerLine = Math.floor(maxWidth / (fontSize * 0.58));
  const lines = Math.max(1, Math.ceil(text.length / charsPerLine));
  return lines * fontSize * 1.35 + padding * 2;
};

export const ChatConversation: React.FC<ChatConversationProps> = ({
  bubbleBorderRadius = 20,
  bubbleGap = 14,
  bubbleMaxWidth = 420,
  bubblePadding = 18,
  defaultBubbleColor = "rgba(20, 20, 30, 0.72)",
  defaultTextColor = "#ffffff",
  enterDuration = 22,
  enterEasing = [0.22, 1, 0.36, 1],
  exitDuration = 20,
  exitEasing = [0.45, 0, 0.55, 1],
  fontFamily = "Inter, system-ui, sans-serif",
  fontSize = 24,
  fontWeight = 400,
  glowColor = "rgba(124, 58, 237, 0.25)",
  glowIntensity = 1,
  messages,
  position = "right",
  staggerDelay = 18,
  threadWidth = 520,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, height } = useVideoConfig();

  const availableHeight = height - 96;

  const startFrames: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < messages.length; i++) {
    startFrames.push(cumulative);
    cumulative += messages[i].duration + staggerDelay;
  }

  const bubbleHeights = messages.map((m) =>
    estimateBubbleHeight(fontSize, bubbleMaxWidth, bubblePadding, m.text)
  );

  const cumulativeHeights: number[] = [];
  let h = 0;
  for (let i = 0; i < bubbleHeights.length; i++) {
    cumulativeHeights.push(h);
    h += bubbleHeights[i] + bubbleGap;
  }
  const totalThreadHeight = h - bubbleGap;

  const scrollKeyframes: number[] = [];
  const scrollValues: number[] = [];
  for (let i = 0; i < messages.length; i++) {
    const f = startFrames[i];
    const bottom = cumulativeHeights[i] + bubbleHeights[i];
    const target =
      totalThreadHeight > availableHeight
        ? Math.min(
            totalThreadHeight - availableHeight,
            Math.max(0, bottom - availableHeight + bubbleGap)
          )
        : 0;
    scrollKeyframes.push(f);
    scrollValues.push(target);
  }

  const scrollY = interpolate(frame, scrollKeyframes, scrollValues, {
    easing: Easing.out(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitStart = durationInFrames - exitDuration;
  const exitProgress =
    exitStart > 0
      ? interpolate(frame, [exitStart, durationInFrames], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(
            exitEasing[0],
            exitEasing[1],
            exitEasing[2],
            exitEasing[3]
          ),
        })
      : 0;

  const threadOpacity = interpolate(exitProgress, [0, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const threadTranslateY = interpolate(exitProgress, [0, 1], [0, -40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const positionOffset =
    position === "center"
      ? 0
      : position === "left"
        ? -((1280 - threadWidth) / 2) + 48
        : (1280 - threadWidth) / 2 - 48;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        opacity: threadOpacity,
        paddingBottom: 48,
        transform: `translateY(${threadTranslateY}px)`,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: bubbleGap,
          maxWidth: threadWidth,
          transform: `translateX(${positionOffset}px) translateY(${-scrollY}px)`,
          width: threadWidth,
        }}
      >
        {messages.map((message, index) => {
          const start = startFrames[index];
          const localFrame = frame - start;

          const entryProgress = interpolate(
            localFrame,
            [0, enterDuration],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(
                enterEasing[0],
                enterEasing[1],
                enterEasing[2],
                enterEasing[3]
              ),
            }
          );

          const bubbleOpacity = entryProgress;
          const bubbleScale = interpolate(
            entryProgress,
            [0, 0.65, 1],
            [0.88, 1.05, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );
          const bubbleTranslateY = interpolate(
            entryProgress,
            [0, 1],
            [28, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }
          );

          const isLeft = message.side === "left";

          return (
            <div
              key={index}
              style={{
                alignSelf: isLeft ? "flex-start" : "flex-end",
                opacity: Math.max(0, bubbleOpacity),
                transform: `translateY(${bubbleTranslateY}px) scale(${bubbleScale})`,
                transformOrigin: isLeft ? "left bottom" : "right bottom",
              }}
            >
              <div
                style={{
                  background: message.bubbleColor || defaultBubbleColor,
                  borderRadius: bubbleBorderRadius,
                  boxShadow: `0 4px ${Math.round(24 * glowIntensity)}px ${glowColor}`,
                  color: message.textColor || defaultTextColor,
                  fontFamily,
                  fontSize,
                  fontWeight,
                  lineHeight: 1.35,
                  maxWidth: bubbleMaxWidth,
                  padding: bubblePadding,
                  wordWrap: "break-word",
                }}
              >
                {message.text}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
