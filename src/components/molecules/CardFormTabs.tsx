import React from 'react';
import { AppBar, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    '&.MuiPaper-elevation4': {
      boxShadow: 'none',
    },
  },
}));

interface CardFormTabsProps {
  children: React.ReactNode;
  tabValue: number;
  changeTab: (event: React.MouseEvent, newValue: number) => void;
}

const CardFormTabs = ({
  tabValue,
  changeTab,
  children,
}: CardFormTabsProps) => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      color="transparent"
      className={classes.root}
    >
      <Tabs
        value={tabValue}
        onChange={changeTab}
        indicatorColor="primary"
        textColor="primary"
        aria-label="full width tabs"
        variant="fullWidth"
      >
        {children}
      </Tabs>
    </AppBar>
  );
};

export default CardFormTabs;
