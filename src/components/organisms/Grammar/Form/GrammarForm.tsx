import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Box, Tab } from '@material-ui/core/';
import cardFormReducer from '../../../../state-management/cardFormReducer';
import {
  addGrammar,
  editGrammar,
} from '../../../../state-management/redux/grammarCollection.reducer';
import CardFormHeader from '../../../atoms/CardFormHeader';
import CardFormContext from '../../../../context/context';
import CardFormButtons from '../../../atoms/CardFormButtons';
import CardFormTabs from '../../../molecules/CardFormTabs';
import { CardFormInput } from '../../../molecules/CardFormInput';
import FormTable from '../../../molecules/FormTable';
import { TabPanel } from '../../../molecules/CardFormPanel';
import { initCardForm } from '../../../../utils/formUtilFunctions';
import {
  cardFrontStyles,
  cardTitleStyles,
  headerStyles,
  inputContainerStyles,
  inputStyles,
} from './styles';

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

interface CardFormProps<T extends CardDataType> {
  editing?: boolean;
  cardData: T | T[];
}

export const GrammarForm = <T extends CardDataType>({
  editing,
  cardData,
}: CardFormProps<T>) => {
  const label = '文法';
  const tabLabels: TabLabel[] = [
    'variations',
    '意味',
    '接続',
    '用例',
  ];
  const classes = useStyles();
  const dispatch = useDispatch();
  const [tabValue, setTabValue] = useState(0);
  const [placeholder, setPlaceholder] = useState(tabLabels[0]);
  const [cardFormData, dispatchFormAction] = useReducer(
    cardFormReducer,
    initCardForm(editing, cardData, label),
  );
  const handleCreateCard = () => {
    dispatch(addGrammar(cardFormData));
    dispatchFormAction({
      type: 'RESET',
      payload: initCardForm(editing, cardData, label),
    });
  };

  return (
    <CardFormContext.Provider
      value={{ cardFormData, dispatchFormAction }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        height="75vh"
        width="75vw"
        style={{ backgroundColor: 'var(--color-white)' }}
        border="solid 1px #708090"
        borderRadius="1rem"
        boxShadow="0px 0px 5px 1px rgba(0, 0, 0, 0.2)"
      >
        <CardFormHeader
          editing={editing}
          cardFormData={cardFormData}
          hasTextfield
          label={label}
          styles={{ headerStyles, cardTitleStyles, cardFrontStyles }}
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
            placeholder={placeholder}
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
        </Grid>
        <Grid container className={classes.footer}>
          <CardFormButtons
            editing={editing}
            handleCreateCard={handleCreateCard}
            handleEditCard={() => dispatch(editGrammar(cardFormData))}
          />
        </Grid>
      </Box>
    </CardFormContext.Provider>
  );
};
