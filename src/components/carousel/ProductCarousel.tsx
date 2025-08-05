// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import axios from "axios";
// import axiosInstance from '../../app/api/axiosInstance';
// import { API_ENDPOINTS } from '../../app/api/endpoints';

// interface Product {
//   id: string;
//   title: string;
//   image: string;
//   price: number;
// }

// interface ProductCarouselProps {
//   title: string;
//   products?: Product[];
// }

// const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products = [] }) => {
//   const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const carouselRef = useRef<HTMLDivElement | null>(null);

//   const fetchProductsByCategory = async () => {
//     try {
//       // const response = await axios.get(
//       //   `http://localhost:8000/api/products/category/${title}`
//       // );
//       // setFetchedProducts(response.data);
//       const encodedCategory = encodeURIComponent(title);
//       const response = await axiosInstance.get<Product[]>(
//         API_ENDPOINTS.GET_ALL_PRODUCTS.replace("${currentPage}", "1")
//         .replace("${categoryName}", encodedCategory)
//       );
//       console.log("response 38 line in Product Coursal : ",response);
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.error("Error:", error.response?.data || error.message);
//         setError("Failed to fetch products.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProductsByCategory();
//   }, [title]);

//   const scrollCarousel = (direction: "left" | "right") => {
//     if (carouselRef.current) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };

//   if (loading) return <div className="text-center">Loading...</div>;
//   if (error) return <div className="text-center text-red-600">{error}</div>;
//   if (fetchedProducts.length === 0) return <div className="text-center">No products found.</div>;

//   return (
//     <div className="my-8 mx-4 relative">
//       <h2 className="text-lg font-bold text-[#7b1f4b] mb-4">{title}</h2>

//       <button
//         onClick={() => scrollCarousel("left")}
//         className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#d4749e] text-white p-2 rounded-full shadow-md"
//       >
//         <FaArrowLeft />
//       </button>

//       <button
//         onClick={() => scrollCarousel("right")}
//         className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#d4749e] text-white p-2 rounded-full shadow-md"
//       >
//         <FaArrowRight />
//       </button>

//       <div
//         ref={carouselRef}
//         className="flex overflow-x-auto gap-4 no-scrollbar px-10"
//       >
// {fetchedProducts.map((product) => (
//   <div
//     key={product.id}
//     className="min-w-[100px] max-w-[180px] flex-shrink-0 border-2 border-[#7b1f4b] rounded-xl bg-white shadow-lg transition hover:shadow-xl rounded-full"
//   >
//     <div className="rounded-t-xl overflow-hidden">
//       <img
//         src={product.img}
//         alt={product.title}
//         className="w-full h-40 object-cover"
//       />
//     </div>
//     <div className="p-3">
//       <h5 className="text-[#7b1f4b] font-semibold text-center text-base mb-1">
//         {product.title}
//       </h5>
//       <p className="text-black font-bold text-center">Rs. {product.price}</p>
//     </div>
//   </div>
// ))}

//       </div>
//     </div>
//   );
// };

// export default ProductCarousel;
