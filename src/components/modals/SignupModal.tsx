'use client';

import React, { useState } from 'react';
import { useAuthModal } from '../context/AuthModalContext'; // Assuming you have context for managing modals
import axios from 'axios';

interface SignUpModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export default function SignupModal({ isOpen, closeModal }: SignUpModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.post('http://localhost:8000/auth/signup', {
        email,
        password,
      });
      alert('Account created successfully!');
      closeModal();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  // Don't render the modal if it's not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Transparent Background */}
      <div className="fixed inset-0 bg-transparent" /> {/* Remove black background */}

      {/* Modal Content */}
      <div className="bg-white p-6 rounded-lg z-50 w-full max-w-sm shadow-xl backdrop-blur-md">
        <h2 className="text-lg font-bold text-black mb-4">Create an Account</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-3 text-black bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black bg-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit button */}
        <button
          onClick={handleSignup}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>

        {/* Cancel button */}
        <button
          onClick={closeModal}
          className="mt-4 text-sm text-gray-600 hover:underline w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
