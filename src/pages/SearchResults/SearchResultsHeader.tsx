import React from 'react';
import { Box, Chip, Typography } from '@mui/material';

interface SearchResultsHeaderProps {
  searchQuery: string;
  onBackHome: () => void;
}

const SearchResultsHeader: React.FC<SearchResultsHeaderProps> = ({
  searchQuery,
  onBackHome,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
      }}
    >
      <Box onClick={onBackHome} sx={{ cursor: 'pointer' }}>
        <Typography variant="h5" fontWeight={700}>
          Rent4Student
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Kết quả tìm kiếm phòng trọ cho sinh viên
        </Typography>
      </Box>

      {searchQuery && (
        <Chip
          label={`Từ khóa: "${searchQuery}"`}
          color="primary"
          variant="outlined"
        />
      )}
    </Box>
  );
};

export default SearchResultsHeader;

