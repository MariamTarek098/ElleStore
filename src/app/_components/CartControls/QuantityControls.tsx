"use client";
import { CartContextType, useCart } from "@/app/_context/cartContext";
import { updateProduct } from "@/app/cart/cart.action";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function QuantityControls({ itemId, count, isIncrement }: { itemId: string, count: number, isIncrement?: boolean }) {
    const { updateNumberOfCart } = (useCart() as CartContextType);
    const [loading, setLoading] = useState(false);
  
async function handleUpdate() {
  setLoading(true);

  const toastId = toast.loading("updating item ..."); 

  const data = await updateProduct(itemId, count);

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
    disabled={count <=0}
      onClick={handleUpdate}
      className="cursor-pointer p-2 hover:bg-slate-100 text-slate-500 transition-colors flex items-center justify-center"
    >
      {isIncrement ? <Plus className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
    </button>
  );
}