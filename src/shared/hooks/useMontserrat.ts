import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/Montserrat";

export const useMontserrat = () => {
  const handle = delayRender("Loading Montserrat font");
  useEffect(() => {
    loadFont("normal", { weights: ["400", "500", "600"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
