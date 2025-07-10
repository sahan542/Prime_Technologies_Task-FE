import ProductCard from './ProductCard';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/reducers/cartSlice';
import { addToWishlist } from "@/redux/reducers/wishlistSlice";


interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  original_price: number;
  category: string;
  brand: string;
  img: string;
  sold_recently: number;
  benefits: string[];
  created_at: string;
  updated_at: string;
}

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const dispatch = useDispatch();

  // Handle add to cart
  const handleAddToCart = (product: Product) => {
    const cartItem = {
      product_id: product.id,
      id: product.slug,
      name: product.title,
      price: product.price,
      quantity: 1,  // default quantity as 1
      img: product.img,
      slug: product.slug,
    };
    dispatch(addToCart(cartItem));
  };

  // Handle add to wishlist
  const handleAddToWishlist = (product: Product) => {
    const wishlistItem = {
      product_id: product.id,
      id: product.slug,
      name: product.title,
      price: product.price,
      quantity: 1,  // default quantity as 1
      img: product.img,
      slug: product.slug,
    };
    dispatch(addToWishlist(wishlistItem));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          img={product.img}
          title={product.title}
          desc={product.description}
          rating={4}  // Assuming you have a rating value
          price={product.price.toString()}
          slug={product.slug}
          onAddToCart={() => handleAddToCart(product)}  // Pass the function as prop
          onAddToWishlist={() => handleAddToWishlist(product)}  // Pass the function as prop
        />
      ))}
    </div>
  );
}
