import React, { ReactNode } from "react";
import styled from "@emotion/styled";

const CardScene = styled.div<any>`
  height: ${(props) => props.height};
  perspective: ${(props) => props.perspective};
  -moz-perspective: ${(props) => props.perspective};
  width: ${(props) => props.width};
  user-select: none;
`;

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transition: transform 0.5s;
  transform-style: preserve-3d;
  color: var(--color-primary-dark);
`;

interface FlipCardProps {
  children: ReactNode;
  cardRef: React.MutableRefObject<any> | null;
  dataId: string;
  height: string;
  width: string;
  perspective: string;
}

export const FlipCard = ({
  children,
  dataId,
  cardRef,
  height,
  width,
  perspective,
}: FlipCardProps) => {
  return (
    <CardScene height={height} width={width} perspective={perspective}>
      <CardWrapper ref={cardRef} id={dataId}>
        {children}
      </CardWrapper>
    </CardScene>
  );
};
