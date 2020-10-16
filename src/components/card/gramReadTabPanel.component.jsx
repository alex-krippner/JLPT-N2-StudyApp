import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  grid: {
    height: '100%',
  },
});

const GramReadTabpanel = ({ value, index, children }) => {
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

GramReadTabpanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};
