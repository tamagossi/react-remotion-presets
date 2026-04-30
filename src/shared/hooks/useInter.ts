import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/Inter";

export const useInter = () => {
  const handle = delayRender("Loading Inter font");
  useEffect(() => {
    loadFont("normal", { weights: ["400", "500", "600", "700"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
