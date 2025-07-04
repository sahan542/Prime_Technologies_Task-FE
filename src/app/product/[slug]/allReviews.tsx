'use client';

import React, { useState, useEffect } from 'react';

// Define the structure of a review
interface Review {
  id: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface AllReviewsProps {
  product_id: number;
}

const AllReviews: React.FC<AllReviewsProps> = ({ product_id }) => {
  // Sample reviews data (You can replace this with actual fetched data)
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Fetch reviews from an API based on the product_id
    const fetchReviews = async () => {
      // Here, you would typically fetch reviews for the specific product from an API
      // For now, let's assume some static reviews
      const fetchedReviews = [
        { id: 1, username: 'John Doe', rating: 4, comment: 'Great product!', date: '2023-07-01' },
        { id: 2, username: 'Jane Smith', rating: 5, comment: 'Absolutely love it!', date: '2023-07-02' },
        { id: 3, username: 'Alex Johnson', rating: 3, comment: 'Good, but could be improved.', date: '2023-07-03' },
      ];
      setReviews(fetchedReviews);
    };

    fetchReviews();
  }, [product_id]); // Re-fetch if the product_id changes

  return (
    <div className='text-black'>
      <h2 className='text-xl font-semibold mb-4'>Customer Reviews</h2>
      {/* Render each review as a card */}
      <div className='space-y-4'>
        {reviews.map((review) => (
          <div key={review.id} className='border border-gray-300 p-4 rounded-md shadow-md'>
            <div className='flex justify-between items-center'>
              <h3 className='font-semibold'>{review.username}</h3>
              <span className='text-yellow-500'>{'⭐'.repeat(review.rating)}</span>
            </div>
            <p className='mt-2 text-gray-700'>{review.comment}</p>
            <p className='mt-2 text-sm text-gray-500'>Reviewed on {review.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllReviews;

