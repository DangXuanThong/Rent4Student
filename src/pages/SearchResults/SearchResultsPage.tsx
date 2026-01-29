import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, CircularProgress, Stack } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Room } from './types';
import SearchResultsHeader from './SearchResultsHeader';
import RoomCard from './RoomCard';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const SearchResultsPage: React.FC = () => {
  const queryParams = useQuery();
  const navigate = useNavigate();
  const searchQuery = (queryParams.get('q') || '').trim();

  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        setError(null);

        const roomsColRef = collection(db, 'rooms');
        const snapshot = await getDocs(roomsColRef);

        const docs: Room[] = snapshot.docs.map((doc) => {
          const data = doc.data() as Partial<Room>;
          return {
            id: doc.id,
            name: data.name ?? '',
            description: data.description ?? '',
            price: data.price ?? 0,
            emptySlots: data.emptySlots ?? 0,
            longitude: data.longitude ?? 0,
            latitude: data.latitude ?? 0,
            totalRatings: data.totalRatings ?? 0,
            ratingCount: data.ratingCount ?? 0,
            telephone: data.telephone ?? '',
            address: data.address ?? '',
          };
        });

        setRooms(docs);
      } catch (err) {
        console.error(err);
        setError('Không thể tải danh sách phòng trọ. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = useMemo(() => {
    if (!searchQuery) return rooms;
    const q = searchQuery.toLowerCase();
    return rooms.filter((room) => {
      return (
        room.name.toLowerCase().includes(q) ||
        room.address.toLowerCase().includes(q) ||
        room.description.toLowerCase().includes(q)
      );
    });
  }, [rooms, searchQuery]);

  const handleCardClick = (roomId: string) => {
    // Placeholder for future detail page
    console.log('Room clicked:', roomId);
  };

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f7', py: 4 }}>
      <Container maxWidth="md">
        <SearchResultsHeader searchQuery={searchQuery} onBackHome={handleBackHome} />

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

        {!loading && !error && filteredRooms.length === 0 && (
          <Typography align="center" mt={4}>
            Không tìm thấy phòng trọ phù hợp với từ khóa của bạn.
          </Typography>
        )}

        {!loading && !error && filteredRooms.length > 0 && (
          <Stack spacing={2}>
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} onClick={handleCardClick} />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default SearchResultsPage;

