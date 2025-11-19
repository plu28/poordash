import React, { useState, useEffect } from "react";
import type { Order } from "../types";
import { PREDEFINED_TAGS } from "../types";

interface ReviewModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: {
    rating: number;
    comment: string;
    tags: string[];
  }) => void;
  isEditing?: boolean; // Optional prop to indicate if editing an existing review
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  order,
  isOpen,
  onClose,
  onSubmitReview,
  isEditing = false,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");
  const [customTags, setCustomTags] = useState<string[]>([]);

  // Reset form state when modal opens with a new order
  useEffect(() => {
    if (isOpen && order) {
      if (isEditing && order.review) {
        // Pre-fill form with existing review data for editing
        setRating(order.review.rating);
        setComment(order.review.comment);
        setSelectedTags(order.review.tags);
        setCustomTag("");
        setCustomTags(order.review.tags.filter(tag => !PREDEFINED_TAGS.includes(tag as any))); // Initialize custom tags from existing review
      } else {
        // Load draft data for new reviews only
        const storageKey = `review_draft_${order.id}`;
        const draft = JSON.parse(localStorage.getItem(storageKey) || "{}");

        if (Object.keys(draft).length > 0) {
          // Load draft data to continue editing
          setRating(parseInt(draft.rating) || 5);
          setComment(draft.comment || "");
          setSelectedTags(draft.tags || []);
          setCustomTag("");
          setCustomTags(draft.customTags || []);
        } else {
          // Reset for new review
          setRating(5);
          setComment("");
          setSelectedTags([]);
          setCustomTag("");
          setCustomTags([]);
        }
      }
    }
  }, [isOpen, order, isEditing]);

  if (!isOpen || !order) return null;

  const saveDraft = (key: string, value: string | string[]) => {
  if (!order) {
    return;
  }
  const storageKey = `review_draft_${order.id}`;
  const draft = JSON.parse(localStorage.getItem(storageKey) || "{}");
  draft[key] = value;
  localStorage.setItem(storageKey, JSON.stringify(draft));
};

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
    saveDraft("rating", starRating.toString());
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      let stored;
      if (prev.includes(tag)) {
        stored = prev.filter((t) => t !== tag);
      } else {
        stored = [...prev, tag];
      }
      saveDraft("tags", stored);
      return stored;
    });
  };

  const handleAddCustomTag = () => {
    if (
      customTag.trim() &&
      !customTags.includes(customTag.trim()) &&
      !selectedTags.includes(customTag.trim())
    ) {
      setCustomTags((prev) => {
        const stored = [...prev, customTag.trim()];
        saveDraft("customTags", stored);
        return stored;
    });
      setSelectedTags((prev) => {
        const stored = [...prev, customTag.trim()];
        saveDraft("tags", stored);
        return stored;
    });
      setCustomTag("");
    }
  };

  const handleRemoveCustomTag = (tag: string) => {
    setCustomTags((prev) => {
      const stored = prev.filter((t) => t !== tag);
      saveDraft("customTags", stored);
      return stored;
    });
    setSelectedTags((prev) => {
      const stored = prev.filter((t) => t !== tag);
      saveDraft("tags", stored);
      return stored;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReview({
      rating,
      comment: comment.trim(),
      tags: selectedTags,
    });
    // Clear draft after submission
    if (order) {
      localStorage.removeItem(`review_draft_${order.id}`);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center z-60 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditing ? "Edit Review" : "Leave a Review"}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-4">
              <img
                src={order.imageUrl}
                alt={order.dishName}
                className="w-20 h-20 object-cover rounded-lg shrink-0"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {order.dishName}
                </h3>
                <p className="text-gray-600">by {order.chefName}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating *
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className={`text-3xl hover:scale-110 transition-transform cursor-pointer ${
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment (optional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => {
                  setComment(e.target.value);
                  saveDraft("comment", e.target.value);
                }}
                placeholder="Share your experience with this dish..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tags (optional)
              </label>

              {/* Add custom tag input */}
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={customTag}
                  onChange={(e) => setCustomTag(e.target.value)}
                  placeholder="Add custom tag..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  onKeyPress={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddCustomTag())
                  }
                />
                <button
                  type="button"
                  onClick={handleAddCustomTag}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer"
                  disabled={!customTag.trim()}
                >
                  Add
                </button>
              </div>

              {/* Predefined tags */}
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-2">Suggested tags:</p>
                <div className="flex flex-wrap gap-2">
                  {PREDEFINED_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                        selectedTags.includes(tag)
                          ? "bg-blue-100 text-blue-800 border-2 border-blue-300"
                          : "bg-gray-100 text-gray-700 border-2 border-gray-200 hover:bg-gray-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom tags */}
              {customTags.length > 0 && (
                <div>
                  <p className="text-xs text-gray-500 mb-2">
                    Your custom tags:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {customTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleRemoveCustomTag(tag)}
                        className="px-3 py-2 bg-green-100 text-green-800 border-2 border-green-300 rounded-full text-sm font-medium hover:bg-green-200 transition-colors cursor-pointer"
                      >
                        {tag} ×
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
              >
                {isEditing ? "Update Review" : "Submit Review"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
