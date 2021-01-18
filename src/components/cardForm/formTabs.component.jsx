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

import FormTable from './FormTable.component';
import { CardFormContext } from '../../context/context';

import * as utils from '../../utils/utilitiesFunctions';

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
    border: (props) =>
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

const TabPanel = (props) => {
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
        <Grid container p={3} className={classes.tabPanelGrid}>
          {children}
        </Grid>
      )}
    </div>
  );
};

const FormTabs = ({ tabLabels, cardData }) => {
  const classes = useStyles();
  const { cardFormData, dispatchFormAction } = useContext(
    CardFormContext,
  );

  /*
   ********************************************
   */

  // COMPONENT LOCAL STATE

  const [tabValue, setTabValue] = useState(0);

  const changeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const [placeholder, setPlaceholder] = useState(tabLabels[0]);
  const [entry, setEntry] = useState({
    value: '',
  });

  // CHANGE THE ENTRY INPUT PLACEHOLDER TO THE CORRESPONDING ENTRY KEY AS YOU CLICK ON THE TABS
  const handlePlaceholder = (curKey) => setPlaceholder(curKey);
  const handleEntryInput = (event) => {
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

  const handleAddEntryBtn = (event) => {
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

  const handleEditPassage = (event) => {
    const { value } = event.target;
    dispatchFormAction({
      type: 'ADD_PASSAGE',
      value,
    });
  };

  return (
    <>
      <AppBar
        position="static"
        color="transparent"
        className={classes.root}
      >
        <Tabs
          value={tabValue}
          onChange={changeTab}
          indicatorColor="primary"
          textColor="primary"
          aria-label="full width tabs"
          variant="fullWidth"
        >
          {tabLabels.map((tabLabel) => (
            <Tab
              label={tabLabel}
              classes={{ root: classes.tab }}
              key={tabLabel}
              onClick={() => handlePlaceholder(tabLabel)}
            />
          ))}
        </Tabs>
      </AppBar>

      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.inputContainer}
        height="15%"
        id="grid-entry-input"
      >
        <Grid item xs={6}>
          <Input
            fullWidth
            value={entry.value}
            className={classes.input}
            onChange={(event) => handleEntryInput(event)}
            placeholder={utils.capitalizeFirstWord(placeholder)}
            id="entry-input"
          />
        </Grid>
        <Grid item>
          <IconButton
            onClick={(event) => {
              handleAddEntryBtn(event);
            }}
          >
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>

      {tabLabels.map((tabLabel, index) => (
        <TabPanel
          value={tabValue}
          index={index}
          key={tabLabel}
          style={{ overflow: 'inheret' }}
          tabLabel={tabLabel}
        >
          {tabLabel === 'passage' ? (
            <textarea
              value={cardFormData.passage}
              className={classes.textAreaPassage}
              onChange={(event) => handleEditPassage(event)}
              key={cardData.id}
              id="passage-input"
            />
          ) : (
            <FormTable
              entries={cardFormData[tabLabel]}
              entryKey={tabLabel}
              height="100%"
            />
          )}
        </TabPanel>
      ))}
    </>
  );
};

export default FormTabs;