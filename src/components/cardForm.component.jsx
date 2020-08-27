import React, { useContext } from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { makeStyles } from '@material-ui/core/styles';

import FullWidthTabs from './tabs.component';

import KanjiFormContext from '../context/context';

const CardFormStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 45rem;
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
    '& .MuiInputBase-input': {
      fontSize: '1.5rem',
    },
  },
  container: {
    height: '70%',
    justifyContent: 'center',
  },

  textfield: {
    marginTop: '2.5rem',
  },

  textfieldLabel: {
    fontSize: '1.5rem',
  },

  footer: {
    justifyContent: 'center',
    margin: '1rem 0',
  },

  submitButton: {
    fontSize: '1.5rem',
  },
});

const CardForm = (props) => {
  const { label, inputValue, tabLabels } = props;
  const classes = useStyles();
  const { dispatchKanjiFormAction, createKanjiCard } = useContext(
    KanjiFormContext,
  );

  const handleChange = (event) => {
    const { value } = event.target;

    if (label === '漢字')
      dispatchKanjiFormAction({
        type: 'INPUT_KANJI',
        value,
      });
  };

  const handleCreateCard = () => {
    if (label === '漢字') createKanjiCard();
  };

  return (
    <CardFormStyled>
      <header className="header">
        <h2 className="card-title">New Card</h2>
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
        <FullWidthTabs tabLabels={tabLabels} />
      </Grid>
      <Grid container className={classes.footer}>
        <form>
          <Button
            variant="contained"
            color="primary"
            size="large"
            classes={{ label: classes.submitButton }}
            onClick={handleCreateCard}
            type="submit"
          >
            Create Card
          </Button>
        </form>
      </Grid>
    </CardFormStyled>
  );
};

export default CardForm;
