import React from "react";

export const MicIcon: React.FC<{
  color?: string;
  size?: number;
}> = ({ color = "currentColor", size = 50 }) => (
  <svg
    fill={color}
    height={size}
    viewBox="0 0 24 24"
    width={size}
  >
    <path d="M12,22a1,1,0,0,1-1-1V17a1,1,0,0,1,2,0v4A1,1,0,0,1,12,22Z" />
    <path d="M12,2A5,5,0,0,0,7,7v6a5,5,0,0,0,10,0V7A5,5,0,0,0,12,2Z" />
    <path d="M15,22H9a1,1,0,0,1,0-2h6a1,1,0,0,1,0,2Z" />
  </svg>
);
