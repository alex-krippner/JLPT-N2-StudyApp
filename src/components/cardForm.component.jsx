import React, { useContext } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import FullWidthTabs from './tabs.component';

import KanjiFormContext from '../context/context';

const CardFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 40rem;
  width: 30rem;
  background-color: #ffffff;
  border: solid 1px #708090;
  border-radius: 1rem;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0 1 30%;
    width: 100%;
    border-radius: 0 0 2rem 2rem;

    .card-title {
      position: absolute;
      top: -2rem;
      left: -2rem;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 3rem;
      height: 5rem;
      width: 50%;
      border-radius: 0 2rem 0 2rem;
      background-color: #00ced1;
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
      font-weight: 400;
      font-size: 2rem;
      color: #f5f5f5;
    }
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 70%;
    margin-top: 3rem;
  }
`;

const useStyles = makeStyles({
  root: {
    '& .MuiFormLabel-root': {
      fontSize: '1.5rem',
    },
  },
  container: {
    height: '70%',
  },

  textfield: {
    marginTop: '2.5rem',
  },
});

const CardForm = (props) => {
  const { label, inputValue } = props;
  const classes = useStyles();
  const { dispatchKanjiFormAction } = useContext(KanjiFormContext);

  const handleChange = (event) => {
    const { value } = event.target;

    if (label === '漢字')
      dispatchKanjiFormAction({
        type: 'INPUT_KANJI',
        value,
      });
  };

  return (
    <CardFormStyled>
      <header className="header">
        <h2 className="card-title">Create Card</h2>
        <TextField
          id="outlined-basic"
          label={label}
          value={inputValue}
          variant="outlined"
          className={`${classes.root} ${classes.textfield}`}
          onChange={(event) => handleChange(event)}
        />
      </header>
      <Grid container className={classes.container}>
        <FullWidthTabs />
      </Grid>
    </CardFormStyled>
  );
};

export default CardForm;
