import type { Order } from '../types';

const STORAGE_KEY = 'poordash_orders';

export const getOrders = (): Order[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading orders from localStorage:', error);
    return [];
  }
};

export const saveOrders = (orders: Order[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('Error saving orders to localStorage:', error);
  }
};

export const addOrder = (order: Order): void => {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
};

export const updateOrder = (orderId: string, updates: Partial<Order>): void => {
  const orders = getOrders();
  const index = orders.findIndex(order => order.id === orderId);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    saveOrders(orders);
  }
};

export const getOrderById = (orderId: string): Order | undefined => {
  const orders = getOrders();
  return orders.find(order => order.id === orderId);
};