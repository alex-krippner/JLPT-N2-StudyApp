import React from "react";
import MuiBox, { BoxProps } from "@mui/material/Box";

interface Props extends BoxProps {
  children: React.ReactNode;
}

export function Box(props: Props) {
  const { children, ...other } = props;
  return <MuiBox {...other}> {children}</MuiBox>;
}
