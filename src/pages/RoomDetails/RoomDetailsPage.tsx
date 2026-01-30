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
  Skeleton,
  Stack,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRoom } from './hooks/useRoom';
import RoomInfo from './components/RoomInfo';
import CommentsSection from './components/CommentsSection';
import { getGoogleMapsUrl } from './services/roomDetailsService';
import {
  containerStyles,
  backButtonStyles,
  cardStyles,
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
        {/* Back Button - Always visible at top */}
        <Button
          variant="text"
          color="inherit"
          onClick={handleBack}
          startIcon={<ArrowBack />}
          sx={backButtonStyles}
        >
          Quay lại
        </Button>

        {/* Loading State with Skeleton */}
        {loading && (
          <Card sx={cardStyles}>
            <CardContent>
              <Skeleton variant="text" width="60%" height={40} />
              <Skeleton variant="text" width="80%" height={25} sx={{ mt: 1 }} />
              <Skeleton variant="rectangular" height={100} sx={{ mt: 2, borderRadius: 1 }} />
              
              <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                <Skeleton variant="text" width={200} height={30} />
                <Skeleton variant="text" width={100} height={30} />
              </Stack>
              
              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Skeleton variant="text" width={150} height={20} />
                <Skeleton variant="text" width={150} height={20} />
              </Stack>
              
              <Skeleton variant="text" width={200} height={20} sx={{ mt: 2 }} />
              <Skeleton variant="rectangular" width={200} height={36} sx={{ mt: 3, borderRadius: 1 }} />
              
              {/* Comments skeleton */}
              <Box sx={{ mt: 4 }}>
                <Skeleton variant="text" width={150} height={30} />
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                  <Skeleton variant="rectangular" height={80} sx={{ borderRadius: 2 }} />
                </Stack>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* Error State */}
        {!loading && error && (
          <Card sx={cardStyles}>
            <CardContent>
              <Typography color="error" align="center" sx={errorTextStyles}>
                {error}
              </Typography>
            </CardContent>
          </Card>
        )}

        {/* Content */}
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
