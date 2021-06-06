import React, { useState } from 'react';
import Popover from '@material-ui/core/Popover';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

import ButtonIcon from './ButtonIcon';

type AddCardPopoverProps = {
  tabLabels: TabLabel[];
  label: CardLabels;
  cardType: CardType;
  cardData: CardDataType[];
  CardFormComponent: React.ElementType;
};

const AddCardPopover = ({
  CardFormComponent,
}: AddCardPopoverProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = () =>
    setAnchorEl(document.getElementById('main'));
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
