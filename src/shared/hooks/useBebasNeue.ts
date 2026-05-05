import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/BebasNeue";

export const useBebasNeue = () => {
  const handle = delayRender("Loading Bebas Neue font");
  useEffect(() => {
    loadFont("normal", { weights: ["400"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
