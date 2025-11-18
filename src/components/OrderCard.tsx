import React from 'react';
import type { Order } from '../types';
import { getTimeAgo } from '../lib/utils';

interface OrderCardProps {
  order: Order;
  onClick: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onClick }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-lg ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const draftKey = `review_draft_${order.id}`;
  const isDraft = !!localStorage.getItem(draftKey);

  return (
    <div
      className="bg-white rounded-lg shadow-sm border p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex gap-4">
        <img
          src={order.imageUrl}
          alt={order.dishName}
          className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{order.dishName}</h3>
          <p className="text-sm text-gray-600">{order.chefName}</p>
          <p className="text-xs text-gray-500 mt-1">{formatDate(order.orderDate)}</p>

          {!order.review && isDraft && (
            <p className='italic text-xs text-red-500'> Review saved as draft</p>
          )}

          {order.review && (
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                {renderStars(order.review.rating)}
                <span className="text-xs text-gray-500">
                  {new Date(order.review.date).toLocaleDateString()}
                  {order.review.editedDate && (
                    <span className="ml-1">
                      (edited {getTimeAgo(order.review.editedDate)})
                    </span>
                  )}
                </span>
              </div>
              {order.review.comment && (
                <p className="text-sm text-gray-700 line-clamp-2">{order.review.comment}</p>
              )}
              {order.review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {order.review.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {!order.review && (
            <div className="mt-2">
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                Not reviewed
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;