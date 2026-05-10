import { useEffect } from "react";

import { continueRender, delayRender } from "remotion";

import { loadFont } from "@remotion/google-fonts/DMSans";

export const useDmSans = () => {
  const handle = delayRender("Loading DM Sans font");
  useEffect(() => {
    loadFont("normal", { weights: ["400", "500", "700"] })
      .waitUntilDone()
      .then(() => continueRender(handle))
      .catch(() => continueRender(handle));
  }, [handle]);
};
