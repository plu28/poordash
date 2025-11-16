export interface Review {
	rating: number; // 1-5 stars
	comment: string;
	tags: string[];
	date: string; // ISO date string
	editedDate?: string; // ISO date string, optional - only present if review has been edited
}

export type StateType = "NotStarted" | "InProgress" | "Ready" | "Complete";

export interface Delivery {
	address: string;
	city: string;
	usState: string;
	zip: string;
}

export interface Order {
	id: string;
	chefName?: string;
	dishName: string;
	imageUrl: string;
	orderDate: string; // ISO date string
	price: number;
	options?: string[]; // Optional, only if specified
	state: StateType; // New order should be NotStarted
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
