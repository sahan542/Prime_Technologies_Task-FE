
// 'use client';

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/store/store';
// import { removeFromCart, updateQuantity } from '@/store/slices/cartSlice';

// const CartPanel = ({ isOpen, toggleCart }: { isOpen: boolean; toggleCart: () => void }) => {
//   const items = useSelector((state: RootState) => state.cart.items);
//   const dispatch = useDispatch();

//   if (!isOpen) return null;

//   return (
//     <div className="fixed top-0 right-0 w-80 bg-white h-full shadow-xl p-4 z-50">
//       <h2 className="text-lg font-bold mb-4">Your Cart</h2>
//       {items.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <ul className="space-y-4">
//           {items.map((item) => (
//             <li key={item.id} className="flex justify-between items-center border-b pb-2">
//               <div>
//                 <p className="font-semibold">{item.name}</p>
//                 <p>Qty: 
//                   <input
//                     type="number"
//                     className="w-12 ml-2 border"
//                     value={item.quantity}
//                     onChange={(e) =>
//                       dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))
//                     }
//                   />
//                 </p>
//                 <p>Rs. {item.price}</p>
//               </div>
//               <button
//                 onClick={() => dispatch(removeFromCart(item.id))}
//                 className="text-red-500"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//       <button
//         onClick={toggleCart}
//         className="mt-4 px-4 py-2 bg-black text-white rounded w-full"
//       >
//         Close Cart
//       </button>
//     </div>
//   );
// };

// export default CartPanel;


// src/components/CartPanel.tsx
import React from 'react';

interface CartPanelProps {
  isOpen: boolean;
  toggleCart: () => void;
}

const CartPanel: React.FC<CartPanelProps> = ({ isOpen, toggleCart }) => {
  return (
    <div className={`fixed top-0 right-0 w-[400px] h-full bg-white shadow-xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <button onClick={toggleCart} className="absolute top-4 right-4 text-black">
        Close
      </button>
      {/* Render cart contents here */}
    </div>
  );
};

export default CartPanel;
