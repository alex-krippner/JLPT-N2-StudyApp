import * as React from 'react';

import DarumaIcon from '../../assets/img/darumaIcon';

const Rating = ({ selected = false, onClick }) => {
  let colorOutline;
  let colorEye;
  let colorEyeOutline;

  if (selected) {
    colorOutline = '#c13a3a';
    colorEye = '#b82928';
    colorEyeOutline = '#b82928';
  }
  return (
    <DarumaIcon
      fontSize="4rem"
      colorOutline={colorOutline}
      colorEye={colorEye}
      colorEyeOutline={colorEyeOutline}
      onClick={onClick}
    />
  );
};

export default Rating;
