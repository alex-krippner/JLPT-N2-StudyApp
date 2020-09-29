import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

import ListItemLink from './ListItemLink.component';

import MonLogo from '../img/logoMonIcon';
import VocabIcon from '../img/vocabIcon';
import KanjiIcon from '../img/kanjiIcon';
import ReadingIcon from '../img/readingIcon';
import GrammarIcon from '../img/grammarIcon';

const useStyles = makeStyles({
  navLinkList: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    width: '100%',
    overflow: 'auto',
  },
});

const NavLinkList = () => {
  const classes = useStyles();

  return (
    <List
      className={classes.navLinkList}
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
  );
};

export default NavLinkList;
