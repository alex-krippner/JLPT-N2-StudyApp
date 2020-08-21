import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import FormList from './list.component';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
  },

  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '85%',
    width: '100%',
  },

  tab: {
    fontSize: '2rem',
    minWidth: 'auto',
    margin: '0 5px',
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
      className={classes.box}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default function FullWidthTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
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

      <TabPanel value={value} index={0}>
        <FormList />
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </>
  );
}
