'use client';

import React, { useEffect, useState } from 'react';
import AddReview from './AddReview';
import AddQna from './AddQna';
import { useAuth } from '@/context/AuthContext';
import SigninModal from '@/components/modals/SignInModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type TabType = 'review' | 'qna';

interface ReviewQASectionProps {
  product_id: number; 
}

const ReviewQASection: React.FC<ReviewQASectionProps> = ({ product_id }) => {
  const { isAuthenticated, openSignup } = useAuth();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('review');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false);
  const [isQnaPanelOpen, setIsQnaPanelOpen] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("review qa section Token from Redux:", token);

  const handleTabClick = (tab: TabType) => {
    if (1) {
      setActiveTab(tab);
      setIsPanelOpen(true);
      if (tab === 'review') {
        setIsReviewPanelOpen(true);
        setIsQnaPanelOpen(false);  
      } else {
        setIsQnaPanelOpen(true);
        setIsReviewPanelOpen(false);  
      }
    } else {
      setIsModalVisible(true);
    }
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openSignUpModal = () => {
    openSignup();
  };

  return (
    <div className="mt-6">
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => handleTabClick('review')}
          className="bg-[#7b1f4b] text-white px-6 py-2 rounded hover:bg-[#d4749e] mb-3 sm:mb-0"
        >
          Review
        </button>
        <button
          onClick={() => handleTabClick('qna')}
          className="bg-[#7b1f4b] text-white px-6 py-2 rounded hover:bg-[#d4749e] mb-3 sm:mb-0"
        >
          Q&A
        </button>
      </div>

      {isPanelOpen && (
        <div className="border-t-2 border-gray-300 mt-4 p-4 bg-white rounded-lg shadow-lg">
          {activeTab === 'review' && isReviewPanelOpen && (
            <div className="w-full"> 
              <AddReview product_id={product_id} />  
            </div>
          )}
          {activeTab === 'qna' && isQnaPanelOpen && (
            <div className="w-full">
              <AddQna product_id={product_id} />  
            </div>
          )}
        </div>
      )}

      {isModalVisible && (
        <SigninModal
          isOpen={isModalVisible}
          closeModal={closeModal}
          openSignUpModal={openSignUpModal}
        />
      )}
    </div>
  );
};

export default ReviewQASection;
