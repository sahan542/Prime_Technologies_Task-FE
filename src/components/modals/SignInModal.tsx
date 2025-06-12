'use client';

import { useState } from 'react';
import { signInUser } from '@/app/utils/api';
import { useAuth } from '@/context/AuthContext';

interface SignInModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function SignInModal({ isOpen, closeModal }: SignInModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();  // Use context for managing authentication

  // Don't render the modal if it is not open
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signInUser(username, password);  // Assuming API call returns token and user data
      signIn(data.token, { email: username, name: data.name }); // Pass both token and user data (e.g., name, email)
      closeModal();  // Close the modal after successful sign-in
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white bg-opacity-50 p-6 rounded-lg max-w-sm w-full backdrop-blur-md">
        <h2 className="text-2xl mb-4">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border p-2 w-full"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-4 rounded">
            Sign In
          </button>
        </form>
        <button onClick={closeModal} className="text-gray-500 mt-2">Close</button>
      </div>
    </div>
  );
}
