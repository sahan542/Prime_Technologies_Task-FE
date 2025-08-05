import axiosInstance from '@/app/api/axiosInstance';
import { API_ENDPOINTS } from '@/app/api/endpoints';
import { RootState } from '@/redux/store';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

interface AddQnaProps {
  product_id: number; 
}

const AddQna: React.FC<AddQnaProps> = ({ product_id }) => {
  const [question, setQuestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("add ques from Redux:", token);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);


    const payload = {
      question: question,
      product_id: product_id,  
    };

    try {
      // const response = await fetch('http://localhost:8000/api/qna/ask', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Authorization': `Bearer ${token}`,  
      //   },
      //   body: JSON.stringify(payload),
      // });
      // console.log("response inside try: ",response);
      // console.log("inside try block");

      const response = await axiosInstance.post(
        API_ENDPOINTS.ASK_QUESTIONS,
        payload
      );


      if (response.status === 200) {
        toast.success("Added question successfully!");
        console.log('Question submitted successfully');
        setQuestion('');
      } else {
        toast.error("Error submitting question!");
        console.error('Error submitting question:', response.statusText);
      }
    } catch (error) {
        toast.error("Error submitting question!");
      console.error('Error submitting question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-qna mb-3">
      <h3>Ask a Question</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question here"
          rows={4}
          className="w-full p-2 border rounded-md"
        />
        <button type="submit" disabled={isSubmitting} className="bg-[#7b1f4b] text-white px-6 py-2 rounded hover:bg-[#d4749e] mb-3 sm:mb-0">
          {isSubmitting ? 'Submitting...' : 'Submit Question'}
        </button>
      </form>
    </div>
  );
};

export default AddQna;
