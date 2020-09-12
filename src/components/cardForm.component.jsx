import React, { useReducer } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

// MATERIAL UI IMPORTS
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// LOCAL IMPORTS
import FullWidthTabs from './tabs.component';
import { CardFormContext } from '../context/context';
import {
  addKanji,
  editKanji,
} from '../redux/kanjiCollection/kanjiCollection.actionCreators';
import {
  addVocab,
  editVocab,
} from '../redux/vocabCollection/vocabCollection.actionCreators';
import {
  addGrammar,
  editGrammar,
} from '../redux/grammar/grammarCollection.actionCreators';
import {
  addReading,
  editReading,
} from '../redux/readingCollection/readingCollection.actionCreators';

const CardFormStyled = styled.div.attrs((props) => ({
  height:
    props.cardType === 'grammar' || props.cardType === 'reading'
      ? '55rem'
      : '45rem',
  width:
    props.cardType === 'grammar' || props.cardType === 'reading'
      ? '110rem'
      : '32rem',
  cardTitlePosition:
    props.cardType === 'grammar' || props.cardType === 'reading'
      ? '5px'
      : '-2rem',
  cardTitleWidth:
    props.cardType === 'grammar' || props.cardType === 'reading'
      ? '25%'
      : '50%',
}))`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  background-color: var(--color-white);
  border: solid 1px #708090;
  border-radius: 1rem;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);

  .header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex: ${(props) =>
      props.cardType === 'reading' ? '0 1 20%' : '0 1 30%'};
    width: 100%;
    margin-bottom: ${(props) =>
      props.cardType === 'reading' ? '0' : '2rem'};
    border-radius: 0 0 2rem 2rem;
    height: 15%;

    .card-title {
      position: absolute;
      top: ${(props) => props.cardTitlePosition};
      left: ${(props) => props.cardTitlePosition};
      z-index: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: ${(props) => props.cardTitlePosition};
      height: 5rem;
      width: ${(props) => props.cardTitleWidth};
      border-radius: 0 2rem 0 2rem;
      background-color: var(--color-green-light);
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
      font-weight: 400;
      font-size: var(--font-size-medium);
      color: var(--color-white-dark);
    }

    .card-front {
      align-self: flex-end;
      font-size: var(--font-size-large);
      color: var(--color-blue-cadet);
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
      fontSize: 'var(--font-size-small)',
    },
    '& .MuiInputBase-input': {
      fontSize: 'var(--font-size-small)',
    },
  },
  container: {
    height: '60%',
  },

  textfield: {
    marginTop: '2.5rem',
  },

  textfieldLabel: {
    fontSize: 'var(--font-size-small)',
  },

  footer: {
    justifyContent: 'center',
    margin: '1rem 0',
    height: '15%',
  },

  submitButton: {
    height: '75%',
    textTransform: 'capitalize',
    backgroundColor: 'var(--color-blue-medium)',
    fontSize: 'var(--font-size-small)',

    '&:hover': {
      backgroundColor: 'var(--color-blue-dark)',
    },
  },

  buttonLabel: {
    textTransform: 'capitalize',
    fontSize: 'var(--font-size-small)',
  },
});

const FormReducer = (state, action) => {
  switch (action.type) {
    case 'INPUT_MAIN':
      return {
        ...state,
        [action.label]: action.value,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        [action.placeholder]: [
          ...state[action.placeholder],
          action.value,
        ],
      };
    case 'ADD_PASSAGE':
      return {
        ...state,
        passage: action.value,
      };

    case 'EDIT_ENTRY':
      return {
        ...state,
        [action.key]: state[action.key].map((el, idx) =>
          idx === action.entryIdx ? action.value : el,
        ),
      };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        [action.key]: state[action.key].filter(
          (el, idx) => idx !== action.entryIdx,
        ),
      };
    case 'RESET':
      return action.resetForm(action.payload);

    default:
      return state;
  }
};

const CardForm = (props) => {
  const {
    label,
    tabLabels,
    addKanjiDispatcher,
    addVocabDispatcher,
    addGrammarDispatcher,
    editKanjiDispatcher,
    editVocabDispatcher,
    editGrammarDispatcher,
    addReadingDispatcher,
    editReadingDispatcher,
    cardType,
    editing,
    cardData,
    handleClose,
  } = props;
  const classes = useStyles();

  // SETUP INITITIAL CARD FORM REDUCER STATE
  const initCardForm = () => {
    let initState;

    // CREATE CARD FORM OBJECT WITH CARD DATA OF CURRENTLY EDITING CARD
    if (editing) initState = cardData;

    // CREATE AN CARD FORM OBJECT WITH EMPTY DEFAULT VALUES
    // THE FIRST ELEMENT OF THE cardData IS USED AS A TEMPLATE
    if (!editing)
      initState = Object.keys(cardData[0]).reduce((d, key) => {
        if (key === 'rating') {
          return {
            ...d,
            rating: 0,
          };
        }
        if (key === 'id') {
          return {
            ...d,
            id: '',
          };
        }
        if (key === label) {
          return {
            ...d,
            [label]: '',
          };
        }
        if (key === 'cardType') {
          return {
            ...d,
            cardType: '',
          };
        }
        if (key === 'passage') {
          return {
            ...d,
            passage: '',
          };
        }
        return {
          ...d,
          [key]: [],
        };
      }, {});
    return initState;
  };
  const [cardFormData, dispatchFormAction] = useReducer(
    FormReducer,
    cardData,
    initCardForm,
  );

  const handleChange = (event) => {
    const { value } = event.target;
    dispatchFormAction({
      type: 'INPUT_MAIN',
      value,
      label,
    });
  };
  const handleCreateCard = () => {
    if (label === '漢字') addKanjiDispatcher(cardFormData);
    if (label === '語彙') addVocabDispatcher(cardFormData);
    if (label === '文法') addGrammarDispatcher(cardFormData);
    if (label === 'reading') addReadingDispatcher(cardFormData);

    // CLEAR FORM INPUTS BY PASSING initCardForm function as a action method to the FormReducer
    // TODO: I am not sure if putting a method in an action object is good practice???
    dispatchFormAction({
      type: 'RESET',
      resetForm: (payloadData) => initCardForm(payloadData),
      payload: cardData,
    });
    handleClose();
  };

  const handleEditCard = () => {
    if (label === '漢字') editKanjiDispatcher(cardFormData);
    if (label === '語彙') editVocabDispatcher(cardFormData);
    if (label === '文法') editGrammarDispatcher(cardFormData);
    if (label === 'reading') editReadingDispatcher(cardFormData);
  };

  return (
    <CardFormStyled cardType={cardType}>
      <header className="header">
        {editing ? (
          <>
            <h2
              style={{
                background: 'rgba(255,160,150)',
              }}
              className="card-title"
            >
              Edit Card
            </h2>
            <h2 className="card-front">{cardFormData[label]} </h2>
          </>
        ) : (
          <>
            <h2 className="card-title">New Card</h2>
            {cardType === 'reading' ? (
              ''
            ) : (
              <TextField
                id="outlined-basic"
                label={label}
                value={cardFormData[label]}
                variant="outlined"
                className={`${classes.root} ${classes.textfield}`}
                onChange={(event) => handleChange(event)}
              />
            )}
          </>
        )}
      </header>
      <Grid
        container
        className={classes.container}
        id="form-container"
        direction="column"
        justify="space-around"
        alignItems="center"
      >
        <CardFormContext.Provider
          value={{ cardFormData, dispatchFormAction }}
        >
          <FullWidthTabs tabLabels={tabLabels} cardData={cardData} />
        </CardFormContext.Provider>
      </Grid>
      <Grid container className={classes.footer}>
        {editing ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            classes={{
              label: classes.buttonLabel,
              root: classes.submitButton,
            }}
            onClick={(event) => handleEditCard(event)}
          >
            Make Changes
          </Button>
        ) : (
          <Button
            height="50%"
            variant="contained"
            color="primary"
            size="large"
            classes={{
              label: classes.buttonLabel,
              root: classes.submitButton,
            }}
            onClick={(event) => handleCreateCard(event)}
          >
            Create Card
          </Button>
        )}
      </Grid>
    </CardFormStyled>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addKanjiDispatcher: (cardFormData) =>
    dispatch(addKanji(cardFormData)),
  editKanjiDispatcher: (cardFormData) =>
    dispatch(editKanji(cardFormData)),
  addVocabDispatcher: (cardFormData) =>
    dispatch(addVocab(cardFormData)),
  editVocabDispatcher: (cardFormData) =>
    dispatch(editVocab(cardFormData)),
  addGrammarDispatcher: (cardFormData) =>
    dispatch(addGrammar(cardFormData)),
  editGrammarDispatcher: (cardFormData) =>
    dispatch(editGrammar(cardFormData)),
  addReadingDispatcher: (cardFormData) =>
    dispatch(addReading(cardFormData)),
  editReadingDispatcher: (cardFormData) =>
    dispatch(editReading(cardFormData)),
});

export default connect(null, mapDispatchToProps)(CardForm);
