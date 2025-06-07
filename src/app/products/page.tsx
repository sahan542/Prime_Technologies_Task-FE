'use client';

import { useEffect, useState } from 'react';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/products/')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products Page</h1>
      <ul className="space-y-2">
        {products.map(product => (
          <li key={product.id} className="border p-3 rounded shadow bg-white text-black">
            <h2 className="font-semibold">{product.name}</h2>
            <p>${product.price.toFixed(2)}</p>
            <p className="text-gray-600">{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
