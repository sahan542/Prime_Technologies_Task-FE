import React, { useState, useEffect, useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

// Type for each product in the carousel
interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

interface ProductCarouselProps {
  title: string;
  products: Product[]; // Optional for fallback static data
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, products }) => {
  const [fetchedProducts, setFetchedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Use useRef to reference the carousel container div
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/products/category/${title}`
      );
      setFetchedProducts(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error details:", error.response?.data || error.message);
        setError("Failed to fetch products: " + (error.response?.data || error.message));
      } else {
        console.error("Unknown error:", error);
        setError("Failed to fetch products.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [title]); // Fetch when the title/category changes

  // Handle left and right scroll
  const scrollCarousel = (direction: string) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (fetchedProducts.length === 0) return <div>No products found in this category.</div>;

  return (
    <div className="my-8 mx-6">
      <h2 className="text-2xl font-semibold mb-4 text-[#7b1f4b]">{title}</h2>
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scrollCarousel("left")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#d4749e] p-2 rounded-full shadow-md"
        >
          <FaArrowLeft />
        </button>

        {/* Product Carousel */}
        <div
          ref={carouselRef}  // Using useRef here
          className="flex overflow-x-auto space-x-4 pb-4 gap-6 no-scrollbar"
        >
          {fetchedProducts.map((product) => (
            <div key={product.id} className="min-w-[200px] border-[2px] border-[#7b1f4b] rounded-[10px]">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-md"
              />
              <h5 className="text-base sm:text-lg md:text-xl mt-2 text-[#7b1f4b] flex items-center justify-center">{product.title}</h5>
              <p className="font-bold text-black flex items-center justify-center">Rs. {product.price}</p>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scrollCarousel("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#d4749e] p-2 rounded-full shadow-md"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ProductCarousel;
