"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export default function ReturnPolicyModal({ isOpen, closeModal }: Props) {
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
            <b>Return Policy</b>
          </h2>
          <button
            onClick={closeModal}
            className="text-[#7b1f4b] text-xl hover:text-[#a03c6b]"
          >
            <IoMdClose />
          </button>
        </div>
        <p className="bg-[#f4dce6]/30">
          <p className="text-black text-justify px-2 py-2">
            Welcome to <b className="text-[#7b1f4b]">BrissBella</b>, your
            trusted skincare e-commerce destination. By accessing or purchasing
            from our website, you agree to our terms. All product descriptions,
            pricing, and availability are subject to change without notice.
            Orders are subject to confirmation and stock availability. We
            reserve the right to refuse service to anyone.
            <b className="text-[#7b1f4b]">Return Policy:</b> We accept returns
            within 7 days of delivery for unused, unopened products in original
            packaging. Return shipping costs are the customer's responsibility
            unless the item is defective or incorrect. Refunds will be processed
            once the product is received and inspected. Please contact our
            support team before initiating a return.
          </p>
        </p>
      </div>
    </div>,
    document.body
  );
}
