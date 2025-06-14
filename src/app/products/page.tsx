'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import type { RootState, AppDispatch } from '@/store/store';
import { fetchProducts } from '@/store/slices/productsSlice';
import ProductList from '@/components/ProductList';
import CategoryFilter from '@/components/filters/CategoryFilter';
import BrandFilter from '@/components/filters/BrandFilter';
import PriceRangeFilter from '@/components/filters/PriceRangeFilter';

export default function ProductPage() {
  const dispatch: AppDispatch = useDispatch();
  const items = useSelector((state: RootState) => state.products.items);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  const [filters, setFilters] = useState({
    category: [] as string[],
    brand: [] as string[],
    min_price: 0,
    max_price: 10000,
    search: '', // new key
  });

  // Keep filters in sync with search URL param
  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: searchQuery }));
  }, [searchQuery]);

  // Fetch whenever filters change
  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [filters]);

  const handleFilterChange = (type: keyof typeof filters, value: string[] | number) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const toggleArrayValue = (arr: string[], val: string) =>
    arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];

  return (
    <div className="flex gap-6 p-4 text-black">
      <aside className="w-1/6 space-y-4">
        <CategoryFilter
          categories={['moisturizers', 'Hair Care', 'Makeup']}
          selected={filters.category}
          onChange={(val: string) =>
            handleFilterChange('category', toggleArrayValue(filters.category, val))
          }
        />
        <BrandFilter
          brands={["Nature's Secrets", 'Cetaphil', 'Aveeno']}
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
      <main className="w-3/4">
        <ProductList products={items} />
      </main>
    </div>
  );
}
