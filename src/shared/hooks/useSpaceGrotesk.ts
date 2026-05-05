import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/SpaceGrotesk";

export const useSpaceGrotesk = () => {
  const handle = delayRender("Loading Space Grotesk font");
  useEffect(() => {
    loadFont("normal", { weights: ["400", "500", "600", "700"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
