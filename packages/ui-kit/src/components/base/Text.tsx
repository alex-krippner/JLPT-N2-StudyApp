import React from "react";
import styled from "styled-components";

const BaseText = styled.p({
  display: "inline",
  flexGrow: 0,
  flexShrink: 0,
  overflow: "hidden",
  whiteSpace: "pre-wrap",
  overflowWrap: "break-word",
  userSelect: "none",
  margin: 0,
});

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  testId?: string;
}

export const Text = (props: TextProps) => {
  const { testId, ...other } = props;
  return <BaseText data-test-id={testId} {...other} />;
};
