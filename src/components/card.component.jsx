import React from 'react';

import styled from 'styled-components';

const CardWrapper = styled.div`
  position: relative;
  height: 48rem;
  perspective: 80rem;
  -moz-perspective: 150rem;
`;

const CardSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 48rem;
  backface-visibility: hidden;
  border-radius: 1rem;
  box-shadow: 1rem 1rem 1rem rgba($color-blue-dark, 0.25);
  transition: all 0.8s ease;
  background-color: #f5f5f5;
  border: solid 1px red;

  transform: ${(props) =>
    props.back ? ' rotateY(180deg)' : 'rotateY(0)'};

  &:hover {
    transform: ${(props) =>
      props.front ? 'rotateY(-180deg)' : 'rotateY(0)'};
  }
`;

const Card = ({ data }) => (
  <CardWrapper>
    <CardSide front>
      <div>{data.kanji}</div>
    </CardSide>
    <CardSide back>
      <div>Kanji Data</div>
    </CardSide>
  </CardWrapper>
);

export default Card;
