import React from 'react';
import { Box } from '@mui/material';
import {
  statsContainerStyles,
  statItemStyles,
  statNumberStyles,
  statLabelStyles,
} from '../styles/StatsSectionStyles';

export interface Stat {
  number: string;
  label: string;
}

interface StatsSectionProps {
  stats: Stat[];
}

const StatsSection: React.FC<StatsSectionProps> = ({ stats }) => {
  return (
    <Box sx={statsContainerStyles}>
      {stats.map((stat, index) => (
        <Box key={index} sx={statItemStyles(index)}>
          <Box sx={statNumberStyles}>{stat.number}</Box>
          <Box sx={statLabelStyles}>{stat.label}</Box>
        </Box>
      ))}
    </Box>
  );
};

export default StatsSection;
