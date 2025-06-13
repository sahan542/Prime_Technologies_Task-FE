'use client';  // Next.js specific for client-side rendering

import { useState } from 'react';
import { signInUser } from '@/app/utils/api';  // Your API call to authenticate the user
import { useAuth } from '@/context/AuthContext';  // Your context for managing authentication

interface SignInModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function SignInModal({ isOpen, closeModal }: SignInModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useAuth();  // Hook for authentication context

  // Don't render the modal if it is not open
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send API request to sign in
      const data = await signInUser(username, password);  // Assuming API returns token and user data

      // Store the token in localStorage
      if (data && data.access_token) {
        localStorage.setItem('token', data.access_token);  // Save the token in localStorage
        localStorage.setItem('isAuthenticated', 'true');  // Set authentication status to true
        localStorage.setItem('user', JSON.stringify({ email: username, name: data.name }));  // Optionally store user info

        // Call the signIn function from context (if needed)
        signIn(data.access_token, { email: username, name: data.name });  // Pass the token and user data to context

        closeModal();  // Close the modal after successful sign-in
      } else {
        throw new Error('Token is missing in the response');
      }
    } catch (err: any) {
      setError(err.message);  // Handle sign-in errors
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
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
