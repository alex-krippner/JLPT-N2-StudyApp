import React from 'react';
import { Box } from '@material-ui/core';

const Section = (props: any) => {
  return <Box {...props}>{props.children}</Box>;
};

export default Section;
