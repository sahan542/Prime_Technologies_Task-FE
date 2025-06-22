'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; 

const NewProducts = () => {
  const [productsData, setProductsData] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/products') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProductsData(data);  
        setLoading(false); 
      })
      .catch((error) => {
        setError(error.message); 
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='bg-white px-6'>
      <div className="container pt-16">
        <h2 className='font-bold text-2xl pb-4 text-[#7b1f4b]'>Best Products</h2>
          <div className="grid grid-cols-2 place-items-center sm:place-items-start sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-x-10 xl:gap-y-10">
            {productsData.map((item) => (
              <ProductCard
                key={item.id}
                img={item.img}
                title={item.title}
                desc={item.desc}
                rating={item.rating}
                price={item.price}
                slug={item.slug} 
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
