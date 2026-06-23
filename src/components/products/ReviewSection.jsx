"use client";

import { useEffect, useState } from "react";
import { Button, Chip } from "@heroui/react";
import { Star } from "@gravity-ui/icons";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const StarRating = ({ rating, onChange, readOnly = false }) => {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          className={readOnly ? "cursor-default" : "cursor-pointer"}
        >
          <Star
            width={readOnly ? 16 : 22}
            className={star <= rating ? "text-amber-500" : "text-default-300"}
            fill={star <= rating ? "currentColor" : "none"}
          />
        </button>
      ))}
    </div>
  );
};

const ReviewsSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { data: sessionData } = authClient.useSession();
  const currentUser = sessionData?.user;

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/reviews/${productId}`);
      const data = await res.json();
      setReviews(data.data || []);
      setAverageRating(data.averageRating || 0);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const alreadyReviewed = reviews.some(
    (r) => r.reviewerInfo?.userId === currentUser?.id
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentUser) {
      toast.error("Please log in to leave a review.");
      return;
    }

    if (rating === 0) {
      toast.error("Please select a rating.");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a comment.");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reviewerInfo: {
            userId: currentUser.id,
            name: currentUser.name,
          },
          productId,
          rating,
          comment: comment.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      toast.success("Review submitted!");
      setRating(0);
      setComment("");
      fetchReviews();
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="flex items-center gap-3">
        <h2 className="text-lg font-semibold sm:text-xl">Reviews</h2>
        {reviews.length > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(averageRating)} readOnly />
            <span className="text-sm text-default-500">
              {averageRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      {/* Review form */}
      {currentUser && !alreadyReviewed && (
        <form
          onSubmit={handleSubmit}
          className="space-y-3 rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-xl"
        >
          <p className="text-sm font-medium">Leave a review</p>

          <StarRating rating={rating} onChange={setRating} />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={3}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 outline-none backdrop-blur-md"
          />

          <Button type="submit" color="primary" isDisabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      )}

      {currentUser && alreadyReviewed && (
        <p className="text-sm text-default-500">
          You've already reviewed this product. Thanks for your feedback!
        </p>
      )}

      {/* Reviews list */}
      {loading ? (
        <p className="text-sm text-default-500">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-default-500">No reviews yet. Be the first!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{review.reviewerInfo?.name}</p>
                <Chip size="sm" variant="flat" className="text-xs">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Chip>
              </div>
              <StarRating rating={review.rating} readOnly />
              <p className="mt-2 text-sm text-default-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;