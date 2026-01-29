import React, { useEffect, useState, useCallback } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Stack } from '@mui/material';
import type { Room } from './types';
import SearchResultsHeader from './components/SearchResultsHeader';
import RoomCard from './components/RoomCard';
import RoomFilters from './components/RoomFilters';
import { fetchRooms, type RoomFilterOptions } from './services/roomService';
import {
  resultsContainerStyles,
  resultsInnerCardStyles,
} from './styles/SearchResultsStyles';

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const SearchResultsPage: React.FC = () => {
  const queryParams = useQuery();
  const navigate = useNavigate();
  const searchQuery = (queryParams.get('q') || '').trim();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RoomFilterOptions>({
    sortBy: 'price',
    sortDirection: 'desc',
  });

  const loadRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const filterOptions: RoomFilterOptions = {
        ...filters,
        searchQuery: searchQuery || undefined,
      };

      const fetchedRooms = await fetchRooms(filterOptions);
      setRooms(fetchedRooms);
    } catch (err) {
      console.error(err);
      setError('Không thể tải danh sách phòng trọ. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, [filters, searchQuery]);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  const handleCardClick = (roomId: string) => {
    // Placeholder for future detail page
    console.log('Room clicked:', roomId);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (trimmed) {
      const search = createSearchParams({ q: trimmed }).toString();
      navigate({ pathname: '/search', search: `?${search}` });
    } else {
      navigate('/search');
    }
  };

  const handleFiltersChange = (newFilters: RoomFilterOptions) => {
    setFilters(newFilters);
  };

  return (
    <Box sx={resultsContainerStyles}>
      <Container maxWidth="md" sx={resultsInnerCardStyles}>
        <SearchResultsHeader
          searchQuery={searchQuery}
          onBackHome={handleBackHome}
          onSearch={handleSearch}
        />

        <RoomFilters filters={filters} onFiltersChange={handleFiltersChange} />

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Typography color="error" align="center" mt={4}>
            {error}
          </Typography>
        )}

        {!loading && !error && rooms.length === 0 && (
          <Typography align="center" mt={4}>
            Không có phòng trọ nào được tìm thấy.
          </Typography>
        )}

        {!loading && !error && rooms.length > 0 && (
          <Stack spacing={2}>
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} onClick={handleCardClick} />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default SearchResultsPage;

