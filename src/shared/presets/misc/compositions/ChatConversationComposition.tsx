import React from "react";

import { AbsoluteFill } from "remotion";

import { ChatConversation, type ChatConversationProps } from "../ChatConversation";

export const ChatConversationComposition: React.FC<ChatConversationProps> = (
  props
) => {
  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        background: "#0a0a14",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ChatConversation {...props} />
    </AbsoluteFill>
  );
};
