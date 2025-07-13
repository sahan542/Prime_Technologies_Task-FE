'use client'; 

import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthModalContextType {
  isSignInModalOpen: boolean;
  isSignUpModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  return (
    <AuthModalContext.Provider
      value={{
        isSignInModalOpen,
        isSignUpModalOpen,
        openSignInModal,
        closeSignInModal,
        openSignUpModal,
        closeSignUpModal,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};
