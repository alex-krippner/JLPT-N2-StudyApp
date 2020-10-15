import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  grid: {
    height: '100%',
  },
});

const GramReadTabpanel = (props) => {
  const { value, index, children } = props;
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
