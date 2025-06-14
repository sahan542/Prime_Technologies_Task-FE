// src/components/CartSidebar.tsx
'use client';

import React, { useState } from 'react';
import { useCart } from '@/store/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

interface CartSidebarProps {
  trigger?: React.ReactNode;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    items,
    count,
    total,
    isEmpty,
    isLoading,
    removeItem,
    incrementQuantity,
    decrementQuantity,
  } = useCart();

  const handleRemoveItem = async (itemId: string, itemName: string) => {
    try {
      await removeItem(itemId);
      toast.success(`${itemName} removed from cart`);
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const DefaultTrigger = () => (
    <Button variant="outline" size="sm" className="relative">
      <ShoppingCart className="h-4 w-4" />
      {count > 0 && (
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs p-0"
        >
          {count > 99 ? '99+' : count}
        </Badge>
      )}
    </Button>
  );

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {trigger || <DefaultTrigger />}
      </SheetTrigger>
      
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5" />
              <span>Shopping Cart</span>
              {count > 0 && (
                <Badge variant="secondary">
                  {count} {count === 1 ? 'item' : 'items'}
                </Badge>
              )}
            </SheetTitle>
          </div>
        </SheetHeader>

        {/* Cart Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {isEmpty ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center py-8">
                <ShoppingCart className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 mb-4">
                  Add some items to get started
                </p>
                <Button onClick={() => setIsOpen(false)}>
                  Continue Shopping
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-3 p-3 bg-gray-50 rounded-lg">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || '/placeholder-product.jpg'}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-gray-900 truncate">
                            {item.name}
                          </h4>
                          <p className="text-xs text-gray-500">{item.brand}</p>
                          <p className="text-sm font-medium text-gray-900 mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id, item.name)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          disabled={isLoading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => decrementQuantity(item.id)}
                            disabled={isLoading}
                            className="h-6 w-6 p-0"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm font-medium min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => incrementQuantity(item.id)}
                            disabled={isLoading || (item.stock_quantity && item.quantity >= item.stock_quantity)}
                            className="h-6 w-6 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <span className="text-sm font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      {/* Stock Warning */}
                      {item.stock_quantity && item.quantity >= item.stock_quantity && (
                        <p className="text-xs text-amber-600 mt-1">
                          Max stock reached
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t pt-4 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link href="/cart" className="block">
                    <Button 
                      className="w-full" 
                      onClick={() => setIsOpen(false)}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Loading...</span>
                        </div>
                      ) : (
                        'View Cart'
                      )}
                    </Button>
                  </Link>
                  
                  <Link href="/checkout" className="block">
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                      disabled={isLoading}
                    >
                      Checkout
                    </Button>
                  </Link>
                </div>

                {/* Continue Shopping */}
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSidebar;