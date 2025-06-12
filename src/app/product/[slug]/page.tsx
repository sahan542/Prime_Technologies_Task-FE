'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { use } from 'react';
import Link from 'next/link';

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

    // State for quantity

  // Increase quantity
  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  // Decrease quantity, ensuring it doesn't go below 1
  const decreaseQuantity = () => {
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  return (
    <div className="p-10 bg-white text-black max-w-[1200px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="relative border rounded-lg overflow-hidden group">
          <img
            src={product.img}
            alt={product.title}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-sm text-gray-600 mb-1">Category: {product.category}</p>
          <p className="text-sm mb-3">🔥 {product.soldRecently} items sold recently</p>

          <div className="mb-3">
            <span className="line-through text-gray-400 text-lg mr-2">Rs. {product.originalPrice}</span>
            <span className="text-blue-700 text-2xl font-bold">Rs. {product.price}</span>
          </div>

                    {/* Quantity Controls */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={decreaseQuantity} className="border px-3 py-1">–</button>
            <span>{quantity}</span>
            <button onClick={increaseQuantity} className="border px-3 py-1">+</button>
          </div>

          {/* Add to Cart Button */}
          <Link href="/cart">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
              ADD TO CART
            </button>
          </Link>

          {/* Add to Wishlist Button */}
          <Link href="/wishlist">
            <button className="border px-6 py-2 rounded hover:bg-gray-100">
              Add to Wishlist
            </button>
          </Link>

          {/* Benefits */}
          <div className="bg-gray-100 border border-gray-300 p-4 rounded">
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
