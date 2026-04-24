import React from "react";

import "./index.css";

import { Composition } from "remotion";

import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        height={720}
        id="MyComp"
        width={1280}
      />
    </>
  );
};
