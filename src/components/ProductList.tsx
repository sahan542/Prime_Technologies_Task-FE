// components/ProductList.tsx
import ProductCard from './ProductCard';

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          img={product.img}
          title={product.title}
          desc={product.description}
          rating={4} // default static rating for now
          price={product.price.toString()}
          slug={product.slug}
        />
      ))}
    </div>
  );
}
