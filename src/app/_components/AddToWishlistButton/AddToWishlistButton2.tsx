"use client";
import React, { useState } from "react";
import { Loader2, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "@/app/_context/cartContext";
import { addProuductToWishlist, removeProductFromWishlist } from "@/app/wishlist/whishlist.action";
import { useRouter } from "next/navigation"; 

interface AddToWishlistButtonProps {
  id: string;
}

export default function AddToWishlistButton2({ id }: AddToWishlistButtonProps) {

  const { wishlistIds, setWishlistIds, updateNumberOfWishlist } = useWishlist();
  
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const isFavourite = wishlistIds.includes(id);

  async function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      let response;

      if (isFavourite) {
        // REMOVE
        response = await removeProductFromWishlist({ itemId: id });
      } else {
        // ADD
        response = await addProuductToWishlist(id);
      }

      if (response?.success) {
        // Extract the actual array of IDs from  API response 
        const updatedWishlistArray = response.data.data; 
        
        toast.success(response.data.message || (isFavourite ? "Removed from wishlist" : "Added to wishlist"));
        
        // Update global context 
        setWishlistIds(updatedWishlistArray); 
        updateNumberOfWishlist(updatedWishlistArray.length);
      } 
      else {
        toast.error(response?.message || "Failed to update wishlist");
        
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