"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function TermsConditionsModal({ isOpen, closeModal }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-[9999] border-1 border-[#7b1f4b] ">
      <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-md w-full shadow-2xl shadow-[#7b1f4b] mx-4 sm:mx-6 rounded-xl">
        <div className="flex justify-between items-center mb-4 rounded-xl">
          <h2 className="text-2xl text-[#7b1f4b]">
            <b>Terms & Conditions</b>
          </h2>
          <button
            onClick={closeModal}
            className="text-[#7b1f4b] text-2xl hover:text-[#a03c6b]"
          >
            <IoMdClose />
          </button>
        </div>
        <p className="bg-[#f4dce6]/30">
          <p className="text-black text-justify px-2 py-2">
            Welcome to <b className="text-[#7b1f4b]">BrissBella</b>, your trusted skincare e-commerce destination.
            By accessing or purchasing from our website, you agree to our terms.
            All product descriptions, pricing, and availability are subject to
            change without notice. Orders are subject to confirmation and stock
            availability. We are not responsible for any allergic reactions or
            skin issues; always perform a patch test before use. You agree not to
            misuse our products or content. Payments must be completed before
            shipment. We reserve the right to refuse service to anyone. For full
            details on returns, privacy, and policies, please review our
            respective policy pages.{" "}
          </p>

        </p>
      </div>
    </div>,
    document.body
  );
}
