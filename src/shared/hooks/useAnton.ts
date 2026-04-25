import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/Anton";

export const useAnton = () => {
  const handle = delayRender("Loading Anton font");
  useEffect(() => {
    loadFont("normal", { weights: ["400"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
