"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { use } from "react";
import { useSelector } from "react-redux";
import { addToCart } from "../../../redux/reducers/cartSlice";
import { addToWishlist } from "@/redux/reducers/wishlistSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { MyLoader } from "@/components/shared/Ui/MyLoader";
import { useGetSingleProductQuery } from "@/redux/api/productApi";
import { RootState } from "@/redux/store";
import ReviewQAPublic from "./ReviewQAPublic";
import NewProducts from "@/components/NewProducts";

interface Product {
  id: number;
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

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const dispatch = useAppDispatch();
  const { slug } = use(params);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const token = useSelector((state: RootState) => state.auth.token);
  console.log("Access Token from Redux 203:", token);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`http://64.227.146.100:8000/api/products/${slug}`);
      console.log("hello : ", res);
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

  const { data: singleProduct, isLoading: isSingleProductLoading } =
    useGetSingleProductQuery(slug);

  const cartItems = useAppSelector((state) =>
    state.cart.items.filter((item) => item?.product?.id)
  );
  const wishlistItems = useAppSelector((state) => state.wishlist.items);

  if (isSingleProductLoading) {
    return <MyLoader />;
  }
  if (loading) return <div>Loading...</div>;

  if (!product) return notFound();

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  console.log("singleProduct:", singleProduct);

  const handleAddToCart = () => {
    const alreadyCart = cartItems.some(
      (item) => item.product && item.product.id === singleProduct.id
    );

    if (alreadyCart) {
      toast.error("Already you have added in cart!");
    } else if (singleProduct.sold_recently === 0) {
      toast.error("Out of stock!");
    } else {
      const mappedProduct = {
        id: singleProduct.id ?? `fallback-id-${singleProduct.slug}`,
        name: singleProduct.title,
        slug: singleProduct.slug,
        description: singleProduct.description,
        image: singleProduct.img,
        images: singleProduct.images ?? [],
        category: singleProduct.category,
        price: singleProduct.price,
        stock: singleProduct.stock ?? 0,
        tags: singleProduct.tags ?? [],
        totalReviews: singleProduct.totalReviews ?? 0,
        averageRatings: singleProduct.averageRatings ?? 0,
        salesCount: singleProduct.soldRecently ?? 0,
        isDeleted: false,
        createdAt: singleProduct.createdAt ?? new Date().toISOString(),
        updatedAt: singleProduct.updatedAt ?? new Date().toISOString(),
        discount: singleProduct.discount ?? 0,
        __v: 0,
      };

      dispatch(addToCart({ product: mappedProduct, quantity: quantity }));

      toast.success("Add to cart success");
    }
  };

  const handleAddToWishlist = () => {
    const mappedProduct = {
      id: singleProduct.id ?? `fallback-id-${singleProduct.slug}`,
      name: singleProduct.title,
      slug: singleProduct.slug,
      description: singleProduct.description,
      image: singleProduct.img,
      images: singleProduct.images ?? [],
      category: singleProduct.category,
      price: singleProduct.price,
      stock: singleProduct.stock ?? 0,
      tags: singleProduct.tags ?? [],
      totalReviews: singleProduct.totalReviews ?? 0,
      averageRatings: singleProduct.averageRatings ?? 0,
      salesCount: singleProduct.soldRecently ?? 0,
      isDeleted: false,
      createdAt: singleProduct.createdAt ?? new Date().toISOString(),
      updatedAt: singleProduct.updatedAt ?? new Date().toISOString(),
      discount: singleProduct.discount ?? 0,
      __v: 0,
    };

    dispatch(addToWishlist(mappedProduct)); // ✅ remove wrapping with { product: ... }
    toast.success("Add to wishlist success");
  };

  return (
    <>
      <div className="p-16 bg-white text-black max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="relative border-[2px] border-[#7b1f4b] rounded-lg overflow-hidden group shadow-lg shadow-[#7b1f4b]/40">
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
            <p className="text-sm text-gray-600 mb-1">
              Category: {product.category}
            </p>
            <p className="text-sm mb-3">
              🔥 {product.soldRecently || 32} items sold recently
            </p>

            <div className="mb-3">
              <span className="line-through text-gray-400 text-lg mr-2">
                Rs. {product.price + 120}
              </span>
              <span className="text-[#7b1f4b] text-2xl font-bold">
                Rs. {product.price}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <button onClick={decreaseQuantity} className="border px-3 py-1">
                –
              </button>
              <span>{quantity}</span>
              <button onClick={increaseQuantity} className="border px-3 py-1">
                +
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-3">
              <button
                onClick={handleAddToCart}
                className="bg-[#7b1f4b] text-white px-6 py-2 rounded hover:bg-[#d4749e] mb-3 sm:mb-0"
              >
                ADD TO CART
              </button>

              <button
                onClick={handleAddToWishlist}
                className="border border-[#7b1f4b] px-6 py-2 rounded hover:bg-gray-100"
              >
                Add to Wishlist
              </button>
            </div>

            <div className="bg-gray-100 border border-gray-300 p-4 rounded mt-2">
              <h3 className="font-semibold text-lg mb-2">
                Benefits of {product.title}:
              </h3>
              <ul className="list-decimal pl-5 text-sm space-y-1">
                {product.benefits.map((benefit, index) => (
                  <li key={index}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: benefit.replace(/—/g, "<strong> —</strong>"),
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="">
          <ReviewQAPublic product_id={product.id} />
        </div>
      </div>
      <NewProducts />
    </>
  );
}
