import React from 'react';

import { Box } from '@material-ui/core/';

type PanelProps = {
  value: number;
  index: number;
  children: React.ReactNode;
};

const Panel = ({ value, index, children }: PanelProps) => {
  return (
    <Box hidden={value !== index} height="100%" width="95%">
      {value === index && (
        <Box height="100%" width="95%">
          {children}
        </Box>
      )}
    </Box>
  );
};

export default Panel;
