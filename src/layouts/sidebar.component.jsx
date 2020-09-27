/* eslint-disable no-param-reassign */
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MonLogo from '../img/logoMonIcon';
import VocabIcon from '../img/vocabIcon';
import KanjiIcon from '../img/kanjiIcon';
import ReadingIcon from '../img/readingIcon';
import GrammarIcon from '../img/grammarIcon';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
  width: 20%;
  height: 100%;
  box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  background-color: var(--color-white);
  z-index: 99;
  overflow: auto;
`;

const useStyles = makeStyles({
  sidebarList: {
    maxHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

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
  },

  svgIcon: {
    fontSize: 'var(--font-size-medium)',
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

function ListItemLink(props) {
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
}

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Wrapper>
      <List
        className={classes.sidebarList}
        aria-label="main mailbox folders"
      >
        <ListItemLink
          to="/"
          primary="home"
          icon={<MonLogo fontSize="7rem" color="black" />}
        />
        <ListItemLink
          to="/kanji"
          primary="kanji"
          icon={<KanjiIcon fontSize="7rem" />}
        />
        <ListItemLink
          to="/vocab"
          primary="vocab"
          icon={<VocabIcon fontSize="7rem" />}
        />
        <ListItemLink
          to="/grammar"
          primary="Grammar"
          icon={<GrammarIcon fontSize="7rem" />}
        />
        <ListItemLink
          to="/reading"
          primary="Reading"
          icon={<ReadingIcon fontSize="7rem" />}
        />
      </List>
    </Wrapper>
  );
};

export default Sidebar;
