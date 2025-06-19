import React, { useState, useEffect } from 'react';

interface Review {
  id: number;
  content: string;
  date: string;
}

const SeeAllReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Simulate fetching reviews
    const fetchedReviews: Review[] = [
      { id: 1, content: 'Great product!', date: '2023-06-01' },
      { id: 2, content: 'Satisfactory performance.', date: '2023-06-05' },
    ];
    setReviews(fetchedReviews);
  }, []);

  return (
    <div className="all-reviews">
      <h3>All Reviews</h3>
      <ul className="space-y-4">
        {reviews.map((review) => (
          <li key={review.id} className="border-b py-2">
            <p>{review.content}</p>
            <span className="text-sm text-gray-500">{review.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeeAllReviews;
