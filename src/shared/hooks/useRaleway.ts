import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/Raleway";

export const useRaleway = () => {
  const handle = delayRender("Loading Raleway font");
  useEffect(() => {
    loadFont("normal", { weights: ["400", "500", "600"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
