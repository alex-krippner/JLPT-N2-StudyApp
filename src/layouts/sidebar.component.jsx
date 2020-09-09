import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import TranslateIcon from '@material-ui/icons/Translate';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GavelIcon from '@material-ui/icons/Gavel';
import NoteIcon from '@material-ui/icons/Note';

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
  background-color: var(--color-white);
`;

const useStyles = makeStyles({
  root: {
    width: 'auto',
    height: '80%',
    // border: 'solid 1px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  MuiPaperRoot: {
    height: '100%',
  },

  MuiListRoot: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
  },

  // list: {
  //   border: 'solid 1px',
  //   borderRadius: '10rem',
  // },

  listItemText: {
    fontSize: 'var(--font-size-small)',
  },

  svgIcon: {
    fontSize: 'var(--font-size-medium)',
  },

  listButton: {
    borderRadius: '1rem',
    '&:hover': {
      background: 'rgba(80, 130, 186, 0.3)',
    },
    '&:focus': {
      background: 'rgba(0, 0, 0   , 0.1) ',
    },
  },
});

function ListItemLink(props) {
  const classes = useStyles();

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
    <li className={classes.list}>
      <ListItem
        button
        component={renderLink}
        classes={{
          root: classes.listButton,
        }}
      >
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText
          classes={{
            primary: classes.listItemText,
          }}
          primary={primary}
        />
      </ListItem>
    </li>
  );
}

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Wrapper>
      <div className={classes.root}>
        <Paper className={classes.MuiPaperRoot} elevation={0}>
          <List
            className={classes.MuiListRoot}
            aria-label="main mailbox folders"
          >
            <ListItemLink
              to="/"
              primary="Home"
              icon={<HomeIcon className={classes.svgIcon} />}
            />
            <ListItemLink
              to="/kanji"
              primary="Kanji"
              icon={<TranslateIcon className={classes.svgIcon} />}
            />
            <ListItemLink
              to="/vocab"
              primary="Vocab"
              icon={<NoteIcon className={classes.svgIcon} />}
            />
            <ListItemLink
              to="/grammar"
              primary="Grammar"
              icon={<GavelIcon className={classes.svgIcon} />}
            />
            <ListItemLink
              to="/reading"
              primary="Reading"
              icon={<MenuBookIcon className={classes.svgIcon} />}
            />
          </List>
        </Paper>
      </div>
    </Wrapper>
  );
};

export default Sidebar;
