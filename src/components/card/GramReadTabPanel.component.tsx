import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  grid: {
    height: '100%',
    width: '95%',
  },
});

type GramReadTabpanelProps = {
  value: number;
  index: number;
  children: React.ReactNode;
};

const GramReadTabpanel = ({
  value,
  index,
  children,
}: GramReadTabpanelProps) => {
  const classes = useStyles();

  return (
    <div hidden={value !== index} className={classes.grid}>
      {value === index && (
        <div className={classes.grid}>{children}</div>
      )}
    </div>
  );
};

export default GramReadTabpanel;