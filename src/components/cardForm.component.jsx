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
import { addGrammar } from '../redux/grammar/grammarCollection.actionCreators';

const CardFormStyled = styled.div.attrs((props) => ({
  height: props.cardType === 'grammar' ? '50rem' : '45rem',
  width: props.cardType === 'grammar' ? '70rem' : '32rem',
  cardTitlePosition: props.cardType === 'grammar' ? '5px' : '-2rem',
  cardTitleWidth: props.cardType === 'grammar' ? '25%' : '50%',
}))`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
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
    margin-bottom: 2rem;

    border-radius: 0 0 2rem 2rem;

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
      background-color: #66cdaa;
      box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.2);
      font-weight: 400;
      font-size: 2rem;
      color: #f5f5f5;
    }

    .card-front {
      align-self: flex-end;
      font-size: 4rem;
      color: #5f9ea0;
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
    textTransform: 'capitalize',
    backgroundColor: '#4169E1',
    fontSize: '1.5rem',

    '&:hover': {
      backgroundColor: '#000080',
    },
  },

  buttonLabel: { textTransform: 'capitalize', fontSize: '1.5rem' },
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
    cardType,
    editing,
    cardData,
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
  };

  const handleEditCard = () => {
    if (label === '漢字') editKanjiDispatcher(cardFormData);
    if (label === '語彙') editVocabDispatcher(cardFormData);
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
            <TextField
              id="outlined-basic"
              label={label}
              value={cardFormData[label]}
              variant="outlined"
              className={`${classes.root} ${classes.textfield}`}
              onChange={(event) => handleChange(event)}
            />
          </>
        )}
      </header>
      <Grid
        container
        className={classes.container}
        id="form-container"
      >
        <CardFormContext.Provider
          value={{ cardFormData, dispatchFormAction }}
        >
          <FullWidthTabs tabLabels={tabLabels} />
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
});

export default connect(null, mapDispatchToProps)(CardForm);
