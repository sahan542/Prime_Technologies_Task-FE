"use client";

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import ProductCard from "./ProductCard"; 

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: string;
  original_price: number;
  brand: string;
  img: string;
  stock: number;
  discount: number;
  total_reviews: number;
  average_ratings: number;
  sales_count: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  categoryName: string;
}

const CategoryCarousel: React.FC<Props> = ({ categoryName }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

const settings = {
  dots: false,
  infinite: true,
  speed: 3000, 
  autoplay: true,
  autoplaySpeed: 0, 
  cssEase: "linear", 
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
    breakpoint: 480,
    settings: {
        slidesToShow: 2,
    },
    }
  ],
};


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const encodedCategory = encodeURIComponent(categoryName);
        const res = await axios.get<Product[]>(
          `http://64.227.146.100:8000/api/products/category/${encodedCategory}`
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  if (loading) return <div className="text-center py-8">Loading {categoryName}...</div>;

  if (!products.length) return <div className="text-center py-8">No products in {categoryName}</div>;

  return (
    <div className="container mx-auto py-12 px-4">
      <h2 className="font-bold text-xl pb-4 text-[#7b1f4b]">{categoryName} CATEGORY</h2>
<Slider {...settings}>
  {products.map((product) => (
    <div key={product.id} className="px-2">
      <div className="w-full sm:w-full md:w-[90%] lg:w-[85%] xl:w-[80%] mx-auto">
        <ProductCard
          img={product.img}
          title={product.title}
          rating={product.average_ratings}
          price={product.price}
          slug={product.slug}
          onAddToCart={() => {}}
          onAddToWishlist={() => {}}
        />
      </div>
    </div>
  ))}
</Slider>
    </div>
  );
};

export default CategoryCarousel;
