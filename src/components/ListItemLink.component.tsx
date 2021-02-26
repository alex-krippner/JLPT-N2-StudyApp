import * as React from 'react';
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
    color: 'var(--color-primary-dark)',

    '&:hover': {
      color: 'var(--color-primary-light)',
    },
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

type ListItemLinkProps = {
  icon: React.ReactNode;
  primary: string;
  to: string;
};

type RenderLinkProps = {
  children: React.ReactNode;
};

const ListItemLink = ({ icon, primary, to }: ListItemLinkProps) => {
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement, RenderLinkProps>(
        (itemProps, ref) => (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <RouterLink to={to} ref={ref} {...itemProps} />
        ),
      ),
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
