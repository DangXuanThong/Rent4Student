import React from 'react';
import { Box } from '@mui/material';
import { brandWrapperStyles, brandNameStyles, taglineStyles } from '../styles/BrandHeaderStyles';

const BrandHeader: React.FC = () => {
  return (
    <Box sx={brandWrapperStyles}>
      <Box component="h1" sx={brandNameStyles}>
        rent4student
      </Box>
      <Box component="p" sx={taglineStyles}>
        Find Your Perfect Student Home
      </Box>
    </Box>
  );
};

export default BrandHeader;
