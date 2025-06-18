'use client';


import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./../store/store"; // Assuming you have this setup
import { updateQuantity, removeFromCart } from "../store/slices/cartSlice"; // Update these paths based on your file structure
import { MdOutlineClose } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { useRouter } from 'next/navigation';


interface CartPanelProps {
  isOpen: boolean;
  toggleCart: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, toggleCart }) => {
    const router = useRouter();
  const dispatch = useDispatch();


  // Fetch cart items from Redux
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity >= 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div
      className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-lg transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } z-50`}
    >
      <button
        onClick={toggleCart}
        className="absolute top-4 right-4 text-[#7b1f4b] text-2xl"
      >
        <MdOutlineClose />
      </button>
      <div className="mt-12"></div>

      {/* Cart Items */}
      <div className="flex flex-col p-4">
        {cartItems.length === 0 ? (
          <p className="text-black text-[15px]">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 p-4 border-1 border-[#7b1f4b] shadow-sm rounded-lg"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <div className="flex flex-col">
                <h4 className="text-[16px] text-black"><b>{item.name}</b></h4>
                <span className="text-[14px] my-1 text-black">
                  Rs {item.price}/=
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="w-10 h-10 bg-[#9b2d4e] text-[#9b2d4e] rounded-full shadow-md hover:bg-white transition duration-300 flex items-center justify-center hover:border-[1px] hover:border-[#7b1f4b]"
                  >
                    <FiMinus className="text-xl text-white hover:text-[#7b1f4b] " />
                  </button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="w-10 h-10 bg-[#9b2d4e] text-[#9b2d4e] rounded-full shadow-md hover:bg-white transition duration-300 flex items-center justify-center hover:border-[1px] hover:border-[#7b1f4b]"
                  >
                    <FaPlus className="text-xl text-white hover:text-[#7b1f4b] " />
                  </button>
                </div>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-[#d4749e]"
              >
                <IoMdCloseCircle />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Subtotal and Checkout */}
      <div className="p-4 border-t mt-auto">
        <div className="flex justify-between">
          <span className="text-[14px]">Subtotal:</span>
          <span className="text-[14px] text-black">
            Rs .
            {cartItems.reduce(
              (total, item) => total + item.price * item.quantity,
              0
            )}
          </span>
        </div>
<button
  className="btn-primary mt-4"
  onClick={() => router.push('/checkout')}
>
  Checkout
</button>



      </div>
    </div>
  );
};

export default CartPanel;
