import React, { useEffect, useState } from 'react';
import AddReview from './AddReview';  
import AddQna from './AddQna'; 
import { useAuth } from '@/context/AuthContext';
import SigninModal from '@/components/modals/SignInModal';

type TabType = 'review' | 'qna';

interface ReviewQASectionProps {
  product_id: number; // Product ID prop
}

const ReviewQASection: React.FC<ReviewQASectionProps> = ({ product_id }) => {
  const { isAuthenticated, openSignup } = useAuth();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('review');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReviewPanelOpen, setIsReviewPanelOpen] = useState(false);
  const [isQnaPanelOpen, setIsQnaPanelOpen] = useState(false);

  const handleTabClick = (tab: TabType) => {
    if (isAuthenticated) {
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


  useEffect(() => {
    if (isAuthenticated) {
      setIsModalVisible(false);  
    }
  }, [isAuthenticated]);

  // Close the modal manually
  const closeModal = () => {
    setIsModalVisible(false);
  };

  // Open sign-up modal (as needed)
  const openSignUpModal = () => {
    openSignup();
  };

  return (
    <div className="mt-6">
      {/* Review and Q&A Buttons */}
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

      {/* Panel for Review and Q&A */}
      {isAuthenticated && isPanelOpen && (
        <div className="border-t-2 border-gray-300 mt-4 p-4 bg-white rounded-lg shadow-lg">
          {activeTab === 'review' && isReviewPanelOpen && (
            <div className="w-full"> {/* Full width container for Review */}
              <AddReview product_id={product_id} />  {/* Pass product_id as prop */}
            </div>
          )}
          {activeTab === 'qna' && isQnaPanelOpen && (
            <div className="w-full"> {/* Full width container for Q&A */}
              <AddQna product_id={product_id} />  {/* Display Add Q&A component */}
            </div>
          )}
        </div>
      )}

      {/* SignIn Modal: Only show if the user is not authenticated */}
      {isModalVisible && !isAuthenticated && (
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
