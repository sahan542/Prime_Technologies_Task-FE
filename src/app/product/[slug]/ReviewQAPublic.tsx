'use client';

import React, {useState } from 'react';
import AddReview from './AddReview';
import AddQna from './AddQna';
import { useAuth } from '@/context/AuthContext';
import SigninModal from '@/components/modals/SignInModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import AllReviews from './allReviews';
import AllQna from './allQna';
type TabType = 'review' | 'qna';

interface ReviewQASectionProps {
  product_id: number; 
}

const ReviewQAPublic: React.FC<ReviewQASectionProps> = ({ product_id }) => {
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

  // Close the modal manually
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Open sign-up modal (as needed)
  const openSignUpModal = () => {
    openSignup();
  };

  return (
    <div className="mt-6 ">
    <div className="flex mb-4 w-full gap-1">
    <button
        onClick={() => handleTabClick('review')}
        className="bg-[#7b1f4b] text-white px-6 py-2 rounded hover:bg-[#d4749e] w-1/2 mb-3 sm:mb-0"
    >
        Review
    </button>
    <button
        onClick={() => handleTabClick('qna')}
        className="bg-[#7b1f4b] text-white px-6 py-2 rounded hover:bg-[#d4749e] w-1/2 mb-3 sm:mb-0"
    >
        Q&A
    </button>
    </div>



      {/* Panel for Review and Q&A */}
      {isPanelOpen && (
        <div className="border-t-2 border-gray-300 mt-4 p-4 rounded-lg shadow-lg">
          {activeTab === 'review' && isReviewPanelOpen && (
            <div className="w-full h-auto"> 
                <AllReviews product_id={product_id} />
            </div>
          )}
          {activeTab === 'qna' && isQnaPanelOpen && (
            <div className="w-full h-auto"> 
                <AllQna product_id={product_id}/>
            </div>
          )}
        </div>
      )}

      {/* SignIn Modal: Only show if the user is not authenticated */}
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

export default ReviewQAPublic;
