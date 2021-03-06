import React from 'react';

import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import MonLogo from '../../assets/img/LogoMonIcon';

const useStyles = makeStyles(() => ({
  container: {
    height: '100%',
  },
  headerContainer: {
    position: 'relative',
    height: '40%',
    flexBasis: 0,
  },
  header: {
    position: 'relative',
    color: 'var(--color-primary-dark)',
    fontSize: '15rem',
  },
  monLogo: {
    position: 'absolute',
    right: 0,
  },

  welcomeHeader: {
    fontSize: '4rem',
    marginBottom: '4rem',
    color: 'var(--color-primary-dark)',
  },

  intro: {
    width: '50%',
    alignSelf: 'center',
    margin: '4rem',
  },

  paragraph: {
    fontSize: '1.5rem',
    color: 'var(--color-primary-dark)',
  },
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="flex-start"
      className={classes.container}
      wrap="nowrap"
    >
      <Grid
        container
        item
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        xs={6}
        className={classes.headerContainer}
      >
        <Typography variant="h1" className={classes.header}>
          Mon
          <MonLogo color="black" position="absolute" />
        </Typography>
      </Grid>
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignItems="flex-start"
        className={classes.intro}
      >
        <Typography
          variant="h2"
          gutterBottom
          className={classes.welcomeHeader}
        >
          Welcome!
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.paragraph}
        >
          Mon allows you to create and collect custom flash cards to
          help you prepare for the JLPT N2 exam.
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.paragraph}
        >
          The format of the flash cards is based on the Shin Kanzen
          Master Books.
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.paragraph}
        >
          You can create, edit, and delete cards. By clicking the
          daruma icon (the little dude) on the bottom of card you can
          rate how familiar you are with the card&apos;s material.
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.paragraph}
        >
          At the moment, the flash cards will be saved to your
          browser&apos;s local storage.
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          className={classes.paragraph}
        >
          I am planning to develop more features, but hope that this
          app can already help you in your studies.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomeView;
