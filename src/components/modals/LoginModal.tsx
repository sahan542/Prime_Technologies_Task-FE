'use client';

import { useAuthModal } from '../context/AuthModalContext';

const LoginModal = () => {
  const { isLoginOpen, closeLogin } = useAuthModal(); // ✅ fixed method

  if (!isLoginOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="Email" className="border w-full mb-2 p-2" />
        <input type="password" placeholder="Password" className="border w-full mb-2 p-2" />
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={closeLogin} className="text-gray-500">Cancel</button>
          <button className="bg-black text-white px-4 py-1 rounded">Login</button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
