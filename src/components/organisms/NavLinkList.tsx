import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";

import { useAuth0 } from "@auth0/auth0-react";
import ListItemLink from "../molecules/ListItemLink";

import MonLogo from "../../../assets/img/LogoMonIcon";
import VocabIcon from "../../../assets/img/VocabIcon";
import KanjiIcon from "../../../assets/img/KanjiIcon";
import ReadingIcon from "../../../assets/img/ReadingIcon";
import GrammarIcon from "../../../assets/img/GrammarIcon";

const useStyles = makeStyles({
  portfolioLink: {
    justifySelf: "flex-start",
    fontSize: "var(--font-size-small)",
    color: "var(--color-primary-dark)",
  },
  navLinkList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    height: "100%",
    width: "100%",
  },
});

const NavLinkList = () => {
  const classes = useStyles();

  const { isAuthenticated, logout } = useAuth0();

  return (
    <List className={classes.navLinkList} aria-label="main mailbox folders">
      {isAuthenticated && (
        <Button onClick={() => logout({ returnTo: window.location.origin })}>
          Log out
        </Button>
      )}
      {isAuthenticated && (
        <div style={{ minHeight: 0 }}>
          <ListItemLink
            to="/"
            primary="home"
            icon={<MonLogo color="black" />}
          />

          <ListItemLink
            to="/new-kanji"
            primary="new kanji"
            icon={<KanjiIcon />}
          />
          <ListItemLink to="/kanji" primary="kanji" icon={<KanjiIcon />} />
          <ListItemLink to="/vocab" primary="vocab" icon={<VocabIcon />} />
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
      )}
    </List>
  );
};

export default NavLinkList;
