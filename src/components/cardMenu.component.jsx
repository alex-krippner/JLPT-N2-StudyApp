import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CardForm from './cardForm.component';
import { CardFormContext } from '../context/context';

// import EditCardPopover from './editCardPopover.component';

const useStyles = makeStyles({
  root: {
    background: 'rgba(0,0,0,0.4)',
  },

  menuButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },

  icon: {
    fontSize: '2rem',
    cursor: 'pointer',
  },
});

const CardMenu = ({
  front,
  deleteCard,
  cardId,
  cardFormData,
  formDispatcher,
  label,
  inputValue,
  tabLabels,
  cardData,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorPop, setAnchorPop] = useState(null);
  const openPop = Boolean(anchorPop);
  const open = Boolean(anchorEl);

  const handleEdit = (event, f) => {
    if ([...event.currentTarget.classList].includes('edit'))
      console.log('editing', f, event.currentTarget.classList);
  };

  // const deleteCard = (event, f) => {
  //   if ([...event.currentTarget.classList].includes('delete'))
  //     console.log('deleting', f, event.currentTarget.classList);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClosePop = () => {
    setAnchorPop(null);
  };

  const handlePopover = () => {
    setAnchorPop(document.getElementById(cardId));
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.menuButton}
      >
        <MoreVertIcon className={classes.icon} />
      </IconButton>
      <Menu
        // className={classes.root}
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            display: 'flex',
            justifyContent: 'center',
            width: '10ch',
          },
        }}
      >
        <MenuItem
          key={uuidv4()}
          className="edit"
          onClick={(e) => {
            handleClose();
            handleEdit(e, front);
            handlePopover();
          }}
        >
          <IconButton
            variant="contained"
            color="primary"
            className="edit"
          >
            <EditIcon className={classes.icon} />
          </IconButton>
        </MenuItem>
        <Popover
          open={openPop}
          anchorEl={anchorPop}
          onClose={handleClosePop}
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
              cardType={cardData.cardType}
              editing={openPop}
              cardId={cardId}
            />
          </CardFormContext.Provider>
        </Popover>
        <MenuItem
          key={uuidv4()}
          className="delete"
          onClick={() => {
            handleClose();
            deleteCard(front, cardId);
          }}
        >
          <IconButton
            variant="contained"
            color="secondary"
            edge="end"
            className="bin"
          >
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CardMenu;
