import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    '& .MuiBox-root': {
      padding: 0,
    },
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
    border: '1px solid',
    padding: 0,
  },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}

export default () => {
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {generate(
        <ListItem>
          <ListItemText primary="Single-line item" />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon fontSize="large" />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>,
      )}
    </List>
  );
};
