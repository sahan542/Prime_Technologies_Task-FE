"use client";

import React, { useState, useEffect } from "react";
import AddReview from "./AddReview";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Review {
  id: number;
  username: string;
  user_name: string; 
  rating: number;
  comment: string;
  date: string;
}

interface AllReviewsProps {
  product_id: number;
}

const AllReviews: React.FC<AllReviewsProps> = ({ product_id }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAdd, setShowAdd] = useState(false); 
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("review qa section Token from Redux:", token);

  const fetchReviews = async (productId: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/reviews/product/${productId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("response sahan : ",response);

      if (response.ok) {
        const reviews = await response.json();
        setReviews(reviews);
        console.log('Reviews fetched successfully:', reviews);
        return reviews; 
      } else {
        console.error('Error fetching reviews:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

    useEffect(() => {
    fetchReviews(product_id);
  }, [product_id]);  

return (
    <div className="text-black">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Reviews</h2>

        {token && (
          showAdd ? (
            <button
              onClick={() => setShowAdd(false)}
              className="p-2 rounded-md text-gray-500"
              aria-label="Close Add Review"
            >
              <IoClose size={20} />
            </button>
          ) : (
            <button
              onClick={() => setShowAdd(true)}
              className="px-4 py-2 text-sm font-medium bg-[#d4749e] text-white rounded-md shadow hover:bg-[#7b1f4b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Review
            </button>
          )
        )}
      </div>

      {showAdd && <AddReview product_id={product_id} />}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-center text-gray-500">No reviews yet</p> 
        ) : (
reviews.map((review) => (
  <div
    key={review.id}
    className="border border-gray-300 p-4 rounded-2xl shadow-lg shadow-[#7b1f4b]/30"
  >
    <div className="flex justify-between items-center">
      <h3 className="">{review.username}</h3>
      <span className="text-yellow-500">
        {"⭐".repeat(review.rating)}
      </span>
    </div>
    <p className="mt-2 text-gray-700">{review.comment}</p>
  </div>
))

        )}
      </div>
    </div>
  );
};

export default AllReviews;
