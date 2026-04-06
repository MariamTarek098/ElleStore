"use client";
import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react"; 
import { addProuductToCart } from "@/app/cart/cart.action";
import toast from "react-hot-toast";
import { CartContextType, useCart } from "@/app/_context/cartContext";

interface AddToCartButtonProps {
  id: string;
}

export default function AddToCartButton({ id }: AddToCartButtonProps) {
  
  const { updateNumberOfCart } = (useCart() as CartContextType);

  const [isLoading, setIsLoading] = useState(false);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
 
    setIsLoading(true);

    try {
      const data = await addProuductToCart(id);

      updateNumberOfCart(data.numOfCartItems);
      toast.success(data.message);
      
    } catch (err: any) {
      toast.error(err.message || "Failed to add to cart");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="bg-[#50829F] text-white p-1.5 rounded-full hover:bg-[#3d657d] hover:scale-110 active:scale-95 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100"
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Plus className="w-5 h-5" />
      )}
    </button>
  );
}