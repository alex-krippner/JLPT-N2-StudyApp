import React from "react";
import styled from "@emotion/styled";

const BaseButton = styled.button({
  display: "flex",
  flexDirection: "column",
  flexGrow: 0,
  flexShrink: 0,
  alignItems: "stretch",
  justifyContent: "center",
  background: "none",
  outline: "none",
  border: "none",
  cursor: "pointer",
  ":disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  testId?: string;
}

export const Button = (props: ButtonProps) => {
  const { testId, ...other } = props;
  return <BaseButton data-test-id={testId} {...other} />;
};
