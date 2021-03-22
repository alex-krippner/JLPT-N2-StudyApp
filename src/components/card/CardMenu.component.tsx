import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Popover,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core/';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import CardForm from '../cardForm/cardForm.component';
import { deleteGrammar } from '../../redux/grammar/grammarCollection.reducer';
import { deleteKanji } from '../../redux/kanjiCollection/kanjiCollection.reducer';
import { deleteReading } from '../../redux/readingCollection/readingCollection.reducer';
import { deleteVocab } from '../../redux/vocabCollection/vocabCollection.reducer';

import CardFormContext from '../../context/context';

const useStyles = makeStyles({
  root: {
    background: 'rgba(0,0,0,0.4)',

    '& .MuiPopover-paper': {
      overflow: 'visible',
      borderRadius: '1rem',
    },
  },

  menuButton: {
    display: 'flex',
    alignSelf: 'flex-end',
  },

  icon: {
    fontSize: 'var(--font-size-medium)',
    cursor: 'pointer',
  },
});

type CardMenuProps = {
  front: string | number | string[] | (string & string[]);
  cardId: string;
  cardFormData: undefined | CardDataType;
  formDispatcher: undefined | Function;
  label: string;
  tabLabels: string[];
  cardData: CardDataType;
};

const CardMenu = ({
  front,
  cardId,
  cardFormData,
  formDispatcher,
  label,
  tabLabels,
  cardData,
}: CardMenuProps) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [anchorPop, setAnchorPop] = useState(null);
  const [edit, setEdit] = useState(null);
  const openPop = Boolean(anchorPop);
  const openMenu = Boolean(anchorMenu);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorMenu(null);
  };
  const handleClosePop = () => {
    setAnchorPop(null);
  };

  const handleEdit = () => {
    setEdit(false);
  };

  const handlePopover = () => {
    setAnchorPop(document.getElementById(cardId));
    setEdit(true);
  };

  const handleDelete = () => {
    if (label === '漢字') dispatch(deleteKanji(front));
    if (label === '語彙') dispatch(deleteVocab(front));
    if (label === '文法') dispatch(deleteGrammar(front));
    if (label === 'reading') dispatch(deleteReading({ cardId }));
  };

  return (
    <div className={classes.menuButton}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon className={classes.icon} />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorMenu}
        keepMounted
        open={openMenu}
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
          className="edit"
          onClick={() => {
            handleClose();
            handlePopover();
          }}
        >
          <IconButton color="primary" className="edit">
            <EditIcon className={classes.icon} />
          </IconButton>
        </MenuItem>
        <Popover
          open={openPop}
          anchorEl={anchorPop}
          onClose={handleClosePop}
          onExited={handleEdit}
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
              editing={edit}
              cardId={cardId}
              cardData={cardData}
            />
          </CardFormContext.Provider>
        </Popover>
        <MenuItem
          className="delete"
          onClick={() => {
            handleClose();
            handleDelete();
          }}
        >
          <IconButton color="secondary" edge="end" className="bin">
            <DeleteIcon className={classes.icon} />
          </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default CardMenu;

CardMenu.propTypes = {
  cardId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  tabLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  cardData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.number,
    ]),
  ).isRequired,
};