"use client";
import React, { useState } from "react";
import { Loader2, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "@/app/_context/cartContext";
import { addProuductToWishlist, removeProductFromWishlist } from "@/app/wishlist/whishlist.action";

export default function AddToWishlistButton({ id }: { id: string }) {
  const { wishlistIds, setWishlistIds, updateNumberOfWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);

  // Check if current id exists in the global array
  const isFavourite = wishlistIds.includes(id);

  async function handleToggle(e: React.MouseEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isFavourite) {
        //  REMOVE
        const res = await removeProductFromWishlist({ itemId: id });
        if (res.status === "success") {
          toast.success("Removed from wishlist");
          // Update global ids 
          setWishlistIds(res.data); 
          updateNumberOfWishlist(res.data.length);
        }
      } else {
        //  ADD
        const res = await addProuductToWishlist(id);
        if (res.status === "success") {
          toast.success(res.message);
          // Update global ids 
          setWishlistIds(res.data); 
          updateNumberOfWishlist(res.data.length);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to update wishlist");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isLoading}
      className={`bg-white p-1.5 rounded-full shadow-sm transition-all duration-300 ${
        isFavourite ? "text-red-500 bg-red-50 ring-1 ring-red-100" : "text-slate-400 hover:text-red-500"
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-slate-400" />
      ) : (
        <Heart className={`w-4 h-4 transition-transform active:scale-125 ${isFavourite ? "fill-current" : ""}`} />
      )}
    </button>
  );
}