'use client';

import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const categories = ['Skin Care', 'Baby Care', 'Makeup', 'Hair Care'];

  useEffect(() => {
    fetch('http://localhost:8000/api/products/')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); 
      })
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  useEffect(() => {
    const filtered = products.filter(p => {
      const matchCategory = !selectedCategory || p.category === selectedCategory;
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCategory && matchPrice && matchSearch;
    });
    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, searchTerm]);

  return (
    <div className="min-h-screen bg-white text-black px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 border rounded-lg p-4">
          {/* Search */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Search</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Categories</label>
            {categories.map(cat => (
              <div key={cat} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <label className="ml-2 text-sm">{cat}</label>
              </div>
            ))}
            <button onClick={() => setSelectedCategory(null)} className="text-sm text-blue-600 mt-2">
              Clear Category
            </button>
          </div>

          {/* Price Filter */}
          <div className="mb-2">
            <label className="block font-semibold mb-2">Price Range</label>
            <Slider
              range
              min={0}
              max={100000}
              step={500}
              value={priceRange}
              onChange={(range) => setPriceRange(range as [number, number])}
            />
            <p className="text-sm mt-2">
              Rs. {priceRange[0]} — Rs. {priceRange[1]}
            </p>
            <button
              onClick={() => setPriceRange([0, 100000])}
              className="text-sm text-blue-600 mt-2"
            >
              Reset Price
            </button>
          </div>
        </aside>

        {/* Product List */}
        <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.length === 0 ? (
            <p className="col-span-full text-gray-500">No products found.</p>
          ) : (
            filteredProducts.map(product => (
              <div key={product.id} className="border p-4 rounded shadow-sm">
                <div className="h-40 bg-gray-100 mb-4 flex items-center justify-center">
                  <span className="text-gray-400">Image</span>
                </div>
                <h2 className="font-semibold text-sm">{product.name}</h2>
                <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                <p className="text-lg font-bold">Rs. {product.price.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">{product.description}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
