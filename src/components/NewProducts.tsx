'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const NewProducts = () => {
  const [productsData, setProductsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });
  const [totalItems, setTotalItems] = useState(0);

  const fetchProducts = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://64.227.146.100:8000/api/products?page=${page}&limit=${pagination.limit}`
      );
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();

      if (Array.isArray(data.items)) {
        setProductsData(data.items);
        setTotalItems(data.total || 0);
      } else if (Array.isArray(data)) {
        setProductsData(data);
        setTotalItems(data.length);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(pagination.page);
  }, [pagination.page]);

  const totalPages = Math.ceil(totalItems / pagination.limit);

  if (loading) return <div className="text-center py-8">Loading best products...</div>;
  if (error) return <div className="text-center text-red-500 py-4">Error: {error}</div>;

  return (
    <div className="bg-white px-6">
      <div className="container pt-16">
        <h2 className="font-bold text-2xl pb-4 text-[#7b1f4b]">Best Products</h2>
        <div className="grid grid-cols-2 place-items-center sm:place-items-start sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 xl:gap-x-10 xl:gap-y-10">
          {productsData.map((item) => (
            <ProductCard
              key={item.id}
              img={item.img}
              title={item.title}
              price={item.price}
              slug={item.slug}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              type="button"
              disabled={pagination.page === 1}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))
              }
              className="px-4 py-2 bg-[#d4749e] hover:bg-[#7b1f4b] disabled:opacity-50 rounded text-white"
            >
              Prev
            </button>

            <span className="text-lg font-semibold text-[#7b1f4b]">
              Page {pagination.page} of {totalPages}
            </span>
            <button
              type="button"
              disabled={pagination.page >= totalPages}
              onClick={() =>
                setPagination((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              className="px-4 py-2 bg-[#d4749e] hover:bg-[#7b1f4b] disabled:opacity-50 rounded text-white"
            >
              Next
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default NewProducts;
