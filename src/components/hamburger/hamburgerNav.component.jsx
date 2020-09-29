import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

import NavLinkList from '../navLinkList.component';

const useStyles = makeStyles({
  navDrawer: {
    width: '45%',
  },
});

const HamburgerNav = (props) => {
  const classes = useStyles();

  const { open, setOpen } = props;

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      classes={{ paper: classes.navDrawer }}
    >
      <NavLinkList />
    </Drawer>
  );
};

export default HamburgerNav;
