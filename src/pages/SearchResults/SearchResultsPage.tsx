import React, { useEffect, useState, useRef } from 'react';
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Stack } from '@mui/material';
import type { Room } from './types';
import SearchResultsHeader from './components/SearchResultsHeader';
import RoomCard from './components/RoomCard';
import RoomFilters from './components/RoomFilters';
import { fetchRooms, type RoomFilterOptions } from './services/roomService';
import { useDebounce } from '../../hooks/useDebounce';
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

  // Separate filters: dropdowns apply immediately, text inputs are debounced
  const [immediateFilters, setImmediateFilters] = useState<Pick<RoomFilterOptions, 'sortBy' | 'sortDirection'>>({
    sortBy: 'price',
    sortDirection: 'desc',
  });
  
  // Debounce text input filters (price, rating) to avoid excessive queries while typing
  const debouncedTextFilters = useDebounce(
    {
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      minRating: filters.minRating,
    },
    1000
  );

  // Combine immediate filters (dropdowns) with debounced filters (text inputs)
  const effectiveFilters: RoomFilterOptions = {
    ...immediateFilters,
    ...debouncedTextFilters,
  };

  // Track previous effective filters to detect actual changes
  const prevFiltersKeyRef = useRef<string>('');
  const isInitialLoadRef = useRef<boolean>(true);
  const roomsRef = useRef<Room[]>(rooms);

  // Update rooms ref when rooms change
  useEffect(() => {
    roomsRef.current = rooms;
  }, [rooms]);

  // Load rooms when filters or search query change
  useEffect(() => {
    // Create a stable string representation of current filters
    const currentFiltersKey = JSON.stringify({
      ...effectiveFilters,
      searchQuery: searchQuery || undefined,
    });

    // Skip if filters haven't actually changed (prevents unnecessary calls during debounce)
    if (prevFiltersKeyRef.current === currentFiltersKey && !isInitialLoadRef.current) {
      return;
    }

    // Mark previous key before async operation
    prevFiltersKeyRef.current = currentFiltersKey;

    const loadRooms = async () => {
      // Mark that we're loading (only if we have rooms to show, or it's initial load)
      if (roomsRef.current.length > 0 || isInitialLoadRef.current) {
        setLoading(true);
      }
      
      setError(null);

      try {
        const filterOptions: RoomFilterOptions = {
          ...effectiveFilters,
          searchQuery: searchQuery || undefined,
        };

        const fetchedRooms = await fetchRooms(filterOptions);
        setRooms(fetchedRooms);
        isInitialLoadRef.current = false;
      } catch (err) {
        console.error(err);
        setError('Không thể tải danh sách phòng trọ. Vui lòng thử lại sau.');
        isInitialLoadRef.current = false;
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, [effectiveFilters, searchQuery]);

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
    
    // Update immediate filters if sort options changed (for instant dropdown response)
    if (newFilters.sortBy !== undefined || newFilters.sortDirection !== undefined) {
      setImmediateFilters({
        sortBy: newFilters.sortBy ?? immediateFilters.sortBy,
        sortDirection: newFilters.sortDirection ?? immediateFilters.sortDirection,
      });
    }
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

