"use client";
import React, { useState } from "react";
import { Loader2, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "@/app/_context/cartContext";
import { addProuductToWishlist, removeProductFromWishlist } from "@/app/wishlist/whishlist.action";

interface AddToWishlistButtonProps {
  id: string;
}

export default function AddToWishlistButton2({ id }: AddToWishlistButtonProps) {
  //  from Context
  const { wishlistIds, setWishlistIds, updateNumberOfWishlist } = useWishlist();
  
  const [isLoading, setIsLoading] = useState(false);

  // Check if current id is in the global array
  const isFavourite = wishlistIds.includes(id);

  async function handleClick() {
    setIsLoading(true);

    try {
      if (isFavourite) {
        //  REMOVE
        const res = await removeProductFromWishlist({ itemId: id });
        if (res.status === "success") {
          toast.success("Removed from wishlist");
          // Update global id 
          setWishlistIds(res.data); 
          updateNumberOfWishlist(res.data.length);
        }
      } else {
        // ADD
        const res = await addProuductToWishlist(id);
        if (res.status === "success") {
          toast.success(res.message || "Added to wishlist");
          // Update global id 
          setWishlistIds(res.data); 
          updateNumberOfWishlist(res.data.length);
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 border ${
        isFavourite 
          ? "bg-red-50 border-red-200 text-red-600" 
          : "bg-white border-slate-200 hover:border-[#50829F] hover:text-[#50829F] text-slate-700"
      }`}
    >
      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          <Heart className={`w-4 h-4 ${isFavourite ? "fill-current" : ""}`} />
          {isFavourite ? "Saved to Wishlist" : "Add to Wishlist"}
        </>
      )}
    </button>
  );
}
