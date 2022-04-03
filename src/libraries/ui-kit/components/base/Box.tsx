import React from "react";
import styled from "styled-components";

const BaseBox = styled.div({
  display: "flex",
  flexDirection: "column",
  userSelect: "none",
});

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

export const Box = (props: BoxProps) => {
  const { testId, ...other } = props;
  return <BaseBox data-test-id={testId} {...other} />;
};
