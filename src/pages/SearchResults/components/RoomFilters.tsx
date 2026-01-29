import React from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Stack,
  Paper,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import type { SortField, SortDirection, RoomFilterOptions } from '../services/roomService';

interface RoomFiltersProps {
  filters: RoomFilterOptions;
  onFiltersChange: (filters: RoomFilterOptions) => void;
}

const RoomFilters: React.FC<RoomFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleSortFieldChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      sortBy: event.target.value as SortField,
    });
  };

  const handleSortDirectionChange = (event: SelectChangeEvent<string>) => {
    onFiltersChange({
      ...filters,
      sortDirection: event.target.value as SortDirection,
    });
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onFiltersChange({
      ...filters,
      minPrice: value === '' ? undefined : Number(value),
    });
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onFiltersChange({
      ...filters,
      maxPrice: value === '' ? undefined : Number(value),
    });
  };

  const handleMinRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onFiltersChange({
      ...filters,
      minRating: value === '' ? undefined : Number(value),
    });
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2.5,
        mb: 3,
        bgcolor: 'rgba(255, 255, 255, 0.98)',
        borderRadius: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2,
          fontWeight: 600,
          color: '#1e293b',
          fontSize: '1.1rem',
        }}
      >
        Bộ lọc và Sắp xếp
      </Typography>

      <Stack spacing={2.5}>
        {/* Sort Options */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sắp xếp theo</InputLabel>
            <Select
              value={filters.sortBy || 'price'}
              label="Sắp xếp theo"
              onChange={handleSortFieldChange}
            >
              <MenuItem value="price">Giá thuê</MenuItem>
              <MenuItem value="rating">Đánh giá</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Thứ tự</InputLabel>
            <Select
              value={filters.sortDirection || 'desc'}
              label="Thứ tự"
              onChange={handleSortDirectionChange}
            >
              <MenuItem value="asc">Tăng dần</MenuItem>
              <MenuItem value="desc">Giảm dần</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* Price Range */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Giá tối thiểu (đ/tháng)"
            type="number"
            value={filters.minPrice || ''}
            onChange={handleMinPriceChange}
            inputProps={{ min: 0 }}
          />
          <TextField
            fullWidth
            size="small"
            label="Giá tối đa (đ/tháng)"
            type="number"
            value={filters.maxPrice || ''}
            onChange={handleMaxPriceChange}
            inputProps={{ min: 0 }}
          />
        </Stack>

        {/* Other Filters */}
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            size="small"
            label="Đánh giá tối thiểu"
            type="number"
            value={filters.minRating || ''}
            onChange={handleMinRatingChange}
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            helperText="Từ 0 đến 5"
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default RoomFilters;
