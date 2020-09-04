import React, { useContext, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

import Table from './table.component';
import { CardFormContext } from '../context/context';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.inheret,

    '&.MuiAppBar-colorDefault': {
      backgroundColor: 'white',
    },

    '&.MuiPaper-elevation4': {
      boxShadow: 'none',
    },
  },

  tab: {
    fontSize: '2rem',
    minWidth: 'auto',
    margin: '0 5px',
  },

  inputContainer: {
    fontSize: '1.5rem',
    justifyContent: 'center',
    marginBottom: '1rem',
  },

  input: {
    fontSize: '1.5rem',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  swipe: {
    overflow: 'inherit',
    width: '90%',
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
        <Grid container p={3}>
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

  // LOCAL STATE

  const [tabValue, setTabValue] = useState(0);

  const changeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const [placeholder, setPlaceholder] = useState(tabLabels[0]);
  const [entry, setEntry] = useState({
    value: '',
  });

  const handlePlaceholder = (curKey) => setPlaceholder(curKey);
  const handleEntry = (event) => {
    setEntry({
      value: event.target.value,
    });
  };

  /*
   ********************************************
   */

  // FORM REDUCER HANDLERS

  const handleAddEntry = (event) => {
    event.preventDefault();
    const { value } = entry;

    // conditional dispatch methods

    // dispatch to kanji form reducer
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
      <Grid
        container
        spacing={1}
        alignItems="center"
        className={classes.inputContainer}
      >
        <Grid item>
          <Input
            value={entry.value}
            className={classes.input}
            onChange={(event) => handleEntry(event)}
            placeholder={placeholder}
            id="entry-input"
          />
        </Grid>
        <Grid item>
          <IconButton
            onClick={(event) => {
              handleAddEntry(event);
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
          key={uuidv4()}
          style={{ overflow: 'inheret' }}
        >
          <Table
            entries={cardFormData[tabLabel]}
            entryKey={tabLabel}
          />
        </TabPanel>
      ))}
    </>
  );
}
