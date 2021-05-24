import React, { ReactNode } from 'react';
import styled from 'styled-components';

const CardScene = styled.div<StyledProps>`
  height: ${(props) =>
    props.cardType === 'vocab' ? '45rem' : '40rem'};
  perspective: 200rem;
  -moz-perspective: 150rem;
  width: ${(props) =>
    props.cardType === 'vocab' ? '35rem' : '30rem'};
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
}

const FlipCard = <T extends VocabCardData | KanjiCardData>({
  children,
  cardData,
  cardRef,
}: FlipCardProps<T>) => {
  return (
    <CardScene>
      <CardWrapper ref={cardRef} id={cardData.id}>
        {children}
      </CardWrapper>
    </CardScene>
  );
};

export default FlipCard;
