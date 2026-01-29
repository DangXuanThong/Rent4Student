import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Stack,
  Typography,
  Divider,
  Avatar,
  Paper,
} from '@mui/material';
import { ChatBubbleOutline } from '@mui/icons-material';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import type { Room } from '../SearchResults/types';

const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate average rating
  const calculateAverageRating = (room: Room | null): number => {
    if (!room || room.ratingCount === 0) return 0;
    return room.totalRatings / room.ratingCount;
  };

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) {
        setError('Không tìm thấy mã phòng trọ.');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const roomRef = doc(db, 'rooms', id);
        const snapshot = await getDoc(roomRef);

        if (!snapshot.exists()) {
          setError('Phòng trọ không tồn tại hoặc đã bị xoá.');
          return;
        }

        const data = snapshot.data() as Partial<Room>;

        const mappedRoom: Room = {
          id: snapshot.id,
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
          comments: data.comments ?? [],
        };

        setRoom(mappedRoom);
      } catch (err) {
        console.error(err);
        setError('Không thể tải thông tin phòng trọ. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenGoogleMaps = () => {
    if (!room) return;
    const { latitude, longitude } = room;
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        px: 2,
        boxSizing: 'border-box',
      }}
    >
      <Container maxWidth="md">
        <Button variant="text" color="inherit" onClick={handleBack} sx={{ mb: 2 }}>
          ← Quay lại
        </Button>

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Typography color="error" align="center" mt={4}>
            {error}
          </Typography>
        )}

        {!loading && !error && room && (
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: '0 24px 80px rgba(15, 23, 42, 0.35)',
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {room.name}
              </Typography>

              <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                {room.address}
              </Typography>

              <Typography variant="body1" sx={{ mt: 2 }}>
                {room.description}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ mt: 3 }} alignItems="center">
                <Typography variant="h6" color="primary" fontWeight={700}>
                  Giá: {room.price.toLocaleString('vi-VN')} đ / tháng
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Chỗ trống: {room.emptySlots > 0 ? `${room.emptySlots} chỗ` : 'Đã hết chỗ'}
                </Typography>
              </Stack>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }} alignItems="center">
                <Typography variant="body2" color="text.secondary">
                  Toạ độ: {room.latitude}, {room.longitude}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Đánh giá: {calculateAverageRating(room).toFixed(1)} ⭐ ({room.ratingCount} lượt)
                </Typography>
              </Stack>

              <Typography variant="body2" sx={{ mt: 2 }}>
                Liên hệ: {room.telephone}
              </Typography>

              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={handleOpenGoogleMaps}
                disabled={!room.latitude && !room.longitude}
              >
                Mở trên Google Maps
              </Button>

              {/* Comments Section */}
              {room.comments && room.comments.length > 0 && (
                <>
                  <Divider sx={{ mt: 4, mb: 3 }} />
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <ChatBubbleOutline sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6" fontWeight={600}>
                      Bình luận ({room.comments.length})
                    </Typography>
                  </Box>

                  <Stack spacing={2}>
                    {room.comments
                      .filter((comment) => comment && comment.text) // Filter out invalid comments
                      .map((comment, index) => {
                        const username = comment.name || 'Anonymous';
                        const userInitial = username.charAt(0).toUpperCase();
                        
                        return (
                          <Paper
                            key={index}
                            elevation={1}
                            sx={{
                              p: 2,
                              bgcolor: 'rgba(248, 250, 252, 0.8)',
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                              <Avatar
                                sx={{
                                  bgcolor: 'primary.main',
                                  width: 36,
                                  height: 36,
                                  fontSize: '0.9rem',
                                }}
                              >
                                {userInitial}
                              </Avatar>
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="subtitle2"
                                  fontWeight={600}
                                  sx={{ mb: 0.5, color: 'text.primary' }}
                                >
                                  {username}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  {comment.text}
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        );
                      })}
                  </Stack>
                </>
              )}

              {/* No Comments Message */}
              {(!room.comments || room.comments.length === 0) && (
                <>
                  <Divider sx={{ mt: 4, mb: 3 }} />
                  <Box sx={{ textAlign: 'center', py: 3 }}>
                    <ChatBubbleOutline sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      Chưa có bình luận nào cho phòng trọ này
                    </Typography>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default RoomDetailsPage;
