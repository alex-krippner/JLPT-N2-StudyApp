import React from "react";
import styled from "styled-components";

export const BaseCardSide = styled.div<StyledProps>`
  top: ${(props) => props.top || "0"};
  left: ${(props) => props.left || "0"};
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  display: ${(props) => props.display || "flex"};
  flex-direction: ${(props) => props.fxDirection || "column"};
  border-radius: ${(props) => props.borderRadius || "1rem"};
  background-color: ${(props) => props.bgColor || "var(--color-white)"};
  border: ${(props) => props.border || "solid 1px #708090"};
  box-shadow: ${(props) =>
    props.boxShadow || "0px 0px 5px 1px rgba(0, 0, 0, 0.2)"};
  backface-visibility: ${(props) => props.bfVisibility || "hidden"};
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  transform: ${(props) => props.transform};
  transition: ${(props) => props.transition};
  cursor: ${(props) => props.cursor};
`;

export interface CardSideProps extends React.HTMLAttributes<HTMLDivElement> {
  testId?: string;
  transform?: string;
  bgColor?: string;
  cursor?: string;
}

export const CardSide = (props: CardSideProps) => {
  const { testId, ...other } = props;
  return <BaseCardSide data-test-id={testId} {...other} />;
};
