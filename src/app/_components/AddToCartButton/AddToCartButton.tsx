"use client";
import React, { useState } from "react";
import { Plus, Loader2 } from "lucide-react"; 
import { addProuductToCart } from "@/app/cart/cart.action";
import toast from "react-hot-toast";
import { CartContextType, useCart } from "@/app/_context/cartContext";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  id: string;
}

export default function AddToCartButton({ id }: AddToCartButtonProps) {
  
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
      // User is not logged in
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