import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  list: {
    width: '100%',
  },

  listItemIcon: {
    flex: '1 1 auto',
  },

  listItemText: {
    textTransform: 'capitalize',
    fontSize: 'var(--font-size-small)',
    fontFamily: 'var(--font-family-main)',
    color: 'var(--color-primary-light)',
  },

  listButton: {
    display: 'flex',
    justifyContent: 'space-evenly',
    borderRadius: '1rem',

    '&:focus': {
      background: 'rgba(0, 0, 0   , 0.1) ',
    },
  },
});

const ListItemLink = (props) => {
  const { icon, primary, to } = props;

  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li className={classes.list}>
      <ListItem
        button
        component={renderLink}
        classes={{
          root: classes.listButton,
        }}
      >
        {icon ? (
          <ListItemIcon className={classes.listItemIcon}>
            {icon}
          </ListItemIcon>
        ) : null}
        <ListItemText
          id={primary}
          classes={{
            primary: classes.listItemText,
          }}
          primary={primary}
        />
      </ListItem>
    </li>
  );
};

export default ListItemLink;
