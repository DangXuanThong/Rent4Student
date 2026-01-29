import React from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
  onClick: (roomId: string) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onClick }) => {
  return (
    <Card variant="outlined">
      <CardActionArea onClick={() => onClick(room.id)}>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            {room.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            {room.address}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            {room.description}
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ mt: 1.5 }}
            alignItems="center"
          >
            <Typography variant="subtitle1" fontWeight={700} color="primary">
              {room.price.toLocaleString('vi-VN')} đ / tháng
            </Typography>

            <Chip
              size="small"
              label={
                room.emptySlots > 0
                  ? `${room.emptySlots} chỗ trống`
                  : 'Đã hết chỗ'
              }
              color={room.emptySlots > 0 ? 'success' : 'default'}
            />

            <Typography variant="body2" color="text.secondary">
              Đánh giá: {room.totalRatings} / {room.ratingCount} lượt
            </Typography>
          </Stack>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Liên hệ: {room.telephone}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RoomCard;

