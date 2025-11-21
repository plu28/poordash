import React from 'react';
import type { Order } from '../types';
import { getTimeAgo } from '../lib/utils';

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onLeaveReview: () => void;
  onEditReview?: () => void; // Optional callback for editing existing reviews
}

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose,
  onLeaveReview,
  onEditReview
}) => {
  if (!isOpen || !order) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };


  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex gap-6">
              <img
                src={order.imageUrl}
                alt={order.dishName}
                className="w-32 h-32 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {order.dishName}
                </h3>
                <p className="text-lg text-gray-600 mb-1">by {order.chefName}</p>
                <p className="text-sm text-gray-500">
                  Ordered on {formatDate(order.orderDate)}
                </p>
              </div>
            </div>

            {order.review ? (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-semibold text-gray-900">Your Review</h4>
                  {onEditReview && (
                    <button
                      onClick={onEditReview}
                      className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm rounded-md border border-blue-200 transition-colors cursor-pointer"
                    >
                      Edit Review
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    {renderStars(order.review.rating)}
                    <span className="text-sm text-gray-500">
                      Reviewed on {formatDate(order.review.date)}
                      {order.review.editedDate && (
                        <span className="ml-1">
                          (edited {getTimeAgo(order.review.editedDate)})
                        </span>
                      )}
                    </span>
                  </div>
                  {order.review.comment && (
                    <p className="text-gray-700 leading-relaxed">
                      "{order.review.comment}"
                    </p>
                  )}
                  {order.review.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {order.review.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">
                      Share Your Experience
                    </h4>
                    <p className="text-blue-700 text-sm">
                      Help others by leaving a review for this dish
                    </p>
                  </div>
                  <button
                    onClick={onLeaveReview}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                  >
                    Leave Review
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;