import React from 'react';
import { Box } from '@material-ui/core';

const SubSection = (props: any) => (
  <Box {...props}>{props.children}</Box>
);
export default SubSection;
