"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { signInUser } from "@/app/utils/api";
import { useAuth } from "@/context/AuthContext";
import { IoMdClose } from "react-icons/io";

interface SignInModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openSignUpModal: () => void;
}

export default function SignInModal({
  isOpen,
  closeModal,
  openSignUpModal,
}: SignInModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuth();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await signInUser(username, password);

      if (data && data.access_token) {
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem(
          "user",
          JSON.stringify({ email: username, name: data.name, userID: data.id })
        );

        signIn(data.access_token, { email: username, name: data.name });

        closeModal();
      } else {
        throw new Error("Token is missing in the response");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-[9999] border border-[#7b1f4b]">
      <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-sm w-full shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-[#7b1f4b]">Sign In</h2>
          <button
            onClick={closeModal}
            className="text-[#7b1f4b] text-2xl hover:text-[#a03c6b]"
          >
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-black">
              Username <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="border border-[#7b1f4b] p-2 w-full rounded text-black"
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium text-black">
              Password <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-[#7b1f4b] p-2 w-full rounded text-black"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn-primary ">
            Sign In
          </button>
        </form>

        <p className="text-black mt-4">
          Still haven't an account?{" "}
          <button
            onClick={() => {
              closeModal();
              openSignUpModal();
            }}
            className="text-[#7b1f4b] font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>,
    document.body
  );
}
