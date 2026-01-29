import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from '@mui/material';
import { useRoom } from './hooks/useRoom';
import RoomInfo from './components/RoomInfo';
import CommentsSection from './components/CommentsSection';
import { getGoogleMapsUrl } from './services/roomDetailsService';
import {
  containerStyles,
  backButtonStyles,
  cardStyles,
  loadingBoxStyles,
  errorTextStyles,
} from './styles/RoomDetailsStyles';

const RoomDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { room, loading, error } = useRoom(id);

  const handleBack = () => {
    navigate(-1);
  };

  const handleOpenGoogleMaps = () => {
    if (!room) return;
    const url = getGoogleMapsUrl(room.latitude, room.longitude);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Box sx={containerStyles}>
      <Container maxWidth="md">
        <Button variant="text" color="inherit" onClick={handleBack} sx={backButtonStyles}>
          ← Quay lại
        </Button>

        {loading && (
          <Box sx={loadingBoxStyles}>
            <CircularProgress />
          </Box>
        )}

        {!loading && error && (
          <Typography color="error" align="center" sx={errorTextStyles}>
            {error}
          </Typography>
        )}

        {!loading && !error && room && (
          <Card sx={cardStyles}>
            <CardContent>
              <RoomInfo room={room} onOpenMaps={handleOpenGoogleMaps} />
              <CommentsSection comments={room.comments} />
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default RoomDetailsPage;
