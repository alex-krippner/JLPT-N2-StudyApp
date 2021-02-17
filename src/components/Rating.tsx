import * as React from 'react';

import DarumaIcon from '../../assets/img/darumaIcon';

type Props = {
  selected?: boolean;
  onClick: (
    callback: Function,
  ) => (label: string, ratingIndex: number) => void;
};
// { selected = false, onClick }
const Rating = ({ selected = false, onClick }: Props) => {
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
