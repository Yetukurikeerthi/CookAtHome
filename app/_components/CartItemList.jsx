import Image from 'next/image';
import { TrashIcon } from 'lucide-react';
import React from 'react';

function CartItemList({ cartItemList, onDeleteItem, subtotal }) {
  return (
    <div className="space-y-4">
      {cartItemList.length === 0 ? (
        <div className="text-center text-gray-500 py-4">Your cart is empty</div>
      ) : (
        cartItemList.map((cart) => (
          <div key={cart.cartId} className="flex items-center justify-between p-4 border rounded-md shadow-sm">
            {/* Left section: Image and details */}
            <div className="flex items-center gap-4">
              {cart.productImage ? (
                <Image
                  src={cart.productImage}
                  width={70}
                  height={70}
                  alt={cart.productName || 'Product Image'}
                  className="rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-600">
                  No Image
                </div>
              )}
              <div>
                <h4 className="font-semibold">{cart.productName || 'Unnamed Product'}</h4>
                <div className="text-gray-500">
                  Price: ${cart.productPrice ? cart.productPrice.toFixed(2) : '0.00'}
                </div>
                <div className="text-gray-500">Quantity: {cart.quantity || 0}</div>
              </div>
            </div>

            {/* Right section: Trash icon */}
            <TrashIcon
              className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700"
              onClick={() => onDeleteItem(cart.cartId)}
            />
          </div>
        ))
      )}

      {/* Subtotal section */}
      {cartItemList.length > 0 && (
        <div className="flex justify-between p-4 mt-4 border-t font-semibold">
          <span>SubTotal:</span>
          <span className="text-lg font-bold">${subtotal}</span>
        </div>
      )}
    </div>
  );
}

export default CartItemList;
