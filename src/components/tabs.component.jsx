import React, { useState } from 'react';
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
  const [entries, setEntry] = useState({
    newEntry: '',
    読み: [],
    単語例: [],
    用例: [],
    editIdx: -1,
  });

  const getRef = (node) => {
    if (!node) return;
    node.firstElementChild.focus();
  };

  const classes = useStyles();
  const [tabValue, setTabValue] = useState(0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEntry = (event) => {
    const { value } = event.target;

    setEntry({ ...entries, newEntry: value });
  };

  const handleEdit = (event, entryIdx, entryKey) => {
    const { value } = event.target;
    setEntry({
      ...entries,
      [entryKey]: entries[entryKey].map((el, idx) =>
        idx === entryIdx ? value : el,
      ),
    });
  };

  const startEdit = (entryIdx) => {
    setEntry({
      ...entries,
      editIdx: entryIdx,
    });
  };

  const endEdit = () => {
    setEntry({
      ...entries,
      editIdx: -1,
    });
  };

  const handleSubmit = (entryKey, event) => {
    event.preventDefault();
    const { newEntry } = entries;
    setEntry({
      ...entries,
      [entryKey]: [...entries[entryKey], newEntry],
      newEntry: '',
    });
  };

  console.log(entries);
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
                value={entries.newEntry}
                className={classes.input}
                onChange={handleEntry}
                required="true"
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

        <Table
          entries={entries.読み}
          entryKey="読み"
          handleEdit={handleEdit}
          startEdit={startEdit}
          endEdit={endEdit}
          editIdx={entries.editIdx}
          getRef={getRef}
        />
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
