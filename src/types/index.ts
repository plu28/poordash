export interface Review {
  rating: number; // 1-5 stars
  comment: string;
  tags: string[];
  date: string; // ISO date string
}

export interface Delivery {
  address: string;
  city: string;
  usState: string;
  zip: string;
}

export interface Order {
  id: string;
  chefName: string;
  dishName: string;
  imageUrl: string;
  orderDate: string; // ISO date string
  review?: Review; // Optional, only if reviewed
  delivery?: Delivery;
}

export const PREDEFINED_TAGS = [
  // Food quality
  'tasty',
  'fresh',
  'well-portioned',
  // Service
  'fast delivery',
  'friendly',
  'accurate'
] as const;