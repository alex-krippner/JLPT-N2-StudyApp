import React from 'react';
// import styled from 'styled-components';

import DarumaIcon from '../img/darumaIcon';

// const StarStyled = styled.div`
//   height: 25px;
//   width: 25px;
//   margin: 2px;
//   float: left;
//   background-color: ${(props) =>
//     props.selected === true
//       ? 'var(--color-blue-medium)'
//       : 'var(--color-grey-medium)'};
//   opacity: ${(props) => (props.selected === true ? 1 : 0.5)};
//   cursor: pointer;

//   clip-path: polygon(
//     50% 0%,
//     63% 38%,
//     100% 38%,
//     69% 59%,
//     82% 100%,
//     50% 75%,
//     18% 100%,
//     31% 59%,
//     0% 38%,
//     37% 38%
//   );
// `;

const Star = ({ selected = false, onClick }) => {
  let colorBodyLight = '#708090';
  let colorBodyDark = '#708090';
  let colorBodyDarkTwo = '#708090';

  if (selected) {
    colorBodyLight = '#add8e6';
    colorBodyDark = '#4169E1';
    colorBodyDarkTwo = '#3f51b5';
  }
  return (
    <DarumaIcon
      fontSize="4rem"
      colorBodyLight={colorBodyLight}
      colorBodyDark={colorBodyDark}
      colorBodyDarkTwo={colorBodyDarkTwo}
      onClick={onClick}
    />
  );
};

export default Star;

// .star-selected {
//   background-color: var(--color-grey-medium); !important
// }

// <StarStyled
// selected={selected}
// onClick={onClick}
// className="star"
// />
