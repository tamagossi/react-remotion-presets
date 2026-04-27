import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/Oswald";

export const useOswald = () => {
  const handle = delayRender("Loading Oswald font");
  useEffect(() => {
    loadFont("normal", { weights: ["400", "500", "700"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};