import React from 'react';

import DarumaIcon from '../img/darumaIcon';

const Star = ({ selected = false, onClick }) => {
  let colorBodyLight = '#708090';
  let colorBodyDark = '#708090';
  let colorBodyDarkTwo = '#708090';

  if (selected) {
    colorBodyLight = '#d06e6e';
    colorBodyDark = '#c13a3a';
    colorBodyDarkTwo = '#b82928';
  }
  return (
    <DarumaIcon
      fontSize="4rem"
      colorBodyLight={colorBodyLight}
      colorBodyDark={colorBodyDark}
      colorBodyDarkTwo={colorBodyDarkTwo}
      opacityBg="0"
      onClick={onClick}
    />
  );
};

export default Star;
