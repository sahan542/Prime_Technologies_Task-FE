"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/reducers/cartSlice";
import { addToWishlist } from "@/store/slices/wishlistSlice";
import { mockCartItem } from "@/types/mockData";

const AddToCartTest = () => {
  const dispatch = useDispatch();

  const handleAddMock = () => {
    dispatch(addToCart(mockCartItem));
  };

  const handleAddWishlistMock = () => {
    dispatch(addToWishlist({
    //   product_id: mockCartItem.product.id,
      id: mockCartItem.product.id,
      name: mockCartItem.product.name,
      price: mockCartItem.product.price,
      quantity: 1,
      img: mockCartItem.product.image,
      slug: mockCartItem.product.slug
    }));
  };

  return (
    <div className="p-6 space-y-4">
      <button
        onClick={handleAddMock}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Add Mock Product to Cart
      </button>

      <button
        onClick={handleAddWishlistMock}
        className="px-4 py-2 bg-pink-600 text-white rounded"
      >
        Add Mock Product to Wishlist
      </button>
    </div>
  );
};

export default AddToCartTest;
