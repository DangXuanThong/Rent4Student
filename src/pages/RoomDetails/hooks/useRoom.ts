import { useEffect, useState } from 'react';
import type { Room } from '../../SearchResults/types';
import { fetchRoomById } from '../services/roomDetailsService';

interface UseRoomResult {
  room: Room | null;
  loading: boolean;
  error: string | null;
}

/**
 * Custom hook to fetch room data by ID
 * @param id - Room ID to fetch
 * @returns Object containing room data, loading state, and error state
 */
export const useRoom = (id: string | undefined): UseRoomResult => {
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoom = async () => {
      if (!id) {
        setError('Không tìm thấy mã phòng trọ.');
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const roomData = await fetchRoomById(id);
        setRoom(roomData);
      } catch (err) {
        console.error(err);
        if (err instanceof Error && err.message === 'Room not found') {
          setError('Phòng trọ không tồn tại hoặc đã bị xoá.');
        } else {
          setError('Không thể tải thông tin phòng trọ. Vui lòng thử lại sau.');
        }
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id]);

  return { room, loading, error };
};
