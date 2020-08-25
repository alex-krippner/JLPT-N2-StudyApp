import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import IconButton from '@material-ui/core/IconButton';

import Table from './table.component';
import KanjiFormContext from '../context/context';

const useStyles = makeStyles({
  root: {
    '&.MuiAppBar-colorDefault': {
      backgroundColor: 'white',
    },

    '&.MuiPaper-elevation4': {
      boxShadow: 'none',
    },

    '& .MuiBox-root': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: 0,
      width: '80%',
    },
  },

  box: {
    display: 'flex',
    justifyContent: 'center',
    height: '85%',
    width: '100%',
  },

  tab: {
    fontSize: '2rem',
    minWidth: 'auto',
    margin: '0 5px',
  },

  inputContainer: {
    fontSize: '1.5rem',
    justifyContent: 'center',
  },

  input: {
    fontSize: '1.5rem',
  },

  form: {
    display: 'flex',
    alignItems: 'center',
  },
});

function TabPanel(props) {
  const { children, value, index } = props;
  const classes = useStyles();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      className={`${classes.root} ${classes.box} `}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function FullWidthTabs() {
  const classes = useStyles();
  const [entry, setEntry] = useState('');
  const { KanjiFormData, dispatchKanjiFormAction } = useContext(
    KanjiFormContext,
  );

  const [tabValue, setTabValue] = useState(0);

  // const [entries, setEntry] = useState({
  //   kanji: '',
  //   読み: [],
  //   単語例: [],
  //   用例: [],
  //   newEntry: '',
  //   editIdx: -1,
  // });

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // const handleEntry = (event, key) => {
  //   const { value } = event.target;

  //   setEntry((state) => ({ ...state, [key]: value }));
  // };

  const handleEntry = (event) => setEntry(event.target.value);

  // const handleSubmit = (entryKey, event) => {
  //   event.preventDefault();
  //   const { newEntry } = entries;
  //   setEntry((state) => ({
  //     ...state,
  //     [entryKey]: [...state[entryKey], newEntry],
  //     newEntry: '',
  //   }));
  // };

  const handleSubmit = (entryKey, event) => {
    event.preventDefault();

    // conditional dispatch methods
    if (
      entryKey === '読み' ||
      entryKey === '単語例' ||
      entryKey === '用例'
    )
      // dispatch to kanji form reducer
      dispatchKanjiFormAction({
        type: 'ADD_ENTRY',
        entryKey,
        entry,
      });
  };

  // const handleEdit = (event, entryIdx, entryKey) => {
  //   const { value } = event.target;
  //   setEntry((state) => ({
  //     ...state,
  //     [entryKey]: state[entryKey].map((el, idx) =>
  //       idx === entryIdx ? value : el,
  //     ),
  //   }));
  // };

  // const startEdit = (entryIdx) => {
  //   setEntry((state) => ({
  //     ...state,
  //     editIdx: entryIdx,
  //   }));
  // };

  // const endEdit = () => {
  //   setEntry((state) => ({
  //     ...state,
  //     editIdx: -1,
  //   }));
  // };

  // const handleRemove = (entryKey, entryIdx) => {
  //   setEntry((state) => ({
  //     ...state,
  //     [entryKey]: state[entryKey].filter(
  //       (el, idx) => idx !== entryIdx,
  //     ),
  //   }));
  // };

  console.log(KanjiFormData);
  return (
    <>
      <AppBar
        position="static"
        color="default"
        className={classes.root}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          aria-label="full width tabs example"
          centered
        >
          <Tab label="読み" classes={{ root: classes.tab }} />
          <Tab label="単語例" classes={{ root: classes.tab }} />
          <Tab label="用例" classes={{ root: classes.tab }} />
        </Tabs>
      </AppBar>

      <TabPanel value={tabValue} index={0}>
        <Grid
          container
          spacing={1}
          alignItems="center"
          className={classes.inputContainer}
        >
          <form
            className={classes.form}
            onSubmit={(event) => handleSubmit('読み', event)}
          >
            <Grid item>
              <Input
                name="読み"
                value={entry}
                className={classes.input}
                onChange={(event) => handleEntry(event)}
              />
            </Grid>
            <Grid item>
              <IconButton
                id="読み"
                onClick={(event) => handleSubmit('読み', event)}
              >
                <AddCircleOutlineIcon fontSize="large" />
              </IconButton>
            </Grid>
          </form>
        </Grid>

        <Table entries={KanjiFormData.読み} entryKey="読み" />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Item Three
      </TabPanel>
    </>
  );
}
