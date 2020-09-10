import React, { useContext, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

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

import Table from './table.component';
import { CardFormContext } from '../context/context';

import * as utils from '../utils/utilitiesFunctions';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.inheret,

    '&.MuiAppBar-colorDefault': {
      backgroundColor: 'var(--color-white)',
    },

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
    border: 'solid 1px lightblue',
  },
  tabPanelGrid: {
    height: '100%',
  },

  textAreaPassage: {
    height: '100%',
    width: '100%',
  },
}));

function TabPanel(props) {
  const { children, value, index } = props;
  const classes = useStyles();
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
}

export default function FullWidthTabs(props) {
  const { tabLabels } = props;
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
  return (
    <>
      <AppBar
        position="static"
        color="default"
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
              key={uuidv4()}
              onClick={() => handlePlaceholder(tabLabel)}
            />
          ))}
        </Tabs>
      </AppBar>
      {placeholder === 'passage' ? (
        ''
      ) : (
        <Grid
          container
          spacing={1}
          alignItems="center"
          className={classes.inputContainer}
          height="15%"
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
      )}

      {tabLabels.map((tabLabel, index) => (
        <TabPanel
          value={tabValue}
          index={index}
          key={uuidv4()}
          style={{ overflow: 'inheret' }}
        >
          {tabLabel === 'passage' ? (
            <textarea className={classes.textAreaPassage} />
          ) : (
            <Table
              entries={cardFormData[tabLabel]}
              entryKey={tabLabel}
              height="100%"
            />
          )}
        </TabPanel>
      ))}
    </>
  );
}
