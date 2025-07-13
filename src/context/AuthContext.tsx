'use client'; 

import { createContext, useState, useContext, ReactNode } from 'react';


interface User {
  email: string;
  name?: string;  
  [key: string]: unknown;  
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (token: string, userData: User) => void; 
  signOut: () => void;
  isAuthenticated: boolean;
  isSignupOpen: boolean;
  openSignup: () => void;
  closeSignup: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false); 

  const signIn = (token: string, userData: User) => {
    setToken(token);
    setUser(userData);  
  };

  const signOut = () => {
    setToken(null);
    setUser(null);
  };

  const openSignup = () => setIsSignupOpen(true);
  const closeSignup = () => setIsSignupOpen(false);

  const isAuthenticated = !!token;  

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signIn,
        signOut,
        isAuthenticated,  
        isSignupOpen,
        openSignup,
        closeSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
