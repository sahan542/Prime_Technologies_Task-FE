"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { signInUser } from "@/app/utils/api";
import { useAuth } from "@/context/AuthContext";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { z } from "zod";
import axios from "axios";
import { loginUser } from "@/services/actions/loginUser";
import { decodedToken } from "@/utils/jwt";
import { setUser } from "@/redux/reducers/authSlice";
import { storeUserInfo } from "@/services/auth.services";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SignInModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openSignUpModal: () => void;
}

type LoginPayload = z.infer<typeof userLoginSchema>;
const userLoginSchema = z.object({
  email: z.string().email("Enter email"),
  password: z.string().min(1, "Enter password"),
});

export default function SignInModal({
  isOpen,
  closeModal,
  openSignUpModal,
}: SignInModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { signIn } = useAuth();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const values: LoginPayload = {
      email: username,
      password: password,
    };

    console.log(values);
    setIsLoading(true);

    try {
      const res = await loginUser(values);
      console.log("const res before if : ", res);

      if (res.access_token) {
        const user = decodedToken(res.access_token);
        console.log("const user inside if : ", user);

        dispatch(setUser({ user, token: res.access_token }));

        storeUserInfo({ accessToken: res.access_token });
        await axios.post("/api/auth/set-cookies", {
          accessToken: res.access_token,
        });

        toast.success("Login Successful!");

        setIsLoading(false);
        router.push("/");
        closeModal();
      } else {
        toast.error("Something went wrong!");
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log(error.message);
      toast.error(
        error?.data?.errorSources[0].message || "Something went wrong!"
      );

      setIsLoading(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
<div className="fixed inset-0 bg-[#7b1f4b]/10 backdrop-blur-xs flex items-center justify-center z-[9999] border border-[#7b1f4b]">
      <div className="bg-white p-6 rounded-[8px] max-w-md w-full shadow-2xl shadow-[#7b1f4b] mx-4 sm:mx-6 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-[#7b1f4b]">
            <b>Sign In</b>
          </h2>
          <button
            onClick={closeModal}
            className="text-[#7b1f4b] text-2xl hover:text-[#a03c6b]"
          >
            <IoMdClose />
          </button>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="block text-sm font-medium text-black">
              User Email <span className="text-red-500 text-lg">*</span>
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
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
              placeholder="Password"
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
