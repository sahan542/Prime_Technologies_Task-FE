'use client';

import React, { useState, useEffect } from "react";
import AddReview from "./AddReview";
import { IoClose } from "react-icons/io5";
import AddQna from "./AddQna";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Qna {
  id: number;
  username: string;
  rating: number;
  comment: string;
  date: string;
}

interface AllqnaProps {
  product_id: number;
}

const AllQna: React.FC<AllqnaProps> = ({ product_id }) => {

      const [qnaSets, setQnaSets] = useState<Qna[]>([]);
      const [showAdd, setShowAdd] = useState(false); 
      const token = useSelector((state: RootState) => state.auth.token);
      console.log("review qa section Token from Redux:", token);
    
      const fetchQuestions = async (productId: number) => {
        try {
          const response = await fetch(`http://localhost:8000/api/qna/product/${productId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log("response sahan : ",response);

          if (response.ok) {
            const qnas = await response.json();
            setQnaSets(qnas);
            console.log('Reviews fetched successfully:', qnas);
            return qnas; 
          } else {
            console.error('Error fetching reviews:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      };

      useEffect(() => {
        fetchQuestions(product_id);
      }, [product_id]);  

  return (
    <div className="text-black">
      {/* header row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">All Qna</h2>

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

      {showAdd && <AddQna product_id={product_id} />}

      {/* reviews list */}
<div className="space-y-4">
  {qnaSets.map((qna) => (
    <div
      key={qna.id}
      className="border border-gray-300 p-4 rounded-2xl shadow-lg shadow-[#7b1f4b]/30"
    >
      <div className="flex items-center mb-2">
        <h3 className="font-semibold">{qna.user_email}</h3>
      </div>

      {/* Question */}
      <div className="flex items-center mt-3">
        {/* ques Circle */}
        <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center mr-3">
          Q
        </div>
        <p className="mt-2 text-sm text-gray-500">
          <u>{qna.question}</u>
        </p>
      </div>

      <div className="flex items-center mt-3">
        {/* Answer Circle */}
        <div className="w-6 h-6 rounded-full bg-gray-400 text-white flex items-center justify-center mr-3">
          A
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {qna.answer}
        </p>
      </div>
    </div>
  ))}
</div>

    </div>
)
}

export default AllQna