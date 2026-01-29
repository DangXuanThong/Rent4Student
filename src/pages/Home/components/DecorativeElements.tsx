import React from 'react';
import { Box } from '@mui/material';
import { decorativeElement1Styles, decorativeElement2Styles } from '../styles/HomePageStyles';

const DecorativeElements: React.FC = () => {
  return (
    <>
      <Box sx={decorativeElement1Styles} />
      <Box sx={decorativeElement2Styles} />
    </>
  );
};

export default DecorativeElements;
