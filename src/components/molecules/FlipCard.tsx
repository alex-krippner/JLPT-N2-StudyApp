import React, { ReactNode } from 'react';
import styled from 'styled-components';

const CardScene = styled.div<StyledProps>`
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

interface FlipCardProps<T> {
  children: ReactNode;
  cardRef: React.MutableRefObject<any> | null;
  cardData: T;
  height: string;
  width: string;
  perspective: string;
}

const FlipCard = <T extends VocabCardData | KanjiCardData>({
  children,
  cardData,
  cardRef,
  height,
  width,
  perspective,
}: FlipCardProps<T>) => {
  return (
    <CardScene
      height={height}
      width={width}
      perspective={perspective}
    >
      <CardWrapper ref={cardRef} id={cardData.id}>
        {children}
      </CardWrapper>
    </CardScene>
  );
};

export default FlipCard;
