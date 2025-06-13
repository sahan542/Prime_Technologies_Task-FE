// src/components/Cart/ProductCard.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/slices/cartSlice';
import { AppDispatch } from '../../store/store';
import { Product } from '../../types/Product';  // Now, import the Product type

interface ProductCardProps {
  product: Product;  // Use the Product type for the product prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
    }));
  };

  return (
    <div>
      <h2>{product.name}</h2>
      <p>${product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
