import type { Room } from '../pages/SearchResults/types';

/**
 * Calculate average rating from totalRatings and ratingCount
 * @param room - Room object or partial room data
 * @returns Average rating (0 if no ratings)
 */
export const calculateAverageRating = (
  room: Pick<Room, 'totalRatings' | 'ratingCount'> | null | undefined
): number => {
  if (!room || room.ratingCount === 0) return 0;
  return room.totalRatings / room.ratingCount;
};

/**
 * Format rating for display with star emoji
 * @param rating - Numeric rating value
 * @param showStar - Whether to include star emoji
 * @returns Formatted rating string (e.g., "4.5 ⭐")
 */
export const formatRating = (rating: number, showStar: boolean = true): string => {
  const formatted = rating.toFixed(1);
  return showStar ? `${formatted} ⭐` : formatted;
};

/**
 * Get rating display text with count
 * @param room - Room object
 * @returns Formatted string (e.g., "4.5 ⭐ (10 lượt)")
 */
export const getRatingDisplay = (
  room: Pick<Room, 'totalRatings' | 'ratingCount'> | null | undefined
): string => {
  if (!room || room.ratingCount === 0) {
    return 'Chưa có đánh giá';
  }
  
  const avgRating = calculateAverageRating(room);
  return `${formatRating(avgRating)} (${room.ratingCount} lượt)`;
};
