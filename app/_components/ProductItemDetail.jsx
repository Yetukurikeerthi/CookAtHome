"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react"; // Import cart icon

function ProductItemDetail({ product }) {
  const [quantity, setQuantity] = useState(1);
  const maxQuantity = 50; // Set maximum quantity limit

  // Calculate total price dynamically
  const totalPrice = product.SellingPrice
    ? product.SellingPrice * quantity
    : product.mrp * quantity;

  const increaseQuantity = () => {
    if (quantity < maxQuantity) setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (quantity > 1) {
      alert(`Added ${quantity} ${product.name} to cart!`);
      // Replace with actual add-to-cart logic
    }
  };

  if (!product?.images?.length) {
    return <p>No image available</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${product.images[0].url}`}
        alt={product.name || "Product Image"}
        width={300}
        height={300}
        className="bg-slate-200 p-5 h-[320px] w-[300px]"
      />

      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <h2 className="text-sm text-gray-500">{product.description}</h2>

        {/* Price & Total Price Section */}
        <div className="flex gap-3 items-center">
          {product.SellingPrice ? (
            <>
              <h2 className="text-red-600 text-lg font-bold">
                ${product.SellingPrice}
              </h2>
              {product.mrp && (
                <h2 className="text-gray-500 line-through">${product.mrp}</h2>
              )}
            </>
          ) : (
            product.mrp && (
              <h2 className="text-gray-800 text-lg">${product.mrp}</h2>
            )
          )}
        </div>

        {/* Quantity Selection */}
        <div>
          <h2 className="font-medium text-lg">
            Quantity ({product.itemQuantityType})
          </h2>
          <div className="p-2 border flex gap-3 items-center w-[150px] justify-between rounded-md">
            <button
              onClick={decreaseQuantity}
              className={`px-4 py-2 border rounded-md text-lg ${
                quantity > 1
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={quantity === 1}
            >
              -
            </button>
            <h2 className="text-lg font-semibold">{quantity}</h2>
            <button
              onClick={increaseQuantity}
              className={`px-4 py-2 border rounded-md text-lg ${
                quantity < maxQuantity
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={quantity === maxQuantity}
            >
              +
            </button>
          </div>
        </div>

        {/* Total Price Display */}
        <h2 className="text-lg font-bold text-blue-600">
          Total: ${totalPrice.toFixed(2)}
        </h2>

        {/* Add to Cart Button - Disabled if quantity is 1 */}
        <button
          onClick={handleAddToCart}
          disabled={quantity === 1}
          className={`mt-4 px-5 py-2 font-semibold rounded-md flex items-center gap-2 transition duration-300 ${
            quantity > 1
              ? "bg-green-400 text-white hover:bg-green-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          <ShoppingCart size={20} /> Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductItemDetail;
