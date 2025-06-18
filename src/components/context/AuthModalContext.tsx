// 'use client'; // Ensure it's a client-side component

// import { createContext, useContext, useState, ReactNode } from 'react';

// interface AuthModalContextType {
//   isSignInModalOpen: boolean;
//   isSignUpModalOpen: boolean;
//   openSignInModal: () => void;
//   closeSignInModal: () => void;
//   openSignUpModal: () => void;
//   closeSignUpModal: () => void;
// }

// const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

// export const useAuthModal = (): AuthModalContextType => {
//   const context = useContext(AuthModalContext);
//   if (!context) {
//     throw new Error('useAuthModal must be used within an AuthModalProvider');
//   }
//   return context;
// };

// export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
//   const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
//   const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

//   // Open/Close handlers for SignIn modal
//   const openSignInModal = () => setIsSignInModalOpen(true);
//   const closeSignInModal = () => setIsSignInModalOpen(false);

//   // Open/Close handlers for SignUp modal
//   const openSignUpModal = () => setIsSignUpModalOpen(true);
//   const closeSignUpModal = () => setIsSignUpModalOpen(false);

//   return (
//     <AuthModalContext.Provider
//       value={{
//         isSignInModalOpen,
//         isSignUpModalOpen,
//         openSignInModal,
//         closeSignInModal,
//         openSignUpModal,
//         closeSignUpModal,
//       }}
//     >
//       {children}
//     </AuthModalContext.Provider>
//   );
// };


'use client'; // Ensure it's a client-side component

import { createContext, useContext, useState, ReactNode } from 'react';

// Define the types for the context state
interface AuthModalContextType {
  isSignInModalOpen: boolean;
  isSignUpModalOpen: boolean;
  openSignInModal: () => void;
  closeSignInModal: () => void;
  openSignUpModal: () => void;
  closeSignUpModal: () => void;
}

// Create a context with an undefined initial state
const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

// Custom hook to use the AuthModalContext
export const useAuthModal = (): AuthModalContextType => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
};

// Context provider component for managing modal states
export const AuthModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Modal states for SignIn and SignUp
  const [isSignInModalOpen, setIsSignInModalOpen] = useState<boolean>(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState<boolean>(false);

  // Handlers for opening and closing modals
  const openSignInModal = () => setIsSignInModalOpen(true);
  const closeSignInModal = () => setIsSignInModalOpen(false);

  const openSignUpModal = () => setIsSignUpModalOpen(true);
  const closeSignUpModal = () => setIsSignUpModalOpen(false);

  // Provide the context values to the children components
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
