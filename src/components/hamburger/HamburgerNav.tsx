import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import NavLinkList from '../NavLinkList.component';

const useStyles = makeStyles({
  navDrawer: {
    width: '45%',
  },
});

type HamburgerNavProps = {
  open: boolean;
  handleOpen: React.MouseEventHandler;
};

const HamburgerNav = ({ open, handleOpen }: HamburgerNavProps) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={handleOpen}
      classes={{ paper: classes.navDrawer }}
    >
      <NavLinkList />
    </Drawer>
  );
};

export default HamburgerNav;
