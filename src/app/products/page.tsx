'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import type { RootState, AppDispatch } from '@/redux/store';
import { fetchProducts } from '@/redux/reducers/productsSlice';
import ProductList from '@/components/ProductList';
import CategoryFilter from '@/components/filters/CategoryFilter';
import BrandFilter from '@/components/filters/BrandFilter';
import PriceRangeFilter from '@/components/filters/PriceRangeFilter';

export default function ProductPage() {
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector((state: RootState) => state.products?.items || []);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const totalItems = useSelector((state: RootState) => state.products.total);
  const totalPages = Math.ceil(totalItems / pagination.limit);

  const [filters, setFilters] = useState({
    category: [] as string[],
    brand: [] as string[],
    min_price: 0,
    max_price: 10000,
    search: '',
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, [searchQuery]);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, ...pagination }));
  }, [filters, pagination]);

  const handleFilterChange = (type: keyof typeof filters, value: string[] | number) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  const toggleArrayValue = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  return (
  <>
    <div className="flex flex-col md:flex-row gap-4 p-6 text-black">
      <aside className="w-full md:w-1/6 space-y-4 bg-[#f4dce6]/40 p-4 rounded-lg">
        <CategoryFilter
          categories={[
            'SKIN CARE',
            'CLENSERS',
            'MOISTURIZORS',
            'SERUMS',
            'TONERS',
            'SUNSCREENS',
            'EYE & LIP CARE',
          ]}
          selected={filters.category}
          onChange={(val: string) =>
            handleFilterChange('category', toggleArrayValue(filters.category, val))
          }
        />
        <BrandFilter
          brands={["Nature's Secrets", 'Prevense', 'Intense', 'British Co', 'Sisili']}
          selected={filters.brand}
          onChange={(val: string) =>
            handleFilterChange('brand', toggleArrayValue(filters.brand, val))
          }
        />
        <PriceRangeFilter
          min={0}
          max={10000}
          value={[filters.min_price, filters.max_price]}
          onChange={(val: [number, number]) =>
            setFilters((prev) => ({ ...prev, min_price: val[0], max_price: val[1] }))
          }
        />
      </aside>

      <main className="w-full md:w-5/6 flex flex-col items-center">
        <ProductList products={items} />

        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            disabled={pagination.page === 1}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: Math.max(1, prev.page - 1),
              }))
            }
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 rounded"
          >
            Prev
          </button>
          <span className="font-semibold text-lg">{pagination.page}</span>
          <button
            disabled={pagination.page >= totalPages}
            onClick={() =>
              setPagination((prev) => ({
                ...prev,
                page: prev.page + 1,
              }))
            }
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
          >
            Next
          </button>
        </div>
      </main>
    </div>
    
  </>
  );
}
