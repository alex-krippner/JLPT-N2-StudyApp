import React from 'react';

import DarumaIcon from '../img/darumaIcon';

const Rating = ({ selected = false, onClick }) => {
  // let colorBody;
  let colorOutline;
  let colorEye;
  let colorEyeOutline;

  if (selected) {
    // colorBody = '#d06e6e';
    colorOutline = '#c13a3a';
    colorEye = '#b82928';
    colorEyeOutline = '#b82928';
  }
  return (
    <DarumaIcon
      fontSize="4rem"
      // colorBody={colorBody}
      colorOutline={colorOutline}
      colorEye={colorEye}
      colorEyeOutline={colorEyeOutline}
      onClick={onClick}
    />
  );
};

export default Rating;
