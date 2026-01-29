import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
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

const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Get search query from URL
  const searchQuery = (searchParams.get('q') || '').trim();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Parse filters from URL parameters
  const getFiltersFromURL = useCallback((): RoomFilterOptions => {
    const sortBy = searchParams.get('sortBy') as 'price' | 'rating' || 'price';
    const sortDirection = searchParams.get('sortDirection') as 'asc' | 'desc' || 'desc';
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');

    return {
      sortBy,
      sortDirection,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      minRating: minRating ? Number(minRating) : undefined,
    };
  }, [searchParams]);

  const [filters, setFilters] = useState<RoomFilterOptions>(getFiltersFromURL());

  // Separate filters: dropdowns apply immediately, text inputs are debounced
  const [immediateFilters, setImmediateFilters] = useState<Pick<RoomFilterOptions, 'sortBy' | 'sortDirection'>>(() => {
    const urlFilters = getFiltersFromURL();
    return {
      sortBy: urlFilters.sortBy || 'price',
      sortDirection: urlFilters.sortDirection || 'desc',
    };
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

  // Sync filters to URL whenever they change
  useEffect(() => {
    const params = new URLSearchParams();
    
    // Keep search query
    if (searchQuery) {
      params.set('q', searchQuery);
    }
    
    // Add filter parameters
    if (filters.sortBy) params.set('sortBy', filters.sortBy);
    if (filters.sortDirection) params.set('sortDirection', filters.sortDirection);
    if (filters.minPrice !== undefined) params.set('minPrice', filters.minPrice.toString());
    if (filters.maxPrice !== undefined) params.set('maxPrice', filters.maxPrice.toString());
    if (filters.minRating !== undefined) params.set('minRating', filters.minRating.toString());
    
    // Update URL without triggering navigation
    setSearchParams(params, { replace: true });
  }, [filters, searchQuery, setSearchParams]);

  // Sync filters from URL when URL changes (e.g., browser back/forward)
  useEffect(() => {
    const urlFilters = getFiltersFromURL();
    setFilters(urlFilters);
    setImmediateFilters({
      sortBy: urlFilters.sortBy || 'price',
      sortDirection: urlFilters.sortDirection || 'desc',
    });
  }, [searchParams, getFiltersFromURL]);

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
    navigate(`/rooms/${roomId}`);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    const params = new URLSearchParams(searchParams);
    
    if (trimmed) {
      params.set('q', trimmed);
    } else {
      params.delete('q');
    }
    
    setSearchParams(params);
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
