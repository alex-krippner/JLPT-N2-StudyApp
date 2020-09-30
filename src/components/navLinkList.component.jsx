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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
  },
});

const NavLinkList = () => {
  const classes = useStyles();

  return (
    <List
      className={classes.navLinkList}
      aria-label="main mailbox folders"
    >
      <div style={{ minHeight: 0 }}>
        <ListItemLink
          to="/"
          primary="home"
          icon={<MonLogo color="black" />}
        />
        <ListItemLink
          to="/kanji"
          primary="kanji"
          icon={<KanjiIcon />}
        />
        <ListItemLink
          to="/vocab"
          primary="vocab"
          icon={<VocabIcon />}
        />
        <ListItemLink
          to="/grammar"
          primary="Grammar"
          icon={<GrammarIcon />}
        />
        <ListItemLink
          to="/reading"
          primary="Reading"
          icon={<ReadingIcon />}
        />
      </div>
    </List>
  );
};

export default NavLinkList;
