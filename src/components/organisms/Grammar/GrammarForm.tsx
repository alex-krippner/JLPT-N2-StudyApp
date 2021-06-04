import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Tab } from '@material-ui/core/';
import { initCardFormProperties } from '../../../utils/utilitiesFunctions';
import cardFormReducer from '../../../state-management/cardFormReducer';
import {
  addGrammar,
  editGrammar,
} from '../../../state-management/redux/grammarCollection.reducer';
import { CardFormStyled } from '../../../theme/styledComponents';
import CardFormHeader from '../../atoms/CardFormHeader';
import CardFormContext from '../../../context/context';
import CardFormButtons from '../../atoms/CardFormButtons';
import CardFormTabs from '../../molecules/CardFormTabs';
import { CardFormInput } from '../../molecules/CardFormInput';
import FormTable from '../../molecules/FormTable';
import { TabPanel } from '../../molecules/CardFormPanel';
import { initCardForm } from '../../../utils/formUtilFunctions';

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

  footer: {
    justifyContent: 'center',
    margin: '1rem 0',
    height: '15%',
  },

  tab: {
    fontSize: 'var(--font-size-small)',
    minWidth: 'auto',
    margin: '0 5px',
  },
});

const inputContainerStyles: Partial<React.CSSProperties> = {
  fontSize: 'var(--font-size-small)',
  justifyContent: 'center',
  marginBottom: '1rem',
  visibility: 'visible',
};

const inputStyles: Partial<React.CSSProperties> = {
  fontSize: 'var(--font-size-small)',
};

interface CardFormProps<T extends CardDataType, K> {
  label: CardLabels;
  tabLabels: K[];
  cardType?: CardType;
  editing?: boolean;
  cardData: T | T[];
}

export const GrammarForm = <
  T extends CardDataType,
  K extends TabLabel
>({
  label,
  tabLabels,
  cardType,
  editing,
  cardData,
}: CardFormProps<T, K>) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [placeholder, setPlaceholder] = useState(tabLabels[0]);
  const [entry, setEntry] = useState({
    value: '',
  });
  const [cardFormData, dispatchFormAction] = useReducer(
    cardFormReducer,
    initCardForm(editing, cardData, label),
  );

  const handleChange = (event: React.ChangeEvent) => {
    const { value } = event.target as HTMLInputElement;
    dispatchFormAction({
      type: 'INPUT_MAIN',
      value,
      label,
    });
  };
  const handleCreateCard = () => {
    dispatch(addGrammar(cardFormData));
    dispatchFormAction({
      type: 'RESET',
      payload: initCardForm(editing, cardData, label),
    });
  };
  const handleEntryInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setEntry({
      value: event.target.value,
    });
  };
  const handleAddEntryBtn = (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const { value } = entry;
    dispatchFormAction({
      type: 'ADD_ENTRY',
      placeholder,
      value,
    });
    setEntry({
      value: '',
    });
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
          <CardFormTabs
            tabValue={tabValue}
            changeTab={(event: React.MouseEvent, newValue: number) =>
              setTabValue(newValue)
            }
          >
            {tabLabels.map((tabLabel) => (
              <Tab
                label={tabLabel}
                classes={{ root: classes.tab }}
                key={tabLabel}
                onClick={() => setPlaceholder(tabLabel)}
              />
            ))}
          </CardFormTabs>
          <CardFormInput
            inputContainerStyles={inputContainerStyles}
            inputStyles={inputStyles}
            handleEntryInput={handleEntryInput}
            handleAddEntryBtn={handleAddEntryBtn}
            placeholder={placeholder}
            entryValue={entry.value}
          />

          {tabLabels.map((tabLabel, index) => (
            <TabPanel
              value={tabValue}
              index={index}
              key={tabLabel}
              tabLabel={tabLabel}
            >
              <FormTable
                entries={cardFormData[tabLabel]}
                entryKey={tabLabel}
              />
            </TabPanel>
          ))}
        </CardFormContext.Provider>
      </Grid>
      <Grid container className={classes.footer}>
        <CardFormButtons
          editing={editing}
          handleCreateCard={handleCreateCard}
          handleEditCard={() => dispatch(editGrammar(cardFormData))}
        />
      </Grid>
    </CardFormStyled>
  );
};
