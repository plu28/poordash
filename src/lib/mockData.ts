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
      comment: 'Good but not as spicy as expected. Delivery was late.',
      tags: ['tasty', 'fresh'],
      date: '2024-10-16T09:45:00Z',
    },
  },

  {
    id: 'order-6',
    chefName: 'Chef Elena',
    dishName: 'Margherita Pizza',
    imageUrl:
      'https://www.tasteofhome.com/wp-content/uploads/2024/03/Margherita-Pizza-_EXPS_TOHVP24_275515_MF_02_28_1.jpg?fit=750%2C750',
    orderDate: '2024-11-08T17:10:00Z',
    price: 15.5,
    options: ['Extra mozzarella', 'Thin crust', 'Add chili flakes', 'No basil'],
    state: 'NotStarted',
    deliveryAddress: '234 Cherry Lane, Apt 12A',
  },
  {
    id: 'order-7',
    chefName: 'Chef Hiro',
    dishName: 'Sushi Bento Box',
    imageUrl:
      'https://popmenucloud.com/cdn-cgi/image/width%3D1440%2Cheight%3D1440%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/mpatydhx/fa581c2f-72a6-4524-9821-9d1fa8634859.jpeg',
    orderDate: '2024-11-05T13:25:00Z',
    price: 32.0,
    options: [
      'Add extra wasabi',
      'Soy sauce on the side',
      'Tuna roll substitute with salmon',
      'Miso soup included',
    ],
    state: 'Ready',
    deliveryAddress: '91 Willow Street',
    review: {
      rating: 5,
      comment: 'Perfectly fresh and beautifully presented!',
      tags: ['fresh', 'aesthetic', 'great value'],
      date: '2024-11-06T09:10:00Z',
    },
  },
  {
    id: 'order-8',
    chefName: 'Chef Marco',
    dishName: 'Truffle Risotto',
    imageUrl:
      'https://mariefoodtips.com/wp-content/uploads/2021/12/truffle-risotto-4.jpg',
    orderDate: '2024-11-03T18:00:00Z',
    price: 28.75,
    options: [],
    state: 'InProgress',
    // pickup order
  },
  {
    id: 'order-9',
    chefName: 'Chef Priya',
    dishName: 'Butter Chicken with Naan',
    imageUrl:
      'https://simplejoy.com/wp-content/uploads/2018/12/chicken_butter_masala_recipe_picture-683x1024.jpg',
    orderDate: '2024-11-07T19:00:00Z',
    price: 21.0,
    options: ['Extra naan', 'Mild spice', 'Add cucumber raita'],
    state: 'NotStarted',
    deliveryAddress: '22 Birch Boulevard, House 9',
  },
  {
    id: 'order-10',
    chefName: 'Chef Chloe',
    dishName: 'Vegan Buddha Bowl',
    imageUrl:
      'https://herbivoreskitchen.com/wp-content/uploads/2020/09/Mediterranean-Grain-Bowl-Square.jpg',
    orderDate: '2024-11-04T12:45:00Z',
    price: 19.25,
    options: ['Add tofu', 'No sesame seeds', 'Extra tahini dressing'],
    state: 'Complete',
    deliveryAddress: '555 Walnut Drive, Suite 5',
    review: {
      rating: 4,
      comment: 'Fresh, healthy, and flavorful! Slightly overdressed though.',
      tags: ['healthy', 'fresh', 'colorful'],
      date: '2024-11-05T08:20:00Z',
    },
  },
];

export const initializeMockData = () => {
  const existingOrders = JSON.parse(localStorage.getItem('poordash_orders') || '[]');
  if (existingOrders.length === 0) {
    mockOrders.forEach(order => addOrder(order));
  }
};
