"use client";
import React, { useState } from "react";
import { RemoveProduct } from "@/app/cart/cart.action";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { CartContextType, useCart } from "@/app/_context/cartContext";


export default function RemoveButton({ itemId }: { itemId: string }) {
  const { updateNumberOfCart } = (useCart() as CartContextType);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const toastId = toast.loading("Removing item ...");

    const data = await RemoveProduct({ itemId });

    if (data?.status === "success") {
      updateNumberOfCart(data.numOfCartItems);

      toast.success(data.message, { id: toastId });
     
    } else {
      toast.error(data?.message || "Error", { id: toastId });
    }
    
    setLoading(false);
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