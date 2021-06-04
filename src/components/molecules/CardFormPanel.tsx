import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    '&.MuiPaper-elevation4': {
      boxShadow: 'none',
    },
  },
  swipe: {
    overflow: 'auto',
    width: '90%',
    height: '50%',
    border: (props: TabPanelProps) =>
      props.tabLabel === 'passage'
        ? 'none'
        : 'solid 1px var(--color-primary-light)',
  },
  tabPanelGrid: {
    height: '100%',
  },
}));

interface TabPanelProps {
  children: React.ReactNode;
  value: number;
  index: number;
  tabLabel: string;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;
  const classes = useStyles(props);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      className={`${classes.root} ${classes.swipe}`}
    >
      {value === index && (
        <Grid container className={classes.tabPanelGrid}>
          {children}
        </Grid>
      )}
    </div>
  );
};
