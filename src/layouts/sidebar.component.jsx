import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 3rem;
  width: 20%;
  height: 100%;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 3rem;
  background-color: #ffffff;
`;

function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const useStyles = makeStyles({
  root: {
    width: 'auto',
  },
});

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Wrapper>
      <div className={classes.root}>
        <Paper elevation={0}>
          <List aria-label="main mailbox folders">
            <ListItemLink
              to="/"
              primary="Home"
              icon={<InboxIcon />}
            />
            <Divider />
            <ListItemLink
              to="/kanji"
              primary="Kanji"
              icon={<InboxIcon />}
            />
            <Divider />
            <ListItemLink
              to="/vocab"
              primary="Vocab"
              icon={<DraftsIcon />}
            />
            <Divider />
            <ListItemLink
              to="/grammar"
              primary="Grammar"
              icon={<InboxIcon />}
            />
            <Divider />
            <ListItemLink
              to="/vocab"
              primary="Vocab"
              icon={<DraftsIcon />}
            />
          </List>
        </Paper>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
