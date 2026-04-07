"use client";
import React, { useState } from "react";
import { ShoppingCart, Loader2 } from "lucide-react"; 
import { addProuductToCart } from "@/app/cart/cart.action";
import toast from "react-hot-toast";
import { CartContextType, useCart } from "@/app/_context/cartContext";
import { useRouter } from "next/navigation"; 

interface AddToCartButtonProps {
  id: string;
}

export default function AddToCartButton2({ id }: AddToCartButtonProps) {
  const { updateNumberOfCart } = (useCart() as CartContextType);
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 
  
  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await addProuductToCart(id);

      if (response?.success) {
        updateNumberOfCart(response.data.numOfCartItems);
        toast.success(response.data.message || "Added to cart successfully!");
      } 
      else {
        toast.error(response?.message || "Failed to add to cart.");
        
      
        if (response?.message?.includes("login")) {
          setTimeout(() => {
            router.push("/login");
          }, 1000); 
        }
      }
      
    } catch (err: any) {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full">
      <div className="grid gap-4 mb-4">
        <button 
          onClick={handleClick}
          disabled={isLoading} 
          className="flex items-center justify-center gap-2 bg-[#50829F] hover:bg-[#3d657d] text-white py-3.5 rounded-xl font-semibold transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" /> 
          ) : (
            <ShoppingCart className="w-5 h-5" />
          )}

          {isLoading ? "Adding..." : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}