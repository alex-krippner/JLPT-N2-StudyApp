import React from 'react';
import PropTypes from 'prop-types';

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

  const { open, handleOpen } = props;

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

HamburgerNav.propTypes = {
  open: PropTypes.bool.isRequired,
  handleOpen: PropTypes.func.isRequired,
};

export default HamburgerNav;
