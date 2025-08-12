"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/reducers/authSlice";
import { loginUser } from "@/services/actions/loginUser";
import { registerUser } from "@/services/actions/registerUser";
import { storeUserInfo } from "@/services/auth.services";
import { decodedToken } from "@/utils/jwt";
import { FaRegUser } from "react-icons/fa6";

import {
  validateSignup,
  validateField,
  SignupErrors,
  SignupValues,
} from "@/validators/authValidation";

// ⬇️ use your existing Cloudinary helper
import { uploadToCloudinary } from "@/utils/uploadToCloudinary";

interface SignUpModalProps {
  isOpen: boolean;
  closeModal: () => void;
  openSignInModal: () => void;
}

export default function SignupModal({
  isOpen,
  closeModal,
  openSignInModal,
}: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // ⬇️ avatar states
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const currentValues: SignupValues = { email, password, confirmPassword };

  // avatar upload (optional)
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image.");
      return;
    }

    try {
      setIsUploadingAvatar(true);
      const res = await uploadToCloudinary(file, {
        // defaults from your util: cloudName, uploadPreset, folder
        // override if needed:
        // uploadPreset: "mern_profile",
        // folder: "profile_pics",
      });
      setProfileImg(res.secure_url);
      toast.success("Profile picture uploaded!");
    } catch (err) {
      console.error(err);
      toast.error("Avatar upload failed");
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  // Validate on blur per field
  const handleBlur = (field: keyof SignupValues) => () => {
    const msg = validateField(field, currentValues);
    setErrors((prev) => ({ ...prev, [field]: msg }));
  };

  // Clear field error on change
  const handleEmailChange = (v: string) => {
    setEmail(v);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };
  const handlePasswordChange = (v: string) => {
    setPassword(v);
    if (errors.password)
      setErrors((prev) => ({ ...prev, password: undefined }));
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  };
  const handleConfirmPasswordChange = (v: string) => {
    setConfirmPassword(v);
    if (errors.confirmPassword)
      setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
  };

  const handleSignUp = async () => {
    // Full-form validation (no toast for validation errors)
    const formErrors = validateSignup(currentValues);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsLoading(true);
    try {
      // If your backend supports avatar on signup, include it:
      // avatar: profileImg
      const res = await registerUser({
        email,
        password,
      } as any);

      if (res.success) {
        const userRes = await loginUser({ email, password });
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
        error?.data?.errorSources?.[0]?.message || "Something went wrong!"
      );
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#7b1f4b]/10 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-transparent" />

      <div className="bg-white bg-opacity-90 rounded-[8px] z-50 p-6 max-w-md w-full shadow-2xl shadow-[#7b1f4b] mx-4 sm:mx-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl text-[#7b1f4b] mb-4">
            <b>Register</b>
          </h2>
          <button
            onClick={closeModal}
            className="text-2xl mb-4 font-semibold text-gray-500 hover:text-[#7b1f4b]"
          >
            &times;
          </button>
        </div>

        {/* ⬇️ Circle avatar uploader (optional) */}
        <div className="w-full flex items-center justify-center mb-4">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <div className="w-24 h-24 rounded-full border border-[#7b1f4b] overflow-hidden flex items-center justify-center">
              {profileImg ? (
                <img
                  src={profileImg}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative flex items-center justify-center w-full h-full bg-gray-100 rounded-full">
                  {/* Icon in background */}
                  <FaRegUser className="absolute text-5xl text-[#7b1f4b] opacity-10" />

                  {/* Upload text in foreground */}
                  <span className="relative text-sm text-center text-[#7b1f4b] px-2">
                    Upload
                    <br />
                    Photo
                  </span>
                </div>
              )}
            </div>
            {isUploadingAvatar && (
              <div className="absolute inset-0 flex items-center justify-center text-xs text-[#7b1f4b] bg-white/60 rounded-full">
                Uploading...
              </div>
            )}
          </label>
        </div>

        {/* Email */}
        <label className="block text-sm font-medium text-black">
          User Email <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="email"
          placeholder="Email"
          className="border border-[#7b1f4b] p-2 w-full rounded text-black"
          value={email}
          onChange={(e) => handleEmailChange(e.target.value)}
          onBlur={handleBlur("email")}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}

        {/* Password */}
        <label className="block text-sm font-medium mt-2 text-black">
          Password <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="password"
          placeholder="Password"
          className="border border-[#7b1f4b] p-2 w-full rounded text-black"
          value={password}
          onChange={(e) => handlePasswordChange(e.target.value)}
          onBlur={handleBlur("password")}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}

        {/* Confirm Password */}
        <label className="block text-sm font-medium mt-2 text-black">
          Confirm Password <span className="text-red-500 text-lg">*</span>
        </label>
        <input
          type="password"
          placeholder="Confirm Password"
          className="border border-[#7b1f4b] p-2 w-full rounded text-black"
          value={confirmPassword}
          onChange={(e) => handleConfirmPasswordChange(e.target.value)}
          onBlur={handleBlur("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
        )}

        <button
          onClick={handleSignUp}
          className="btn-primary mt-2"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign Up"}
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
