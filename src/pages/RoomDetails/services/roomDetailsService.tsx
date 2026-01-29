import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import type { Room } from '../../SearchResults/types';

/**
 * Fetch a single room by ID from Firestore
 * @param id - Room ID
 * @returns Room data or null if not found
 * @throws Error if fetch fails
 */
export const fetchRoomById = async (id: string): Promise<Room> => {
  const roomRef = doc(db, 'rooms', id);
  const snapshot = await getDoc(roomRef);

  if (!snapshot.exists()) {
    throw new Error('Room not found');
  }

  const data = snapshot.data() as Partial<Room>;

  return {
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
};

/**
 * Generate Google Maps URL for given coordinates
 * @param latitude - Latitude coordinate
 * @param longitude - Longitude coordinate
 * @returns Google Maps search URL
 */
export const getGoogleMapsUrl = (latitude: number, longitude: number): string => {
  return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
};
