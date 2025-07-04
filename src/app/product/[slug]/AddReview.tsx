import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";


interface AddReviewProps {
  product_id: number;  // Accept product_id as a prop
}

const AddReview: React.FC<AddReviewProps> = ({ product_id }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);  // Rating state to store selected stars
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = useSelector((state: RootState) => state.auth.token);
  console.log("add review from Redux:", token);

  // Function to handle the submission of the review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);



    const payload = {
      rating: rating, 
      comment: review,
      product_id: product_id,
    };

    try {
      const response = await fetch('http://localhost:8000/api/reviews/add-new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Pass the token in the headers
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success("review added successful!");
        console.log('Review submitted successfully');
        setReview('');
        setRating(0);  // Reset the rating
      } else {
        toast.error("Error submitting review!");
        console.error('Error submitting review:', response.statusText);
      }
    } catch (error) {
      toast.error("Error submitting review!");
      
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-review mb-5">
      <h3>Add a Review</h3>

      {/* Star Rating */}
      <div className="stars mt-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`cursor-pointer text-3xl gap-2 ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
            onClick={() => setRating(star)} // Set the rating when a star is clicked
          >
            ★
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="mt-4">
        {/* Review Input */}
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here"
          rows={4}
          className="w-full p-2 border rounded-md"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#7b1f4b] text-white px-6 py-2 rounded hover:bg-[#d4749e] mb-3 sm:mb-0"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
