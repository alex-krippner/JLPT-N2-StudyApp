import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CardForm from './cardForm.component';
import { deleteCard } from '../redux/utils.actionCreator';

import { CardFormContext } from '../context/context';

const useStyles = makeStyles({
  root: {
    background: 'rgba(0,0,0,0.4)',

    '& .MuiPopover-paper': {
      overflow: 'visible',
      borderRadius: '1rem',
    },
  },

  menuButton: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
  },

  icon: {
    fontSize: 'var(--font-size-medium)',
    cursor: 'pointer',
  },
});

const CardMenu = ({
  front,
  cardId,
  cardFormData,
  formDispatcher,
  label,
  tabLabels,
  cardData,
  deleteCardDispatcher,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorPop, setAnchorPop] = useState(null);
  const openPop = Boolean(anchorPop);
  const open = Boolean(anchorEl);

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
          onClick={() => {
            handleClose();
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
              tabLabels={tabLabels}
              cardType={cardData.cardType}
              editing={openPop}
              cardId={cardId}
              cardData={cardData}
            />
          </CardFormContext.Provider>
        </Popover>
        <MenuItem
          key={uuidv4()}
          className="delete"
          onClick={() => {
            handleClose();
            deleteCardDispatcher(front, cardId);
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

const mapDispatchToProps = (dispatch) => ({
  deleteCardDispatcher: (card, cardId) =>
    dispatch(deleteCard(card, cardId)),
});

export default connect(null, mapDispatchToProps)(CardMenu);
