import React from "react";
import styled from "@emotion/styled";

// TODO: Extend with themed breakpoints
const BaseContainer = styled.div<ContainerProps>((props) => ({
  boxSizing: "border-box",
  display: "block",
  height: props.height,
  marginLeft: "auto",
  marginRight: "auto",
  userSelect: "none",
  width: "100%",
}));

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  height?: string;
}

export const Container = (props: ContainerProps) => {
  const { testId, ...other } = props;
  return (
    <BaseContainer
      className="MonContainerBase"
      data-test-id={testId}
      {...other}
    />
  );
};
