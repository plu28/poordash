import type { Order } from '../types';
import { addOrder } from './orderStorage';

const mockOrders: Order[] = [
  {
    id: 'order-1',
    chefName: 'Chef Maria',
    dishName: 'Homemade Pasta Carbonara',
    imageUrl:
      'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    orderDate: '2024-11-01T18:30:00Z',
    price: 22.5,
    options: ['Extra parmesan', 'No garlic'],
    state: 'Complete',
    deliveryAddress: '123 Maple Street, Apt 4B',
    review: {
      rating: 5,
      comment:
        'Absolutely delicious! The pasta was perfectly cooked and the sauce was rich and flavorful.',
      tags: ['tasty', 'fresh', 'fast delivery'],
      date: '2024-11-02T10:15:00Z',
    },
  },
  {
    id: 'order-2',
    chefName: 'Chef Ahmed',
    dishName: 'Moroccan Tagine',
    imageUrl:
      'https://images.unsplash.com/photo-1544124499-58912cbddaad?w=400&h=300&fit=crop',
    orderDate: '2024-10-28T19:45:00Z',
    price: 26.0,
    options: ['Extra olives', 'Mild spice'],
    state: 'Complete',
    deliveryAddress: '456 Oak Avenue, Unit 2C',
    review: {
      rating: 4,
      comment: 'Great authentic flavors. Would order again!',
      tags: ['tasty', 'well-portioned', 'friendly'],
      date: '2024-10-29T14:20:00Z',
    },
  },
  {
    id: 'order-3',
    chefName: 'Chef Sarah',
    dishName: 'Grilled Salmon with Vegetables',
    imageUrl:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=300&fit=crop',
    orderDate: '2024-10-25T20:00:00Z',
    price: 29.5,
    options: ['Lemon butter sauce on the side'],
    state: 'Ready',
    // No deliveryAddress (pickup order)
    // No review yet
  },
  {
    id: 'order-4',
    chefName: 'Chef James',
    dishName: 'Beef Wellington',
    imageUrl:
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
    orderDate: '2024-10-20T17:30:00Z',
    price: 39.0,
    options: ['Medium rare', 'Extra mushroom duxelles'],
    state: 'InProgress',
    // No deliveryAddress (pickup order)
    // No review yet
  },
  {
    id: 'order-5',
    chefName: 'Chef Lisa',
    dishName: 'Thai Green Curry',
    imageUrl:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
    orderDate: '2024-10-15T18:15:00Z',
    price: 18.75,
    options: ['Extra basil', 'Jasmine rice', 'Medium spice'],
    state: 'Complete',
    deliveryAddress: '789 Pine Road, Floor 3',
    review: {
      rating: 3,
      comment:
        'Good but not as spicy as expected. Delivery was late.',
      tags: ['tasty', 'fresh'],
      date: '2024-10-16T09:45:00Z',
    },
  },
];

export const initializeMockData = () => {
  const existingOrders = JSON.parse(localStorage.getItem('poordash_orders') || '[]');
  if (existingOrders.length === 0) {
    mockOrders.forEach(order => addOrder(order));
  }
};
