import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Button from '@material-ui/core/Button';

import ListItemLink from './ListItemLink';

import MonLogo from '../../assets/img/LogoMonIcon';
import VocabIcon from '../../assets/img/VocabIcon';
import KanjiIcon from '../../assets/img/KanjiIcon';
import ReadingIcon from '../../assets/img/ReadingIcon';
import GrammarIcon from '../../assets/img/GrammarIcon';

const useStyles = makeStyles({
  portfolioLink: {
    justifySelf: 'flex-start',
    fontSize: 'var(--font-size-small)',
    color: 'var(--color-primary-dark)',
  },
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
      <Button
        href="http://alexkrippner.com/"
        className={classes.portfolioLink}
        startIcon={<ArrowBackIcon fontSize="large" />}
      >
        To Portfolio
      </Button>
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
