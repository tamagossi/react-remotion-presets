import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/PlayfairDisplay";

export const usePlayfairDisplay = () => {
  const handle = delayRender("Loading Playfair Display font");
  useEffect(() => {
    loadFont("normal", { weights: ["400", "500", "600", "700", "800", "900"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
