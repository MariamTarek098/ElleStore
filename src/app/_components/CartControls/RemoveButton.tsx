"use client";
import React, { useState } from "react";
import { RemoveProduct } from "@/app/cart/cart.action";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { CartContextType, useCart } from "@/app/_context/cartContext";
import { useRouter } from "next/navigation"; 

export default function RemoveButton({ itemId }: { itemId: string }) {
  const { updateNumberOfCart } = (useCart() as CartContextType);
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  async function handleDelete() {
    setLoading(true);
    const toastId = toast.loading("Removing item ...");

    try {
      const response = await RemoveProduct({ itemId });

      if (response?.success) {
        updateNumberOfCart(response.data.numOfCartItems);

        toast.success(response.data.message || "Item removed successfully", { id: toastId });
        
        router.refresh();
        
      } 
      else {
        toast.error(response?.message || "Failed to remove item", { id: toastId });
        
        if (response?.message?.toLowerCase().includes("log in")) {
          setTimeout(() => {
            router.push("/login");
          }, 1000);
        }
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred", { id: toastId });
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="cursor-pointer text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </button>
  );
}