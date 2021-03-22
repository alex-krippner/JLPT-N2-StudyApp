import React from 'react';

import DarumaIcon from '../../assets/img/DarumaIcon';

type Props = {
  selected?: boolean;
  onClick: (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>,
  ) => void;
};
const Rating = ({ selected = false, onClick }: Props) => {
  let colorOutline: string;
  let colorEye: string;
  let colorEyeOutline: string;

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
