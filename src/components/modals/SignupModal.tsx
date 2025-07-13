'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/reducers/authSlice";
import { loginUser } from "@/services/actions/loginUser";
import { registerUser } from "@/services/actions/registerUser";
import { storeUserInfo } from "@/services/auth.services";
import { decodedToken } from "@/utils/jwt";


interface SignUpModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openSignInModal: () => void; 
}

const userSignUpSchema = z.object({
  email: z.string().email("Enter email"),
  password: z.string().min(1, "Enter password"),
});

type RegisterPayload = z.infer<typeof userSignUpSchema>;

export default function SignupModal({ isOpen, closeModal, openSignInModal }: SignUpModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSignUp = async (values: RegisterPayload) => {
    setIsLoading(true);
    try {
      const res = await registerUser(values);
      console.log("const res : ",res);


      if (res.success) {
        const userRes = await loginUser({
          email: values.email,
          password: values.password,
        });
        console.log("User res : ",userRes);

        if (userRes.access_token) {
          const user = decodedToken(userRes.access_token);

          dispatch(setUser({ user, token: userRes.access_token }));
          storeUserInfo({ accessToken: userRes.access_token });
          await axios.post("/api/auth/set-cookies", {
            accessToken: userRes.access_token,
          });

          toast.success("Register Successful!");

          setIsLoading(false);
          router.push("/");
          closeModal();

        }
      } else {
        toast.error("Something went wrong!");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );

      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-transparent" /> 

      <div className="bg-white p-6 rounded-lg z-50 w-full max-w-sm shadow-xl backdrop-blur-md shadow-2xl shadow-[#7b1f4b]">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-[#7b1f4b] mb-4"><b>Register</b></h2>
          <button
            onClick={closeModal}
            className="text-2xl mb-4 font-semibold text-gray-500 hover:text-[#7b1f4b]"
          >
            &times;
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <label className="block text-sm font-medium text-black">
          User Email <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className="border border-[#7b1f4b] p-2 w-full rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm font-medium mt-2 text-black">
          Password <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="border border-[#7b1f4b] p-2 w-full rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={() => handleSignUp({ email, password })}
          className="btn-primary mt-2"
          disabled={isLoading}
        >
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </button>

        <p className="text-black mt-4">
          Already have an account?{" "}
          <button
            onClick={() => {
              closeModal(); 
              openSignInModal(); 
            }}
            className="text-[#7b1f4b] font-semibold hover:underline"
          >
            SignIn
          </button>
        </p>
      </div>
    </div>
  );
}
