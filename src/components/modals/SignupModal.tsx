'use client';

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useAuthModal } from '../context/AuthModalContext';
import axios from 'axios';

export default function SignupModal() {
  const { isSignupOpen, closeSignup } = useAuthModal();
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
      closeSignup();
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

return (
  <Dialog open={isSignupOpen} onClose={closeSignup} className="fixed z-50 inset-0 flex items-center justify-center">
    <div className="fixed inset-0 bg-black opacity-40" /> {/* ✅ FIXED */}
    <div className="bg-white rounded-lg p-6 z-50 w-full max-w-sm shadow-xl">
      <Dialog.Title className="text-lg font-bold text-black mb-4">Create an Account</Dialog.Title>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full px-4 py-2 border border-gray-300 rounded mb-3 text-black bg-gray-100"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full px-4 py-2 border border-gray-300 rounded mb-4 text-black bg-gray-100"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>

      <button
        onClick={closeSignup}
        className="mt-4 text-sm text-gray-600 hover:underline w-full text-center"
      >
        Cancel
      </button>
    </div>
  </Dialog>
);

}
