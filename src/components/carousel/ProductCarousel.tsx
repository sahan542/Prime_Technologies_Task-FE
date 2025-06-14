'use client';

import React from 'react';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import ProductCard from '../card/ProductCard';

type Product = {
  id: string;
  title: string;
  image: string;
  price: number;
};

type Props = {
  title: string;
  products: Product[];
};

const ProductCarousel: React.FC<Props> = ({ title, products }) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
      spacing: 10,
    },
    breakpoints: {
      '(min-width: 640px)': { slides: { perView: 3, spacing: 15 } },
      '(min-width: 1024px)': { slides: { perView: 4, spacing: 20 } },
    },
  });

  return (
    <div className="my-10 mx-[25px]">
      <h2 className='font-bold text-2xl pb-4 text-[#7b1f4b]'>{title}</h2>
      <div ref={sliderRef} className="keen-slider">
        {products.map((product) => (
          <div key={product.id} className="keen-slider__slide">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
