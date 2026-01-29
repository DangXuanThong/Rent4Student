import React from 'react';
import { TextField, InputAdornment, IconButton, Paper } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  searchPaperStyles,
  locationIconStyles,
  searchButtonStyles,
  searchIconStyles,
  textFieldInputStyles,
} from '../styles/SearchBarStyles';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange, onSearch }) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <Paper elevation={12} sx={searchPaperStyles}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by city, university, or neighborhood..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        onKeyPress={handleKeyPress}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocationOnIcon sx={locationIconStyles} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearch} sx={searchButtonStyles}>
                <SearchIcon sx={searchIconStyles} />
              </IconButton>
            </InputAdornment>
          ),
          sx: textFieldInputStyles,
        }}
      />
    </Paper>
  );
};

export default SearchBar;
