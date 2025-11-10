export interface Review {
	rating: number; // 1-5 stars
	comment: string;
	tags: string[];
	date: string; // ISO date string
}

export type StateType = "NotStarted" | "InProgress" | "Ready" | "Complete";

export interface Order {
	id: string;
	chefName?: string;
	dishName: string;
	imageUrl: string;
	orderDate: string; // ISO date string
	price: number;
	options?: string[]; // Optional, only if specified
	state: StateType; // New order should be NotStarted 
	deliveryAddress?: string; // Optional, only if this is a delivery order
	review?: Review; // Optional, only if reviewed
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
