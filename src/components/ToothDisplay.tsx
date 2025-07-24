import type { FC } from "react";

import { Box } from "@mui/material";
import Tooth from "../assets/tooth.svg?react";
import { useRef, useEffect } from "react";

const ToothDisplay: FC = () => {
  const toothRef = useRef<SVGSVGElement>(null);
  const handleToothSectionClick = () => {
    alert("Tooth section clicked!");
  };

  useEffect(() => {
    const svgElement = toothRef.current?.querySelector(".center");
    if (svgElement) {
      svgElement.addEventListener("click", handleToothSectionClick);
    }
    return () => {
      if (svgElement) {
        svgElement.removeEventListener("click", handleToothSectionClick);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        ".upperleft, .lowerleft, .lowerright": {
          fill: "red",
          stroke: "black",
          strokeWidth: 4,
        },
        ".center": {
          fill: "white",
          transition: "fill 0.4s ease, filter 0.2s ease",
          cursor: "pointer",
        },
        ".center:hover": {
          filter: "brightness(0.8)",
        },
        ".center:active": {
          filter: "brightness(0.5)",
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Tooth ref={toothRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default ToothDisplay;
