import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

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

import CardForm from '../cardForm/CardForm';
import { deleteGrammar } from '../../redux/grammarCollection.reducer';
import { deleteKanji } from '../../redux/kanjiCollection.reducer';
import { deleteReading } from '../../redux/readingCollection.reducer';
import { deleteVocab } from '../../redux/vocabCollection.reducer';

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

interface CardMenuProps<T, K> {
  front?: string | number | string[] | (string & string[]);
  cardId: string;
  label: CardLabels;
  tabLabels: K[];
  cardData: T;
}

const CardMenu = <T extends CardDataType, K extends TabLabel>({
  front,
  cardId,
  label,
  tabLabels,
  cardData,
}: CardMenuProps<T, K>) => {
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
  // FIXME: use cardData.cardType for control statement
  const handleDelete = () => {
    if (label === '漢字') dispatch(deleteKanji(front));
    if (label === '語彙') dispatch(deleteVocab(front));
    if (label === '文法') dispatch(deleteGrammar(front));
    if (cardData.cardType === 'reading')
      dispatch(deleteReading({ cardId }));
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
          <CardForm
            label={label}
            tabLabels={tabLabels}
            cardType={cardData.cardType}
            editing={edit}
            cardData={cardData}
          />
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
