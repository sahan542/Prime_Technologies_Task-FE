// src/types/Product.ts

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;  // Assuming products have an image URL
  availability: 'inStock' | 'outOfStock' | 'backorder';  // Example of availability field
  description: string[];
  slug: string;   // Array of product descriptions
  // Add any other fields related to the product that you need
}
