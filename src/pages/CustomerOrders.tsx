import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";
import OrderDetailModal from "../components/OrderDetailModal";
import ReviewModal from "../components/ReviewModal";
import type { Order } from "../types";
import { getOrders, updateOrder } from "../lib/orderStorage";
import { Smile } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);

  useEffect(() => {
    const loadOrders = () => {
      const loadedOrders = getOrders();
      // Sort by date, newest first
      loadedOrders.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setOrders(loadedOrders);
    };

    loadOrders();
  }, []);

  useEffect(() => {
    if (showThankYou) {
      const timer = setTimeout(() => {
        setShowThankYou(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showThankYou]);

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

  const handleSubmitReview = (reviewData: {
    rating: number;
    comment: string;
    tags: string[];
  }) => {
    if (!selectedOrder) return;

    const now = new Date().toISOString();

    let review;
    if (isEditingReview && selectedOrder.review) {
      // Update existing review with editedDate
      review = {
        ...reviewData,
        date: selectedOrder.review.date, // Keep original creation date
        editedDate: now,
      };
    } else {
      // Create new review
      review = {
        ...reviewData,
        date: now,
      };
    }

    updateOrder(selectedOrder.id, { review });

    // Update local state
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === selectedOrder.id ? { ...order, review } : order
      )
    );

    setSelectedOrder(null);
    setShowReviewModal(false);
    setIsEditingReview(false);
    setShowThankYou(true);
  };

  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setSelectedOrder(null);
    setIsEditingReview(false);
  };

  const handleEditReview = () => {
    setShowOrderDetail(false);
    setIsEditingReview(true);
    setShowReviewModal(true);
  };

  const handleCloseThankYou = () => {
    setShowThankYou(false);
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
        onEditReview={handleEditReview}
      />

      <ReviewModal
        order={selectedOrder}
        isOpen={showReviewModal}
        onClose={handleCloseReviewModal}
        onSubmitReview={handleSubmitReview}
        isEditing={isEditingReview}
      />

      {showThankYou && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-100 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-md">
            <Smile className="w-8 h-8 text-white" aria-hidden="true" />
            <div>
              <div className="font-semibold">Thank You!</div>
              <div className="text-sm opacity-90">
                Your feedback helps improve our platform.
              </div>
            </div>
            <button
              onClick={handleCloseThankYou}
              className="text-white/70 hover:text-white ml-2 text-xl cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Orders;
