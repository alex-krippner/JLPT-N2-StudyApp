import React from "react";
import MuiTooltip, { TooltipProps } from "@mui/material/Tooltip";

export function Tooltip(props: TooltipProps) {
  return <MuiTooltip {...props} />;
}
