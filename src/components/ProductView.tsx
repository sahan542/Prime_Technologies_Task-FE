// 'use client';

// import React, { useState } from 'react';
// import Image from 'next/image';
// import productsData from '@/data/productsData';
// import { notFound } from 'next/navigation';
// import { useDispatch } from 'react-redux';
// import { addToCart, updateQuantity, syncCartItem } from '../store/slices/cartSlice';
// import SignInModal from '../components/modals/SignInModal';
// import { CartItem } from '@/types/cart';
// import type { AppDispatch } from '@/store/store';

// interface ProductViewProps {
//   slug: string;
// }

// export default function ProductView({ slug }: ProductViewProps) {
//   const product = productsData.find((p) => p.slug === slug);
//   const [qty, setQty] = useState(1);
//   const dispatch = useDispatch<AppDispatch>();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   if (!product) return notFound();

//   const handleAddToCart = async () => {
//     console.log("Add to Cart clicked");

//     const isAuthenticated = localStorage.getItem('isAuthenticated');
//     if (!isAuthenticated) {
//       setIsModalOpen(true);
//       return;
//     }

//     const userId = 1; // Replace with actual user ID

//     const cartItem: CartItem = {
//       id: product.id.toString(),
//       name: product.title,
//       price: parseFloat(product.price),
//       quantity: qty,
//       img: product.img,
//     };
//     console.log("sahan added : ");

//     try {
//       // Sync with backend
//       await dispatch(
//         syncCartItem({
//           userId,
//           item: {
//             product_id: product.id,
//             quantity: qty,
//           },
//         })
//       ).unwrap();

//       console.log("Synced with backend!");

//       // ✅ Update local Redux cart state
//       dispatch(addToCart(cartItem));
//     } catch (error: any) {
//       console.error("Sync failed:", error?.message || error);
//     }
//   };

//   const handleChangeQuantity = (newQuantity: number) => {
//     if (newQuantity >= 1) {
//       setQty(newQuantity);
//       dispatch(updateQuantity({ id: product.id.toString(), quantity: newQuantity }));
//     }
//   };

//   const closeModal = () => setIsModalOpen(false);

//   return (
//     <div className="p-10 bg-white text-black max-w-[1200px] mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//         <div className="relative border rounded-lg overflow-hidden group">
//           <Image
//             src={product.img}
//             alt={product.title}
//             width={600}
//             height={600}
//             className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-110"
//           />
//           <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">SALE 20%</span>
//           <span className="absolute bottom-2 left-2 bg-blue-700 text-white px-2 py-1 text-xs rounded">Imported from Australia</span>
//         </div>

//         <div>
//           <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
//           <p className="text-sm text-gray-600 mb-1">Categories: {product.category}</p>
//           <p className="text-sm mb-3">🔥 {product.soldRecently} items sold in last 3 hours</p>

//           <div className="mb-3">
//             <span className="line-through text-gray-400 text-lg mr-2">Rs. {product.originalPrice}</span>
//             <span className="text-blue-700 text-2xl font-bold">Rs. {product.price}</span>
//           </div>

//           <div className="flex items-center gap-4 mb-5">
//             <button onClick={() => handleChangeQuantity(qty - 1)} className="border px-3 py-1">–</button>
//             <span>{qty}</span>
//             <button onClick={() => handleChangeQuantity(qty + 1)} className="border px-3 py-1">+</button>
//           </div>

//           <div className="flex gap-4 mb-6">
//             <button
//               onClick={handleAddToCart}
//               className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
//             >
//               ADD TO CARTs
//             </button>
//             <button className="border px-6 py-2 rounded hover:bg-gray-100">
//               Add to Wishlist
//             </button>
//           </div>

//           <div className="bg-gray-100 border border-gray-300 p-4 rounded">
//             <h3 className="font-semibold text-lg mb-2">Benefits of {product.title}:</h3>
//             <ul className="list-decimal pl-5 text-sm space-y-1">
//               {product.benefits.map((b, i) => (
//                 <li key={i}><span dangerouslySetInnerHTML={{ __html: b.replace(/—/g, '<strong> —</strong>') }} /></li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       <SignInModal isOpen={isModalOpen} closeModal={closeModal}  />
//     </div>
//   );
// }
