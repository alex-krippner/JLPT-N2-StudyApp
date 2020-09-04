import React, { useState, useLayoutEffect } from 'react';

import Popover from '@material-ui/core/Popover';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import CardForm from './cardForm.component';
import { CardFormContext } from '../context/context';

const useStyles = makeStyles({
  root: {
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
    fontSize: '3.5rem',

    '&:hover': {
      cursor: 'pointer',
    },
  },
});

function EditCardPopover({
  tabLabels,
  cardFormData,
  formDispatcher,
  label,
  inputValue,
  openPop,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState(false);

  const changeBg = (stat) => {
    if (stat) {
      [
        ...document.getElementsByClassName('card-side'),
      ].forEach((el) =>
        el.setAttribute('style', 'background: rgba(0,0,0, 0.4);'),
      );
    } else {
      [
        ...document.getElementsByClassName('card-side'),
      ].forEach((el) =>
        el.setAttribute('style', 'background: inheret; '),
      );
    }
  };
  useLayoutEffect(() => changeBg(status));

  const handleClick = () => {
    setAnchorEl(document.getElementById('main'));
    setStatus(!status);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setStatus(!status);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <IconButton
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={(event) => handleClick(event)}
      >
        <EditIcon className={classes.addIcon} />
      </IconButton>
      <Popover
        id={id}
        open={openPop}
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
        <CardFormContext.Provider
          value={{ cardFormData, formDispatcher }}
        >
          <CardForm
            label={label}
            inputValue={inputValue}
            tabLabels={tabLabels}
            cardType="grammar"
          />
        </CardFormContext.Provider>
      </Popover>
    </div>
  );
}

export default EditCardPopover;
