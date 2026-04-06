"use client";
import React from "react";
import { Trash2 } from "lucide-react";
import { ClearAllCart } from "@/app/cart/cart.action";
import toast from "react-hot-toast";
import { useCart, CartContextType } from "@/app/_context/cartContext";

export default function ClearCartButton() {
  const { updateNumberOfCart } = (useCart() as CartContextType);

  async function handleClear() {

    const toastId = toast.loading("Clearing your cart...");
    const data = await ClearAllCart();

    if (data.status === "success") {
      updateNumberOfCart(0); 
      toast.success(data.message, { id: toastId });
      
    } else {
      toast.error(data.message || "Failed to clear cart", { id: toastId });
    }
  }

  return (
    <button
      onClick={handleClear}
      className="cursor-pointer flex items-center gap-2 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
    >
      <Trash2 className="w-4 h-4" />
      Clear Shopping Cart
    </button>
  );
}