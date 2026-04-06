'use client'
import { ProductType } from "@/interfaces/product.interface";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";

export default function ProductDetailsQuantity({ product }: { product: ProductType }) {


// 1. Initialize state for quantity
  const [quantity, setQuantity] = useState(1);

  // 2. Get price and max quantity with fallbacks
  const price = product?.price || 191;
  const maxQuantity = product?.quantity || 225;

  // 3. Handlers for the buttons
  const handleIncrease = () => {
    if (quantity < maxQuantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // 4. Calculate total price dynamically
  const totalPrice = price * quantity;




  return (
    <div >
   <div className="mb-8">
        <span className="block text-sm font-medium text-slate-700 mb-2">
          Quantity
        </span>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-slate-200 rounded-lg bg-white h-12">
            <button
              onClick={handleDecrease}
              className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-[#50829F] hover:bg-slate-50 rounded-l-lg transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <input
              type="number"
              value={quantity}
              readOnly
              className="w-12 h-full text-center font-semibold text-slate-900 border-x border-slate-200 focus:outline-none"
            />
            
            <button
              onClick={handleIncrease}
              className="w-12 h-full flex items-center justify-center text-slate-500 hover:text-[#50829F] hover:bg-slate-50 rounded-r-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-sm text-slate-500">
            {maxQuantity} available
          </span>
        </div>
      </div>

      <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-between mb-6">
        <span className="text-slate-600 font-medium">Total Price:</span>
        <span className="text-xl font-bold text-[#50829F]">
          {totalPrice} EGP
        </span>
      </div>
    </div>
  );
}
