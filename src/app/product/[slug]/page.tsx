'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../store/slices/cartSlice'; // Assuming addToWishlist is implemented in the slice
import { CartItem } from '@/types/cart';
import type { AppDispatch } from '@/store/store';
import { addToWishlist } from '@/store/slices/wishlistSlice';

interface Product {
  slug: string;
  title: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  brand: string;
  img: string;
  soldRecently: number;
  benefits: string[];
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); 
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://localhost:8000/api/products/${slug}`);
      if (res.ok) {
        const data: Product = await res.json();
        setProduct(data);
      } else {
        setProduct(null);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [slug]);

  // Show loading state
  if (loading) return <div>Loading...</div>;

  if (!product) return notFound();

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrease quantity, ensuring it doesn't go below 1
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  // Add to Cart
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      product_id: Number(product.slug),  // Convert the slug to a number
      id: product.slug,
      name: product.title,
      price: product.price,
      quantity,
      img: product.img,
      slug: product.slug,  // Assuming slug should still be stored
    };
    dispatch(addToCart(cartItem));
  };

  // Add to Wishlist
  const handleAddToWishlist = () => {
    const wishlistItem = {
      product_id: Number(product.slug),  // Ensure it's a number if required, or keep as string if slug is string
      id: product.slug,
      name: product.title,
      price: product.price,
      quantity: 1, // You can default to 1 since it's typically not required in wishlist
      img: product.img,
      slug: product.slug,  // Ensure slug is passed
    };
    dispatch(addToWishlist(wishlistItem));  // Dispatch the action to add to wishlist
  };

  return (
    <div className="p-16 bg-white text-black max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative border-[2px] border-[#7b1f4b] rounded-lg overflow-hidden group">
          <img
            src={product.img}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        </div>


        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-[#7b1f4b] uppercase">
            {product.title}
          </h2>          
          <p className="text-sm text-gray-600 mb-1">Category: {product.category}</p>
          <p className="text-sm mb-3">🔥 {product.soldRecently} items sold recently</p>

          <div className="mb-3">
            <span className="line-through text-gray-400 text-lg mr-2">Rs. {product.original_price}</span>
            <span className="text-[#7b1f4b] text-2xl font-bold">Rs. {product.price}</span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={decreaseQuantity} className="border px-3 py-1">–</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} className="border px-3 py-1">+</button>
          </div>

<div className="flex flex-col sm:flex-row sm:space-x-3">
  {/* Add to Cart Button */}
  <button 
    onClick={handleAddToCart} 
    className="bg-[#7b1f4b] text-white px-6 py-2 rounded hover:bg-[#d4749e] mb-3 sm:mb-0"
  >
    ADD TO CART
  </button>

  {/* Add to Wishlist Button */}
  <button 
    onClick={handleAddToWishlist} 
    className="border border-[#7b1f4b] px-6 py-2 rounded hover:bg-gray-100"
  >
    Add to Wishlist
  </button>
</div>


          {/* Benefits */}
          <div className="bg-gray-100 border border-gray-300 p-4 rounded mt-2">
            <h3 className="font-semibold text-lg mb-2">Benefits of {product.title}:</h3>
            <ul className="list-decimal pl-5 text-sm space-y-1">
              {product.benefits.map((benefit, index) => (
                <li key={index}>
                  <span dangerouslySetInnerHTML={{ __html: benefit.replace(/—/g, '<strong> —</strong>') }} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
