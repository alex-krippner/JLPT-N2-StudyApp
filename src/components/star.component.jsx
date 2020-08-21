import React from 'react';
import styled from 'styled-components';

const StarStyled = styled.div`
  height: 25px;
  width: 25px;
  margin: 2px;
  float: left;
  background-color: ${(props) =>
    props.selected === true ? '#4682B4' : '#A9A9A9'};
  opacity: ${(props) => (props.selected === true ? 1 : 0.5)};
  cursor: pointer;

  clip-path: polygon(
    50% 0%,
    63% 38%,
    100% 38%,
    69% 59%,
    82% 100%,
    50% 75%,
    18% 100%,
    31% 59%,
    0% 38%,
    37% 38%
  );


  .star-selected {
    background-color: #87cefa; !important
  }
`;

const Star = ({ selected = false, onClick = (f) => f }) => (
  <StarStyled
    selected={selected}
    onClick={onClick}
    className="star"
  />
);

export default Star;
