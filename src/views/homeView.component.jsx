import React from 'react';

import { Grid, Typography } from '@material-ui/core';

import DarumaIcon from '../img/darumaIcon';

const Home = () => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="flex-start"
    >
      <Grid
        container
        item
        direction="row"
        justify="flex-start"
        alignItems="center"
        xs={6}
      >
        <Typography variant="h1" gutterBottom>
          Mon
        </Typography>{' '}
        <DarumaIcon
          fontSize="5rem"
          colorBodyLight="#add8e6"
          colorBodyDark="#4169E1"
          colorBodyDarkTwo="#3f51b5"
        />
      </Grid>
      <Grid
        container
        item
        direction="column"
        justify="center"
        alignItems="flex-start"
      >
        <Typography variant="h2" gutterBottom>
          Welcome!{' '}
        </Typography>{' '}
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Quos blanditiis tenetur unde suscipit, quam beatae
          rerum inventore consectetur, neque doloribus, cupiditate
          numquam dignissimos laborum fugiat deleniti? Eum quasi
          quidem quibusdam.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Home;
