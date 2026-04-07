"use client";
import React, { useState } from "react";
import { Loader2, Heart } from "lucide-react";
import toast from "react-hot-toast";
import { useWishlist } from "@/app/_context/cartContext";
import { addProuductToWishlist, removeProductFromWishlist } from "@/app/wishlist/whishlist.action";
import { useRouter } from "next/navigation"; 

export default function AddToWishlistButton({ id }: { id: string }) {
  const { wishlistIds, setWishlistIds, updateNumberOfWishlist } = useWishlist();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); 

  const isFavourite = wishlistIds.includes(id);

  async function handleToggle(e: React.MouseEvent) {
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
        const updatedWishlistArray = response.data.data; 
        
        toast.success(response.data.message || (isFavourite ? "Removed from wishlist" : "Added to wishlist"));

        setWishlistIds(updatedWishlistArray); 
        updateNumberOfWishlist(updatedWishlistArray.length);
      } 

      else {
        toast.error(response?.message || "Failed to update wishlist");

        if (response?.message?.includes("log in")) {
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