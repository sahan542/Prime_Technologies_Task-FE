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

  // Handle adding to the cart
  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        product_id: Number(product.id),
        name: product.name,
        price: product.price,
        quantity,
        img: product.image,  // include image property
        slug: product.slug,  // include slug property
      })
    );
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
