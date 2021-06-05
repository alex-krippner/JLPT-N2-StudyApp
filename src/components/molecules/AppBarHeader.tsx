import React from 'react';
import { AppBar, Tab, Tabs } from '@material-ui/core/';

interface AppBarHeaderProps {
  appBarStyles: React.CSSProperties;
  tabLabels: string[];
  tabStyles: React.CSSProperties;
  value: number;
  handleChange: (
    event: React.ChangeEvent<{}>,
    newValue?: number,
  ) => void;
}

const AppBarHeader = ({
  appBarStyles,
  tabStyles,
  tabLabels,
  value,
  handleChange,
}: AppBarHeaderProps) => {
  return (
    <AppBar
      position="static"
      color="transparent"
      style={appBarStyles}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="full width tabs"
        variant="fullWidth"
      >
        {tabLabels.map((label) => (
          <Tab key={label} style={tabStyles} label={label} />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default AppBarHeader;
