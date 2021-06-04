import React, { useContext, useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Grid,
  IconButton,
  Input,
  Tab,
  Tabs,
} from '@material-ui/core';

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import CardFormContext from '../../context/context';

import * as utils from '../../utils/utilitiesFunctions';
import FormTable from './FormTable';
import CardFormTabs from './CardFormTabs';
import { CardFormInput } from './CardFormInput';

const useStyles = makeStyles(() => ({
  root: {
    '&.MuiPaper-elevation4': {
      boxShadow: 'none',
    },
  },

  tab: {
    fontSize: 'var(--font-size-small)',
    minWidth: 'auto',
    margin: '0 5px',
  },

  inputContainer: {
    fontSize: 'var(--font-size-small)',
    justifyContent: 'center',
    marginBottom: '1rem',
    visibility: 'visible',
  },

  inputContainerHidden: {
    fontSize: 'var(--font-size-small)',
    justifyContent: 'center',
    marginBottom: '1rem',
    visibility: 'hidden',
  },

  input: {
    fontSize: 'var(--font-size-small)',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  swipe: {
    overflow: 'auto',
    width: '90%',
    height: '50%',
    border: (props: TabPanelProps) =>
      props.tabLabel === 'passage'
        ? 'none'
        : 'solid 1px var(--color-primary-light)',
  },
  tabPanelGrid: {
    height: '100%',
  },

  textAreaPassage: {
    height: '100%',
    width: '100%',
    resize: 'none',
    border: 'solid 1px var(--color-primary-light)',
    outline: 'none',

    '&:focus': {
      border: 'solid 2px var(--color-primary-medium)',
    },
  },
}));

const inputContainerStyles: Partial<React.CSSProperties> = {
  fontSize: 'var(--font-size-small)',
  justifyContent: 'center',
  marginBottom: '1rem',
  visibility: 'visible',
};

const inputStyles: Partial<React.CSSProperties> = {
  fontSize: 'var(--font-size-small)',
};

type TabPanelProps = {
  children: React.ReactNode;
  value: number;
  index: number;
  tabLabel: string;
};

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;
  const classes = useStyles(props);
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      className={`${classes.root} ${classes.swipe}`}
    >
      {value === index && (
        <Grid container className={classes.tabPanelGrid}>
          {children}
        </Grid>
      )}
    </div>
  );
};

interface FormTabsProps<T, K> {
  tabLabels: K[];
  cardData: T;
}

const FormTabs = <T extends CardDataType, K extends TabLabel>({
  tabLabels,
  cardData,
}: FormTabsProps<T, K>) => {
  const classes = useStyles();
  const { cardFormData, dispatchFormAction } = useContext(
    CardFormContext,
  );

  /*
   ********************************************
   */

  // COMPONENT LOCAL STATE

  const [tabValue, setTabValue] = useState(0);

  const changeTab = (event: React.MouseEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const [placeholder, setPlaceholder] = useState(tabLabels[0]);
  const [entry, setEntry] = useState({
    value: '',
  });

  // CHANGE THE ENTRY INPUT PLACEHOLDER TO THE CORRESPONDING ENTRY KEY AS YOU CLICK ON THE TABS
  const handlePlaceholder = (curKey: any) => setPlaceholder(curKey);
  const handleEntryInput = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    console.log(event.target.value);
    setEntry({
      value: event.target.value,
    });
  };

  useEffect(() => {
    const inputContainer = document.getElementById(
      'grid-entry-input',
    );

    inputContainer.classList.add(classes.inputContainerHidden);

    if (placeholder !== 'passage')
      inputContainer.classList.remove(classes.inputContainerHidden);
  });

  /*
   ********************************************
   */

  // CARD FORM REDUCER HANDLER

  const handleAddEntryBtn = (
    event:
      | React.MouseEvent<HTMLAnchorElement>
      | React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    const { value } = entry;
    // dispatch to form reducer
    dispatchFormAction({
      type: 'ADD_ENTRY',
      placeholder,
      value,
    });
    setEntry({
      value: '',
    });
  };

  const handleEditPassage = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = event.target;
    dispatchFormAction({
      type: 'ADD_PASSAGE',
      value,
    });
  };

  return (
    <>
      <CardFormTabs tabValue={tabValue} changeTab={changeTab}>
        {tabLabels.map((tabLabel) => (
          <Tab
            label={tabLabel}
            classes={{ root: classes.tab }}
            key={tabLabel}
            onClick={() => handlePlaceholder(tabLabel)}
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
          {tabLabel === 'passage' ? (
            <textarea
              value={cardFormData.passage}
              className={classes.textAreaPassage}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement>,
              ) => handleEditPassage(event)}
              key={tabLabel}
              id="passage-input"
            />
          ) : (
            <FormTable
              entries={cardFormData[tabLabel]}
              entryKey={tabLabel}
            />
          )}
        </TabPanel>
      ))}
    </>
  );
};

export default FormTabs;
