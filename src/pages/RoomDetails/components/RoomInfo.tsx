import React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import type { Room } from '../../SearchResults/types';

interface RoomInfoProps {
  room: Room;
  onOpenMaps: () => void;
}

const RoomInfo: React.FC<RoomInfoProps> = ({ room, onOpenMaps }) => {
  // Calculate average rating
  const calculateAverageRating = (): number => {
    if (room.ratingCount === 0) return 0;
    return room.totalRatings / room.ratingCount;
  };

  return (
    <>
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
          Đánh giá: {calculateAverageRating().toFixed(1)} ⭐ ({room.ratingCount} lượt)
        </Typography>
      </Stack>

      <Typography variant="body2" sx={{ mt: 2 }}>
        Liên hệ: {room.telephone}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={onOpenMaps}
        disabled={!room.latitude && !room.longitude}
      >
        Mở trên Google Maps
      </Button>
    </>
  );
};

export default RoomInfo;
