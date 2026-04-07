"use client";
import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist, WishlistContextType } from "@/app/_context/cartContext";
import { removeProductFromWishlist } from "@/app/wishlist/whishlist.action";
import { useRouter } from "next/navigation"; 

export default function RemoveFromWishlist({ itemId }: { itemId: string }) {

  const { updateNumberOfWishlist, setWishlistIds } = (useWishlist() as WishlistContextType);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    const toastId = toast.loading("Removing item...");

    try {
      const response = await removeProductFromWishlist({ itemId });

      if (response?.success) {
        const updatedWishlistArray = response.data.data;
        
        updateNumberOfWishlist(updatedWishlistArray.length);
        if (setWishlistIds) setWishlistIds(updatedWishlistArray); 

        toast.success(response.data.message || "Item removed successfully", { id: toastId });

        router.refresh();
      } 

      else {
        toast.error(response?.message || "Failed to remove item", { id: toastId });
        
        if (response?.message?.toLowerCase().includes("log in")) {
          setTimeout(() => router.push("/login"), 1000);
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
      className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </button>
  );
}