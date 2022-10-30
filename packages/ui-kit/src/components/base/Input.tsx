import React from "react";
import styled from "styled-components";

const BaseInput = styled.input({
  display: "flex",
  flexBasis: "auto",
  flexGrow: 0,
  flexShrink: 0,
  alignItems: "stretch",
  border: "none",
  outline: "none",
  resize: "none",
});

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  testId?: string;
}

const Input = (props: InputProps) => {
  const { testId, ...other } = props;
  return <BaseInput data-test-id={testId} {...other} />;
};

export default Input;
