import React, { useState } from 'react';

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
interface CardMenuProps {
  cardId: string;
  CardFormComponent?: any;
  handleDelete?: () => void;
}
const CardMenu = ({
  cardId,
  CardFormComponent,
  handleDelete,
}: CardMenuProps) => {
  const classes = useStyles();
  const [anchorMenu, setAnchorMenu] = useState(null);
  const [anchorPop, setAnchorPop] = useState(null);
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

  const handlePopover = () => {
    setAnchorPop(document.getElementById(cardId));
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
        data-testid="long-menu"
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
          data-testid="edit-menu-item"
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
          {CardFormComponent}
        </Popover>
        <MenuItem
          className="delete"
          data-testid="delete-menu-item"
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
