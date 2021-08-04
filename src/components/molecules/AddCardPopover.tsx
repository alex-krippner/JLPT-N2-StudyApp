import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import ButtonIcon from './ButtonIcon';

type AddCardPopoverProps = {
  CardFormComponent: React.ElementType;
  anchorTarget: string;
};

const AddCardPopover = ({
  CardFormComponent,
  anchorTarget,
}: AddCardPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = () =>
    setAnchorEl(document.getElementById(anchorTarget));
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <ButtonIcon
        position="absolute"
        top="1rem"
        left="1rem"
        zIndex={1}
        color="primary"
        clickHandler={handleClick}
        Icon={AddToPhotosIcon}
        iconSize="var(--font-size-large)"
      />
      <Popover
        id={open ? 'simple-popover' : undefined}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        {CardFormComponent}
      </Popover>
    </>
  );
};

export default AddCardPopover;
