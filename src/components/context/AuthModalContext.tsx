'use client'; // 🔥 Required for client-side React context usage

import { createContext, useContext, useState } from "react";

type AuthModalContextType = {
  isSignupOpen: boolean;
  openSignup: () => void;
  closeSignup: () => void;
  isLoginOpen: boolean;
  openLogin: () => void;
  closeLogin: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  return (
    <AuthModalContext.Provider
      value={{
        isSignupOpen,
        openSignup,
        closeSignup,
        isLoginOpen,
        openLogin,
        closeLogin,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal must be used within AuthModalProvider");
  return context;
};
