import React, { useState } from 'react';
import { useOrders } from '../context/OrderContext';
import { useProducts } from '../context/ProductContext';
import {
  Star,
  ShieldCheck,
  ThumbsUp,
  MessageSquare,
  Plus,
  X,
  Filter,
  CheckCircle2
} from 'lucide-react';

export const ReviewsPage: React.FC = () => {
  const { reviews, addReview, markReviewHelpful } = useOrders();
  const { products } = useProducts();

  const [filterRating, setFilterRating] = useState<number | 'All'>('All');
  const [showReviewModal, setShowReviewModal] = useState(false);

  // Form state
  const [authorName, setAuthorName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  // Rating aggregate calculations
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const filteredReviews = reviews.filter((r) => {
    if (filterRating !== 'All' && r.rating !== filterRating) return false;
    return true;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim() || !title.trim()) return;

    const matchedProduct = products.find((p) => p.id === selectedProductId);

    addReview({
      productId: selectedProductId,
      productName: matchedProduct?.name || 'DREAD DYN Premium Card',
      authorName: authorName.trim(),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      verifiedPurchase: true,
    });

    // Reset & close
    setAuthorName('');
    setTitle('');
    setComment('');
    setRating(5);
    setShowReviewModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="bg-white border border-[#DFEAF7] rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="text-xs font-bold text-[#087CF0] uppercase tracking-wider">
            Verified Cardholder Feedback
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102544] tracking-tight">
            Customer Reviews & Ratings
          </h1>
          <p className="text-xs sm:text-sm text-[#4A5F7D] mt-1 max-w-xl">
            Real feedback from enterprise clients, high-net-worth directors, and verified cardholders utilizing DREAD DYN instruments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowReviewModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-xs sm:text-sm bg-[#087CF0] text-white hover:bg-[#0667C8] transition shadow-md shadow-blue-500/15 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write a Verified Review</span>
        </button>
      </div>

      {/* Aggregate Score & Distribution Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Score Card */}
        <div className="md:col-span-4 bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-3">
          <div className="text-5xl font-black text-[#102544] tracking-tight">{averageRating}</div>
          <div className="flex items-center gap-1 text-amber-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 fill-current" />
            ))}
          </div>
          <div className="text-xs font-bold text-[#102544]">
            Based on {totalReviews} Verified Transactions
          </div>
          <div className="text-[11px] text-[#4A5F7D] flex items-center gap-1 text-emerald-600 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>100% Cryptographically Verified Issuances</span>
          </div>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="md:col-span-8 bg-white border border-[#DFEAF7] rounded-2xl p-6 shadow-sm flex flex-col justify-between space-y-3 text-xs">
          <div className="font-bold text-[#102544] mb-1">Rating Breakdown</div>
          {[5, 4, 3, 2, 1].map((stars) => {
            const count = ratingCounts[stars as keyof typeof ratingCounts] || 0;
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            return (
              <div key={stars} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setFilterRating(filterRating === stars ? 'All' : stars)}
                  className={`w-14 text-left font-semibold text-[#102544] hover:text-[#087CF0] ${
                    filterRating === stars ? 'font-bold text-[#087CF0]' : ''
                  }`}
                >
                  {stars} Stars
                </button>
                <div className="flex-1 bg-[#F4F8FC] border border-[#DFEAF7] h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-[#087CF0] h-full rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-10 text-right font-mono text-[#4A5F7D]">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review Filter Bar */}
      <div className="flex items-center justify-between bg-white border border-[#DFEAF7] rounded-xl px-4 py-3 text-xs">
        <div className="font-bold text-[#102544]">
          Showing <span className="text-[#087CF0]">{filteredReviews.length}</span> reviews
          {filterRating !== 'All' && ` (${filterRating} stars)`}
        </div>

        {filterRating !== 'All' && (
          <button
            type="button"
            onClick={() => setFilterRating('All')}
            className="font-bold text-[#087CF0] hover:underline"
          >
            Show All Ratings
          </button>
        )}
      </div>

      {/* Review Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white border border-[#DFEAF7] rounded-2xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${s <= rev.rating ? 'fill-current' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <h3 className="font-extrabold text-sm sm:text-base text-[#102544]">
                    {rev.title}
                  </h3>
                </div>

                <div className="text-[11px] text-[#4A5F7D] font-mono">
                  {new Date(rev.date).toLocaleDateString()}
                </div>
              </div>

              {rev.productName && (
                <div className="inline-block text-[11px] font-semibold text-[#087CF0] bg-[#EBF4FE] border border-[#DFEAF7] px-2 py-0.5 rounded">
                  Purchased: {rev.productName}
                </div>
              )}

              <p className="text-xs sm:text-sm text-[#4A5F7D] leading-relaxed">
                &ldquo;{rev.comment}&rdquo;
              </p>
            </div>

            <div className="pt-3 border-t border-[#DFEAF7] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#102544]">{rev.authorName}</span>
                {rev.verifiedPurchase && (
                  <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Client
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => markReviewHelpful(rev.id)}
                className="flex items-center gap-1 text-[#4A5F7D] hover:text-[#087CF0] transition"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span className="text-[11px]">Helpful ({rev.helpfulCount})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-[#DFEAF7] shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#DFEAF7] pb-3">
              <div className="font-extrabold text-base text-[#102544]">
                Submit Client Cardholder Review
              </div>
              <button
                type="button"
                onClick={() => setShowReviewModal(false)}
                className="text-[#4A5F7D] hover:text-[#102544]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#102544] block mb-1">Your Name & Title *</label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Richard Sterling, Director"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Card Model</label>
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (${p.price})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`p-1.5 rounded-lg border transition ${
                        star <= rating
                          ? 'bg-amber-50 border-amber-300 text-amber-500'
                          : 'bg-[#F4F8FC] border-[#DFEAF7] text-gray-300'
                      }`}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </button>
                  ))}
                  <span className="font-bold text-[#102544] ml-2">{rating} out of 5 stars</span>
                </div>
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Review Headline *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flawless card activation and limits"
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>

              <div>
                <label className="font-bold text-[#102544] block mb-1">Detailed Feedback *</label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with daily limits, physical card weight, or customer concierge response time..."
                  className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FC] border border-[#DFEAF7] text-[#102544] focus:outline-none focus:border-[#087CF0]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#DFEAF7] text-[#4A5F7D] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#087CF0] text-white font-bold hover:bg-[#0667C8]"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
