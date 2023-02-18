import styled from "@emotion/styled";
import React from "react";
type FlexDirection = "row" | "column";

const BaseBox = styled.div<BoxProps>((props) => ({
  display: "flex",
  flexDirection: props.fxDirection || "column",
  userSelect: "none",
}));

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  fxDirection?: FlexDirection;
}

export const Box = (props: BoxProps) => {
  const { testId, ...other } = props;
  return <BaseBox data-test-id={testId} {...other} />;
};
