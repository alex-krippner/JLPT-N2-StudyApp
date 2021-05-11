import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';

// MATERIAL UI IMPORTS
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

// LOCAL IMPORTS
import FormTabs from './FormTabs';
import CardFormHeader from './CardFormHeader';
import CardFormButtons from './CardFormButtons';
import cardFormReducer from './cardFormReducer';
import CardFormContext from '../../context/context';
import {
  addKanji,
  editKanji,
} from '../../redux/kanjiCollection.reducer';
import {
  addVocab,
  editVocab,
} from '../../redux/vocabCollection.reducer';
import {
  addGrammar,
  editGrammar,
} from '../../redux/grammarCollection.reducer';
import {
  addReading,
  editReading,
} from '../../redux/readingCollection.reducer';

import { initCardFormProperties } from '../../utils/utilitiesFunctions';

import { CardFormStyled } from '../../theme/styledComponents';

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

  footer: {
    justifyContent: 'center',
    margin: '1rem 0',
    height: '15%',
  },
});

interface CardFormProps<T extends CardDataType, K> {
  label: CardLabels;
  tabLabels: K[];
  cardType?: CardType;
  editing?: boolean;
  cardData: T | T[];
}

const CardForm = <T extends CardDataType, K extends TabLabel>({
  label,
  tabLabels,
  cardType,
  editing,
  cardData,
}: CardFormProps<T, K>) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // SETUP INITITIAL CARD FORM REDUCER STATE
  const initCardForm = () => {
    let initState;

    // CREATE CARD FORM OBJECT WITH CARD DATA OF CURRENTLY EDITING CARD
    if (editing) initState = cardData;

    // CREATE AN CARD FORM OBJECT WITH EMPTY DEFAULT VALUES
    // THE FIRST ELEMENT OF THE cardData IS USED AS A TEMPLATE
    if (!editing && Array.isArray(cardData))
      initState = Object.keys(cardData[0]).reduce(
        (d, key) => initCardFormProperties(d, key, label),
        {},
      );
    return initState;
  };

  const [cardFormData, dispatchFormAction] = useReducer(
    cardFormReducer,
    cardData,
    initCardForm,
  );
  const handleChange = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    dispatchFormAction({
      type: 'INPUT_MAIN',
      value,
      label,
    });
  };

  // FIXME: Use cardtype instead of label for consistency
  const handleCreateCard = () => {
    // CREATE A NEW CARD IN THE COLLECTIONS
    if (label === '漢字') dispatch(addKanji(cardFormData));
    if (label === '語彙') dispatch(addVocab(cardFormData));
    if (label === '文法') dispatch(addGrammar(cardFormData));
    if (cardType === 'reading') dispatch(addReading(cardFormData));

    // CLEAR FORM INPUTS BY PASSING initCardForm function as a action method to the FormReducer
    // TODO: I am not sure if putting a method in an action object is good practice???
    dispatchFormAction({
      type: 'RESET',
      resetForm: () => initCardForm(),
    });
  };

  // FIXME: Use cardtype instead of label for consistency
  const handleEditCard = () => {
    if (label === '漢字') dispatch(editKanji(cardFormData));
    if (label === '語彙') dispatch(editVocab(cardFormData));
    if (label === '文法') dispatch(editGrammar(cardFormData));
    if (cardType === 'reading') dispatch(editReading(cardFormData));
  };

  return (
    <CardFormStyled cardType={cardType}>
      <CardFormHeader
        editing={editing}
        cardFormData={cardFormData}
        cardType={cardType}
        label={label}
        handleChange={handleChange}
      />
      <Grid
        container
        className={classes.container}
        id="form-container"
        direction="column"
        justify="space-around"
        alignItems="center"
        wrap="nowrap"
      >
        <CardFormContext.Provider
          value={{ cardFormData, dispatchFormAction }}
        >
          <FormTabs
            tabLabels={tabLabels}
            cardData={cardData as CardDataType}
          />
        </CardFormContext.Provider>
      </Grid>
      <Grid container className={classes.footer}>
        <CardFormButtons
          editing={editing}
          handleCreateCard={handleCreateCard}
          handleEditCard={handleEditCard}
        />
      </Grid>
    </CardFormStyled>
  );
};

export default CardForm;
