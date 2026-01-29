export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  emptySlots: number;
  longitude: number;
  latitude: number;
  totalRatings: number;
  ratingCount: number;
  telephone: string;
  address: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  user: string;
  text: string;
}
