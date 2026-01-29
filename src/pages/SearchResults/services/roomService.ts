import {
  collection,
  query,
  getDocs,
  orderBy,
  where,
  QueryConstraint,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { matchesVietnameseSearch } from '../../../utils/vietnameseTextUtils';
import type { Room } from '../types';

export type SortField = 'price' | 'rating';
export type SortDirection = 'asc' | 'desc';

export interface RoomFilterOptions {
  sortBy?: SortField;
  sortDirection?: SortDirection;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  searchQuery?: string;
}

/**
 * Calculate average rating from totalRatings and ratingCount
 */
const calculateRating = (room: Partial<Room>): number => {
  if (!room.ratingCount || room.ratingCount === 0) return 0;
  return (room.totalRatings ?? 0) / room.ratingCount;
};

/**
 * Fetch rooms from Firestore with filtering and sorting
 */
export const fetchRooms = async (
  filterOptions: RoomFilterOptions = {}
): Promise<Room[]> => {
  try {
    const {
      sortBy = 'price',
      sortDirection = 'desc',
      minPrice,
      maxPrice,
      minRating,
      searchQuery,
    } = filterOptions;

    const roomsColRef = collection(db, 'rooms');
    const constraints: QueryConstraint[] = [];

    // Apply filters using Firestore where clauses
    if (minPrice !== undefined) {
      constraints.push(where('price', '>=', minPrice));
    }
    if (maxPrice !== undefined) {
      constraints.push(where('price', '<=', maxPrice));
    }

    // Note: Rating filtering is done client-side since it's calculated
    // Firestore doesn't support computed fields in queries

    // Apply primary sorting
    // Firestore can only sort by indexed fields, so we'll fetch and sort client-side
    // for rating (since it's computed) and handle price server-side when possible
    let firestoreSortField: string | null = null;
    if (sortBy === 'price') {
      firestoreSortField = 'price';
      constraints.push(orderBy('price', sortDirection));
    } else {
      // Default: sort by emptySlots descending when no primary sort
      constraints.push(orderBy('emptySlots', 'desc'));
    }

    // Build query
    const q = constraints.length > 0 ? query(roomsColRef, ...constraints) : roomsColRef;
    const snapshot = await getDocs(q);

    // Map documents to Room objects
    let rooms: Room[] = snapshot.docs.map((doc) => {
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
        comments: data.comments ?? [],
      };
    });

    // Client-side filtering for rating (computed field)
    if (minRating !== undefined) {
      rooms = rooms.filter((room) => calculateRating(room) >= minRating);
    }

    // Client-side text search with Vietnamese character normalization
    // This allows searching "da nang" to match "đà nẵng"
    if (searchQuery && searchQuery.trim()) {
      const trimmedQuery = searchQuery.trim();
      rooms = rooms.filter(
        (room) =>
          matchesVietnameseSearch(room.name, trimmedQuery) ||
          matchesVietnameseSearch(room.address, trimmedQuery) ||
          matchesVietnameseSearch(room.description, trimmedQuery)
      );
    }

    // Client-side sorting for rating (computed field)
    if (sortBy === 'rating') {
      rooms.sort((a, b) => {
        const ratingA = calculateRating(a);
        const ratingB = calculateRating(b);
        const primaryComparison = sortDirection === 'asc'
          ? ratingA - ratingB
          : ratingB - ratingA;
        
        // Secondary sort by emptySlots descending
        if (primaryComparison === 0) {
          return b.emptySlots - a.emptySlots;
        }
        return primaryComparison;
      });
    } else if (firestoreSortField === 'price') {
      // For price sorting, ensure emptySlots is secondary sort (already done server-side)
      // But we need to handle client-side in case of ties or if server-side didn't apply
      rooms.sort((a, b) => {
        const primaryComparison = sortDirection === 'asc'
          ? a.price - b.price
          : b.price - a.price;
        
        // Secondary sort by emptySlots descending
        if (primaryComparison === 0) {
          return b.emptySlots - a.emptySlots;
        }
        return primaryComparison;
      });
    } else {
      // Fallback: sort by emptySlots descending (shouldn't happen, but safety)
      rooms.sort((a, b) => b.emptySlots - a.emptySlots);
    }

    return rooms;
  } catch (error) {
    console.error('Error fetching rooms:', error);
    throw error;
  }
};
