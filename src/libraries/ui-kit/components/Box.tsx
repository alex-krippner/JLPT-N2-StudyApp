import styled from "styled-components";
import React from "react";

const BaseBox = styled.div({
  display: "flex",
  flexDirection: "column",
  userSelect: "none",
});

export interface BoxProps
  extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
}

const Box = (props: BoxProps) => {
  const { testId, ...other } = props;
  return <BaseBox data-test-id={testId} {...other} />;
};

export default Box;
