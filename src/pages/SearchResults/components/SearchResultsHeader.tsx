import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import {
  resultsHeaderTitleStyles,
  resultsHeaderSubtitleStyles,
} from '../styles/SearchResultsStyles';
import SearchBar from '../../Home/components/SearchBar';

interface SearchResultsHeaderProps {
  searchQuery: string;
  onBackHome: () => void;
  onSearch: (query: string) => void;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
  searchQuery,
  onBackHome,
  onSearch,
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearch = () => {
    onSearch(localSearchQuery);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Box onClick={onBackHome} sx={{ cursor: 'pointer', mb: 3 }}>
        <Typography sx={resultsHeaderTitleStyles}>
          Rent4Student
        </Typography>
        <Typography sx={resultsHeaderSubtitleStyles}>
          Kết quả tìm kiếm phòng trọ cho sinh viên
        </Typography>
      </Box>

      <SearchBar
        searchQuery={localSearchQuery}
        onSearchChange={setLocalSearchQuery}
        onSearch={handleSearch}
      />
    </Box>
  );
};

export default SearchResultsHeader;

