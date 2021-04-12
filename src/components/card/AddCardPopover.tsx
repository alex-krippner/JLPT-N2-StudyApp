import React, { useState } from 'react';

import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import { makeStyles } from '@material-ui/core/styles';

import CardForm from '../cardForm/CardForm';

const useStyles = makeStyles({
  root: {
    background: 'rgba(0,0,0,0.4)',

    '& .MuiPaper-root': {
      borderRadius: '1rem',
    },
  },
  button: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 1,

    '&:hover': {
      cursor: 'pointer',
    },
  },

  addIcon: {
    fontSize: 'var(--font-size-large)',

    '&:hover': {
      cursor: 'pointer',
    },
  },
});

type AddCardPopoverProps = {
  tabLabels: CardDataKeys[];
  label: CardLabels;
  cardType: CardType;
  cardData: CardDataType;
};

const AddCardPopover = ({
  tabLabels,
  label,
  cardData,
  cardType,
}: AddCardPopoverProps) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    setAnchorEl(document.getElementById('main'));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton
        color="primary"
        className={classes.button}
        onClick={() => handleClick()}
      >
        <AddToPhotosIcon className={classes.addIcon} />
      </IconButton>
      <Popover
        id={id}
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
        className={classes.root}
      >
        <CardForm
          label={label}
          tabLabels={tabLabels}
          cardData={cardData}
          cardType={cardType}
        />
      </Popover>
    </div>
  );
};

export default AddCardPopover;
