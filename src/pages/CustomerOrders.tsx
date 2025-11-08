import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";
import OrderDetailModal from "../components/OrderDetailModal";
import ReviewModal from "../components/ReviewModal";
import type { Order } from '../types';
import { getOrders, updateOrder } from '../lib/orderStorage';

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const loadOrders = () => {
      const loadedOrders = getOrders();
      // Sort by date, newest first
      loadedOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());
      setOrders(loadedOrders);
    };

    loadOrders();
  }, []);

  const handleOrderClick = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDetail(true);
  };

  const handleCloseOrderDetail = () => {
    setShowOrderDetail(false);
    setSelectedOrder(null);
  };

  const handleLeaveReview = () => {
    setShowOrderDetail(false);
    setShowReviewModal(true);
  };

  const handleSubmitReview = (reviewData: { rating: number; comment: string; tags: string[] }) => {
    if (!selectedOrder) return;

    const review = {
      ...reviewData,
      date: new Date().toISOString()
    };

    updateOrder(selectedOrder.id, { review });

    // Update local state
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, review }
          : order
      )
    );

    setSelectedOrder(null);
    setShowReviewModal(false);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSelectedOrder(null);
  };

  return (
    <Layout showBottomNav={true} bottomNavVariant="customer">
      <div className="space-y-6">
        <Header title="Your Orders" />
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-3">Order History</h2>
              <p className="text-gray-600">
                Your past orders will appear here.
              </p>
            </div>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onClick={() => handleOrderClick(order)}
              />
            ))
          )}
        </div>
      </div>

      <OrderDetailModal
        order={selectedOrder}
        isOpen={showOrderDetail}
        onClose={handleCloseOrderDetail}
        onLeaveReview={handleLeaveReview}
      />

      <ReviewModal
        order={selectedOrder}
        isOpen={showReviewModal}
        onClose={handleCloseReviewModal}
        onSubmitReview={handleSubmitReview}
      />
    </Layout>
  );
};

export default Orders;