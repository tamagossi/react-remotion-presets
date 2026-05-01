import React from "react";

import { DarkGradientBackground } from "../../backgrounds";
import {
  YouTubeSubscribeOverlay,
  type YouTubeSubscribeOverlayProps,
} from "../YouTubeSubscribeOverlay";

export const YouTubeSubscribeOverlayComposition: React.FC<
  YouTubeSubscribeOverlayProps
> = (props) => {
  return (
    <DarkGradientBackground>
      <YouTubeSubscribeOverlay {...props} />
    </DarkGradientBackground>
  );
};
